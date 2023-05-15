from pathlib import Path

import yaml
from loguru import logger

resource_tags_file = Path("data") / "resource_tags.yml"
resources_file = Path("data") / "resources.yml"

def main():
    with resource_tags_file.open() as f:
        tags = yaml.safe_load(f)
    logger.success("Read in `resource_tags.yml` file.")

    with resources_file.open() as f:
        resources = yaml.safe_load(f)
    logger.success("Read in `resources.yml` file.")

    for tag in tags:
        logger.info(f"Getting of {tag['name']}")

    #for each resource
    for resource in resources:
        # check that each tag is in the list of tags
        for tag in resource.tags:
            if tag not in tags:
                logger.error(f"{tag} not in list of tags")
                raise Exception(f"{tag} not in list of tags")
            else:
                logger.success(f"{tag} is in list of tags")

if __name__ == "__main__":
    main()