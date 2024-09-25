// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { MODPACK_SETTINGS } from "../settings";
import { shouldCrushedOreGiveByproducts } from "../shared/ores/utils";
import { getOreProperty, iterateOverAllMaterials } from "../shared/utils";
import { unfuckCoalRecipes } from "./misc/coal";

const SWAP_BRASS_PLATES = [
    "create:crafting/logistics/brass_tunnel",
    "create:crafting/logistics/brass_funnel",
    "create:item_application/brass_casing_from_log",
    "create:item_application/brass_casing_from_wood",
];

/**
 * Removes most of the manual tool recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
const cleanupManualToolRecipes = (event) => {
    event.remove({ output: "#forge:plates", input: "#forge:tools/hammers" });
    event.remove({ output: "#forge:foils", input: "#forge:tools/hammers" });
    event.remove({ input: "#forge:tools/mortars" });
    event.remove({ id: "gtceu:shaped/casing_ulv" });

    event.remove({ type: "minecraft:blasting" });
    event.remove({ id: "minecraft:blast_furnace" });

    // silent gear sadly adds two ingot recipes so we have to be a bit broader here
    for (let type of ["crafting_shaped", "crafting_shapeless"]) {
        event.remove({ output: "#forge:rods", input: "#forge:ingots", type: "minecraft:" + type });
    }

    if (Platform.isLoaded("silentgear")) {
        event.remove({ id: "silentgear:bronze_ingot" });
    }

    // wires aren't tagged. sigh. use the nuclear option of (gasp) regexps
    event.remove({
        input: "#forge:tools/wire_cutters",
        output: /gtceu:.*_single_wire/,
        type: "minecraft:crafting_shaped",
    });
    event.remove({
        output: "#forge:fine_wires",
        input: "#forge:tools/wire_cutters",
        type: "minecraft:crafting_shapeless",
    });

    event.remove({ input: "#forge:tools/wrenches", type: "minecraft:crafting_shaped" });

    // no more manual buzzsaw blades or turbine blades
    event.remove({ output: /gtceu:.*_buzz_saw_blade/, type: "minecraft:crafting_shaped" });
    event.remove({ output: /gtceu:.*_turbine_blade/, type: "minecraft:crafting_shaped" });

    let types = ["small_gears", "gears", "rotors", "bolts", "screws", "springs"];
    for (let itemType of types) {
        event.remove({ output: `#forge:${itemType}`, type: "minecraft:crafting_shaped" });
    }

    // manual ring removal, to prevent removing other tthings that are tagged rings like
    // curio rings.
    event.remove({ output: "#forge:rings", type: "minecraft:crafting_shaped", mod: "gtceu" });

    // remove all hatch/bus/etc recipes that use the screwdriver instead of glass.
    event.remove({
        output: /.*_(?:input|output)_(?:hatch|bus)/,
        input: "#forge:tools/screwdrivers",
    });

    // no more fucking hand-crafted casing recipes either!
    event.remove({
        output: /.*_casing/,
        input: "#forge:tools/hammers",
    });
    event.remove({
        output: /.*_frame/,
        input: "#forge:tools/wrenches",
    });

    // remove all hammer recipes
    event.remove({
        id: /gtceu:shaped\/hammer_.*/,
    });
    event.remove({
        input: /.*_hammer/,
    });
};

/**
 * Cleans up irrelevant rolling machine recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
const cleanupRollingMachineRecipes = (event) => {
    event.remove({
        output: "#forge:wires",
        type: "createaddition:rolling",
    });

    // this is so we don't add duplicate rod recipes.
    event.remove({
        output: "#forge:rods",
        type: "createaddition:rolling",
    });
};

/**
 * Fixes various Create recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
const fixupCreate = (event) => {
    for (let id of SWAP_BRASS_PLATES) {
        event.replaceInput({ id: id }, "#forge:ingots/brass", "#nijika:copper_alloy_plates");
    }

    for (let mod of ["create", "create_new_age", "railways", "createaddition"]) {
        event.replaceInput({ mod: mod }, "#forge:plates/brass", "#nijika:copper_alloy_plates");
    }

    event.remove({ id: "create:milling/coal" });
    event.remove({ id: "create:milling/charcoal" });
};

/**
 * Removes early tier GT generators.
 */
// eslint-disable-next-line no-unused-vars
const removeGTGenerators = (event) => {
    // TODO: should we actually do this?
};

/**
 * Cleans up some ore processing recipes that are manually added by GTCEu.
 *
 * The ones controlled by decomposition flags are already disabled.
 *
 * @param {Internal.RecipesEventJS} event
 */
const cleanupGTCEuOreProcessingRecipes = (event) => {
    // this has a custom electrolysis recipe
    event.remove({ id: "gtceu:electrolyzer/sphalerite_electrolysis" });

    // WHY does this give platinum.
    event.remove({ id: "gtceu:centrifuge/endstone_separation" });

    // remove macerator recipes for custom ore processors with invalid byproducts
    iterateOverAllMaterials((material) => {
        let oreProp = getOreProperty(material);
        if (oreProp === null) return;
        if (!material.hasFlag(GTMaterialFlags.NO_ORE_PROCESSING_TAB)) return;

        if (!shouldCrushedOreGiveByproducts(material, oreProp)) {
            event.remove({
                type: "gtceu:macerator",
                output: `#forge:crushed_ores/${material.name}`,
            });
        }
    });
};

/**
 * Performs various miscellaneous cleanups that aren't covered by other files.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const doCleanups = (event) => {
    // why?
    event.remove({ id: "gtceu:centrifuge/lava_separation" });

    event.remove({ input: /gtceu:prospector.*/ });
    event.remove({ id: "gtceu:arc_furnace/arc_prospector.luv" });
    event.remove({ id: "gtceu:macerator/macerate_prospector.luv" });
    event.remove({ id: /gtceu:shaped.*_kinetic_mixer/ });

    // too easy!
    event.remove({ output: "createaddition:electric_motor" });
    event.remove({ output: "createaddition:alternator" });

    // we have our own
    event.remove({ output: /.*battery.*/, type: "gtceu:canner" });

    cleanupGTCEuOreProcessingRecipes(event);

    if (MODPACK_SETTINGS.applyTierAdjustments) {
        // nuke all recycling recipes, they're mismatched to the wrong tier.
        event.remove({ type: "gtceu:arc_furnace", id: /arc_(?:(?:u?[lmheiu]|lu)v|zpm)_.*/ });
        event.remove({ type: "gtceu:macerator", id: /macerate_(?:(?:u?[lmheiu]|lu)v|zpm)_.*/ });
        event.remove({ type: "gtceu:arc_furnace", input: /.*(?:extruder|casting|empty)_mold/ });
        event.remove({ type: "gtceu:macerator", input: /.*(?:extruder|casting|empty)_mold/ });
        event.remove({ type: "gtceu:arc_furnace", id: /arc_.*steam.*/});
        event.remove({ type: "gtceu:macerator", id: /macerate_.*steam.*/ });

        event.remove({ input: "gtceu:pyrolyse_oven" });

        removeGTGenerators(event);

        // primitive blast furnace is replaced with the bessemer process.
        event.remove({ type: "gtceu:primitive_blast_furnace" });

        event.remove({ id: "gtceu:shapeless/dust_brass" });
    }

    if (MODPACK_SETTINGS.deleteToolRecipes) {
        cleanupManualToolRecipes(event);
        cleanupRollingMachineRecipes(event);

        // these just clog up the UI
        event.remove({ type: "gtceu:forge_hammer", output: "#forge:plates" });
    }

    fixupCreate(event);
    unfuckCoalRecipes(event);
};
