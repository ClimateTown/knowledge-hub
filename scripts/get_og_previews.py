import hashlib
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

import yaml
from bs4 import BeautifulSoup
from loguru import logger
from tqdm import tqdm
import validators
import httpx
from PIL import Image

RESOURCES_FILE = Path("data") / "resources.yml"
PREVIEW_PATH = Path("static") / "previews"


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


def save_image_as_webp(binary_image: bytes, path: Path, file_name: str) -> Path:
    full_path = path / f"{file_name}.webp"
    # TODO: Might need to add some validation to make sure the binary is an image
    # Depends on if Pillow will just write a broken binary instead in those cases
    img = Image.open(BytesIO(binary_image))
    img.save(full_path, "webp")
    return full_path


def write_image_to_file(url: str, file_path: Path) -> Path | None:
    file_name = hashlib.shake_128(url.encode("utf-8")).hexdigest(4)
    image_path = Path("static") / "previews"

    # Add Mozilla header to prevent getting blocked for scraping
    r = httpx.get(url, headers={"User-agent": "Mozilla/5.0"}, follow_redirects=True)

    # Site had no actual image in their og_image url, so no point saving it
    if r.status_code != 200:
        logger.error(f"Couldn't find any image at {url}")
        return None

    return save_image_as_webp(r.content, image_path, file_name)


def main():
    # Ensure the path for our previews actually exists
    PREVIEW_PATH.mkdir(parents=True, exist_ok=True)

    with RESOURCES_FILE.open() as f:
        resources = yaml.safe_load(f)
    logger.success("Read in `resources.yml` file.")

    for resource in resources:
        logger.info(f"Getting OG preview for {resource['url']}")

        try:
            image_url = get_og_preview(resource["url"])
        except Exception as e:
            logger.error(e)
            image_url = None

        if image_url:
            # Check if image is valid URL
            # TODO: Remove this nesting by offloading the validation elsewhere
            if validators.url(image_url):
                file_path = write_image_to_file(image_url, PREVIEW_PATH)
                if file_path is None:
                    continue
                # Extract the last parts of the file path (previews/img_name.webp)
                resource["og_preview"] = "/".join(file_path.parts[-2:])

    with RESOURCES_FILE.open("w") as f:
        yaml.dump(resources, f)

    logger.success("Wrote OG previews to `resources.yml` file.")


if __name__ == "__main__":
    main()
