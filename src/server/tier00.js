// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { GT_MACHINE_TIERS } from "../shared/definition";

/** @param {Internal.RecipesEventJS} event */
export const doTier00Content = (event) => {
    event
        .shaped("4x gtceu:bronze_brick_casing", ["BBB", "BRB", "BBB"], {
            B: "#nijika:copper_alloy_plates",
            R: "#forge:storage_blocks/brick",
        })
        .id("nijika:tier00/brick_casing");

    event
        .shaped("gtceu:lp_steam_solid_boiler", ["PPP", "P P", "BNB"], {
            P: "#nijika:copper_alloy_plates",
            B: "gtceu:bronze_brick_casing",
            N: "#forge:netherrack",
        })
        .id("nijika:tier00/low_pressure_solid_boiler");

    event
        .shaped("gtceu:hp_steam_solid_boiler", ["PPP", "P P", "BNB"], {
            P: "#forge:plates/wrought_iron",
            B: "gtceu:bronze_brick_casing",
            N: "gtceu:lp_steam_solid_boiler",
        })
        .id("nijika:tier00/high_pressure_solid_boiler");

    event.remove({ id: "gtceu:shaped/steam_boiler_lava_bronze" });
    event
        .shaped("gtceu:lp_steam_liquid_boiler", ["PPP", "PGP", "BNB"], {
            P: "#nijika:copper_alloy_plates",
            B: "gtceu:bronze_brick_casing",
            N: "#forge:netherrack",
            G: "#forge:glass",
        })
        .id("nijika:tier00/low_pressure_liquid_boiler");

    event.remove({ id: "gtceu:shaped/steam_boiler_lava_steel" });
    event
        .shaped("gtceu:hp_steam_liquid_boiler", ["PPP", "PGP", "BNB"], {
            P: "#forge:plates/wrought_iron",
            B: "gtceu:bronze_brick_casing",
            N: "gtceu:lp_steam_liquid_boiler",
            G: "#forge:glass",
        })
        .id("nijika:tier00/high_pressure_liquid_boiler");

    // make heavy oil from oilsands obtainable without electricity
    event.recipes.create
        .compacting(
            Fluid.of("gtceu:oil_heavy").withAmount(1500 * FluidAmounts.MB),
            "#forge:dusts/oilsands"
        )
        .id("nijika:tier00/oilsands_compacting");

    // coke oven tweaks.
    // this makes it dramatically easier, no more fucking brick mould
    event.remove({ id: "gtceu:shaped/compressed_coke_clay" });

    event
        .shapeless("gtceu:compressed_coke_clay", ["1x #forge:ingots/clay", "2x #minecraft:sand"])
        .id("nijika:tier00/less_evil_coke_clay");

    event.remove({ id: "gtceu:shaped/coke_oven" });
    event
        .shaped("gtceu:coke_oven", ["PBP", "B B", "PBP"], {
            P: "#forge:plates/iron",
            B: "gtceu:coke_oven_bricks",
        })
        .id("nijika:tier00/coke_oven");

    event.remove({ id: "gtceu:shaped/coke_oven_hatch" });
    // not actually a fluid barrel... but who cares?
    event
        .shapeless("gtceu:coke_oven_hatch", ["gtceu:coke_oven_bricks", "#forge:barrels/wooden"])
        .id("nijika:tier00/coke_oven_hatch");

    // wrought iron in vanilla GT requires smelting nuggets and using a compressor...
    // but that sucks, so we just add a direct smelting recipe.
    event
        .smelting("gtceu:wrought_iron_ingot", "#forge:ingots/iron")
        .id("nijika:tier00/less_evil_wrought_iron");

    // == Rubber == //

    // no extractor needed!
    event.recipes.create
        .pressing("1x gtceu:raw_rubber_dust", ["1x gtceu:sticky_resin"])
        .id("nijika:tier00/sticky_resin_pressing");
    event.recipes.createaddition
        .rolling(Item.of("gtceu:sticky_resin").withChance(0.5), "gtceu:rubber_log")
        .id("nijika:tier00/merciful_sticky_resin_production");

    // make rubber planks cuttable from rubber logs
    event.recipes.create
        .cutting(["6x gtceu:rubber_planks"], "1x gtceu:rubber_log")
        .id("nijika:tier00/rubber_planks_cutting");

    // earlygame rubber:
    // 1) mix with heat to get plain rubber pulp
    // 2) mix superheated to get rubber liquid

    event.recipes.create
        .mixing("1x gtceu:rubber_dust", ["1x #forge:dusts/sulfur", "2x #forge:dusts/raw_rubber"])
        .heated()
        .id("nijika:tier00/rubber/mixing_dust");

    event.recipes.create
        .mixing(Fluid.of("gtceu:rubber", 144 * FluidAmounts.MB), [
            "1x #forge:dusts/sulfur",
            "2x #forge:dusts/raw_rubber",
        ])
        .superheated()
        .id("nijika:tier00/rubber/mixing_fluid");

    event.recipes.create
        .mixing(Fluid.of("gtceu:rubber", 144 * FluidAmounts.MB), ["1x #forge:dusts/rubber"])
        .superheated()
        .id("nijika:tier00/rubber/melting");

    // eh.
    event.recipes.createaddition
        .rolling("1x gtceu:rubber_ingot", "1x #forge:dusts/rubber")
        .id("nijika:tier00/rubber/dust_to_ingot");

    // add the ability to recycle rubber ingots/plates too, for liquid rubber
    event.recipes.create
        .milling("1x gtceu:rubber_dust", "1x #forge:ingots/rubber")
        .id("nijika:tier00/rubber/ingot_milling");

    event.recipes.create
        .milling("1x gtceu:rubber_dust", "1x #forge:plates/rubber")
        .id("nijika:tier00/rubber/plate_milling");

    // == Circuits == //

    // earlygame red alloy
    event.recipes.create
        .mixing("1x gtceu:red_alloy_dust", ["1x #forge:dusts/copper", "4x #forge:dusts/redstone"])
        .id("nijika:tier00/red_alloy_mixing");

    // likewise, no compressor needed; in fact, this recipe is straight up better.
    event.recipes.create
        .cutting("2x gtceu:wood_plate", "#minecraft:planks")
        .id("nijika:tier00/easier_wood_plank");

    // easier, less resource-intensive resin circuit boards
    event.recipes.create
        .sequenced_assembly("1x gtceu:resin_printed_circuit_board", "gtceu:resin_circuit_board", [
            event.recipes.create.deploying("gtceu:resin_circuit_board", [
                "gtceu:resin_circuit_board",
                "gtceu:copper_single_wire",
            ]),
            event.recipes.create.deploying("gtceu:resin_circuit_board", [
                "gtceu:resin_circuit_board",
                "gtceu:copper_single_wire",
            ]),
            event.recipes.create.deploying("gtceu:resin_circuit_board", [
                "gtceu:resin_circuit_board",
                "gtceu:copper_single_wire",
            ]),
        ])
        .transitionalItem("gtceu:resin_circuit_board")
        .loops(1)
        .id("nijika:tier00/easier_resin_printed_circuits");

    // extremely expensive magnetic iron recipe
    event.shapeless("gtceu:magnetic_iron_ingot", [
        "1x #forge:ingots/iron",
        "5x #forge:dusts/redstone",
    ]);

    // add sequenced assembly alternative for magnetic iron
    event.recipes.create
        .sequenced_assembly("1x gtceu:magnetic_iron_ingot", "minecraft:iron_ingot", [
            event.recipes.create.deploying("minecraft:iron_ingot", [
                "minecraft:iron_ingot",
                "#forge:dusts/redstone",
            ]),
        ])
        .transitionalItem("minecraft:iron_ingot")
        .loops(3)
        .id("nijika:tier00/magnetic_iron");

    // fix the resistor recipes so it uses tags, wtf gtceu?
    event.remove({ type: "minecraft:crafting_shaped", output: "gtceu:resistor" });
    event
        .shaped("2x gtceu:resistor", ["GPG", "FDF", " P "], {
            G: "#nijika:glues",
            P: "minecraft:paper",
            F: "gtceu:fine_copper_wire",
            D: "#nijika:carbon_rich_dusts",
        })
        .id("nijika:tier00/fine_wire_resistors");

    event
        .shaped("2x gtceu:resistor", ["GPG", "FDF", " P "], {
            G: "#nijika:glues",
            P: "minecraft:paper",
            F: "gtceu:copper_single_wire",
            D: "#nijika:carbon_rich_dusts",
        })
        .id("nijika:tier00/single_wire_resistors");

    // vacuum tubes aren't accurate to how they are irl...
    // but nobody really wants to deal with that.
    event
        .shaped("1x gtceu:glass_tube", ["GGG", "G G"], {
            G: "#forge:glass",
        })
        .id("nijika:tier0/easy_mode_glass_tube");

    event.remove({ id: "gtceu:shaped/vacuum_tube" });
    event
        .shaped("gtceu:vacuum_tube", [" G ", "WWW"], {
            G: "gtceu:glass_tube",
            W: "gtceu:copper_single_wire",
        })
        .id("nijika:tier00/less_cbt_vacuum_tube");

    // finally, fix circuits.
    event.replaceInput(
        { id: "gtceu:shaped/electronic_circuit_lv" },
        "#forge:plates/steel",
        "#forge:plates/wrought_iron"
    );

    event
        .shapeless("5x gtceu:corinthian_bronze_dust", [
            "4x #forge:dusts/copper",
            "1x #forge:dusts/silver",
        ])
        .id("nijika:tier00/corinthian_bronze");

    event.recipes.create
        .mixing("5x gtceu:corinthian_bronze_ingot", [
            "4x #forge:ingots/copper",
            "1x #forge:ingots/silver",
        ])
        .heated()
        .id("nijika:tier00/corinthian_bronze_heated_mixing");

    // alt steam turbine recipe
    event.shaped(
        "gtceu:lv_steam_turbine",
        ["PCP", "WHW", "MTM"],
        {
            P: "create:fluid_pipe",
            C: GT_MACHINE_TIERS.LV.circuitTag,
            W: "create:whisk",
            H: GT_MACHINE_TIERS.LV.machineHull,
            M: "gtceu:lv_electric_motor",
            T: "gtceu:tin_single_cable",
        }
    ).id("nijika:tier00/silly_steam_turbine_recipe");
};
