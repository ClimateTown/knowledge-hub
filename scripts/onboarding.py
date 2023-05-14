"""
Script to streamline the onboarding of resources.

Run the script. Look for error messages. If there are critical error messages,
fix the underlying issue and run the script again, or add the issue number to
the ignore list to not be considered during onboarding.

WARNING: This script modifies the data/resources.yml file. Make sure to save any
changes you need to before running.
"""

import requests
import yaml
from loguru import logger
import re
from urllib.parse import urlparse
from typing import List
from datetime import datetime
import pytz
from pathlib import Path


RESOURCE_ISSUE_PATTERN = r"""###\sResource\stitle\s*
(?P<title>.+?)\s*
###\sURL\s*
(?P<url>.+?)\s*
###\sRelevant\stags\s\(1\sper\sline\)\s*
(?P<tags>(?:(?:(?!\#).)+\s*)+)
###\sResource\sSummary\s*
(?P<description>.+?)\s*
###\sRelevance
"""

SCRIPT_PATH = Path(__file__).resolve()
RESOURCES_DATA_PATH = (SCRIPT_PATH.parent / "../data/resources.yml").resolve()

REPO = "ClimateTown/knowledge-hub"


class GithubIssue:
    def __init__(self, api_response):
        self.author = api_response["user"]["login"]
        self.issue_number = api_response["number"]
        self.issue_title = api_response["title"]
        self.issue_url = api_response["html_url"]
        issue_body = api_response["body"]

        # Remove carriage returns
        self.issue_body = "\n".join(issue_body.splitlines())

    def __str__(self):
        return f"Issue {self.issue_number}: {self.issue_title} by {self.author} - {self.issue_url}"

    def __repr__(self):
        return f"<GithubIssue issue_number={self.issue_number}, issue_title={repr(self.issue_title)}, author={repr(self.author)}, issue_url={repr(self.issue_url)}>"


class InvalidResourceIssueBody(Exception):
    pass


class ResourceIssue(GithubIssue):
    def __init__(self, api_response):
        super().__init__(api_response)

        try:
            self.parse_body(self.issue_body)
        except InvalidResourceIssueBody:
            logger.error(f"Failed to parse body for issue {self.issue_number}")
            self.__class__ = GithubIssue

    def __repr__(self):
        return f"<ResourceIssue issue_number={self.issue_number}, issue_title={repr(self.issue_title)}, author={repr(self.author)}, issue_url={repr(self.issue_url)}>"

    def get_resource_dict(self):
        """Returns dict for resource according to data/resources.yml schema."""
        return {
            "description": self.resource_description,
            "tags": self.resource_tags,
            "title": self.resource_title,
            "url": self.resource_url,
        }

    def parse_body(self, issue_body):
        """
        Parses the body of the issue to extract the resource title, url, tags, and description.
        """
        compiled_pattern = re.compile(RESOURCE_ISSUE_PATTERN, re.MULTILINE | re.DOTALL)
        match = compiled_pattern.search(issue_body)

        if match:
            self.resource_title = match.group("title")
            self.resource_url = match.group("url")
            self.resource_tags = match.group("tags").strip().split("\n")
            self.resource_description = match.group("description")

            if len(self.resource_description.splitlines()) > 1:
                raise InvalidResourceIssueBody("Resource description must be one line.")
        else:
            raise InvalidResourceIssueBody("Regex parsing of issue body failed.")
        return


def resource_is_duplicated(issues: List[ResourceIssue]):
    """
    Checks if the resource already exists in the database.

    Checks the domain of the resource url to see if it already exists in the current resources.
    """
    # Load current resources
    with open(RESOURCES_DATA_PATH, "r") as file:
        current_resources = yaml.safe_load(file)
    current_urls = [resource["url"] for resource in current_resources]

    found_duplicates = False
    for issue in issues:
        if issue.resource_url in current_urls:
            logger.critical(
                f"{issue.resource_url} from issue {issue.issue_number} already exists in the database.\n"
                f"Please close the issue and rerun this script."
            )
            found_duplicates = True
    if found_duplicates:
        return True

    # Top level domains which are allowed to be duplicated
    tl_domain_whitelist = [
        "discord.gg",
        "nasa.gov",
        "youtube.com",
        "youtu.be",
    ]

    # Get current top level domains
    current_tl_domains = [get_tl_domain(url) for url in current_urls]

    for issue in issues:
        tl_domain = get_tl_domain(issue.resource_url)
        if tl_domain in current_tl_domains and tl_domain not in tl_domain_whitelist:
            logger.critical(
                f"Top level domain {tl_domain} from issue {issue.issue_number} already exists in the database.\n"
                f"Please close the issue and rerun this script, or add this top level domain to the whitelist if the resource is good."
            )
            found_duplicates = True

    if found_duplicates:
        return True
    return False


def get_tl_domain(url):
    """
    Gets the top level domain from a url.
    """
    domain = urlparse(url).netloc
    tl_domain = ".".join(domain.split(".")[-2:])
    return tl_domain


def get_pr_message(issues: List[ResourceIssue]):
    """
    Auto generates the message for the pull request.
    """

    message = (
        f"🚂 Resource onboarding ({datetime.now(pytz.utc).strftime('%-d %B %Y')})"
        f"\n\n"
        f"*All aboard!* 🚂🚂🚂🚂"
        f"\n\n"
        f"In this onboarding we add the following resources:\n\n"
    )
    for issue in issues:
        message += f"- Closes #{issue.issue_number} (from @{issue.author})\n"

    message += "\n\n"

    # Sorted list of unique authors
    authors = sorted(list(set([issue.author for issue in issues])))
    message += "@all-contributors\n"
    for author in authors:
        message += f"please add @{author} for content\n"

    message += (
        "\n\n"
        "Thank you to our contributors for these resources! 🥳🌳\n\n"
        f"This PR was curated with help from the `{SCRIPT_PATH.name}` script. 🤖"
    )
    return message


def main(ignore_issues=None):
    """
    Use GitHub API to query approved resources and add them to the database.

    Also does some validation on the resources to check for duplicates.

    Parameters
    ----------
    ignore_issues : list of integers
        List of issue numbers to ignore. Useful for ignoring approved resources
        that are in are invalid in their data.
    """
    if ignore_issues is None:
        ignore_issues = []
    if not all([isinstance(issue, int) for issue in ignore_issues]):
        raise TypeError("ignore_issues must be a list of integers.")

    if not RESOURCES_DATA_PATH.exists():
        logger.error(f"Resources data file does not exist at {RESOURCES_DATA_PATH}")
        return

    # Get issue data from GitHub API
    url = f"https://api.github.com/repos/{REPO}/issues"
    params = {
        "labels": "approved,suggestion/resource",
        "state": "open",
    }
    response = requests.get(url, params=params)

    if response.status_code != 200:
        logger.error("Request failed")
        logger.error(f"Response code: {response.status_code}")
        return

    logger.info("Request successful")
    issues = [ResourceIssue(api_response) for api_response in response.json()]
    issues = sorted(
        issues, key=lambda issue: issue.issue_number
    )  # Sorting issues chronologically

    valid_issues = []
    for issue in issues:
        if issue.__class__ == ResourceIssue and issue.issue_number not in ignore_issues:
            valid_issues.append(issue)

    # Checks if the resources being onboarded already exist in the database
    if resource_is_duplicated(valid_issues):
        return

    onboarding_list = [issue.get_resource_dict() for issue in valid_issues]

    # Writing resources to data file
    with open(RESOURCES_DATA_PATH, "a", encoding="utf-8") as file:
        yaml.dump(
            onboarding_list, file, indent=2, width=float("inf"), allow_unicode=True
        )
    logger.success(f"New resources written to file {RESOURCES_DATA_PATH}.")

    pr_message_path = SCRIPT_PATH.parent / "onboarding_pr_message.md"
    with open(pr_message_path, "w", encoding="utf-8") as file:
        file.write(get_pr_message(valid_issues))
        logger.success(f"PR message written to file {pr_message_path}.")


if __name__ == "__main__":
    main()
