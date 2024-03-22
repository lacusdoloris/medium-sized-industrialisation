// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Adjusts recipes for the Modular Routers mod.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustModularRouterRecipes = (event) => {
    event.remove({ id: "modularrouters:void_module" });

    // modules now require polyethylene or pvc
    event.remove({ id: "modularrouters:blank_module" });
    event.recipes.gtceu
        .assembler("nijika:mods/routers/blank_module")
        .itemInputs("1x #gtceu:circuits/hv", "3x #forge:nuggets/gold")
        .inputFluids(Fluid.of("gtceu:polyethylene").withAmount(144 * FluidAmounts.MB))
        .itemOutputs("6x modularrouters:blank_module")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(5 * 20);

    // upgrades are easier
    event.remove({ id: "modularrouters:blank_upgrade" });
    event.recipes.gtceu
        .assembler("nijika:mods/routers/upgrade_module")
        .itemInputs("1x #forge:gems/lapis", "3x #forge:nuggets/gold")
        .inputFluids(Fluid.of("gtceu:polyethylene").withAmount(144 * FluidAmounts.MB))
        .itemOutputs("4x modularrouters:blank_upgrade")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(5 * 20);

    // the routers themselves now require a HV machine hull!
    event.remove({ id: "modularrouters:modular_router" });
    event.recipes.gtceu
        .assembler("nijika:mods/routers/modular_router")
        .itemInputs("1x gtceu:hv_machine_hull", "2x modularrouters:blank_module")
        .itemOutputs("1x modularrouters:modular_router")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(20);

    // stupid recipe, no need for bows or arrows.
    event.remove({ id: "modularrouters:sender_module_1" });

    event.remove({ id: "modularrouters:sender_module_3" });

    event.remove({ id: "modularrouters:speed_upgrade" });
    event.recipes.gtceu
        .chemical_bath("nijika:mods/routers/really_stupid_speed_upgrade")
        .itemInputs("1x modularrouters:blank_upgrade")
        .inputFluids(Fluid.of("gtceu:lubricant").withAmount(1 * FluidAmounts.BUCKET))
        .itemOutputs("1x modularrouters:speed_upgrade")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(10);

    event.remove({ id: "modularrouters:bulk_item_filter" });
    event
        .shapeless("1x modularrouters:bulk_item_filter", [
            "gtceu:item_filter",
            "modularrouters:blank_module",
        ])
        .id("nijika:mods/routers/bulk_item_filter");

    event.remove({ id: "modularrouters:tag_filter" });
    event
        .shapeless("1x modularrouters:tag_filter", [
            "modularrouters:bulk_item_filter",
            "minecraft:name_tag",
        ])
        .id("nijika:mods/routers/tag_filter");

    event.remove({ id: "modularrouters:inspection_filter" });
    event
        .shapeless("1x modularrouters:inspection_filter", [
            "modularrouters:bulk_item_filter",
            "minecraft:clock",
        ])
        .id("nijika:mods/routers/keep_an_eye_on_the_time");

    event.remove({ id: "modularrouters:pickup_delay_augment" });
    event.shapeless("modularrouters:pickup_delay_augment", [
        "1x modularrouters:augment_core",
        "#nijika:glues",
    ]);
};
