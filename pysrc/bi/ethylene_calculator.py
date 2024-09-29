# Copyright (c) 2024 Lura Skye
# 
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

import json
from pathlib import Path
import sys

type EthyleneOutput = tuple[str, float]

# hardcoded ratios, assuming maximum cracking
RATIOS = {
    "butene": 1.5,
    # Can be electrolysed into butene in a 1:1 reaction.
    "butane": 1.5,
    # hydro-cracked butadiene also produces butene, so 750mb of that times 1500mb of ethylene is 
    # added on
    "butadiene": 0.5 + (0.75 * 1.5),
    # Can be electrolysed into propene in a 1:1 reaction.
    "propane": 1.0,  
    "propene": 1.0,
    "ethane": 0.25,
}
ETHYLENE_FROM_BUTENE = 1.5

ETHYLENE_FROM_BUTADIENE = 0.5 + (0.75 * 1.5)
ETHYLENE_FROM_PROPANE = 0.75
ETHYLENE_FROM_PROPENE = 1.0

def calculate_ethylene_amounts(from_path: Path):
    """
    Calculates the total ethylene produced from the recipe dumped at ``path``.
    """

    with from_path.open(mode="r", encoding="utf-8") as f:
        data = json.load(f)

    assert data["type"] == "gtceu:distillation_tower", "expected a distillation recipe!"

    outputs: list[EthyleneOutput] = []

    for product in data["outputs"]["fluid"]:
        content = product["content"]
        amount: int = content["amount"]  # in millibuckets
        fluid: str = content["value"][0]["fluid"].split(":", 1)[1]

        if fluid == "ethylene":
            outputs.append(("direct", amount))
        
        elif (ratio := RATIOS.get(fluid)):
            outputs.append((fluid, amount * ratio))

    total = 0.0
    for name, count in outputs:
        print("Output from source", name, "is", count, "mB")
        total += count
    
    print("Total amount is", total, "mB of ethylene")


def main():
    try:
        path = Path(sys.argv[1])
    except IndexError:
        print("Usage: ethylene-calculator <path to dumped recipe file>")
        return 1

    calculate_ethylene_amounts(path)
