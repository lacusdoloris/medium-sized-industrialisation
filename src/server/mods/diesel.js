// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Adjusts recipes for Create: Diesel Generators.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustDieselGeneratorRecipes = (event) => {
    event.replaceInput(
        { mod: "createdieselgenerators" },
        "#forge:plates/brass",
        "#nijika:copper_alloy_plates"
    );
    event.replaceInput(
        { mod: "createdieselgenerators" },
        "#forge:storage_blocks/brass",
        "#nijika:copper_alloy_blocks"
    );

    event.remove({ id: "createdieselgenerators:compacting/plant_oil" });
    event.remove({ id: "createdieselgenerators:distillation/crude_oil" });
    event.remove({ id: "createaddition:liquid_burning/crude_oil" });
    event
        .custom({
            type: "createdieselgenerators:distillation",
            ingredients: [{ fluid: "gtceu:oil_heavy", amount: 100 }],
            heatRequirement: "heated",
            processingTime: 40, // ?, I assume this is ticks? twice as slow as the distillation tower
            results: [
                { fluid: "gtceu:heavy_fuel", amount: 125 },
                { fluid: "gtceu:light_fuel", amount: 20 },
            ],
        })
        .id("nijika:mods/dieselgenerators/early_game_distillation");

    event.remove({ output: "createdieselgenerators:engine_piston" });
    event
        .shaped("createdieselgenerators:engine_piston", ["A  ", " R ", "  I"], {
            A: "create:andesite_alloy",
            R: "#forge:rods/iron",
            I: "#forge:nuggets/iron",
        })
        .id("nijika:mods/dieselgenerators/engine_piston");

    event
        .shaped("2x createdieselgenerators:engine_turbocharger", ["AZF", "PGP", "AZF"], {
            A: "create:andesite_alloy",
            F: "create:fluid_pipe",
            P: "#forge:plates/steel",
            G: "#forge:gears/steel",
            Z: "#forge:plates/zinc",
        })
        .id("createdieselgenerators:crafting/engine_turbocharger");

    event
        .shaped("2x createdieselgenerators:pumpjack_bearing", ["ABA", "BPB", "ABA"], {
            A: "create:andesite_alloy",
            B: "#forge:plates/bronze",
            P: "create:mechanical_bearing",
        })
        .id("createdieselgenerators:crafting/pumpjack_bearing");

    // fuck RIGHT off
    event.remove({ id: "createdieselgenerators:mechanical_crafting/pumpjack_crank" });
    event
        .shaped("createdieselgenerators:pumpjack_crank", ["ASA", "GSG", "PPP"], {
            A: "create:andesite_alloy",
            S: "create:shaft",
            G: "#forge:gears/iron",
            P: "#forge:plates/wrought_iron",
        })
        .id("nijika:mods/dieselgenerators/pumpjack_crank");

    event
        .shaped("createdieselgenerators:pumpjack_head", ["WWW", "WSW", "WSW"], {
            W: "#forge:plates/wrought_iron",
            S: "create:shaft",
        })
        .id("createdieselgenerators:crafting/pumpjack_head");
};
