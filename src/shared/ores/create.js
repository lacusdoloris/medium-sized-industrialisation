// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { addRockBreakingRecipe } from "../utils";

/**
 * Adjusts the ore rock recipes from Create.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustCreateDirectOreCrushingRecipes = (event) => {
    event.remove({ output: "#create:crushed_raw_materials" });
    event.remove({ input: "#create:crushed_raw_materials" });

    event.recipes.create
        .milling(
            [
                Item.of("gtceu:crushed_redstone_ore").withChance(0.6),
                Item.of("minecraft:redstone").withChance(0.6),
            ],
            "create:crimsite"
        )
        .id("nijika:mods/create/crimsite_crushing");

    event.recipes.create
        .milling(
            [
                Item.of("gtceu:crushed_hematite_ore").withChance(0.6),
                Item.of("minecraft:iron_nugget").withChance(0.6),
            ],
            "create:ochrum"
        )
        .id("nijika:mods/create/ochrum_crushing");

    event.recipes.create
        .milling(
            [
                Item.of("gtceu:crushed_tetrahedrite_ore").withChance(0.6),
                Item.of("gtceu:copper_nugget").withChance(0.6),
            ],
            "create:veridium"
        )
        .id("nijika:mods/create/veridium_crushing");

    event.recipes.create
        .milling(
            [
                Item.of("gtceu:crushed_cassiterite_ore").withChance(0.6),
                Item.of("gtceu:tin_nugget").withChance(0.6),
            ],
            "create:asurine"
        )
        .id("nijika:mods/create/asurine_crushing");

    event.recipes.create
        .milling(
            [
                Item.of("gtceu:crushed_bauxite_ore").withChance(0.6),
                Item.of("gtceu:silver_nugget").withChance(0.6),
            ],
            "create:scoria"
        )
        .id("nijika:mods/create/scoria_crushing");

    event.recipes.create
        .milling(
            [
                Item.of("gtceu:crushed_galena_ore").withChance(0.6),
                Item.of("gtceu:lead_nugget").withChance(0.6),
            ],
            "create:scorchia"
        )
        .id("nijika:mods/create/schorchia_crushing");

    event.recipes.create
        .crushing(
            [
                Item.of("gtceu:crushed_nether_quartz_ore").withChance(0.25),
                Item.of("minecraft:quartz").withChance(0.25),
            ],
            "minecraft:diorite"
        )
        .id("create:crushing/diorite");

    event.recipes.create
        .crushing(
            [
                Item.of("minecraft:flint").withChance(0.25),
                Item.of("minecraft:iron_nugget").withChance(0.1),
                Item.of("gtceu:copper_nugget").withChance(0.1),
                Item.of("gtceu:tin_nugget").withChance(0.1),
                Item.of("gtceu:lead_nugget").withChance(0.1),
                Item.of("gtceu:silver_nugget").withChance(0.1),
            ],
            "minecraft:tuff"
        )
        .id("create:crushing/tuff");

    // HV tier rock breaking recipes
    addRockBreakingRecipe(event, "create:crimsite", GTValues.VA[GTValues.MV]);
    addRockBreakingRecipe(event, "create:ochrum", GTValues.VA[GTValues.MV]);
    addRockBreakingRecipe(event, "create:veridium", GTValues.VA[GTValues.MV]);
    addRockBreakingRecipe(event, "create:asurine", GTValues.VA[GTValues.MV]);
    addRockBreakingRecipe(event, "create:scoria", GTValues.VA[GTValues.MV]);
    addRockBreakingRecipe(event, "create:scorchia", GTValues.VA[GTValues.MV]);
};
