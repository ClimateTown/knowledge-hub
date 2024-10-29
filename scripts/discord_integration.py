from loguru import logger
import argparse
import requests
from copy import deepcopy

# Discord char limits https://www.pythondiscord.com/pages/guides/python-guides/discord-embed-limits/
CHAR_LIMITS = {
    "embed_title": 256,
    "embed_description": 4096,
}

TEMPLATE_PAYLOAD = {
    "content": "Beep, boop 🤖. A new issue has been created in the Knowledge Hub! 🚀",
    "embeds": [
        {
            "title": "",
            "description": "",
            "url": "",
            "color": 5192790,
            "thumbnail": {
                "url": "https://raw.githubusercontent.com/ClimateTown/knowledge-hub/main/static/images/knowledge-hub-logo.png"
            },
            "fields": [
                {"name": "Author", "value": "", "inline": True},
                {
                    "name": "What now?",
                    "value": "Upvote, downvote, create a thread here to discuss this, or head to the GitHub repo to discuss.",
                    "inline": True,
                },
            ],
        }
    ],
}


def trim_to_limit(string: str, limit: int) -> str:
    if len(string) < limit:
        return string
    return string[: (limit - 5)] + "..."


class GithubIssue:
    def __init__(
        self, issue_number: int, issue_title: str, issue_description: str, author: str
    ):
        self.issue_number = issue_number
        self.issue_title = issue_title
        self.issue_description = issue_description
        self.author = author

    def __repr__(self):
        return f"GithubIssue(issue_number={self.issue_number!r}, issue_title={self.issue_title!r}, author={self.author!r})"

    def render_payload(self):
        title = f"#{self.issue_number} {self.issue_title}"
        payload = deepcopy(TEMPLATE_PAYLOAD)

        payload["embeds"][0]["title"] = trim_to_limit(title, CHAR_LIMITS["embed_title"])
        payload["embeds"][0]["description"] = trim_to_limit(
            self.issue_description, CHAR_LIMITS["embed_description"]
        )
        payload["embeds"][0]["url"] = (
            f"https://www.github.com/ClimateTown/knowledge-hub/issues/{self.issue_number}"
        )

        # Setting author
        payload["embeds"][0]["fields"][0]["value"] = (
            f"[{self.author}](https://www.github.com/{self.author})"
        )

        return payload


def main(argv=None):
    """
    Contains the main logic for interfacing GitHub with the Discord webhook.
    """
    parser = argparse.ArgumentParser(
        prog="GitHubToDiscord",
        description="Send a created GitHub issue to a Discord channel",
    )

    parser.add_argument("--webhook-url", help="The Discord webhook URL.", required=True)
    parser.add_argument("--issue-number", help="The issue number.", type=int)
    parser.add_argument("--issue-title", help="The issue title.")
    parser.add_argument("--issue-description", help="The issue description.")
    parser.add_argument(
        "--author", help="The GitHub username for the author of the issue."
    )

    args = parser.parse_args(argv)

    logger.success("Captured input")
    logger.debug(f"{args.issue_number=}")
    logger.debug(f"{args.issue_title=}")
    logger.debug(f"{args.issue_description=}")
    logger.debug(f"{args.author=}")

    issue = GithubIssue(
        args.issue_number, args.issue_title, args.issue_description, args.author
    )

    logger.success("Created issue object.")

    payload = issue.render_payload()
    logger.info("Rendered payload")
    logger.debug(payload)

    # Send rest API call to Discord
    logger.info("Sending request to Discord")
    response = requests.post(args.webhook_url, json=payload)
    logger.info(f"Response from Discord: {response.status_code}")
    logger.debug(f"{response.text=}")

    # Checking for successful response code
    if 200 <= response.status_code <= 300:
        logger.success(
            f"STATUS CODE {response.status_code} while sending message to Discord"
        )
        logger.success("Successfully sent message to Discord!")
        return 0
    else:
        logger.error(
            f"STATUS CODE {response.status_code} while sending message to Discord"
        )
        return 1


if __name__ == "__main__":
    exit(main())
