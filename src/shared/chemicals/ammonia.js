// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAcidicIntermediate } from "../materials/helpers";

export const addAmmoniaMaterials = (event) => {
    createAcidicIntermediate(event, "ammonium_hydroxide", 0xcdd6f7).components(
        "1x gtceu:ammonia",
        "1x gtceu:oxygen",
        "1x gtceu:hydrogen"
    );
};

/**
 * Adds recipes relating to ammonia.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addAmmoniaRecipes = (event) => {
    // NH3 + H2O ↽ − ⇀ NH+4 + OH−.
    // ammonium hydroxide -> ammonia + water
    event.recipes.gtceu
        .centrifuge("nijika:chemicals/ammonia/ammonium_hydroxide_centrifuging")
        .inputFluids(Fluid.of("gtceu:ammonium_hydroxide").withAmount(1 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:ammonia").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VH[GTValues.LV])
        .duration(10);

    // ... and the other way around.
    event.recipes.gtceu
        .mixer("nijika:chemicals/ammonia/ammonium_hydroxide_mixing")
        .outputFluids(Fluid.of("gtceu:ammonium_hydroxide").withAmount(1 * FluidAmounts.BUCKET))
        .inputFluids(
            Fluid.of("gtceu:ammonia").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VH[GTValues.LV])
        .duration(10);

    // N2 + 3 H2 = 2 NH3
    event.remove({ id: "gtceu:chemical_reactor/ammonia_from_elements" });
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/ammonia/haber_process")
        .inputFluids(
            Fluid.of("gtceu:nitrogen").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(6 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:ammonia").withAmount(2 * FluidAmounts.BUCKET))
        .duration(24 * 20)
        .EUt(384)
        .circuit(1);

    // Catalytic synthesis of ammonia with Iron (III) oxide.
    // This is significantly faster than the regular method.
    event.recipes.gtceu
        .haber_bosch_process("nijika:chemicals/ammonia/haber_process_catalysed")
        .itemInputs("1x gtceu:tiny_iron_oxide_dust")
        .inputFluids(
            Fluid.of("gtceu:nitrogen").withAmount(30 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(80 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:ammonia").withAmount(30 * FluidAmounts.BUCKET))
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(60 * 20);

    // Solvay process for ammonium chloride & soda ash.
    // CO2 + 2 NH3 + 2 NaCl + H2O => 2 NH4Cl + Na2CO3
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/ammonia/solvay_process")
        .itemInputs("2x gtceu:salt_dust")
        .inputFluids(
            Fluid.of("gtceu:ammonia").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:carbon_dioxide").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET)
        )
        .itemOutputs("2x gtceu:ammonium_chloride_dust", "1x gtceu:soda_ash_dust")
        .EUt(GTValues.VA[GTValues.MV])
        .circuit(2)
        .duration(2 * 20);

    // fix the ammonium chloride decomposition to not eat all the ammonia
    event.recipes.gtceu
        .electrolyzer("nijika:chemicals/ammonia/ammonium_chloride_decomposition")
        .itemInputs("1x gtceu:ammonium_chloride_dust")
        .outputFluids(
            Fluid.of("gtceu:ammonia").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrochloric_acid").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.LV])
        .duration(1 * 20);
};
