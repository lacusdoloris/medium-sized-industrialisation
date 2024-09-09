// Copyright (c) 2024 Lura Skye
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { getMaterial, nijikaId } from "../../utils";

export const addArsenopyriteMaterials = (event) => {
    event
        .create(nijikaId("arsenopyrite"))
        .dust()
        .ore()
        .color(0xb0a269)
        .iconSet(getMaterial("pyrite").getMaterialIconSet())
        .components("1x gtceu:iron", "1x gtceu:arsenic", "1x gtceu:sulfur")
        .addOreByproducts("gtceu:arsenic_trioxide", "gtceu:sulfur")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
}

/**
 * Adds recipes for arsenopyrite processing.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const addArsenopyriteRecipes = (event) => {
    // Arsenopyrite dust roasting
    // 2 FeAsS + 5 O2 = Fe2O3 + As2O3 + 2 SO2
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/arsenopyrite/arsenopyrite_roasting")
        .itemInputs("2x gtceu:arsenopyrite_dust")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(10 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:hematite_dust", "1x gtceu:arsenic_trioxide_dust")
        .outputFluids(Fluid.of("gtceu:sulfur_dioxide").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .blastFurnaceTemp(1100)
        .duration(3 * 20);

    // TODO: Some sort of reduction recipe for the crusheed ore that produces slag
}
