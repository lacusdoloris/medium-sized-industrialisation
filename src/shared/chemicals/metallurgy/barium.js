// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createDustIntermediate } from "../../materials/helpers";

export const addBariumMaterials = (event) => {
    createDustIntermediate(event, "barium_oxide", 0x5f857f).components(
        "1x gtceu:barium",
        "1x gtceu:oxygen"
    );
    createDustIntermediate(event, "barium_hydroxide", 0x5d706d).components(
        "1x gtceu:barium",
        "2x gtceu:oxygen",
        "2x gtceu:hydrogen"
    );
};

/**
 * Adds recipes for the synthesis of raw metallic Barium.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addBariumRecipes = (event) => {
    // this is a nice diversion from evil organic chemistry.
    // 4 C + BaSO4 = 4 CO + BaS
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/barium/barite_reduction")
        .itemInputs("4x #nijika:carbon_rich_dusts", "1x gtceu:barite_dust")
        .itemOutputs("1x gtceu:barium_sulfide_dust")
        .outputFluids(Fluid.of("gtceu:carbon_monoxide").withAmount(4 * FluidAmounts.BUCKET))
        .EUt(GTValues.VHA[GTValues.MV])
        .duration(5 * 20)
        .blastFurnaceTemp(1100);

    // 2 BaS + 3 O2 = 2 BaO + 2 SO2
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/barium/barium_oxide_from_sulfide")
        .itemInputs("2x gtceu:barium_sulfide_dust")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(6 * FluidAmounts.BUCKET))
        .itemOutputs("2x gtceu:barium_oxide_dust")
        .outputFluids(Fluid.of("gtceu:sulfur_dioxide").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(8 * 20);

    // Aluminothermic reduction to get the raw barium metal...
    // TODO: This is like four stages, I don't want to type it out.

    // ... or mix it with water to get Barium Hydroxide.
    // BaO + H2O = Ba(OH)2
    event.recipes.gtceu
        .mixer("nijika:chemicals/barium/barium_hydroxide")
        .itemInputs("1x gtceu:barium_oxide_dust")
        .inputFluids(Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:barium_hydroxide_dust")
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(3 * 20 + 10);
};
