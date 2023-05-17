import json
import os
from pathlib import Path

import jsonschema
import yaml

CURRENT_FOLDER = Path(__file__).parent

# YAML data paths with their corresponding schema paths
resource_data_path = CURRENT_FOLDER / "resources.yml"
resource_schema_path = CURRENT_FOLDER / "resources.schema.json"

youtube_channel_data_path = CURRENT_FOLDER / "youtube_channel_ids.yml"
youtube_channel_schema_path = CURRENT_FOLDER / "youtube_channel_ids.schema.json"

resource_tags_data_path = CURRENT_FOLDER / "resource_tags.yml"
resource_tags_schema_path = CURRENT_FOLDER / "resource_tags.schema.json"


def validate_yaml(yaml_path, schema_path):
    with open(yaml_path) as f:
        data = yaml.safe_load(f)

    with open(schema_path) as f:
        schema = json.load(f)

    jsonschema.validate(data, schema)


def test_yml_against_schemas():
    validate_yaml(resource_data_path, resource_schema_path)
    validate_yaml(youtube_channel_data_path, youtube_channel_schema_path)
    validate_yaml(resource_tags_data_path, resource_tags_schema_path)


def test_resource_tags():
    """
    Reads in valid resource tags from `resource_tags_data_path` and checks that
    all tags in `resource_data_path` are valid.

    Also verifys that the tags in `resource_tags_data_path` are unique.
    """
    with open(resource_tags_data_path) as f:
        tag_data = yaml.safe_load(f)
        valid_tags = [tag["name"] for tag in tag_data]

    with open(resource_data_path) as f:
        resource_data = yaml.safe_load(f)

    # Checking for duplicate tags in tag data file
    if len(valid_tags) != len(set(valid_tags)):
        raise Exception("Duplicate tag names in resource_tags.yml")

    # Go through resource data and check tags
    errors = []
    for resource in resource_data:
        for tag in resource["tags"]:
            if tag not in valid_tags:
                errors.append(
                    f"Invalid tag {tag!r} in resource {resource['title']!r} "
                    f"({resource['url']})"
                )

    if errors:
        raise Exception("\n".join(errors))
