// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// MV!

import { GT_MACHINE_TIERS } from "../shared/definition";

/** @param {Internal.RecipesEventJS} event */
export const doTier02Content = (event) => {
    event.remove({ id: "gtceu:chemical_bath/kanthal_cool_down" });
    event.remove({ id: "gtceu:chemical_bath/kanthal_cool_down_distilled_water" });

    let mvTier = GT_MACHINE_TIERS.MV;

    // the distillation tower being at EV/HV means you can't build effective oil refining outposts
    // until *well* into the game. moving to MV makes sense as that's when you begin to get 
    // infinite ores, ae2, polyethylene, etc to make mass outpost building easier.
    event.remove({ id: "gtceu:shaped/distillation_tower" });
    event.remove({ id: "gtceu:macerator/macerate_distillation_tower" });
    event.remove({ id: "gtceu:arc_furnace/arc_distillation_tower" });

    event
        .shaped("gtceu:distillation_tower", ["CFC", "PHP", "CFC"], {
            C: "#gtceu:circuits/mv",
            F: "gtceu:vanadium_steel_large_fluid_pipe",
            P: "gtceu:mv_electric_pump",
            H: "gtceu:mv_machine_hull",
        })
        .id("nijika:tier03/distillation_tower_fixed");

    // mine is cooler.
    event.remove({ id: "gtceu:shaped/evaporation_plant" });
    event
        .shaped("gtceu:evaporation_pool", ["RGR", "CHC", "PBP"], {
            R: mvTier.materials.rotor.tagged("rotors"),
            G: mvTier.materials.glass,
            C: "#gtceu:circuits/mv",
            H: "gtceu:mv_machine_hull",
            P: "gtceu:mv_electric_pump",
            B: "#forge:plates/bronze",
        })
        .id("nijika:tier02/evaporation_pool");

    event.recipes.gtceu
        .evaporation_pool("nijika:tier02/basic_salt_water_production")
        .inputFluids(Fluid.of("minecraft:water").withAmount(250 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:salt_water").withAmount(50 * FluidAmounts.BUCKET))
        .chancedOutput("8x gtceu:sodium_hydroxide_dust", 5000.0, 0.0)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20 * 60);

    event.recipes.gtceu
        .assembler("nijika:tier02/nickel_cadmium_battery")
        .itemInputs(
            "4x gtceu:cadmium_dust",
            "2x gtceu:nickel_foil",
            "4x gtceu:polyethylene_foil",
            "1x gtceu:mv_battery_hull"
        )
        .itemOutputs("1x gtceu:mv_cadmium_battery")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(5 * 20);
};
