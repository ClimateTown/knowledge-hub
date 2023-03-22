import aiohttp
import asyncio
import yaml
import logging
from typing import List, Dict, Union, Optional, Tuple

logging.basicConfig(level=logging.INFO)


class CheckUrl:
    async def check(self, url: str) -> Tuple[str, Optional[str]]:
        logging.info(f"Fetching {url}")

        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, timeout=5) as response:
                    status_code = response.status

                    if status_code == 200:
                        logging.info(f"{url} is OK")
                        return url, None
                    elif status_code == 301:
                        logging.warning(f"{url} is OK, but redirects")
                        return url, f"{url} is a redirect"
                    else:
                        logging.error(f"{url} returned status code {status_code}")
                        return url, f"{url} returned status code {status_code}"
        except aiohttp.ClientError as e:
            logging.error(f"{url} failed with error {e}")
            return url, f"{url} failed with error {e}"

    def load_urls(self, filename: str) -> List[str]:
        try:
            with open(filename, "r") as file:
                contents = yaml.safe_load(file)

            urls = [entry["url"] for entry in contents if "url" in entry]
            logging.info(f"Loaded {len(urls)} URLs from {filename}")
            return urls
        except Exception as e:
            logging.error(f"Failed to load URLs from {filename}: {e}")
            return []

    async def check_all(self, urls: List[str]) -> None:
        async def process_url(url: str) -> None:
            _, error = await self.check(url)
            if error:
                logging.error(f"Error for {url}: {error}")

        tasks = [asyncio.create_task(process_url(url)) for url in urls]
        await asyncio.gather(*tasks)

        if not any(task.exception() for task in tasks):
            logging.info("NO BROKEN LINKS")
        else:
            logging.error("BROKEN LINKS FOUND:")
            logging.debug("Exiting with errors")
            exit(1)


check_url = CheckUrl()
urls = check_url.load_urls("./data/resources.yml")
asyncio.run(check_url.check_all(urls))
