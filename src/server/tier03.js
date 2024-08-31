// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// HV!

import { GT_MACHINE_TIERS } from "../shared/tier";
import { getStackForTagPrefix } from "../shared/utils";

/** @param {Internal.RecipesEventJS} event */
export const doTier03Content = (event) => {
    // remove heavy oil from logs, to be replaced with our own multiblock.
    event.remove({ id: "gtceu:pyrolyse_oven/log_to_heavy_oil" });
    // actual stainless steel production is made from ferromanganese and ferrochrome.
    event.remove({ id: "gtceu:mixer/stainless_steel_from_invar" });
    event.remove({ id: "gtceu:mixer/stainless_steel_from_elements" });

    event.recipes.gtceu
        .bessemer_smelting("nijika:tier03/stainless/from_ingots")
        .itemInputs(
            "16x #forge:ingots/iron",
            "16x #forge:ingots/invar",
            "16x #forge:ingots/ferromanganese",
            "16x #forge:ingots/ferrochrome",
            "8x #nijika:bessemer_limestone"
        )
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(2100 * FluidAmounts.MILLIBUCKET))
        .itemOutputs("64x gtceu:stainless_steel_ingot")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(20 * 60 * 20)
        .circuit(3)
        .blastFurnaceTemp(2700);

    event.recipes.gtceu
        .bessemer_smelting("nijika:tier03/stainless/from_blocks")
        .itemInputs(
            "16x #forge:storage_blocks/iron",
            "16x #forge:storage_blocks/invar",
            "16x #forge:storage_blocks/ferromanganese",
            "16x #forge:storage_blocks/ferrochrome",
            "64x #nijika:bessemer_limestone"
        )
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(18900 * FluidAmounts.MILLIBUCKET))
        .itemOutputs("64x gtceu:stainless_steel_block")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(20 * 60 * 20)
        .circuit(3)
        .blastFurnaceTemp(2700);

    // fix up the cleanroom to use the right tier materials
    event.remove({ id: "gtceu:shaped/cleanroom" });
    event
        .shaped("gtceu:cleanroom", ["FFF", "RHR", "MCM"], {
            F: "gtceu:item_filter",
            R: getStackForTagPrefix(TagPrefix.rotor, GT_MACHINE_TIERS.HV.materials.rotor),
            H: GT_MACHINE_TIERS.HV.machineHull,
            M: "gtceu:hv_electric_motor",
            C: GT_MACHINE_TIERS.HV.circuitTag,
        })
        .id("nijika:tier03/cleanroom");

    event.recipes.gtceu
        .assembler("nijika:tier03/cadmium_battery")
        .itemInputs(
            "8x gtceu:cadmium_dust",
            "4x gtceu:nickel_foil",
            "4x gtceu:polyvinyl_chloride_foil",
            "1x gtceu:hv_battery_hull"
        )
        .inputFluids(Fluid.of("gtceu:hydrogen").withAmount(6 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:hv_cadmium_battery")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(5 * 20);

    event.remove({ id: "gtceu:assembler/hv_fluid_drilling_rig" });
    // same as the original recipe, but moved down to HV.
    event.recipes.gtceu
        .assembler("nijika:tier03/hv_fluid_drilling_rig")
        .itemInputs(
            GT_MACHINE_TIERS.HV.machineHull,
            "4x gtceu:titanium_frame",
            "4x #gtceu:circuits/hv",
            "4x gtceu:hv_electric_motor",
            "4x gtceu:hv_electric_pump",
            GT_MACHINE_TIERS.HV.gear
        )
        .itemOutputs("gtceu:hv_fluid_drilling_rig")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20 * 20)
        .circuit(2);

    // allow creating ender air from regular air
    event.remove({ id: "gtceu:gas_collector/ender_air" });

    event.recipes.gtceu
        .mixer("nijika:tier03/mixed_dimensional_shards")
        .itemInputs("gtceu:emerald_dust", "gtceu:netherrack_dust")
        .itemOutputs("1x gtceu:dimensional_shard_dust")
        .EUt(GTValues.VH[GTValues.LV])
        .duration(10);

    event.recipes.gtceu
        .mixer("nijika:tier03/ender_air")
        .itemInputs("4x gtceu:dimensional_shard_dust")
        .inputFluids(Fluid.of("gtceu:air").withAmount(2 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:ender_air").withAmount(1500 * FluidAmounts.MB))
        .EUt(GTValues.VH[GTValues.HV])
        .duration(5 * 20)
        .circuit(1);

    event
        .shaped("gtceu:large_chemical_reactor", ["CRC", "PMP", "CHC"], {
            C: GT_MACHINE_TIERS.HV.circuitTag,
            R:  getStackForTagPrefix(TagPrefix.rotor, GT_MACHINE_TIERS.HV.materials.rotor),
            P: "gtceu:polytetrafluoroethylene_large_fluid_pipe",
            M: "gtceu:hv_electric_motor",
            H: GT_MACHINE_TIERS.HV.machineHull,
        })
        .id("gtceu:shaped/large_chemical_reactor");

    // fix phosphorus boule with the changes to regular boules
    event.remove({ id: "gtceu:electric_blast_furnace/phosphorus_boule" });
    event.recipes.gtceu
        .electric_blast_furnace("nijika:tier03/phosphorus_boule")
        .itemInputs(
            "64x #forge:dusts/silicon",
            "8x #forge:dusts/phosphorus",
            "1x gtceu:gallium_arsenide_dust"
        )
        .inputFluids(Fluid.of("gtceu:nitrogen").withAmount(8 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:phosphorus_boule")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(600 * 20)
        .blastFurnaceTemp(2484);
};
