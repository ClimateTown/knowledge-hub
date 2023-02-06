import json

import jsonschema
import yaml


def test_resources_yaml():
    with open("resources.yml") as f:
        data = yaml.safe_load(f)

    with open("resources.schema.json") as f:
        schema = json.load(f)

    jsonschema.validate(data, schema)


def test_youtube_yaml():
    with open("youtube_channel_ids.yml") as f:
        data = yaml.safe_load(f)

    with open("youtube_channel_ids.schema.json") as f:
        schema = json.load(f)

    jsonschema.validate(data, schema)
