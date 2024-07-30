// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// TODO: Consider using GT springs for chains?

/**
 * Rewrites railway (little logistics, create trains, etc) recipes and minecart recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const rewriteRailwayRecipes = (event) => {
    // == Rails == //
    // Uses treated wood and rods.
    event.remove({ id: "gtceu:shaped/treated_wood_planks" });
    event.recipes.create
        .filling("1x gtceu:treated_wood_planks", [
            "1x #minecraft:planks",
            Fluid.of("gtceu:creosote").withAmount(100 * FluidAmounts.MB),
        ])
        .id("nijika:railways/treated_wood");

    event.remove({ id: "minecraft:rail" });
    event
        .shaped("16x minecraft:rail", ["STS", "STS", "STS"], {
            S: "#forge:rods/iron",
            T: "#forge:rods/treated_wood",
        })
        .id("nijika:railways/minecart_rail");

    event.remove({ id: "minecraft:powered_rail" });
    event
        .shaped("6x minecraft:powered_rail", ["STS", "GRG", "STS"], {
            S: "#forge:rods/iron",
            T: "#forge:rods/treated_wood",
            G: "#forge:rods/gold",
            R: "#forge:dusts/redstone",
        })
        .id("nijika:railways/powered_rail");

    // Both of these use regular powered rails and are shapeless recipes instead.
    event.remove({ id: "minecraft:detector_rail" });
    event
        .shapeless("1x minecraft:detector_rail", [
            "1x minecraft:powered_rail",
            "#forge:dusts/redstone",
        ])
        .id("nijika:railways/detector_rail");

    event.remove({ id: "minecraft:activator_rail" });
    event
        .shapeless("1x minecraft:activator_rail", [
            "1x minecraft:powered_rail",
            "minecraft:redstone_torch",
        ])
        .id("nijika:railways/activator_rail");

    event.recipes.gtceu.assembler("nijika:railways/powered_railway_assembly")
        .itemInputs("1x create:sleepers", "2x #forge:nuggets/iron")
        .itemOutputs("2x create:track")
        .EUt(2)
        .duration(10);

    event.recipes.gtceu.assembler("nijika:railways/super_powered_railway_assembly")
        .itemInputs("8x create:sleepers", "8x #forge:rods/steel")
        .itemOutputs("32x create:track")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(10 * 20);
};
