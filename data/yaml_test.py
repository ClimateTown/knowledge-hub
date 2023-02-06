import json
import os
from pathlib import Path

import jsonschema
import yaml

CURRENT_FOLDER = Path(__file__).parent

def test_resources_yaml():
    with open(CURRENT_FOLDER / "resources.yml") as f:
        data = yaml.safe_load(f)

    with open(CURRENT_FOLDER / "resources.schema.json") as f:
        schema = json.load(f)

    jsonschema.validate(data, schema)


def test_youtube_yaml():
    with open(CURRENT_FOLDER / "youtube_channel_ids.yml") as f:
        data = yaml.safe_load(f)

    with open(CURRENT_FOLDER / "youtube_channel_ids.schema.json") as f:
        schema = json.load(f)

    jsonschema.validate(data, schema)
