// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { adjustAe2Recipes } from "./ae2";
import { adjustCreateCobblestoneRecipes } from "./cobblestone";
import { adjustCreateRecipes } from "./create";
import { adjustCCARecipes } from "./createaddition";
import { adjustDieselGeneratorRecipes } from "./diesel";
import { adjustEssentialsRecipes } from "./essentials";
import { adjustIntegratedDynamicsRecipes } from "./integrated_dynamics";
import { adjustLittleLogisticsRecipes } from "./littlelogistics";
import { adjustCreateNewAgeRecipes } from "./new_age";
import { adjustCreateOreExcavationRecipes } from "./oreexcavation";
import { adjustPackItUpRecipes } from "./packitup";
import { adjustPrettyPipesRecipes } from "./prettypipes";
import { adjustRfToolsRecipes } from "./rftools";
import { adjustModularRouterRecipes } from "./routers";

/**
 * @callback recipeEventCallback
 * @param {Internal.RecipesEventJS} event
 */
/** @type {Object.<string, recipeEventCallback>} */
const MOD_TWEAKER_FUNCTIONS = {
    create_new_age: adjustCreateNewAgeRecipes,
    littlelogistics: adjustLittleLogisticsRecipes,
    modularrouters: adjustModularRouterRecipes,
    prettypipes: adjustPrettyPipesRecipes,
    pack_it_up: adjustPackItUpRecipes,
    toolbelt: (event) => {
        event
            .shaped("toolbelt:belt", ["SKS", "K K", "KFK"], {
                S: "minecraft:string",
                K: "minecraft:dried_kelp",
                F: "#forge:foils/tin",
            })
            .id("toolbelt:belt");

        event
            .shaped("toolbelt:pouch", ["SGS", "K K", "SKS"], {
                S: "minecraft:string",
                K: "minecraft:dried_kelp",
                G: "#forge:nuggets/corinthian_bronze",
            })
            .id("toolbelt:pouch");
    },
    // NOT "essential"!
    essentials: adjustEssentialsRecipes,
    create_power_loader: (event) => {
        event.remove({ mod: "create_power_loader" });
        event
            .shaped("create_power_loader:brass_chunk_loader", ["GGG", "GTG", "BBB"], {
                G: "#forge:glass",
                T: "minecraft:ghast_tear",
                B: "create:brass_casing",
            })
            .id("nijika:misc/chunkloader");
    },
    ae2: adjustAe2Recipes,
    createdieselgenerators: adjustDieselGeneratorRecipes,
    createcobblestone: adjustCreateCobblestoneRecipes,
    createaddition: adjustCCARecipes,
};

/**
 * Processes recipes for included mods.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const doModRecipes = (event) => {
    adjustCreateRecipes(event);
    adjustRfToolsRecipes(event);

    // not optional due to worldgen.
    adjustIntegratedDynamicsRecipes(event);
    adjustCreateOreExcavationRecipes(event);

    for (let [name, fn] of Object.entries(MOD_TWEAKER_FUNCTIONS)) {
        if (Platform.isLoaded(name)) {
            fn(event);
        }
    }

    event
        .shaped("reinfchest:gold_chest", ["III", "ICI", "III"], {
            I: "#forge:ingots/corinthian_bronze",
            C: "reinfchest:iron_chest",
        })
        .id("reinfchest:gold_chest");

    // why doesn't this work!
    event.replaceInput(
        { type: "morered:soldering" },
        "morered:red_alloy_ingot",
        "gtceu:red_alloy_ingot"
    );
};
