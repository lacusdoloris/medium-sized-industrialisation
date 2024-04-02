// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Adjusts recipes for network blocks.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustAe2NetworkRecipes = (event) => {
    // most of these are simple plate replacements...

    event
        .shaped("ae2:inscriber", ["IPI", "C I", "IPI"], {
            I: "#forge:plates/iron",
            P: "gtceu:lv_electric_piston",
            C: "#forge:plates/copper",
        })
        .id("ae2:network/blocks/inscribers");

    event
        .shaped("ae2:drive", ["PCP", "G G", "PCP"], {
            P: "#forge:plates/iron",
            C: "ae2:engineering_processor",
            G: "ae2:fluix_glass_cable",
        })
        .id("ae2:network/blocks/storage_drive");

    // had to really weigh up the "be a bastard" instinct here...
    event
        .shaped("ae2:interface", ["PGP", "1C2", "PGP"], {
            P: "#forge:plates/wrought_iron",
            G: "#forge:glass",
            1: "ae2:annihilation_core",
            2: "ae2:formation_core",
            C: "#gtceu:circuits/lv",
        })
        .id("ae2:network/blocks/interfaces_interface");

    event
        .shaped("ae2:pattern_provider", ["PTP", "1M2", "PTP"], {
            P: "#forge:plates/iron",
            T: "#forge:workbench",
            1: "ae2:annihilation_core",
            2: "ae2:formation_core",
            M: "ae2:interface",
        })
        .id("ae2:network/blocks/pattern_providers_interface");

    event
        .shaped("ae2:molecular_assembler", ["PGP", "1T2", "PGP"], {
            P: "#forge:plates/iron",
            T: "#forge:workbench",
            1: "ae2:annihilation_core",
            2: "ae2:formation_core",
            G: "ae2:quartz_glass",
        })
        .id("ae2:network/crafting/molecular_assembler");

    event
        .shaped("ae2:crafting_unit", ["P1P", "W2W", "P1P"], {
            P: "#forge:plates/polyvinyl_chloride",
            W: "ae2:fluix_glass_cable",
            1: "ae2:calculation_processor",
            2: "ae2:logic_processor",
        })
        .id("ae2:network/crafting/cpu_crafting_unit");

    // TODO: Co-processor units, once we get the Speculative Execution Unit.

    event
        .shapeless("ae2:storage_bus", [
            "#ae2:interface",
            "gtceu:lv_electric_piston",
            "#nijika:glues",
        ])
        .id("ae2:network/parts/storage_bus");

    event
        .shaped("ae2:import_bus", [" A ", "IPI"], {
            A: "ae2:annihilation_core",
            I: "#forge:plates/iron",
            P: "gtceu:lv_electric_piston",
        })
        .id("ae2:network/parts/import_bus");

    event
        .shaped("ae2:export_bus", ["IPI", " F "], {
            F: "ae2:formation_core",
            I: "#forge:plates/iron",
            P: "gtceu:lv_electric_piston",
        })
        .id("ae2:network/parts/export_bus");
};
