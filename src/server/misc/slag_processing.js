// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAqueousIntermediate } from "../../shared/materials/helpers";


export const addSlagProcessingMaterials = (event) => {
    createAqueousIntermediate(event, "slag_slurry", 0x575445);
    createAqueousIntermediate(event, "mineral_sludge", 0xb1aa86);
}

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

    // dissolve slag with sulfuric acid to get slag slurry
    event.recipes.gtceu
        .chemical_bath("nijika:misc/slag_processing/slag_slurry")
        .itemInputs("4x nijika:slag")
        .inputFluids(
            Fluid.of("gtceu:sulfuric_acid").withAmount(2 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:slag_slurry").withAmount(2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(5 * 20);

    // pass slag slurry thru carbon to get mineral sludge
    event.recipes.gtceu
        .ore_washer("nijika:misc/slag_processing/mineral_sludge")
        .itemInputs("2x #nijika:carbon_rich_dusts")
        .inputFluids(Fluid.of("gtceu:slag_slurry").withAmount(1 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:mineral_sludge").withAmount(750 * FluidAmounts.MB))
        .chancedOutput("gtceu:tiny_magnetite_dust", 1100.0, 750.0)
        .chancedOutput("gtceu:tiny_alumina_dust", 1500.0, 750.0)
        .EUt(GTValues.VH[GTValues.HV])
        .duration(10 * 20);

    // finally, autoclave it into mineral catalysts.
    event.recipes.gtceu
        .autoclave("nijika:misc/slag_processing/mineral_catalyst")
        .inputFluids(Fluid.of("gtceu:mineral_sludge"))
        .itemOutputs("1x nijika:catalysator_brown")
        .EUt(GTValues.V[GTValues.HV])
        .duration(13 * 20 + 15);
};
