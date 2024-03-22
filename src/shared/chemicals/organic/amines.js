// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAqueousIntermediate } from "../../materials/helpers";

export const addAmineMaterials = (event) => {
    createAqueousIntermediate(event, "trimethylamine", 0xc1c0f0);
    createAqueousIntermediate(event, "trioctylamine", 0xc9cee8);
};

/**
 * Adds recipes for amine compounds.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addAmineRecipes = (event) => {
    // Trimethylamine is made from ammonia and methanol.
    // Not to be confused with Dimethylamine.
    // Tri: 3 CH3OH + NH3 = (CH3)3N + 3 H2O
    // Di: 2 CH3OH + NH3 = (CH3)2NH + 2 H2O

    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/amines/trimethylamine")
        .inputFluids(
            Fluid.of("gtceu:methanol").withAmount(3 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:ammonia").withAmount(1 * FluidAmounts.BUCKET)
        )
        .itemInputs("1x gtceu:tiny_aluminium_dust", "1x gtceu:tiny_silicon_dust")
        .outputFluids(
            Fluid.of("gtceu:trimethylamine").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(3 * FluidAmounts.BUCKET)
        )
        .circuit(3) // because... well, there's three of them.
        .EUt(GTValues.VA[GTValues.MV])
        .duration(12 * 20);

    // Trioctlyamine production using nickel catalyst.
    // 3 C8H17OH + NH3 = (C8H17)3N + 3 H2O
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/amines/trioctylamine")
        .inputFluids(
            Fluid.of("gtceu:octanol").withAmount(3 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:ammonia").withAmount(1 * FluidAmounts.BUCKET)
        )
        .itemInputs("1x nijika:nickel_catalyst")
        .outputFluids(
            Fluid.of("gtceu:trioctylamine").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(3 * FluidAmounts.BUCKET)
        )
        .circuit(3) // TRI
        .EUt(GTValues.VA[GTValues.MV])
        .duration(12 * 20);
};
