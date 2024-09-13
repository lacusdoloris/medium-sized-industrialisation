// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

export const adjustAe2CircuitRecipes = (event) => {
    // lol!
    event.recipes.gtceu
        .chemical_bath("nijika:mods/ae2/mysterious_cube")
        .itemInputs("32x #gtceu:circuits/lv")
        .inputFluids(Fluid.of("create:chocolate").withAmount(1500 * FluidAmounts.MB))
        .itemOutputs("1x ae2:mysterious_cube")
        .duration(60 * 20)
        .EUt(GTValues.V[GTValues.LV])
        .circuit(17);

    // logic circuits now use electrum rather than gold
    event.remove({ id: "jei:/ae2/inscriber/logic_processor_print" });
    event
        .custom({
            type: "ae2:inscriber",
            mode: "inscribe",
            ingredients: {
                top: { item: "ae2:logic_processor_press" },
                middle: { tag: "forge:ingots/electrum" },
            },
            result: { item: "ae2:printed_logic_processor" },
        })
        .id("ae2:inscriber/logic_processor_print");

    // replace printed silicon with silicon wafers
    // has to be done manually, as replaceInput doesn't work.
    event
        .custom({
            type: "ae2:inscriber",
            mode: "press",
            ingredients: {
                top: { item: "ae2:printed_logic_processor" },
                middle: { item: "gtceu:fine_copper_wire" },
                bottom: { tag: "nijika:wafers" },
            },
            result: { item: "ae2:logic_processor" },
        })
        .id("ae2:inscriber/logic_processor");

    event
        .custom({
            type: "ae2:inscriber",
            mode: "press",
            ingredients: {
                top: { item: "ae2:printed_engineering_processor" },
                middle: { item: "gtceu:fine_copper_wire" },
                bottom: { tag: "nijika:wafers" },
            },
            result: { item: "ae2:engineering_processor" },
        })
        .id("ae2:inscriber/engineering_processor");

    event
        .custom({
            type: "ae2:inscriber",
            mode: "press",
            ingredients: {
                top: { item: "ae2:printed_calculation_processor" },
                middle: { item: "gtceu:fine_copper_wire" },
                bottom: { tag: "nijika:wafers" },
            },
            result: { item: "ae2:calculation_processor" },
        })
        .id("ae2:inscriber/calculation_processor");

    // add formation press recipes for the AE2 circuits in EV and above
    event.recipes.gtceu
        .forming_press("nijika:mods/ae2/printed_logic_circuit")
        .itemInputs("8x #forge:plates/electrum")
        .notConsumable("ae2:logic_processor_press")
        .itemOutputs("8x ae2:printed_logic_processor")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(2 * 20);

    event.recipes.gtceu
        .forming_press("nijika:mods/ae2/printed_calculation_circuit")
        .itemInputs("8x #forge:plates/certus_quartz")
        .notConsumable("ae2:calculation_processor_press")
        .itemOutputs("8x ae2:printed_calculation_processor")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(2 * 20);

    event.recipes.gtceu
        .forming_press("nijika:mods/ae2/printed_engineering_circuit")
        .itemInputs("8x #forge:plates/diamond")
        .notConsumable("ae2:engineering_processor_press")
        .itemOutputs("8x ae2:printed_engineering_processor")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(2 * 20);

    // recipes for the actual circuits themselves
    event.recipes.gtceu
        .forming_press("nijika:mods/ae2/logic_circuit")
        .itemInputs(
            "8x ae2:printed_logic_processor",
            "8x #nijika:wafers",
            "16x gtceu:fine_platinum_wire"
        )
        .itemOutputs("8x ae2:logic_processor")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(5 * 20);

    event.recipes.gtceu
        .forming_press("nijika:mods/ae2/engineering_circuit")
        .itemInputs(
            "8x ae2:printed_engineering_processor",
            "8x #nijika:wafers",
            "16x gtceu:fine_platinum_wire"
        )
        .itemOutputs("8x ae2:engineering_processor")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(5 * 20);

    event.recipes.gtceu
        .forming_press("nijika:mods/ae2/calculation_circuit")
        .itemInputs(
            "8x ae2:printed_calculation_processor",
            "8x #nijika:wafers",
            "16x gtceu:fine_platinum_wire"
        )
        .itemOutputs("8x ae2:calculation_processor")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(5 * 20);
};
