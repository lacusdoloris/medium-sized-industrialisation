// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { GT_MACHINE_TIERS } from "../../shared/definition";

// Only allow the useful mobs to avoid cluttering EMI.
// Each drop has a flat 50% chance.
// Set the drop to ``null`` to only add an egg recipe.
const MOB_TYPES = {
    cow: null,
    panda: "minecraft:bamboo",
    sheep: "minecraft:white_wool",
    chicken: "minecraft:egg",
    skeleton: "minecraft:bone",
    squid: "minecraft:ink_sac",
    glow_squid: "minecraft:glow_ink_sac",
    phantom: "minecraft:phantom_membrane",
    magma_cube: "minecraft:magma_cream",
    ghast: "minecraft:ghast_tear",
};

/**
 * Adds recipes for mob processing.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addMobRecipes = (event) => {
    let blood = Fluid.of("gtceu:blood").withAmount(250 * FluidAmounts.MILLIBUCKET);

    for (let [idx, mob] of Object.keys(MOB_TYPES).entries()) {
        let drop = MOB_TYPES[mob];
        let egg = `minecraft:${mob}_spawn_egg`;

        event.recipes.gtceu
            .autoclave(`nijika:misc/mobs/${mob}_autoclave_egg`)
            .itemInputs("#forge:dusts/calcite")
            .inputFluids(blood)
            .itemOutputs(egg)
            .EUt(GTValues.VA[GTValues.LV])
            .duration(1 * 20 + 10)
            .circuit(idx + 1);

        if (drop !== null) {
            event.recipes.gtceu
                .butchering(`nijika:misc/mobs/${mob}_butchering`)
                .itemInputs(egg)
                .chancedOutput(drop, 5000, 0.0)
                .outputFluids(blood)
                .EUt(GTValues.VA[GTValues.MV])
                .duration(20 * 20);
        }
    }

    event.recipes.gtceu
        .butchering("nijika:misc/mobs/cow_butchering")
        .itemInputs("minecraft:cow_spawn_egg")
        .chancedOutput("minecraft:leather", 5000, 0.0)
        .chancedFluidOutput(
            Fluid.of("minecraft:milk").withAmount(1 * FluidAmounts.BUCKET),
            5000,
            0.0
        )
        .outputFluids(blood)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(20 * 20);
};

/**
 * Adds mob farming related recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addMobFarmRelatedRecipes = (event) => {
    // used for the actual feedstock of blood
    event.recipes.gtceu
        .chemical_reactor("nijika:misc/mobs/blood_from_blackstone")
        .itemInputs("8x minecraft:blackstone", "2x #forge:dusts/iron")
        .inputFluids(Fluid.of("minecraft:water").withAmount(200 * FluidAmounts.MILLIBUCKET))
        .outputFluids(Fluid.of("gtceu:blood").withAmount(250 * FluidAmounts.MILLIBUCKET))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(3 * 20);

    event
        .shaped("gtceu:butcher", ["SBS", "CHC", "WWW"], {
            S: "gtceu:vanadium_steel_buzz_saw_blade",
            B: "minecraft:iron_bars",
            C: GT_MACHINE_TIERS.MV.circuitTag,
            H: GT_MACHINE_TIERS.MV.machineHull,
            W: GT_MACHINE_TIERS.MV.quadHeatingWire,
        })
        .id("nijika:misc/mobs/butcher");

    addMobRecipes(event);
};
