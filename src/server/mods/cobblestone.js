// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/** @param {Internal.RecipesEventJS} event */
export const adjustCreateCobblestoneRecipes = (event) => {
    event.remove({ input: "createcobblestone:cobblestone_generator" });

    event
        .shaped("createcobblestone:cobblestone_generator", ["CRC", "1D2", "AAA"], {
            C: "#nijika:copper_alloy_plates",
            R: "create:electron_tube",
            1: "minecraft:water_bucket",
            2: "minecraft:lava_bucket",
            A: "create:brass_casing",
            D: "create:mechanical_drill",
        })
        .id("createcobblestone:crafting/cobblestone_generator");
};
