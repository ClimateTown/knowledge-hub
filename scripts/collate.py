"""
This collation script is a once off file used for the initial collation of the resources spreadsheet into a YAML file.
This script is placed here for future reference in case another collation is needed.
"""

import pandas as pd
import numpy as np
from dataclasses import dataclass, asdict, field
import yaml

# Obtaining the data
SHEET_ID = "1ef1Uif3dPesumpd-coUTJp2bo0s-hmU4orU97NhX7Rw"
SHEET_NAME = "resources"

url = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={SHEET_NAME}"
df = pd.read_csv(url)


@dataclass
class Resource:
    title: str
    url: str
    description: str = field(repr=False)
    tags: list[str] = field(repr=False)


def convert_to_resource(row):
    """
    Convert a row in the resources spreadsheet to a Resource object.
    """
    tags = list(row.iloc[-6:])
    tags = [tag for tag in tags if tag != "nan"]  # Removing empty tags

    return Resource(
        title=row["Title"],
        url=row["URL"],
        description=row["Description"],
        tags=tags,
    )


resources = (
    df.astype(str)  # Convert all columns to string
    .iloc[:, :10][  # Only take the first 10 columns
        df["Include?"] == "Yes"
    ]  # Only taking accepted resources
    .apply(convert_to_resource, axis=1)  # Convert to Resource objects
    .pipe(list)  # Convert to list object
)

# Writing out the resources file from the spreadsheet
with open("resources_gen.yml", "w", encoding="utf-8") as f:
    yaml.dump(
        [asdict(resource) for resource in resources],
        f,
        encoding="utf-8",
        allow_unicode=True,
    )
