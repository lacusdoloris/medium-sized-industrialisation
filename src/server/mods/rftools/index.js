// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { GT_MACHINE_TIERS } from "../../../shared/tier";

/**
 * Adds recipes for all of the RFTools submods.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustRfToolsRecipes = (event) => {
    event.remove({ id: "rftoolsbase:dimensionalshard" });

    // no implosion compressor in LV and below...
    event.recipes.gtceu
        .autoclave("nijika:mods/rftools/dimensional_shard")
        .itemInputs("1x gtceu:dimensional_shard_dust")
        .inputFluids(Fluid.of("gtceu:distilled_water").withAmount(1 * FluidAmounts.BUCKET))
        .itemOutputs("1x rftoolsbase:dimensionalshard")
        .EUt(24)
        .duration(10 * 20);

    event.remove({ id: "rftoolsbase:machine_frame" });
    event
        .shaped("2x rftoolsbase:machine_frame", ["WDW", "CHC", "WDW"], {
            W: GT_MACHINE_TIERS.LV.singleCable,
            D: "rftoolsbase:dimensionalshard",
            H: GT_MACHINE_TIERS.LV.machineHull,
            C: GT_MACHINE_TIERS.LV.circuitTag,
        })
        .id("nijika:mods/rftools/machine_frame");

    // very provisional, WIP recipes here
    event.remove({ id: "rftoolscontrol:card_base" });
    event.recipes.gtceu
        .circuit_assembler("nijika:mods/rftools/card_base")
        .itemInputs(
            "gtceu:resin_printed_circuit_board",
            "1x #gtceu:circuits/lv",
            "1x rftools:dimensionalshard",
            "2x gtceu:red_alloy_single_wire"
        )
        .inputFluids(Fluid.of("gtceu:soldering_alloy").withAmount(72 * FluidAmounts.MB))
        .itemOutputs("2x rftoolscontrol:card_base")
        .EUt(GTValues.V[GTValues.LV])
        .duration(10 * 20);

    event.remove({ id: "rftoolscontrol:cpu_core_500" });
    event
        .shaped("rftoolscontrol:cpu_core_500", ["RGR", "PCP", "RGR"], {
            R: "#forge:dusts/redstone",
            G: "#forge:nuggets/gold",
            P: "gtceu:polyethylene_plate",
            C: "rftoolscontrol:card_base",
        })
        .id("nijika:mods/rftools/arm4tdmi");

    event.remove({ id: "rftoolsbase:machine_base" });
    event
        .shaped("rftoolsbase:machine_base", ["III", "SSS"], {
            I: "#forge:nuggets/red_alloy",
            S: "minecraft:stone_slab", // todo: stone slabs tag?
        })
        .id("nijika:mods/rftools/machine_base");
};
