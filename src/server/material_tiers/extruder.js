// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// https://sourcegraph.com/github.com/GregTechCEu/GregTech-Modern@e9a5704a58dd5735b2f445c31f440775760b2312/-/blob/src/main/java/com/gregtechceu/gtceu/data/recipe/generated/PartsRecipeHandler.java
// gears: material mass * 5
// small gears: material mass alone
// rotors: material mass * 4
// pipes: material mass * material countt
// bolts: fixed 15 ticks

import { getStackForTagPrefix, iterateOverAllMaterials } from "../../shared/utils";

// TODO: Consider keeping the tier multiplier for above-2800K items only.

const PropertyKey = Java.loadClass(
    "com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey"
);
const PIPE_TYPES = [
    ["tiny", 1, 2],
    ["small", 1, 1],
    ["normal", 3, 1],
    ["large", 6, 1],
    ["huge", 12, 1],
];

/**
 * Makes extruder plates to be made out of wrought iron, not steel.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustExtruderBasePlateRecipe = (event) => {
    event.remove({ id: "gtceu:shaped/shape_empty" });
    event
        .shaped("gtceu:empty_mold", ["PPP", "PPP", "PPP"], { P: "#forge:plates/wrought_iron" })
        .id("nijika:misc/shitty_mold_recipe");

    event.remove({ id: "gtceu:bender/empty_shape" });
    event.recipes.gtceu
        .bender("nijika:misc/better_mold_recipe")
        .itemInputs(`4x #forge:plates/wrought_iron`)
        .itemOutputs("gtceu:empty_mold")
        .circuit(4)
        .EUt(12)
        .duration(9 * 20);
};

/**
 * Moves down all relevant extruder recipes to LV.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const fixExtruderRecipeTier = (event) => {
    /**
     * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material
     */
    const generatePipes = (material, type) => {
        let modid = material.modid == "nijika" ? "gtceu" : material.modid;

        for (let [size_name, in_count, out_count] of PIPE_TYPES) {
            // item pipes don't have a tiny size.
            if (type == "item" && size_name == "tiny") {
                continue;
            }

            event.recipes.gtceu
                .extruder(`nijika:auto/pipes/${material.name}/${type}/${size_name}`)
                .itemInputs(Item.of(`#forge:ingots/${material.name}`).withCount(in_count))
                .notConsumable(`gtceu:${size_name}_pipe_extruder_mold`)
                .itemOutputs(
                    Item.of(`${modid}:${material.name}_${size_name}_${type}_pipe`).withCount(
                        out_count
                    )
                )
                .EUt(GTValues.VA[GTValues.LV])
                .duration(material.mass * in_count);
        }
    };

    for (let rubber of ["rubber", "styrene_butadiene_rubber", "silicone_rubber"]) {
        event.remove({ id: `gtceu:extruder/extrude_${rubber}_to_plate` });
        event.remove({ id: `gtceu:extruder/extrude_${rubber}_dust_to_plate` });

        event.recipes.gtceu
            .extruder(`nijika:auto/plates/${rubber}/from_ingot`)
            .itemInputs(`1x #forge:ingots/${rubber}`)
            .notConsumable(GTItems.SHAPE_EXTRUDER_PLATE.get())
            .itemOutputs(`gtceu:${rubber}_plate`)
            .EUt(16)
            .duration(0.25);
    }

    iterateOverAllMaterials((material) => {
        /** @type {Internal.ItemStack} */
        let inputType = getStackForTagPrefix(TagPrefix.ingot, material);
        let modid = material.modid == "nijika" ? "gtceu" : material.modid;

        // don't try and auto-generate recipes for non-ingot materials
        if (inputType.isEmpty()) return;
        if (material.hasProperty(PropertyKey.WOOD)) return;

        if (material.hasFlag(GTMaterialFlags.GENERATE_GEAR)) {
            event.recipes.gtceu
                .extruder(`nijika:auto/gears/regular/${material.name}`)
                .itemInputs(`4x #forge:ingots/${material.name}`)
                .notConsumable(GTItems.SHAPE_EXTRUDER_GEAR.get())
                .itemOutputs(`${modid}:${material.name}_gear`)
                .EUt(GTValues.VA[GTValues.LV])
                .duration(material.mass * 5);
        }

        if (material.hasFlag(GTMaterialFlags.GENERATE_SMALL_GEAR)) {
            event.recipes.gtceu
                .extruder(`nijika:auto/gears/small/${material.name}`)
                .itemInputs(`#forge:ingots/${material.name}`)
                .notConsumable(GTItems.SHAPE_EXTRUDER_GEAR_SMALL.get())
                .itemOutputs(`${modid}:small_${material.name}_gear`)
                .EUt(GTValues.VA[GTValues.LV])
                .duration(material.mass);
        }

        if (material.hasFlag(GTMaterialFlags.GENERATE_RING)) {
            event.recipes.gtceu
                .extruder(`nijika:auto/rings/${material.name}`)
                .itemInputs(`#forge:ingots/${material.name}`)
                .notConsumable(GTItems.SHAPE_EXTRUDER_RING.get())
                .itemOutputs(`${modid}:${material.name}_ring`)
                .EUt(GTValues.VA[GTValues.LV])
                .duration(material.mass);
        }

        if (material.hasFlag(GTMaterialFlags.GENERATE_ROTOR)) {
            event.recipes.gtceu
                .extruder(`nijika:auto/rotors/${material.name}`)
                .itemInputs(`4x #forge:ingots/${material.name}`)
                .notConsumable(GTItems.SHAPE_EXTRUDER_ROTOR.get())
                .itemOutputs(`${modid}:${material.name}_rotor`)
                .EUt(GTValues.VA[GTValues.LV])
                .duration(material.mass);
        }

        if (material.hasFlag(GTMaterialFlags.GENERATE_BOLT_SCREW)) {
            event.recipes.gtceu
                .extruder(`nijika:auto/bolts/${material.name}`)
                .itemInputs(`1x #forge:ingots/${material.name}`)
                .notConsumable(GTItems.SHAPE_EXTRUDER_BOLT.get())
                .itemOutputs(`8x ${modid}:${material.name}_bolt`)
                .EUt(GTValues.VA[GTValues.LV])
                .duration(15);
        }

        if (material.hasProperty(PropertyKey.FLUID_PIPE)) {
            // don't really care about the specifics
            generatePipes(material, "fluid");
        } else if (material.hasProperty(PropertyKey.ITEM_PIPE)) {
            generatePipes(material, "item");
        }
    });
};
