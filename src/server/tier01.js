// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// LV, that is.

import { GT_MACHINE_TIERS } from "../shared/definition";

/** @param {Internal.RecipesEventJS} event */
export const doTier01Content = (event) => {
    event.remove({ output: "#forge:ingots/steel", type: "gtceu:electric_blast_furnace" });
    event.remove({ id: "gtceu:shaped/bronze_primitive_blast_furnace" }); // not bronze?

    event.recipes.gtceu
        .assembler("nijika:tier01/precision_mechanism")
        .itemInputs(
            "2x #forge:plates/gold",
            "2x create:cogwheel",
            "2x create:large_cogwheel",
            GT_MACHINE_TIERS.LV.singleCable
        )
        .itemOutputs("2x create:precision_mechanism")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(5 * 20);

    // create is still useful throughout the game for e.g. farms and free smelting, so a powered
    // alloy recipe is also still useful.
    
    event.recipes.gtceu
        .alloy_smelter("nijika:tier01/powered_andesite_alloy")
        .itemInputs("1x #forge:ingots/iron", "9x minecraft:andesite")
        .itemOutputs("9x create:andesite_alloy")
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(1 * 20);

    event
        .shaped("gtceu:bessemer_furnace", ["FFF", "CHC", "WWW"], {
            F: "gtceu:firebricks",
            C: "#gtceu:circuits/lv",
            H: "gtceu:heatproof_machine_casing",
            W: GT_MACHINE_TIERS.LV.quadHeatingWire,
        })
        .id("nijika:tier01/bessemer_furnace");

    event.recipes.gtceu
        .bessemer_smelting("nijika:tier01/steel_ingot_bessemer_process")
        .itemInputs("64x #forge:ingots/iron", "8x #nijika:bessemer_limestone")
        .inputFluids(Fluid.of("gtceu:air").withAmount(10 * FluidAmounts.BUCKET))
        .itemOutputs("64x gtceu:steel_ingot")
        .EUt(GTValues.VA[GTValues.MV])
        .circuit(1)
        .duration(20 * 60 * 20); // 20 minutes at MV

    event.recipes.gtceu
        .bessemer_smelting("nijika:tier01/steel_block_bessemer_process")
        .itemInputs("64x #forge:storage_blocks/iron", "64x #nijika:bessemer_limestone")
        .inputFluids(Fluid.of("gtceu:air").withAmount(90 * FluidAmounts.BUCKET))
        .itemOutputs("64x gtceu:steel_block")
        .EUt(GTValues.VA[GTValues.MV])
        .circuit(1)
        .duration(20 * 60 * 40); // 40 minutes at MV

    // alt recipe using oxygen directly
    event.recipes.gtceu
        .bessemer_smelting("nijika:tier01/steel_block_bessemer_with_o2")
        .itemInputs("64x #forge:storage_blocks/iron", "64x #nijika:bessemer_limestone")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(18900 * FluidAmounts.MILLIBUCKET))
        .itemOutputs("64x gtceu:steel_block")
        .EUt(GTValues.VA[GTValues.MV])
        .circuit(1)
        .duration(20 * 60 * 40);

    // im so sorry.
    event.recipes.create
        .sequenced_assembly("1x gtceu:small_iron_gear", "1x gtceu:iron_plate", [
            event.recipes.create.deploying("gtceu:iron_plate", [
                "gtceu:iron_plate",
                "#forge:rods/iron",
            ]),
            event.recipes.create.pressing("gtceu:iron_plate", ["gtceu:iron_plate"]),
        ])
        .transitionalItem("gtceu:iron_plate")
        .loops(4)
        .id("nijika:tier01/evil_gear_recipe");

    event.recipes.gtceu
        .assembler("nijika:tier01/nickel_cadmium_battery")
        .itemInputs(
            "gtceu:lv_battery_hull",
            "2x gtceu:cadmium_dust",
            "1x gtceu:nickel_foil",
            "1x minecraft:paper"
        )
        .itemOutputs("gtceu:lv_cadmium_battery")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(20 * 5);

    // make the vacuum tube recipes consistent
    event.remove({ output: "gtceu:vacuum_tube", type: "gtceu:assembler" });
    event.recipes.gtceu
        .assembler("nijika:tier01/vacuum_tubes")
        .itemInputs("2x gtceu:copper_single_wire", "1x gtceu:glass_tube")
        .itemOutputs("2x gtceu:vacuum_tube")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(6 * 20);

    event.recipes.gtceu
        .assembler("nijika:tier01/vacuum_tubes_annealed")
        .itemInputs("2x gtceu:annealed_copper_single_wire", "1x gtceu:glass_tube")
        .itemOutputs("3x gtceu:vacuum_tube")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(2 * 20);

    // weh, bored of typing
    event.remove({ id: "gtceu:assembler/cover_fluid_voiding" });
    event.remove({ id: "gtceu:assembler/cover_item_voiding" });

    event.remove({ id: "gtceu:assembler/cover_infinite_water" });
    event.recipes.gtceu
        .assembler("nijika:tier01/infinite_water_cover")
        .itemInputs("2x gtceu:lv_electric_pump", "minecraft:cauldron", "#gtceu:circuits/lv")
        .itemOutputs("gtceu:infinite_water_cover")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(5 * 20);

    event
        .shaped("1x gtceu:rock_synthesiser", ["UIU", "CRC", "WPW"], {
            U: "gtceu:lv_electric_pump",
            I: "gtceu:heatproof_machine_casing",
            C: "#gtceu:circuits/lv",
            R: "create:limestone",
            W: GT_MACHINE_TIERS.LV.singleCable,
            P: "gtceu:lv_electric_piston",
        })
        .id("nijika:tier01/rock_synthesiser");
};
