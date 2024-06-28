// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Adjusts recipes for Create: Diesel Generators.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustDieselGeneratorRecipes = (event) => {
    event.remove({ id: "createdieselgenerators:distillation/crude_oil" });
    event.remove({ id: "createaddition:liquid_burning/crude_oil" });
    event
        .custom({
            type: "createdieselgenerators:distillation",
            ingredients: [{ fluid: "gtceu:oil_heavy", amount: 100 }],
            heatRequirement: "heated",
            processingTime: 40, // ?, I assume this is ticks? twice as slow as the distillation tower
            results: [
                { fluid: "gtceu:heavy_fuel", amount: 125 },
                { fluid: "gtceu:light_fuel", amount: 20 },
            ],
        })
        .id("nijika:mods/dieselgenerators/early_game_distillation");
};
