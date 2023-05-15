from pathlib import Path

import yaml
from loguru import logger

resource_tags_file = Path("data") / "resource_tags.yml"
resources_file = Path("data") / "resources.yml"


def main():
    with resource_tags_file.open() as f:
        tagObjects = yaml.safe_load(f)
    logger.success("Read in `resource_tags.yml` file.")

    with resources_file.open() as f:
        resources = yaml.safe_load(f)
    logger.success("Read in `resources.yml` file.")

    tags = [tag["name"] for tag in tagObjects]

    for resource in resources:
        for tag in resource["tags"]:
            if tag not in tags:
                logger.error(f"{tag} not in list of tags")
                raise Exception(f"{tag} not in list of tags")
            else:
                logger.success(f"{tag} is in list of tags")

    logger.success("All resource tags are found in resource_tags.yml")


if __name__ == "__main__":
    main()
