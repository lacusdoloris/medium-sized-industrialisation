// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//
/*eslint sort-keys: ["error", "asc", {minKeys: 6}]*/

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
    ae2: adjustAe2Recipes,
    create_new_age: adjustCreateNewAgeRecipes,
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
    createaddition: adjustCCARecipes,
    createcobblestone: adjustCreateCobblestoneRecipes,
    createdieselgenerators: adjustDieselGeneratorRecipes,
    // NOT "essential"!
    essentials: adjustEssentialsRecipes,
    integrateddynamics: adjustIntegratedDynamicsRecipes,
    littlelogistics: adjustLittleLogisticsRecipes,
    modularrouters: adjustModularRouterRecipes,
    pack_it_up: adjustPackItUpRecipes,
    prettypipes: adjustPrettyPipesRecipes,
    rftoolsbase: adjustRfToolsRecipes,
    snad: (event) => {
        event.remove({ mod: "snad" });

        for (let what of ["", "red_", "soul_"]) {
            event.recipes.gtceu
                .compressor(`nijika:mods/snad/${what}snad`)
                .itemInputs(`64x ${what}sand`)
                .itemOutputs(`1x snad:${what}snad`)
                .EUt(GTValues.VA[GTValues.LV])
                .duration(11 * 20);
        }
    },
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
};

/**
 * Processes recipes for included mods.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const doModRecipes = (event) => {
    adjustCreateRecipes(event);

    // not optional due to worldgen.
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
