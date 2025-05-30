// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createDustIntermediate } from "../../materials/helpers";

export const addMagnesiumMaterials = (event) => {
    createDustIntermediate(event, "magnesium_hydroxide", 0xdea6de).components(
        "1x gtceu:magnesium",
        "2x gtceu:oxygen",
        "2x gtceu:hydrogen"
    );

    event
        .create(new ResourceLocation("nijika:calcium_silicate"))
        .color(0xafcfaf)
        .dust()
        .components("2x gtceu:calcium", "1x gtceu:silicon", "4x gtceu:oxygen");
};

/**
 * Adds recipes for proceessing magnesium.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addMagnesiumProcessingRecipes = (event) => {
    // Magnesia reduction, Pigeon process.
    // 2 MgO + 2 CaO + Si = 2 Mg + Ca2SiO4

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/magnesium/pigeon_process")
        .itemInputs("2x gtceu:magnesia_dust", "2x gtceu:quicklime_dust", "1x gtceu:silicon_dust")
        .itemOutputs("2x gtceu:magnesium_dust", "1x gtceu:calcium_silicate_dust")
        .EUt(GTValues.VH[GTValues.HV])
        .duration(7 * 20 + 10)
        .blastFurnaceTemp(1700)
        .circuit(1);

    // Mg(OH)2 + 2 HCl = MgCl2 + 2 H2O
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/magnesium/hydroxide_to_chloride")
        .itemInputs("1x gtceu:magnesium_hydroxide_dust")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:magnesium_chloride_dust")
        .outputFluids(Fluid.of("minecraft:water").withAmount(2 * FluidAmounts.BUCKET))
        .duration(20)
        .EUt(GTValues.VH[GTValues.HV]);
};
