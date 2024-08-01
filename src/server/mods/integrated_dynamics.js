// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// i considered using the gtceu material system for partt of this...
// but it constantly crashed with cryptic fucking errors about missing items.
//
// i could just let it generate the materials anyway and use almostunified to beat it into shape
// but that seems wasteful.

/**
 * Adjusts the recipes for the Integrated Dynamics mod.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustIntegratedDynamicsRecipes = (event) => {
    event.remove({ id: "integrateddynamics:smelting/menril_log_coal" });
    event.remove({ id: "integrateddynamics:smelting/menril_log_filled_coal" });
    event.remove({ id: "integrateddynamics:blasting/menril_log_coal" });

    event.remove({ type: "integrateddynamics:drying_basin" });
    event.remove({ type: "integrateddynamics:mechanical_drying_basin" });
    event.remove({ type: "integrateddynamics:squeezer" });
    event.remove({ type: "integrateddynamics:mechanical_squeezer" });

    // first we need to actually re-add the menril processing lol!
    event.recipes.gtceu
        .centrifuge("nijika:mods/id/menril_chunk")
        .itemInputs("#integrateddynamics:menril_logs")
        .chancedOutput("integrateddynamics:crystalized_menril_chunk", 5000.0, 1200.0)
        .chancedOutput("gtceu:plant_ball", 3750, 900.0)
        .outputFluids(
            Fluid.of("integrateddynamics:menril_resin").withAmount(1 * FluidAmounts.INGOT)
        )
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(5 * 20);

    event.recipes.gtceu
        .autoclave("nijika:mods/id/menril_chunk_from_autoclave")
        .inputFluids(Fluid.of("integrateddynamics:menril_resin").withAmount(9 * FluidAmounts.INGOT))
        .itemOutputs("9x integrateddynamics:crystalized_menril_chunk")
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(10 * 20)
        .circuit(1);

    event.recipes.gtceu
        .extractor("nijika:mods/id/menril_resin_from_chunk")
        .itemInputs("1x integrateddynamics:crystalized_menril_chunk")
        .outputFluids(
            Fluid.of("integrateddynamics:menril_resin").withAmount(1 * FluidAmounts.INGOT)
        )
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(10);

    event.recipes.gtceu
        .autoclave("nijika:mods/id/menril_glass")
        .inputFluids(
            Fluid.of("integrateddynamics:menril_resin").withAmount(1 * FluidAmounts.BUCKET)
        )
        .itemInputs("#forge:dusts/glass")
        .itemOutputs("integratedterminals:menril_glass")
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(10 * 20)
        .circuit(2);

    // also chorus processing
    event.recipes.gtceu
        .centrifuge("nijika:mods/id/chorus_chunks")
        .itemInputs("minecraft:popped_chorus_fruit")
        .itemOutputs("2x integrateddynamics:crystalized_chorus_chunk")
        .chancedOutput("integrateddynamics:crystalized_chorus_chunk", 5000, 900.0)
        .outputFluids(
            Fluid.of("integrateddynamics:liquid_chorus").withAmount(125 * FluidAmounts.MB)
        )
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(5 * 20);

    event.recipes.gtceu
        .autoclave("nijika:mods/id/chorus_chunk_from_autoclave")
        .inputFluids(
            Fluid.of("integrateddynamics:liquid_chorus").withAmount(1 * FluidAmounts.BUCKET)
        )
        .itemOutputs("9x integrateddynamics:crystalized_chorus_chunk")
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(10 * 20)
        .circuit(1);

    event.recipes.gtceu
        .centrifuge("nijika:mods/id/chorus_chunk_from_protochorus")
        .itemInputs("2x integrateddynamics:proto_chorus")
        .itemOutputs("integrateddynamics:crystalized_chorus_chunk")
        .chancedOutput("gtceu:beryllium_hydride_dust", 7000.0, 350.0)
        .outputFluids(
            Fluid.of("integrateddynamics:liquid_chorus").withAmount(125 * FluidAmounts.MB)
        )
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(5 * 20);
};
