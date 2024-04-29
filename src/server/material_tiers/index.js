// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { rewriteLowerTierComponentRecipes } from "./lower_tier_components";
import { addCreateRecipes } from "./create";
import { adjustExtruderBasePlateRecipe, fixExtruderRecipeTier } from "./extruder";
import { MODPACK_SETTINGS } from "../../settings";
import { adjustMachineRecipesForTier } from "./machines";
import { GT_MACHINE_TIERS } from "../../shared/definition";
import { fixLensRecipes } from "./lenses";
import { adjustGtGeneratorTiers } from "./generators";
import { adjustMultiblockComponentsForTier } from "./multiblock";

/**
 * Adjusts recipes relating to the material system and BI's adjusted tiers.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustMaterialTierRecipes = (event) => {
    if (!MODPACK_SETTINGS.applyTierAdjustments) return;

    // remove the existing extruder recipes for the categories we'ree going to change...
    event.remove({
        type: "gtceu:extruder",
        input: /gtceu:(?:small_)?(?:gear|rotor|bolt)_(?:extruder|casting)_mold/,
    });

    event.remove({
        type: "gtceu:extruder",
        input: /gtceu:(?:tiny|small|normal|large|huge)_pipe_extruder_mold/,
    });

    // ... and also remove the completely useless ones that just clog up EMI.
    event.remove({
        type: "gtceu:extruder",
        input: /gtceu:(?:long_)?(?:rod|block|wire|plate|ingot|ring)_extruder_mold/,
    });

    // so true...
    event
        .smelting("3x gtceu:rubber_nugget", "#forge:dusts/rubber")
        .id("nijika:misc/rubber_dust_to_ingot_earlygame");

    addCreateRecipes(event);
    rewriteLowerTierComponentRecipes(event);
    fixExtruderRecipeTier(event);
    adjustExtruderBasePlateRecipe(event);
    fixLensRecipes(event);
    adjustGtGeneratorTiers(event);

    for (let tier of Object.values(GT_MACHINE_TIERS)) {
        adjustMachineRecipesForTier(event, tier);
        adjustMultiblockComponentsForTier(event, tier);
    }
};
