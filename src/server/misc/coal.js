// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/** @param {Internal.RecipesEventJS} event */
export const unfuckCoalRecipes = (event) => {
    // fuck!!!
    // somebody put charcoal in the coal tag and I can't remove it!
    // plus, thanks kubejs, I can't actually do a "replace this tag with this other tag"!
    // so, this is just everything I've noticed that needs to be unfucked

    event.recipes.gtceu
        .compressor("gtceu:compress_coal_gem_to_block")
        .itemInputs("9x #nijika:actually_fucking_coal")
        .itemOutputs("1x minecraft:coal_block")
        .duration(15 * 20)
        .EUt(2);

    event.recipes.gtceu
        .coke_oven("gtceu:coal_to_coke")
        .itemInputs("1x #nijika:actually_fucking_coal")
        .itemOutputs("1x gtceu:coke_gem")
        .outputFluids(Fluid.of("gtceu:creosote").withAmount(500 * FluidAmounts.MB))
        .duration(45 * 20);

    // this one actually shouldn't exist anyway?
    event.remove({ id: "gtceu:pyrolyse_oven/charcoal_to_coal_tar" });
    // not typing out all 3
    event.replaceInput(
        { type: "gtceu:pyrolyse_oven", output: "gtceu:coke_gem" },
        "#forge:gems/coal",
        "#nijika:actually_fucking_coal"
    );

    event.recipes.gtceu
        .macerator("gtceu:macerate_coal")
        .itemInputs("1x #nijika:actually_fucking_coal")
        .itemOutputs("1x gtceu:coal_dust")
        .EUt(2)
        .duration(12);

    event.recipes.create
        .milling("1x gtceu:coal_dust", "#nijika:actually_fucking_coal")
        .id("nijika:auto/dust/coal");
};
