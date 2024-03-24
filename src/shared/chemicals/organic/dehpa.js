// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAqueousIntermediate } from "../../materials/helpers";

export const addDehpaMaterials = (event) => {
    createAqueousIntermediate(event, "two_ethylhexanol", 0xa78bad).components(
        "8x gtceu:carbon",
        "18x gtceu:hydrogen",
        "1x gtceu:oxygen"
    );

    createAqueousIntermediate(event, "dehpa", 0xe8b0d3);
};

/**
 * Adds recipes for DEHPA.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addDehpaRecipes = (event) => {
    // Aldol condensation and hydrogenation of butyraldehyde to get 2-Ethylhexanol.
    // 2 CH3(CH2)2CHO + 2 H2 = C8H18O + H2O
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/dehpa/butyraldehyde_to_ethylhexanol")
        .itemInputs("4x nijika:wilkinson_catalyst")
        .inputFluids(
            Fluid.of("gtceu:butyraldehyde").withAmount(50 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(100 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:two_ethylhexanol").withAmount(25 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(25 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.V[GTValues.EV])
        .duration(70 * 20)
        .circuit(2 /*-ethylhexanol*/);

    // Synthesis of Di(2-ethylhexyl)phosphoric acid.
    // 8 C8H18O + P4O10 = 4 C16H35O4P + 2 H2O
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/dehpa/dehpa")
        .itemInputs("1x gtceu:phosphorus_pentoxide_dust")
        .inputFluids(Fluid.of("gtceu:two_ethylhexanol").withAmount(8 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:dehpa").withAmount(4 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water")
        )
        .EUt(GTValues.VA[GTValues.EV])
        .duration(14 * 20 + 4);
};
