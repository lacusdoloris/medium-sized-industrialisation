// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAqueousIntermediate } from "../../materials/helpers";

export const addDieselMaterials = (event) => {
    createAqueousIntermediate(event, "two_ethylhexyl_nitrate", 0xe3f0b4);
};

/**
 * Adds recipes for cetane boosted diesel.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addDieselRecipes = (event) => {
    // C8H18O + HNO3 = C8H17NO3 + H2O
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/diesel/2_ethylhexyl_nitrate")
        .inputFluids(
            Fluid.of("gtceu:two_ethylhexanol").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:nitric_acid").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:two_ethylhexyl_nitrate").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(20 * 20)
        .circuit(2);

    // Mix it with diesel to get cetane boosted diesel.
    event.recipes.gtceu
        .mixer("nijika:chemicals/diesel/cetane_boosted_with_ethylhexyl")
        .inputFluids(
            Fluid.of("gtceu:diesel").withAmount(6 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:two_ethylhexyl_nitrate").withAmount(50 * FluidAmounts.MB)
        )
        .outputFluids(Fluid.of("gtceu:cetane_boosted_diesel").withAmount(6 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(1 * 20);

    event.recipes.gtceu
        .mixer("nijika:chemicals/diesel/bio_cetane_boosted_with_ethylhexyl")
        .inputFluids(
            Fluid.of("gtceu:bio_diesel").withAmount(6 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:two_ethylhexyl_nitrate").withAmount(50 * FluidAmounts.MB)
        )
        .outputFluids(Fluid.of("gtceu:cetane_boosted_diesel").withAmount(4500 * FluidAmounts.MB))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(1 * 20);
};
