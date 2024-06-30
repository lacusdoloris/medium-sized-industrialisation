// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

const PropertyKey = Java.loadClass(
    "com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey"
);

import { iterateOverAllMaterials } from "../../shared/utils";
import { GT_WIRE_TYPES } from "../../shared/definition";
import { BASE_ORES } from "../../shared/ores/bocchi";

// don't want to make it obviously superior to the bending machine, so this only supports a
// short list.
/**
 * A list of specific plates that should get a pressing recipe.
 */
const SPECIFIC_PLATES = [
    "magnetic_iron",
    "rubber",
    "wrought_iron",
    "bronze",
    "silver",
    "tin",
    "corinthian_bronze",
];

/**
 * Adds automatic Create-based recipes for LV/MV tier materials.
 *
 * @param {Internal.RecipesEventJS} event
 */
const addCreateLvMvMaterialRecipes = (event) => {
    /** @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material */
    const addWireRecipes = (material, addRod) => {
        // let the record show that I got really fucking confused by this and wondered why
        // i couldn't find any wiremill recipes for the wires, only to realise I needed to swap
        // pages on EMI.

        if (material.hasFlag(GTMaterialFlags.GENERATE_FINE_WIRE)) {
            event.recipes.createaddition
                .rolling(
                    `2x gtceu:fine_${material.name}_wire`,
                    `1x gtceu:${material.name}_single_wire`
                )
                .id(`nijika:auto/wires/${material.name}_fine_wire`);
        }

        // rolling machine recipes for wires from rods
        if (addRod) {
            event.recipes.createaddition
                .rolling(`1x gtceu:${material.name}_single_wire`, `1x #forge:rods/${material.name}`)
                .id(`nijika:auto/wires/${material.name}`);
        }

        /** @type {Internal.WireProperties} */
        let wireProps = material.getProperty(PropertyKey.WIRE);

        // MV and lower wires get a spout filling recipe ONLY
        if (wireProps.voltage <= GTValues.V[GTValues.MV] && !wireProps.isSuperconductor()) {
            // additionally, single wires get a deployer covering recipe
            event.recipes.create
                .deploying(`1x gtceu:${material.name}_single_cable`, [
                    "1x gtceu:rubber_plate",
                    `1x gtceu:${material.name}_single_wire`,
                ])
                .id(`nijika:auto/cables/${material.name}_deploying`);

            for (let [multiplier, type] of GT_WIRE_TYPES) {
                event.recipes.create
                    .filling(`1x gtceu:${material.name}_${type}_cable`, [
                        `1x gtceu:${material.name}_${type}_wire`,
                        Fluid.of("gtceu:rubber").withAmount(144 * FluidAmounts.MB * multiplier),
                    ])
                    .id(`nijika:auto/cables/${material.name}_${type}`);

                // make sure there's no rubber plate recipe anymore

                event.remove({ id: `gtceu:shapeless/${material.name}_cable_${multiplier}` });
            }
        }
    };

    iterateOverAllMaterials((material) => {
        let id = material.name;
        let modId = material.modid == "nijika" ? "gtceu" : material.modid;
        let hasWire = material.hasProperty(PropertyKey.WIRE);
        let hasIngot = material.hasProperty(PropertyKey.INGOT);
        let hasRod = material.hasFlag(GTMaterialFlags.GENERATE_ROD);

        if (material.hasFlag(GTMaterialFlags.GENERATE_FOIL)) {
            if (!Item.exists(`${modId}:${id}_foil`)) {
                console.warn("missing foil for " + modId + ":" + id + "???");
            } else {
                event.recipes.createaddition
                    .rolling(`2x ${modId}:${id}_foil`, `#forge:plates/${id}`)
                    .id(`nijika:auto/foil/${id}`);
            }
        }

        // auto-generate millstone + crushing wheel recipes for mortar recipes.
        if (material.hasFlag(GTMaterialFlags.MORTAR_GRINDABLE)) {
            // bc coal is fucked up
            if (material.name == "coal") {
                return;
            }

            let recipeId = `nijika:auto/dust/${id}`;
            if (hasIngot) {
                event.recipes.create
                    .milling(`1x ${modId}:${id}_dust`, `#forge:ingots/${id}`)
                    .id(recipeId);
            } else if (material.hasProperty(PropertyKey.GEM)) {
                event.recipes.create
                    .milling(`1x ${modId}:${id}_dust`, `#forge:gems/${id}`)
                    .id(recipeId);
            }
        }

        // auto-generate crushing wheel recipes for ores
        if (material.hasProperty(PropertyKey.ORE) && id !== "gold") {
            event.recipes.create
                .crushing(`1x ${modId}:crushed_${id}_ore`, `1x #forge:raw_materials/${id}`)
                .id(`nijika:auto/create/ore/${id}_raw_to_crushed`);
            event.recipes.create
                .crushing(`1x ${modId}:impure_${id}_dust`, `1x ${modId}:crushed_${id}_ore`)
                .id(`nijika:auto/create/ore/${id}_crushed_to_impure`);

            // weird if statement lets us combine everything into one chain rather than a nested
            // if.
            if (typeof BASE_ORES[id] !== "undefined") {
                // pass
            } else if (id === "redstone") {
                event.recipes.create
                    .splashing("1x minecraft:redstone", `1x ${modId}:impure_${id}_dust`)
                    .id(`nijika:auto/create/ore/${id}_impure_to_dust`);
            } else {
                event.recipes.create
                    .splashing(`1x ${modId}:${id}_dust`, `1x ${modId}:impure_${id}_dust`)
                    .id(`nijika:auto/create/ore/${id}_impure_to_dust`);
            }
        }

        if (hasRod && hasIngot) {
            // yeeah, idk either. thanks gtceu.
            if (Item.exists(`${modId}:${id}_rod`)) {
                event.recipes.createaddition
                    .rolling(`1x ${modId}:${id}_rod`, `1x #forge:ingots/${id}`)
                    .id(`nijika:auto/rods/${id}`);
            } else if (id !== "wood") {
                console.log("what the fuck, gtceu? missing a rod for " + id);
            }
        }

        if (hasWire) {
            addWireRecipes(material, hasRod);
        }
    });
};

/**
 * Adds pressing recipes for the plates that are otherwise missing it.
 *
 * @param {Internal.RecipesEventJS} event
 */
const addPressingRecipes = (event) => {
    for (let plate of SPECIFIC_PLATES) {
        event.recipes.create
            .pressing(`1x gtceu:${plate}_plate`, `1x #forge:ingots/${plate}`)
            .id(`nijika:common/pressing/${plate}`);
    }
};

/**
 * Adds early-game Create recipes.
 */
export const addCreateRecipes = (event) => {
    addCreateLvMvMaterialRecipes(event);
    addPressingRecipes(event);
};
