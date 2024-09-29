// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { GT_MACHINE_TIERS } from "../../shared/tier";

// circuit recipes are kinda weird!
// these are based on the circuit tiers, rather than the voltage tiers.
//
// Basic boards: Resin Printed Circuit Board
// Integrated boards: Phenolic Circuit Board
// Microprocessor boards: Plastic Printed Circuit Board
//
// Themes:
// Unthemed/Basic: LV/MV
// Integrated: LV/MV/HV
// Microprocessor: LV/MV/HV/EV/IV
// Nanoprocessor: HV/EV/IV/LuV
// Quantum: EV/IV/LuV/ZPM
// Crystal: IV/LuV/ZPM/UV
// Wetware: LuV/ZPM/UV/UHV

// SoC recipes are three voltage tiers above their regular recipe.
// So, LV circuits would use SoCs at EV or higher.

const SOLDER_FLUID = Fluid.of("gtceu:soldering_alloy").withAmount(72 * FluidAmounts.MB);
const DOUBLE_SOLDER_FLUID = Fluid.of("gtceu:soldering_alloy").withAmount(144 * FluidAmounts.MB);

/**
 * Adjusts circuits for the "Basic" circuit theme.
 *
 * @param {Internal.RecipesEventJS} event
 */
const adjustBasicCircuits = (event) => {
    event.remove({ id: "gtceu:shaped/electronic_circuit_lv" });
    event
        .shaped("2x gtceu:basic_electronic_circuit", ["RPR", "DBD", "CCC"], {
            R: "gtceu:resistor",
            P: GT_MACHINE_TIERS.LV.primaryPlate,
            D: "gtceu:vacuum_tube",
            B: "gtceu:resin_printed_circuit_board",
            C: "gtceu:red_alloy_single_cable",
        })
        .id("nijika:circuits/basic/lv");

    event.remove({ id: "gtceu:circuit_assembler/electronic_circuit_lv_soldering_alloy" });
    event.recipes.gtceu
        .circuit_assembler("nijika:circuits/basic/lv")
        .itemInputs(
            "1x gtceu:resin_printed_circuit_board",
            "2x #gtceu:resistors",
            "2x gtceu:red_alloy_single_wire",
            "2x #gtceu:circuits/ulv"
        )
        .inputFluids(SOLDER_FLUID)
        .itemOutputs("4x gtceu:basic_electronic_circuit")
        .EUt(GTValues.VH[GTValues.LV])
        .duration(5 * 20);

    event.remove({ id: "gtceu:shaped/electronic_circuit_mv" });
    event
        .shaped("2x gtceu:good_electronic_circuit", ["DPD", "CBC", "WCW"], {
            D: "#gtceu:diodes",
            P: GT_MACHINE_TIERS.LV.primaryPlate,
            B: "gtceu:phenolic_printed_circuit_board",
            C: "gtceu:basic_electronic_circuit",
            W: "gtceu:copper_single_wire",
        })
        .id("nijika:circuits/basic/mv");

    event.remove({ id: "gtceu:circuit_assembler/electronic_circuit_mv_soldering_alloy" });
    event.recipes.gtceu
        .circuit_assembler("nijika:circuits/basic/mv")
        .itemInputs(
            "1x gtceu:phenolic_printed_circuit_board",
            "4x #gtceu:circuits/lv",
            "2x #gtceu:diodes",
            "2x gtceu:copper_single_wire"
        )
        .inputFluids(SOLDER_FLUID)
        .itemOutputs("4x gtceu:good_electronic_circuit")
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(7.5 * 20);
};

/**
 * Adjusts recipes for the integrated circuit theme.
 *
 * @param {Internal.RecipesEventJS} event
 */
const adjustIntegratedCircuits = (event) => {
    event.remove({ id: "gtceu:circuit_assembler/integrated_circuit_lv_soldering_alloy" });
    event.recipes.gtceu
        .circuit_assembler("nijika:circuits/integrated/lv")
        .itemInputs(
            "1x gtceu:phenolic_printed_circuit_board",
            "1x gtceu:ilc_chip",
            "2x #gtceu:resistors",
            "2x #gtceu:diodes",
            "4x gtceu:fine_copper_wire"
        )
        .inputFluids(SOLDER_FLUID)
        .itemOutputs("4x gtceu:basic_integrated_circuit")
        .EUt(GTValues.VH[GTValues.LV])
        .duration(5 * 20);

    event.remove({ id: "gtceu:circuit_assembler/integrated_circuit_mv_soldering_alloy" });
    event.recipes.gtceu
        .circuit_assembler("nijika:circuits/integrated/mv")
        .itemInputs(
            "1x gtceu:phenolic_printed_circuit_board",
            "4x gtceu:basic_integrated_circuit",
            "2x #gtceu:resistors",
            "2x #gtceu:diodes",
            "4x gtceu:fine_gold_wire"
        )
        .inputFluids(SOLDER_FLUID)
        .itemOutputs("4x gtceu:good_integrated_circuit")
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(7.5 * 20);

    event.remove({ id: "gtceu:circuit_assembler/integrated_circuit_hv_soldering_alloy" });
    event.recipes.gtceu
        .circuit_assembler("nijika:circuits/integrated/hv")
        .itemInputs(
            "4x gtceu:good_integrated_circuit",
            "2x gtceu:ilc_chip",
            "2x gtceu:ram_chip",
            "4x #gtceu:transistors",
            "8x gtceu:fine_electrum_wire"
        )
        .inputFluids(SOLDER_FLUID)
        .itemOutputs("4x gtceu:advanced_integrated_circuit")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(10 * 20);
};

/**
 * Adjusts recipes for the microprocessor theme.
 *
 * @param {Internal.RecipesEventJS} event
 */
const adjustMicroprocessorRecipes = (event) => {
    // there is a whopping total of FIVE circuits in this theme, the largest of them all!
    // (Or six if you count ULV, but nobody counts ULV.)

    // == LV == //
    event.remove({ id: "gtceu:circuit_assembler/microprocessor_lv_soldering_alloy" });
    event.recipes.gtceu
        .circuit_assembler("nijika:circuits/microchip/lv")
        .itemInputs(
            "1x gtceu:plastic_printed_circuit_board",
            "1x gtceu:cpu_chip",
            "2x #gtceu:resistors",
            "2x #gtceu:capacitors",
            "2x #gtceu:transistors",
            "4x gtceu:fine_copper_wire"
        )
        .inputFluids(SOLDER_FLUID)
        .itemOutputs("4x gtceu:microchip_processor")
        .EUt(GTValues.VHA[GTValues.MV])
        .duration(5 * 20);

    event.remove({ id: "gtceu:circuit_assembler/microprocessor_lv_soc_soldering_alloy" });
    event.recipes.gtceu
        .circuit_assembler("nijika:circuits/microchip/lv_soc")
        .itemInputs(
            "1x gtceu:plastic_printed_circuit_board",
            "1x gtceu:soc",
            "4x gtceu:fine_copper_wire"
        )
        .inputFluids(SOLDER_FLUID)
        .itemOutputs("12x gtceu:microchip_processor")
        .EUt(GTValues.VHA[GTValues.EV]) // not fucking 600 like the random as hell original recipe
        .duration(2 * 20 + 10);

    // == MV == //
    // similar recipe to the LV one.
    event.remove({ id: "gtceu:circuit_assembler/processor_mv_soldering_alloy" });
    event.recipes.gtceu
        .circuit_assembler("nijika:circuits/microchip/mv")
        .itemInputs(
            "1x gtceu:plastic_printed_circuit_board",
            "2x gtceu:cpu_chip",
            "4x #gtceu:resistors",
            "4x #gtceu:capacitors",
            "4x #gtceu:transistors",
            "16x gtceu:fine_annealed_copper_wire"
        )
        .inputFluids(SOLDER_FLUID)
        .itemOutputs("4x gtceu:micro_processor")
        .EUt(GTValues.VHA[GTValues.MV])
        .duration(5 * 20);

    event.remove({ id: "gtceu:circuit_assembler/processor_mv_soc_soldering_alloy" });
    event.recipes.gtceu
        .circuit_assembler("nijika:circuits/microchip/mv_soc")
        .itemInputs(
            "1x gtceu:plastic_printed_circuit_board",
            "1x gtceu:soc",
            "4x gtceu:fine_copper_wire"
        )
        .inputFluids(SOLDER_FLUID)
        .itemOutputs("12x gtceu:micro_processor")
        .EUt(GTValues.VHA[GTValues.IV]) // see above SoC
        .duration(2 * 20 + 10);

    // == HV == //
    event.remove({ id: "gtceu:circuit_assembler/processor_assembly_hv_soldering_alloy" });
    event.recipes.gtceu
        .circuit_assembler("nijika:circuits/microchip/hv")
        .itemInputs(
            "1x gtceu:plastic_printed_circuit_board",
            "4x gtceu:micro_processor",
            "4x #gtceu:inductors",
            "8x #gtceu:capacitors",
            "4x gtceu:ram_chip",
            "16x gtceu:fine_electrum_wire"
        )
        .inputFluids(DOUBLE_SOLDER_FLUID)
        .itemOutputs("4x gtceu:micro_processor_assembly")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(10 * 20);

    // == EV == //
    event.remove({ id: "gtceu:circuit_assembler/workstation_ev_soldering_alloy" });
    event.recipes.gtceu
        .circuit_assembler("nijika:circuits/microchip/ev")
        .itemInputs(
            "1x gtceu:plastic_printed_circuit_board",
            "4x gtceu:micro_processor_assembly",
            "4x #gtceu:diodes",
            "4x gtceu:ram_chip",
            "16x gtceu:fine_electrum_wire"
        )
        .inputFluids(DOUBLE_SOLDER_FLUID)
        .itemOutputs("4x gtceu:micro_processor_computer")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(10 * 20);

    // TODO: IV, for the IV content update
};

/**
 * Adjusts all circuit recipes.
 */
export const adjustCircuitRecipes = (event) => {
    // remove all circuit assembler recipes that use liquid tin. this keeps lead relevant
    // throughout the entire game.
    // requires a bit of a hack as KJS seemingly can't match on the fluid input?
    // event.remove({input: "gtceu:tin", type: "gtceu:circuit_assembler"});
    event.remove({ type: "gtceu:circuit_assembler", not: { id: /.*_soldering_alloy$/ } });

    adjustBasicCircuits(event);
    adjustIntegratedCircuits(event);
    adjustMicroprocessorRecipes(event);
};
