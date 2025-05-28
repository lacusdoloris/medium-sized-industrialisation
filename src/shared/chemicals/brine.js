// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createChemicalIntermediate } from "../materials/helpers";

export const addBrineMaterials = (event) => {
    createChemicalIntermediate(event, "potassium_fluoride", 0x889e9c, true).components(
        "1x gtceu:potassium",
        "1x gtceu:fluorine"
    );
};

// refs:
// Sustainable potassium chloride production from concentrated KCl brine via  a membrane-promoted crystallization process
// (https://doi.org/10.1016/j.desal.2021.115389)

/**
 * Adds brine-related recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addBrineRecipes = (event) => {
    event.remove({ id: "gtceu:evaporation/brine_evaporation" });

    event.recipes.gtceu
        .evaporation_pool("nijika:chemicals/brine/brine_evaporation")
        .inputFluids(Fluid.of("gtceu:salt_water").withAmount(200 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:raw_brine").withAmount(35 * FluidAmounts.BUCKET))
        .EUt(GTValues.V[GTValues.MV])
        .duration(300 * 20);

    // KOH + HF = KF + H2O
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/brine/potassium_fluoride")
        .itemInputs("1x gtceu:potassium_hydroxide_dust")
        .itemOutputs("1x gtceu:potassium_fluoride_dust")
        .inputFluids(Fluid.of("gtceu:hydrofluoric_acid").withAmount(1 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(48);

    // calcium hydroxide preparation
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/misc/calcium_hydroxide")
        .inputFluids(Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET))
        .itemInputs("1x gtceu:quicklime_dust")
        .itemOutputs("1x gtceu:calcium_hydroxide_dust")
        .EUt(GTValues.VH[GTValues.ULV])
        .duration(10);

    // wwhy the fuck is this MV lol
    event.remove({ id: "gtceu:chemical_reactor/calcium_hydroxide" });
    event.remove({ id: "gtceu:large_chemical_reactor/calcium_hydroxide" });

    // calcium hydroxide neutralisation
    // 2 HCl + Ca(OH)2 = CaCl2 + 2 H2O
    // TODO: Ammonia recipe?
    event.remove({ id: "gtceu:electrolyzer/decomposition_electrolyzing_calcium_hydroxide" });
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/misc/calcium_hydroxide_neutralisation")
        .itemInputs("gtceu:calcium_hydroxide_dust")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:calcium_chloride_dust")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(2 * 20);
};
