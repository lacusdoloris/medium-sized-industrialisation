// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAcidicIntermediate } from "../materials/helpers";

/**
 * Adds the materials for wastewaters from ore processing.
 */
export const addWastewaterMaterials = (event) => {
    createAcidicIntermediate(event, "sulfuric_wastewater", 0xd1d1bc);
    createAcidicIntermediate(event, "fluoric_wastewater", 0x122e36);
};

/**
 * Adds recipes for wastewater processing.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addWastewaterRecipes = (event) => {
    // bubble hydrogen through sulfuric wastewater to get H2S
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/water_treatment/sulfuric_wastewater_treatment")
        .inputFluids(
            Fluid.of("gtceu:hydrogen").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sulfuric_wastewater").withAmount(10 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:hydrogen_sulfide").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(7 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VHA[GTValues.MV])
        .duration(3 * 20 + 10);

    // calcium carbonate + HF = fluorite + co2
    // CaCO3 + 2 HF = CaF2 + H2O + CO2
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/water_treatment/fluoric_wastewater_treatment")
        .inputFluids(Fluid.of("gtceu:fluoric_wastewater").withAmount(10 * FluidAmounts.BUCKET))
        .itemInputs("1x #forge:dusts/calcite")
        .itemOutputs("1x gtceu:fluorite_dust")
        .outputFluids(
            Fluid.of("gtceu:carbon_dioxide").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(7 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VHA[GTValues.MV])
        .duration(3 * 20 + 10);
};
