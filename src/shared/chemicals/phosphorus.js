// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAqueousIntermediate } from "../materials/helpers";

export const addPhosphorusMaterials = (event) => {
    createAqueousIntermediate(event, "phosphorus_trichloride", 0xe0b4b5, true).components(
        "1x gtceu:phosphorus",
        "3x gtceu:chlorine"
    );

    createAqueousIntermediate(event, "phosphoryl_chloride", 0xa18a8b).components(
        "1x gtceu:phosphorus",
        "1x gtceu:oxygen",
        "3x gtceu:chlorine"
    );
};

/**
 * Adds recipes relating to phosphorus processing.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addPhosphorusRecipes = (event) => {
    // how to get glow berries? a conundrum indeed.
    event.recipes.gtceu
        .extractor("nijika:chemicals/phosphorus/from_glow_berries")
        .itemInputs("4x minecraft:glow_berries")
        .itemOutputs("1x gtceu:phosphorus_pentoxide_dust")
        .outputFluids(Fluid.of("minecraft:water").withAmount(500 * FluidAmounts.MB))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(5 * 20);

    // 4 P + 6 Cl2 = 4 PCl3
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/phosphorus/trichloride")
        .itemInputs("4x gtceu:phosphorus_dust")
        .inputFluids(Fluid.of("gtceu:chlorine").withAmount(12 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:phosphorus_trichloride").withAmount(4 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(10 * 20);

    // used for tungsten processing
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/phosphorus/phosphoryl_oxidation")
        .inputFluids(
            Fluid.of("gtceu:phosphorus_trichloride").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:oxygen").withAmount(2 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:phosphoryl_chloride").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(5 * 20 + 10);
};
