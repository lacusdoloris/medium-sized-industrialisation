// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

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
    event.recipes.create
        .milling(
            [
                Item.of("gtceu:crushed_magnetite_ore").withChance(0.6),
                Item.of("minecraft:iron_nugget").withChance(0.6),
            ],
            "create:crimsite"
        )
        .id("nijika:mods/create/crimsite_crushing");

    event.recipes.create
        .milling(
            [
                Item.of("gtceu:crushed_redstone_ore").withChance(0.6),
                Item.of("minecraft:redstone").withChance(0.6),
            ],
            "create:ochrum"
        )
        .id("nijika:mods/create/ochrum_crushing");

    event.recipes.create
        .milling(
            [
                Item.of("gtceu:crushed_chalcopyrite_ore").withChance(0.6),
                Item.of("gtceu:copper_nugget").withChance(0.6),
            ],
            "create:veridium"
        )
        .id("nijika:mods/create/veridium_crushing");

    event.recipes.create
        .milling(
            [
                Item.of("gtceu:crushed_cassiterite_ore").withChance(0.6),
                Item.of("gtceu:tin_nugget").withChance(0.6),
            ],
            "create:asurine"
        )
        .id("nijika:mods/create/asurine_crushing");

    event.recipes.create
        .milling(
            [
                Item.of("gtceu:crushed_silver_ore").withChance(0.6),
                Item.of("gtceu:silver_nugget").withChance(0.6),
            ],
            "create:scoria"
        )
        .id("nijika:mods/create/scoria_crushing");

    event.recipes.create
        .milling(
            [
                Item.of("gtceu:crushed_galena_ore").withChance(0.6),
                Item.of("gtceu:lead_nugget").withChance(0.6),
            ],
            "create:scorchia"
        )
        .id("nijika:mods/create/schorchia_crushing");

    event.recipes.create
        .crushing(
            [
                Item.of("gtceu:crushed_nether_quartz_ore").withChance(0.25),
                Item.of("minecraft:quartz").withChance(0.25),
            ],
            "minecraft:diorite"
        )
        .id("create:crushing/diorite");

    event.recipes.create
        .crushing(
            [
                Item.of("minecraft:flint").withChance(0.25),
                Item.of("minecraft:iron_nugget").withChance(0.1),
                Item.of("gtceu:copper_nugget").withChance(0.1),
                Item.of("gtceu:tin_nugget").withChance(0.1),
                Item.of("gtceu:lead_nugget").withChance(0.1),
                Item.of("gtceu:silver_nugget").withChance(0.1),
            ],
            "minecraft:tuff"
        )
        .id("create:crushing/tuff");

    event.smelting("1x create:crimsite", "1x create:cut_crimsite");
    event.smelting("1x create:ochrum", "1x create:cut_ochrum");
    event.smelting("1x create:veridium", "1x create:cut_veridium");
    event.smelting("1x create:asurine", "1x create:cut_asurine");

    event.remove({ id: "create:crafting/kinetics/empty_blaze_burner" });
    event
        .shaped("create:empty_blaze_burner", ["PPP", "P P", "WWW"], {
            P: "#forge:plates/iron",
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

    event
        .shapeless("create:blaze_burner", ["create:empty_blaze_burner", "#forge:dusts/blaze"])
        .id("nijika:mods/create/blaze_burner");

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

    event.recipes.gtceu
        .macerator("nijika:misc/calcite_from_calcite")
        .itemInputs("1x minecraft:calcite")
        .itemOutputs("1x gtceu:calcite_dust")
        .EUt(2)
        .duration(7 * 20 + 10);

    event.recipes.gtceu
        .rock_breaker("nijika:misc/limestone_rock_breaker")
        .notConsumable("1x create:limestone")
        .itemOutputs("1x create:limestone")
        .duration(16)
        .EUt(GTValues.VA[GTValues.HV])
        ["addData(java.lang.String,java.lang.String)"]("fluidA", "minecraft:lava")
        ["addData(java.lang.String,java.lang.String)"]("fluidB", "minecraft:water");

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
