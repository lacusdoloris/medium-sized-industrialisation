// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { rewriteRailwayRecipes } from "./railways";

/**
 * Dumping ground for recipes that don't fit cleanly into other categories.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustVariousMiscRecipes = (event) => {
    event.remove({ id: "gtceu:shaped/sticky_piston_resin" });
    event.remove({ id: "minecraft:sticky_piston" });

    if (Platform.isLoaded("embers")) {
        // fundamentally the same as our recipe, but worse
        event.remove({ id: "embers:sticky_piston_adhesive" });
    }

    event
        .shaped("minecraft:sticky_piston", ["S", "P"], {
            S: "#nijika:glues",
            P: "minecraft:piston",
        })
        .id("nijika:misc/sticky_piston");

    event.remove({ id: "create:crafting/kinetics/sticky_mechanical_piston" });
    event
        .shaped("create:mechanical_piston", ["G", "P"], {
            G: "#nijika:glues",
            P: "creatte:mechanical_piston",
        })
        .id("nijika:misc/sticky_also_piston");

    event.remove({ id: "create:crafting/kinetics/super_glue" });
    event
        .shaped("create:super_glue", ["GP", "NG"], {
            G: "#nijika:glues",
            P: "#forge:plates/iron",
            N: "#forge:nuggets/iron",
        })
        .id("nijika:misc/super_glue");

    event.remove({ id: "gtceu:assembler/name_tag" });
    event.recipes.gtceu
        .assembler("nijika:misc/name_tag")
        .itemInputs("1x minecraft:paper", "1x #forge:string")
        .inputFluids(Fluid.of("gtceu:glue").withAmount(100 * FluidAmounts.MILLIBUCKET))
        .itemOutputs("minecraft:name_tag")
        .EUt(4)
        .duration(20);

    // make item filters a bit easier to get.
    event.remove({ id: "gtceu:shaped/item_filter" });
    event.remove({ id: "gtceu:arc_furnace/arc_item_filter" });
    event.remove({ id: "gtceu:macerator/macerate_item_filter" });

    event
        .shaped("1x gtceu:item_filter", [" F ", "FPF", " F "], {
            F: "#forge:foils/zinc",
            P: "#forge:plates/iron",
        })
        .id("nijika:misc/easier_gt_item_filter");

    // doesn't supplant the original. enjoy making glue.
    event
        .shapeless("1x gtceu:item_tag_filter", ["gtceu:item_filter", "minecraft:name_tag"])
        .id("nijika:misc/easier_gt_item_tag_filter");

    event.remove({ output: "gtceu:fluid_filter" });
    event
        .shapeless("1x gtceu:fluid_filter", ["gtceu:item_filter", "minecraft:bucket"])
        .id("nijika:misc/easier_gt_fluid_filter");

    event
        .shapeless("1x gtceu:fluid_tag_filter", ["gtceu:fluid_filter", "minecraft:name_tag"])
        .id("nijika:misc/easier_gt_fluid_tag_filter");

    event
        .shaped("minecraft:red_wool", ["VV", "VV"], { V: "minecraft:weeping_vines" })
        .id("nijika:misc/red_wool_from_vines");

    // easier books and maps
    event
        .shaped("4x minecraft:map", ["PPP", "PCP", "PPP"], {
            P: "#forge:plates/paper",
            C: "minecraft:compass",
        })
        .id("minecraft:map");

    event.recipes.create
        .compacting("1x minecraft:book", "4x #forge:plates/paper")
        .id("minecraft:book");

    event
        .shaped("minecraft:clock", [" I ", "IRI", " I "], {
            I: "#forge:ingots/corinthian_bronze",
            R: "#forge:dusts/redstone",
        })
        .id("minecraft:clock");

    event
        .shaped("minecraft:light_weighted_pressure_plate", ["II"], {
            I: "#forge:ingots/corinthian_bronze",
        })
        .id("minecraft:light_weighted_pressure_plate");

    // ghast tears from salt water
    event.recipes.gtceu
        .chemical_bath("nijika:misc/ghast_tears")
        .itemInputs("1x minecraft:blaze_powder")
        .inputFluids(Fluid.of("gtceu:salt_water").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("1x minecraft:ghast_tear")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(10 * 20);

    rewriteRailwayRecipes(event);
};
