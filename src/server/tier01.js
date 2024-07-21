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

    // this one is straight up unrealistic, but i want the EBF to be ahead of the bessemer
    // converter!

    event.remove({ id: "gtceu:smelting/fireclay_brick" });
    event.remove({ id: "gtceu:compressor/compressed_fireclay" });
    event.remove({ output: "gtceu:fireclay_dust" });

    event.recipes.gtceu
        .electric_blast_furnace("nijika:tier01/fireclay")
        .itemInputs("2x #forge:dusts/clay", "2x #forge:dusts/brick")
        .itemOutputs("4x gtceu:firebrick")
        .EUt(GTValues.VHA[GTValues.MV])
        .blastFurnaceTemp(1787)
        .duration(10 * 20); // faster than the furnace!

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

    // move silicon wafers down to LV...
    // this also doubles their time to make MV cutters still worth it.
    event.remove({ type: "gtceu:cutter", output: "gtceu:silicon_wafer" });

    event.recipes.gtceu
        .cutter("nijika:tier01/silicon_wafer_dirt_water")
        .itemInputs("1x gtceu:silicon_boule")
        .inputFluids(Fluid.of("minecraft:water").withAmount(60 * FluidAmounts.MB))
        .itemOutputs("16x gtceu:silicon_wafer")
        .duration(80 * 20)
        .EUt(GTValues.VA[GTValues.LV]);

    event.recipes.gtceu
        .cutter("nijika:tier01/silicon_wafer_distilled_water")
        .itemInputs("1x gtceu:silicon_boule")
        .inputFluids(Fluid.of("gtceu:distilled_water").withAmount(60 * FluidAmounts.MB))
        .itemOutputs("16x gtceu:silicon_wafer")
        .duration(60 * 20)
        .EUt(GTValues.VA[GTValues.LV]);

    event.recipes.gtceu
        .cutter("nijika:tier01/silicon_wafer_lubricant")
        .itemInputs("1x gtceu:silicon_boule")
        .inputFluids(Fluid.of("gtceu:lubricant").withAmount(20 * FluidAmounts.MB))
        .itemOutputs("16x gtceu:silicon_wafer")
        .duration(40 * 20)
        .EUt(GTValues.VA[GTValues.LV]);

    // remove the diode recipes that use small gallium arsenide
    event.remove({
        type: "gtceu:assembler",
        input: "gtceu:small_gallium_arsenide_dust",
        output: "gtceu:diode",
    });

    // add back the glass recipes
    event.recipes.gtceu
        .assembler("nijika:tier01/diodes_wafer_glass_regular_copper")
        .itemInputs("4x gtceu:fine_copper_wire", "1x gtceu:silicon_wafer")
        .inputFluids(Fluid.of("gtceu:glass").withAmount(144 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:diode")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(20 * 20); // wow, really?

    event.recipes.gtceu
        .assembler("nijika:tier01/diodes_wafer_glass_annealed_copper")
        .itemInputs("4x gtceu:fine_annealed_copper_wire", "1x gtceu:silicon_wafer")
        .inputFluids(Fluid.of("gtceu:glass").withAmount(144 * FluidAmounts.BUCKET))
        .itemOutputs("2x gtceu:diode")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(20 * 20);

    // make monosilicon boules require two small gallium arsenide.
    event.remove({ id: "gtceu:electric_blast_furnace/silicon_boule" });
    event.recipes.gtceu
        .electric_blast_furnace("nijika:tier01/silicon_boule")
        .itemInputs("32x #forge:dusts/silicon", "2x gtceu:small_gallium_arsenide_dust")
        .itemOutputs("1x gtceu:silicon_boule")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(450 * 20)
        .blastFurnaceTemp(1784)
        .circuit(2);

    // add a proper cutting recipe for wood planks
    event.remove({ output: "#minecraft:slabs", input: "#minecraft:planks", type: "gtceu:cutter" });
    event.recipes.gtceu
        .cutter("nijika:tier01/wood_plank_electrical_cutting")
        .itemInputs("#minecraft:planks")
        .itemOutputs("4x gtceu:wood_plate")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(5 * 20);

    // lol, fuck it
    event.recipes.gtceu
        .bender("nijika:tier01/rubber_plate_bending")
        .itemInputs("1x #forge:ingots/rubber")
        .itemOutputs("1x gtceu:rubber_plate")
        .circuit(1)
        .EUt(24)
        .duration(20 + 15); // 1.5s

    // in base gtceu, buzzsaw blades are MV or higher. which means the LV cutter is *always*
    // useless. also means there's no non-manual logs -> planks recipe before MV?
    event.remove({ id: "gtceu:lathe/buzzsaw_gear_bronze" });
    event.recipes.gtceu
        .lathe("nijika:tier01/bronze_buzzsaw")
        .itemInputs("1x #forge:gears/bronze")
        .itemOutputs("1x gtceu:bronze_buzz_saw_blade")
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(15 * 20 + 4);

    event.recipes.gtceu
        .macerator("nijika:tier01/clay_from_dripstone")
        .itemInputs("minecraft:dripstone_block")
        .itemOutputs("1x minecraft:clay_ball")
        .EUt(2)
        .duration(1 * 20);
};
