// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAcidicIntermediate, createDustIntermediate } from "../../materials/helpers";

// Problem: Slag composition depends on the source ores. We don't really simulate that and
// everything gets lumped into a bulk "ferrous slag" resource.
// For the sake of a) my non-chemistry educated mind and b) player convenience, we're going to treat
// all iron slags as being rich in a mixture of discarded iron, vanadium, magnesium, and silicon.

export const addIronSlagMaterials = (event) => {
    createDustIntermediate(event, "vanadium_magnesium_slag_mixture", 0xcfbac0);
    createAcidicIntermediate(event, "vanadium_magnesium_leach_mixture", 0x4f4749);
};

/**
 * Adds recipes for the reprocessing of iron slags.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addIronSlagReprocessingRecipes = (event) => {
    // fuck off!
    event.remove({ id: "gtceu:laser_engraver/engrave_iron_slag_flawless_gem_to_gem" });

    // 1) Grind the glassy slag (recipe generated automatically)
    // 2) Electromagnetic separation of iron dust from the slag dust.
    event.recipes.gtceu
        .electromagnetic_separator("nijika:chemicals/iron_slag/slag_iron_separation")
        .itemInputs("10x gtceu:iron_slag_dust")
        .itemOutputsRanged("gtceu:iron_dust", 3, 5)
        .itemOutputsRanged("gtceu:vanadium_magnesium_slag_mixture_dust", 2, 5)
        .EUt(GTValues.VA[GTValues.LV])
        .duration(5 * 20);

    // 3) Leach using hydrochloric acid to get rid of the insoluable silicon dioxide.
    event.recipes.gtceu
        .chemical_bath("nijika:chemicals/iron_slag/hydrochloric_leaching")
        .itemInputs("3x gtceu:vanadium_magnesium_slag_mixture_dust")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(6 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:silicon_dioxide_dust")
        .outputFluids(
            Fluid.of("gtceu:vanadium_magnesium_leach_mixture").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(2 * 20 + 10);

    // Mental note: 6 HCl -> (max) 1 VOCl3 + MgCl2 + some leftover HCl

    // Split process:
    // The easy, non-realistic way: centrifuge the leach mixture to get a small amount of
    // vanadium oxytrichloride and magnesium chloride.
    event.recipes.gtceu
        .centrifuge("nijika:chemicals/iron_slag/lame_centrifuging")
        .inputFluids(
            Fluid.of("gtceu:vanadium_magnesium_leach_mixture").withAmount(1 * FluidAmounts.BUCKET)
        )
        .itemOutputsRanged("gtceu:small_vanadium_oxytrichloride_dust", 1, 5)
        .itemOutputsRanged("gtceu:small_magnesium_chloride_dust", 1, 5)
        // TODO: Verify that doesn't produce extra chlorine!
        .outputFluids(Fluid.of("gtceu:diluted_hydrochloric_acid").withAmount(500 * FluidAmounts.MB))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(10 * 20);
};
