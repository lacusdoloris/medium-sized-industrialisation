// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createDustIntermediate } from "../../materials/helpers";
import { nijikaId } from "../../utils";

export const addManganeseMaterials = (event) => {
    event
        .create(nijikaId("ferromanganese"))
        .ingot()
        .dust()
        .color(0xe01923)
        .components("1x gtceu:manganese", "2x gtceu:iron")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.NO_WORKING)
        .iconSet(GTMaterialIconSet.SHINY);

    // no disable decomposition flag here.
    event
        .create(nijikaId("manganese_oxide"))
        .dust()
        .color(0x535353)
        .components("1x gtceu:manganese", "1x gtceu:oxygen")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING);

    createDustIntermediate(event, "manganese_nitrate", 0xdba9c7, true)
        .components("1x gtceu:manganese", "2x gtceu:nitrogen", "6x gtceu:oxygen");
};

/**
 * Adds manganese-related processing recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addManganeseProcessingRecipes = (event) => {
    // Standard carbinothermic and aluminothermic reductions of MnO2.
    // MnO2 + C = Mn + CO2
    // 3 MnO2 + 4 Al = 3 Mn + 2 Al2O3

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/manganese/pyrolusite_reduction_carbon")
        .itemInputs("1x gtceu:pyrolusite_dust", "1x #nijika:carbon_rich_dusts")
        .itemOutputs("1x gtceu:manganese_dust")
        .outputFluids(Fluid.of("gtceu:carbon_dioxide").withAmount(1 * FluidAmounts.BUCKET))
        .circuit(2)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(10 * 20)
        .blastFurnaceTemp(1500);

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/manganese/pyrolusite_reduction_alumina")
        .itemInputs("3x gtceu:pyrolusite_dust", "4x gtceu:aluminium_dust")
        .itemOutputs("3x gtceu:manganese_dust", "2x gtceu:alumina_dust")
        .circuit(2)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(10 * 20)
        .blastFurnaceTemp(1500);

    // Ferromanganese production from reduction alongside iron dust.
    // This is a completely fictional reaction.
    // Mn2O3 + 4 Fe + 2 Al = 2 MnFe2 + Al2O3
    // Mn2O3 + 2 Fe2O3 + 6 Al = 2 MnFe2 + 3 Al2O3

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/manganese/ferromanganese_aluminium")
        .itemInputs("gtceu:pyrolusite_dust", "4x gtceu:iron_dust", "2x gtceu:aluminium_dust")
        .itemOutputs("2x gtceu:ferromanganese_ingot", "1x gtceu:alumina_dust")
        .circuit(1)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(15 * 20)
        .blastFurnaceTemp(1600);

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/manganese/ferromanganese_from_fe2o3")
        .itemInputs(
            "1x gtceu:pyrolusite_dust",
            "2x gtceu:iron_oxide_dust",
            "6x gtceu:aluminium_dust"
        )
        .itemOutputs("2x gtceu:ferromanganese_ingot", "3x gtceu:alumina_dust")
        .circuit(1)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(15 * 20)
        .blastFurnaceTemp(1600);

    // Manganese nitrate synthesis.
    // MnO2 + 2 NO2 = Mn(NO3)2
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/manganese/nitrate")
        .itemInputs("1x gtceu:pyrolusite_dust")
        .inputFluids(Fluid.of("gtceu:nitrogen_dioxide").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:manganese_nitrate_dust")
        .EUt(GTValues.VHA[GTValues.MV])
        .duration(6 * 20);
};
