"""
A small utility CLI app to convert Climate Town Knowledge Hub resources between YAML and CSV.
"""

import yaml
import pandas as pd
from pathlib import Path
import json
import jsonschema
from copy import deepcopy
import argparse

CURRENT_FOLDER = Path(__file__).parent.absolute()
ENCODING = "utf-8"

RESOURCE_EXAMPLES = [
    {
        "title": "Example resource",
        "description": "This is an example resource.",
        "tags": ["Climate Action", "Other Tag"],
        "url": "https://example.com",
    },
]


class ResourcesSchema:
    TITLE = "title"
    DESCRIPTION = "description"
    TAGS = "tags"
    URL = "url"


class Resources:
    _data = None
    _schema_path = CURRENT_FOLDER / "../data/resources.schema.json"

    def __init__(self, data):
        self._data = data

    @classmethod
    def from_yaml(cls, path):
        with open(path, encoding=ENCODING) as f:
            data = yaml.safe_load(f)
        return cls(data)

    @classmethod
    def from_csv(cls, path):
        df = pd.read_csv(path, encoding=ENCODING)
        df["tags"] = df["tags"].apply(lambda x: x.split(","))
        data = df.to_dict(orient="records")
        return cls(data)

    def check(self, schema_path=None):
        # Use default schema path
        if schema_path is None:
            schema_path = self._schema_path

        with open(schema_path, encoding=ENCODING) as f:
            schema = json.load(f)

        jsonschema.validate(self._data, schema)
        return True

    def to_yaml(self, path):
        with open(path, "w", encoding=ENCODING) as f:
            yaml.dump(
                self._data, f, sort_keys=True, width=float("inf"), allow_unicode=True
            )
        return

    def __dict__(self):
        return deepcopy(self._data)

    def to_csv(self, path):
        return self.to_df().to_csv(path, index=False, encoding=ENCODING)

    def to_df(self):
        lst = deepcopy(self._data)
        for item in lst:
            item[ResourcesSchema.TAGS] = ",".join(item[ResourcesSchema.TAGS])

        df = pd.DataFrame(lst)[
            [
                ResourcesSchema.TITLE,
                ResourcesSchema.DESCRIPTION,
                ResourcesSchema.TAGS,
                ResourcesSchema.URL,
            ]
        ]
        return df


def path_is_yaml(path):
    return path.lower().endswith(".yaml") or path.lower().endswith(".yml")


def path_is_csv(path):
    return path.lower().endswith(".csv")


def main():
    parser = argparse.ArgumentParser(description=__doc__)

    parser.add_argument(
        "-i",
        "--input",
        type=str,
        help="Input file path with YAML/YML or CSV extension.",
    )
    parser.add_argument(
        "-e",
        "--example-input-data",
        action="store_true",
        help="Use example input data instead of file.",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=str,
        help="Output file path (optional) with YAML/YML or CSV extension.",
    )
    parser.add_argument(
        "-c",
        "--check",
        action="store_true",
        help="Check flag (optional, only if output is not specified)",
    )

    args = parser.parse_args()

    if args.output is None and not args.check:
        parser.error("One of --output or --check must be given.")

    if args.example_input_data and args.input:
        parser.error("--example-input-data and --input cannot be used together.")

    if not args.example_input_data and not args.input:
        parser.error("One of --example-input-data or --input must be given.")

    if args.example_input_data:
        resources = Resources(RESOURCE_EXAMPLES)

    if args.input:
        if path_is_yaml(args.input):
            resources = Resources.from_yaml(args.input)
        elif path_is_csv(args.input):
            resources = Resources.from_csv(args.input)
        else:
            print("Input file extension not supported.")
            exit(1)

    if args.check:
        try:
            resources.check()
            print("Validation successful. Resources match the schema.")
        except jsonschema.exceptions.ValidationError as e:
            print("Validation error:")
            print(e)
            exit(1)

    if args.output:
        if path_is_yaml(args.output):
            resources.to_yaml(args.output)
        elif path_is_csv(args.output):
            resources.to_csv(args.output)
        else:
            print("Output file extension not supported.")
            exit(1)


if __name__ == "__main__":
    main()
