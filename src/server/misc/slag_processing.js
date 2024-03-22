// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// https://www.researchgate.net/figure/Typical-chemical-compositions-of-slag-produced-by-titanomagnetite-smelters-mass_tbl2_350654424

/**
 * Adds slag processing recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addSlagProcessingRecipes = (event) => {
    // have to do this here instead of when tweaking materials to prevent the removal of magnetite
    // to iron ingots.
    event.remove({ id: "gtceu:smelting/dust_magnetite__dust_to_ingot" });

    event.recipes.gtceu
        .electric_blast_furnace("nijika:misc/slag_processing/magnetite_smelting")
        .itemInputs("32x #forge:raw_materials/magnetite", "8x #nijika:carbon_rich_dusts")
        .itemOutputs("24x gtceu:iron_dust", "8x nijika:slag")
        .EUt(GTValues.VA[GTValues.MV])
        .blastFurnaceTemp(1700)
        .duration(30 * 20)
        .circuit(8);

    event.recipes.gtceu
        .electric_blast_furnace("nijika:misc/slag_processing/hematite_smelting")
        .itemInputs("32x #forge:raw_materials/hematite")
        .itemOutputs("24x gtceu:iron_oxide_dust", "8x nijika:slag")
        .EUt(GTValues.VA[GTValues.MV])
        .blastFurnaceTemp(1700)
        .duration(30 * 20)
        .circuit(8);

    event.recipes.gtceu
        .electric_blast_furnace("nijika:misc/slag_processing/hematite_smelting_reduction")
        .itemInputs("32x #forge:raw_materials/hematite", "8x #nijika:carbon_rich_dusts")
        .itemOutputs("24x gtceu:iron_dust", "8x nijika:slag")
        .EUt(GTValues.VA[GTValues.MV])
        .blastFurnaceTemp(1700)
        .duration(30 * 20)
        .circuit(18);
};
