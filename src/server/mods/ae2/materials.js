// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Adjusts the recipes for AE2 materials.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustAe2MaterialsRecipes = (event) => {
    event.recipes.gtceu
        .chemical_bath("nijika:mods/ae2/certus_quartz_dust")
        .itemInputs("2x #forge:dusts/quartzite")
        .inputFluids(Fluid.of("integrateddynamics:menril_resin").withAmount(2 * FluidAmounts.INGOT))
        .itemOutputs("2x gtceu:certus_quartz_dust")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(5 * 20);

    // add recipes for fluix
    event.recipes.gtceu
        .mixer("nijika:mods/ae2/fluix_quartz")
        .itemInputs(
            "1x #forge:dusts/redstone",
            "1x #forge:gems/certus_quartz",
            "1x #forge:gems/quartz"
        )
        .itemOutputs("2x ae2:fluix_crystal")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(2 * 20 + 10);

    event.recipes.gtceu
        .macerator("nijika:mods/ae2/fluix_dust")
        .itemInputs("1x #forge:gems/fluix")
        .itemOutputs("1x ae2:fluix_dust")
        .EUt(2)
        .duration(20);

    event.recipes.gtceu
        .autoclave("nijika:mods/ae2/fluix_autoclave_fast")
        .itemInputs("1x #forge:dusts/fluix")
        .inputFluids(Fluid.of("gtceu:distilled_water").withAmount(50 * FluidAmounts.MB))
        .EUt(24)
        .duration(30 * 20);

    event.recipes.gtceu
        .autoclave("nijika:mods/ae2/fluix_autoclave_slow")
        .itemInputs("1x #forge:dusts/fluix")
        .inputFluids(Fluid.of("minecraft:water").withAmount(250 * FluidAmounts.MB))
        .EUt(24)
        .duration(60 * 20);

    // fused quartz glass is made of pure silicon...
    event.remove({ id: "ae2:decorative/quartz_glass" });
    event.recipes.gtceu
        .electric_blast_furnace("nijika:mods/ae2/fused_quartz_glass")
        .itemInputs("4x gtceu:quartzite_dust")
        .itemOutputs("1x ae2:quartz_glass")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(10 * 20)
        .blastFurnaceTemp(1100);

    event.remove({ id: "ae2:decorative/quartz_vibrant_glass" });
    event.recipes.gtceu
        .chemical_bath("nijika:mods/ae2/vibrant_quartz_glass")
        .itemInputs("1x ae2:quartz_glass")
        .inputFluids(Fluid.of("gtceu:glowstone").withAmount(250 * FluidAmounts.MB))
        .EUt(GTValues.VA[GTValues.MV])
        .duration(5 * 20);

    // sky stone, obsidian + steam
    event.recipes.gtceu
        .chemical_bath("nijika:mods/ae2/sky_stone")
        .itemInputs("1x #forge:obsidian")
        .inputFluids(Fluid.of("gtceu:steam").withAmount(4 * FluidAmounts.BUCKET))
        .itemOutputs("1x ae2:sky_stone_block")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(2 * 20 + 10);

    event.recipes.gtceu
        .macerator("nijika:mods/ae2/sky_stone_maceration")
        .itemInputs("1x ae2:sky_stone_block")
        .itemOutputs("1x ae2:sky_dust")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(10 * 20);
};
