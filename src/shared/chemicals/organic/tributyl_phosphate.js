// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAqueousIntermediate } from "../../materials/helpers";

export const addTributylPhosphateMaterials = (event) => {
    createAqueousIntermediate(event, "one_butanol", 0xebd5ea);
    createAqueousIntermediate(event, "tributyl_phosphate", 0xb5a4a3);
};

/**
 * Adds recipes for the tributyl phosphate chain.
 */
export const addTributylPhosphateRecipes = (event) => {
    // 1-Butanol is made from the catalytic hydroformylation of propene.
    // C3H6 + CO + 2 H2 = C4H9OH
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/tungsten/1_butanol")
        .inputFluids(
            Fluid.of("gtceu:propene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:carbon_monoxide").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(4 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:one_butanol").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(15 * 20)
        .circuit(1);

    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/tungsten/1_butanol_fast")
        .itemInputs("1x nijika:wilkinson_catalyst")
        .inputFluids(
            Fluid.of("gtceu:propene").withAmount(50 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:carbon_monoxide").withAmount(50 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(200 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:one_butanol").withAmount(50 * FluidAmounts.BUCKET))
        .EUt(GTValues.V[GTValues.EV])
        .duration(360 * 20)
        .circuit(2);

    // 1-Butanol can be reacted with phosphoryl chloride to get tributyl phosphate.
    // POCl3 + 3 C4H9OH = PO(OC4H9)3 + 3 HCl
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/tungsten/tributyl_phosphate")
        .inputFluids(
            Fluid.of("gtceu:phosphoryl_chloride").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:one_butanol").withAmount(3 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:tributyl_phosphate").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:diluted_hydrochloric_acid").withAmount(6 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(10 * 20);
};
