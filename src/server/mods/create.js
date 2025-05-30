// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { addRockBreakingRecipe } from "../../shared/utils";

/* eslint-disable no-unexpected-multiline */
/**
 * Adjusts recipes for the Create mod.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustCreateRecipes = (event) => {
    event.remove({ output: "#create:crushed_raw_materials" });
    event.remove({ input: "#create:crushed_raw_materials" });

    // duplicate recipes that take in the stone types. use da stonecutter
    event.remove({ id: "create:crushing/diorite_recycling" });
    event.remove({ id: "create:crushing/tuff_recycling" });

    event.replaceInput({ mod: "create" }, "#forge:plates/gold", "#forge:plates/corinthian_bronze");

    // replace all of the crushed raw material processing with producing crushed gtceu materials.
    // this is only useful in LV as then you can actually *do* ore processing.

    event.remove({ id: "create:crafting/kinetics/empty_blaze_burner" });
    event
        .shaped("create:blaze_burner", ["PPP", "PSP", "WWW"], {
            P: "#forge:plates/iron",
            S: "minecraft:soul_soil",
            W: "#minecraft:logs_that_burn",
        })
        .id("nijika:mods/create/easier_blaze_burner");

    event.recipes.create
        .mixing("1x minecraft:blaze_powder", ["#nijika:carbon_rich_dusts", "#forge:dusts/sulfur"])
        .id("nijika:mods/create/blaze_powder");

    event.remove({ id: "gtceu:chemical_reactor/blaze_powder" });
    event.recipes.gtceu
        .mixer("nijika:mods/create/blaze_powder_electric")
        .itemInputs("1x #nijika:carbon_rich_dusts", "1x #forge:dusts/sulfur")
        .itemOutputs("2x minecraft:blaze_powder")
        .EUt(GTValues.VH[GTValues.LV])
        .duration(10);

    // for some fucking reason the precision mechanism doesn't show up in game!
    // so, let's just recreate it!
    event.recipes.create
        .sequenced_assembly("1x create:precision_mechanism", "#forge:plates/corinthian_bronze", [
            event.recipes.create.deploying("1x create:incomplete_precision_mechanism", [
                "create:incomplete_precision_mechanism",
                "create:cogwheel",
            ]),
            event.recipes.create.deploying("1x create:incomplete_precision_mechanism", [
                "create:incomplete_precision_mechanism",
                "create:large_cogwheel",
            ]),
            event.recipes.create.deploying("1x create:incomplete_precision_mechanism", [
                "create:incomplete_precision_mechanism",
                "#forge:nuggets/iron",
            ]),
        ])
        .transitionalItem("create:incomplete_precision_mechanism")
        .loops(5)
        .id("create:sequenced_assembly/precision_mechanism");

    event
        .shaped("2x create:belt_connector", ["RRR", "RRR"], { R: "#nijika:rubber_plates" })
        .id("nijika:mods/create/red_belts");

    event.recipes.create
        .mixing("4x gtceu:bronze_ingot", ["3x #forge:ingots/copper", "1x #forge:ingots/tin"])
        .heated()
        .id("nijika:mods/create/bronze_heated_recipe");

    event.recipes.gtceu
        .macerator("nijika:misc/calcite_from_limestone")
        .itemInputs("1x create:limestone")
        .itemOutputs("1x gtceu:calcite_dust")
        .EUt(2)
        .duration(7 * 20 + 10);

    addRockBreakingRecipe(event, "create:limestone", GTValues.VA[GTValues.MV]);

    event
        .shaped("create:brown_toolbox", [" W ", "SCS", " K "], {
            W: "create:cogwheel",
            S: "#forge:foils/silver",
            C: "#forge:chests/wooden",
            K: "minecraft:dried_kelp",
        })
        .id("create:crafting/curiosities/brown_toolbox");

    event
        .shaped("8x create:controller_rail", ["I I", "ISI", "IEI"], {
            I: "#forge:ingots/corinthian_bronze",
            S: "#forge:rods/treated_wood",
            E: "create:electron_tube",
        })
        .id("create:crafting/kinetics/controller_rail");

    // fuck the stupid assembling system
    event.remove({ id: "create:mechanical_crafting/crushing_wheel" });
    event
        .shaped("1x create:crushing_wheel", ["RRR", "RSR", "RRR"], {
            R: "#forge:cobblestone",
            S: "create:shaft",
        })
        .id("nijika:mods/create/crushing_wheel_easy");
};
