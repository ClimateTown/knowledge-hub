import hashlib
from pathlib import Path
from urllib.request import Request, urlopen

import yaml
from bs4 import BeautifulSoup
from loguru import logger
from tqdm import tqdm
import validators
import httpx

resources_file = Path("data") / "resources.yml"


# Somewhat copying the homework from this article
def get_page(url):
    """Scrapes a URL and returns the HTML source.

    Args:
        url (string): Fully qualified URL of a page.

    Returns:
        soup (string): HTML source of scraped page.
    """

    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    response = urlopen(req, timeout=10)

    if response.getcode() != 200:
        logger.error(f"Error fetching {url}. Status code: {response.getcode()}")
        raise Exception(f"Error fetching {url}. Status code: {response.getcode()}")

    soup = BeautifulSoup(
        response, "html.parser", from_encoding=response.info().get_param("charset")
    )

    return soup


def get_og_image(soup):
    """Return the Open Graph site name

    Args:
        soup: HTML from Beautiful Soup.

    Returns:
        value: Parsed content.
    """

    if soup.findAll("meta", property="og:image"):
        return soup.find("meta", property="og:image")["content"]
    else:
        return


def get_og_preview(url):
    # TODO: Maybe add additional behaviour to check if the image is large enough
    soup = get_page(url)
    image_url = get_og_image(soup)

    return image_url


def write_image_to_file(url: str) -> str | None:
    hashed = hashlib.shake_128(url.encode("utf-8")).hexdigest(4)
    path = Path("static") / "previews" / f"{hashed}.jpg"

    # Add Mozilla header to prevent getting blocked for scraping
    r = httpx.get(url, headers={"User-agent": "Mozilla/5.0"}, follow_redirects=True)
    if r.status_code != 200:
        logger.error(f"Couldn't find image at {url}")
        return None

    logger.info(f"Writing preview {hashed}.jpg for {r.url.host}")

    f = open(path, "wb")
    f.write(r.content)
    f.close()
    return f"previews/{hashed}.jpg"


def main():
    with resources_file.open() as f:
        resources = yaml.safe_load(f)
    logger.success("Read in `resources.yml` file.")

    for resource in resources:
        logger.info(f"Getting OG preview for {resource['url']}")

        try:
            image = get_og_preview(resource["url"])
        except Exception as e:
            logger.error(e)
            image = None

        if image:
            # Check if image is valid URL
            # TODO: Remove this nesting by offloading the validation to the image writer
            if validators.url(image):
                filename = write_image_to_file(image)
                if filename is None:
                    continue
                resource["og_preview"] = filename

    with resources_file.open("w") as f:
        yaml.dump(resources, f)

    logger.success("Wrote OG previews to `resources.yml` file.")


if __name__ == "__main__":
    main()
