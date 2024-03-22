// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Adjusts a tiny handful of recipes for Create: Ore Excavation.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustCreateOreExcavationRecipes = (event) => {
    event.remove({ id: "createoreexcavation:drilling_machine" });
    event.remove({ output: "#createoreexcavation:drills" });

    event.recipes.gtceu
        .assembler("nijika:oreexcavation/drill")
        .itemInputs(
            "8x gtceu:hsla_steel_plate",
            "4x gtceu:hsla_steel_rod",
            "1x gtceu:hsla_steel_block",
            "8x gtceu:titanium_carbide_dust"
        )
        .itemOutputs("createoreexcavation:drill")
        .duration(2 * 20)
        .EUt(GTValues.VH[GTValues.LV])
        .circuit(3);

    event.recipes.gtceu
        .assembler("nijika:oreexcavation/drilling_machine")
        .itemInputs(
            "1x create:mechanical_drill",
            "16x create:brass_casing",
            "2x create:precision_mechanism",
            "4x create:electron_tube",
            "2x #gtceu:circuits/hv"
        )
        .itemOutputs("1x createoreexcavation:drilling_machine")
        .duration(20 * 20)
        .EUt(GTValues.VH[GTValues.HV]);

    event
        .shaped("1x createoreexcavation:vein_finder", ["EA ", "RS ", "  S"], {
            E: "#forge:gems/ender_eye",
            R: "#forge:foils/red_alloy",
            A: "#forge:gems/amethyst",
            S: "#forge:rods/wood",
        })
        .id("createoreexcavation:vein_finder");
};
