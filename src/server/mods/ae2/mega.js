// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Adjusts recipes for Mega Cells too.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustMegaCellsRecipes = (event) => {
    // wow, this works?
    event.remove({ id: "megacells:transform/sky_steel_ingot" });

    // replace accumulation circuits
    event
        .custom({
            type: "ae2:inscriber",
            mode: "inscribe",
            ingredients: {
                top: { item: "megacells:accumulation_processor_press" },
                middle: { tag: "forge:plates/sky_steel" },
            },
            result: { item: "megacells:printed_accumulation_processor" },
        })
        .id("megacells:inscriber/accumulation_processor_print");

    event.recipes.gtceu
        .forming_press("nijika:mods/ae2/printed_accumulation_circuit")
        .itemInputs("8x #forge:plates/sky_steel")
        .notConsumable("megacells:accumulation_processor_press")
        .itemOutputs("8x megacells:printed_accumulation_processor")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(2 * 20);

    event
        .custom({
            type: "ae2:inscriber",
            mode: "press",
            ingredients: {
                top: { item: "megacells:printed_accumulation_processor" },
                middle: { item: "gtceu:fine_rhodium_wire" },
                bottom: { tag: "nijika:wafers" },
            },
            result: { item: "megacells:accumulation_processor" },
        })
        .id("megacells:inscriber/accumulation_processor");

    event.recipes.gtceu
        .forming_press("nijika:mods/ae2/accumulation_circuit")
        .itemInputs(
            "8x megacells:printed_accumulation_processor",
            "8x #nijika:wafers",
            "16x gtceu:fine_rhodium_wire"
        )
        .itemOutputs("8x megacells:accumulation_processor")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(5 * 20);
};
