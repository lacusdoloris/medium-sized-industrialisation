// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAqueousIntermediate } from "../../materials/helpers";

export const addZieglerProcessMaterials = (event) => {
    createAqueousIntermediate(event, "octanol", 0xb09f82);
};

/**
 * Adds recipes for the Ziegler process.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addZieglerProcessRecipes = (event) => {
    // Al2(C2H5)6 + 18 C2H4 = 2 Al(C8H17)3
    // 2 Al(C8H17)3 + 3 O2 + 6 H2O = 6 HOC8H17 + 2 Al(OH)3
    // All of this is done in a single reaction, but there's only 4 molaroctanol output to pretend
    // that the rest of the alcohols are discarded.
    // TODO: Distillation tower recipes, maybe.

    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/alcohols/ziegler_octanol")
        .inputFluids(
            Fluid.of("gtceu:triethylaluminium").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:ethylene").withAmount(18 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:oxygen").withAmount(6 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(6 * FluidAmounts.BUCKET)
        )
        .itemOutputs("2x gtceu:aluminium_hydroxide_dust")
        .outputFluids(Fluid.of("gtceu:octanol").withAmount(4 * FluidAmounts.BUCKET))
        .circuit(8) // for oct
        .EUt(GTValues.VA[GTValues.EV])
        .duration(20 * 20);
};
