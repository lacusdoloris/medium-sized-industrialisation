// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Adjusts the recipes for AE2 cables.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustAe2CableRecipes = (event) => {
    event.remove({ id: "ae2:network/parts/quartz_fiber_part" });
    event.recipes.gtceu
        .extruder("nijika:mods/ae2/quartz_fibre")
        .itemInputs("1x #forge:gems/certus_quartz")
        .notConsumable("1x gtceu:normal_pipe_extruder_mold")
        .itemOutputs("4x ae2:quartz_fiber")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(5 * 20);

    // additional recipe, alongside the shaped crafting recipe
    event.recipes.gtceu
        .assembler("nijika:mods/ae2/fluix_glass_cable")
        .itemInputs("ae2:quartz_fiber", "2x #forge:gems/fluix")
        .itemOutputs("4x ae2:fluix_glass_cable")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(2 * 20);

    // these ones do actually *replace* the original wool-based recipes.
    event.remove({ id: "ae2:network/cables/covered_fluix" });
    event.recipes.gtceu
        .assembler("nijika:mods/ae2/covered_fluix")
        .itemInputs("1x ae2:fluix_glass_cable")
        .inputFluids(Fluid.of("gtceu:polyethylene").withAmount(288 * FluidAmounts.MB))
        .itemOutputs("1x ae2:fluix_covered_cable")
        .duration(3 * 20)
        .EUt(GTValues.VA[GTValues.LV]);

    event.recipes.gtceu
        .assembler("nijika:mods/ae2/covered_fluix_pvb")
        .itemInputs("2x ae2:fluix_glass_cable")
        .inputFluids(Fluid.of("gtceu:polyvinyl_butyral").withAmount(288 * FluidAmounts.MB))
        .itemOutputs("2x ae2:fluix_covered_cable")
        .duration(2 * 20)
        .EUt(GTValues.VA[GTValues.LV]);
};
