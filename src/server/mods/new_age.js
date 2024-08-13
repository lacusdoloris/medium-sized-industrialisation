// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { GT_MACHINE_TIERS } from "../../shared/definition";

/**
 * Adjusts recipes for the Create: New Age mod.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustCreateNewAgeRecipes = (event) => {
    // new age has some janky recipes, you can easily make a fluxated magnet and not
    // bother with the inbetweens.
    // for now, the only available magnets are the basic magnet (magnetic iron) and the fluxated
    // magnet (neodymium).
    // TODO: look into gtnh recipes, possibly?

    event.remove({ id: "create_new_age:shaped/redstone_magnet" });
    event.remove({ id: "create_new_age:shaped/layered_magnet" });
    event.remove({ id: "create_new_age:shaped/fluxuated_magnetite" });
    event.remove({ id: "create_new_age:shaped/netherite_magnet" });

    event.remove({ type: "create_new_age:energising" });

    event
        .shaped("4x create_new_age:redstone_magnet", ["WFW", "FIF", "WFW"], {
            F: "#forge:foils/magnetic_iron",
            I: "#forge:storage_blocks/iron",
            W: "gtceu:red_alloy_single_wire",
        })
        .id("nijika:mods/new_age/weak_magnet");

    event
        .shaped("1x create_new_age:fluxuated_magnetite", ["FFF", "FMF", "FFF"], {
            F: "#forge:foils/magnetic_steel",
            M: "create_new_age:redstone_magnet",
        })
        .id("nijika:mods/new_age/fluxated_magnet");

    event
        .shaped("1x create_new_age:netherite_magnet", ["FFF", "FMF", "FFF"], {
            F: "#forge:foils/magnetic_neodymium",
            M: "create_new_age:fluxuated_magnetite",
        })
        .id("nijika:mods/new_age/strong_magnet");

    event.remove({ id: "create_new_age:shaped/generator_coil" });
    event
        .shaped("1x create_new_age:generator_coil", ["WWW", "WAW", "WWW"], {
            W: "#forge:fine_wires/copper",
            A: "#forge:storage_blocks/andesite_alloy",
        })
        .id("nijika:mods/new_age/generator_coil");

    event.remove({ id: "create_new_age:shaped/carbon_brushes" });
    event
        .shaped("1x create_new_age:carbon_brushes", ["PSP", "CMC", "PSP"], {
            P: "#forge:plates/iron",
            S: "create:shaft",
            M: "gtceu:lv_electric_motor",
            C: "#nijika:carbon_rich_dusts",
        })
        .id("nijika:mods/new_age/carbon_brushes");

    // == Electric Motors == //
    event.remove({ id: "create_new_age:shaped/basic_motor" });
    event.recipes.gtceu
        .assembler("nijika:mods/new_age/basic_motor")
        .itemInputs("2x gtceu:lv_electric_motor", "1x create:andesite_casing", "1x create:shaft")
        .itemOutputs("1x create_new_age:basic_motor")
        .EUt(GTValues.VH[GTValues.MV])
        .duration(2 * 20);

    event.remove({ id: "create_new_age:shaped/advanced_motor" });
    event.recipes.gtceu
        .assembler("nijika:mods/new_age/advanced_motor")
        .itemInputs("2x gtceu:mv_electric_motor", "1x create:brass_casing", "1x create:shaft")
        .itemOutputs("1x create_new_age:advanced_motor")
        .EUt(GTValues.VH[GTValues.HV])
        .duration(4 * 20);

    event.remove({ id: "create_new_age:reinforced_motor" });
    event.recipes.gtceu
        .assembler("nijika:mods/new_age/reinforced_motor")
        .itemInputs(
            "2x gtceu:hv_electric_motor",
            "2x create:brass_casing",
            "2x create:shaft",
            "4x gtceu:silicone_rubber_ring"
        )
        .itemOutputs("1x create_new_age:reinforced_motor")
        .EUt(GTValues.VH[GTValues.EV])
        .duration(8 * 20);

    // == Motor Extensions == //
    event.remove({ id: "create_new_age:shaped/basic_motor_extension" });
    event.recipes.gtceu
        .assembler("nijika:mods/new_age/basic_motor_extension")
        .itemInputs(
            "4x gtceu:mv_electric_motor",
            "2x create_new_age:basic_motor",
            "2x #gtceu:circuits/mv",
            `4x ${GT_MACHINE_TIERS.MV.doubleMotorWire}`,
            "1x create:rotation_speed_controller"
        )
        .itemOutputs("1x create_new_age:basic_motor_extension")
        .EUt(GTValues.VH[GTValues.MV])
        .duration(5 * 20);

    event.remove({ id: "create_new_age:advanced_motor_extension" });
    event.recipes.gtceu
        .assembler("nijika:mods/new_age/strong_motor_extension")
        .itemInputs(
            "4x gtceu:ev_electric_motor",
            "2x create_new_age:reinforced_motor",
            "2x #gtceu:circuits/ev",
            `4x ${GT_MACHINE_TIERS.EV.doubleMotorWire}`,
            "1x create:rotation_speed_controller"
        )
        .itemOutputs("1x create_new_age:advanced_motor_extension")
        .EUt(GTValues.VH[GTValues.EV])
        .duration(10 * 20);
};
