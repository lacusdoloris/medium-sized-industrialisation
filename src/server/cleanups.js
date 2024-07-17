// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { MODPACK_SETTINGS } from "../settings";
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
 */
const cleanupGTCEuOreProcessingRecipes = (event) => {
    // this has a custom electrolysis recipe 
    event.remove({ id: "gtceu:electrolyzer/sphalerite_electrolysis" });

    // WHY does this give platinum.
    event.remove({ id: "gtceu:centrifuge/endstone_separation" });
};

/** @param {Internal.RecipesEventJS} event */
export const doCleanups = (event) => {
    if (Platform.isLoaded("integrateddynamics")) {
        event.remove({ id: "integrateddynamics:smelting/menril_log_coal" });
        event.remove({ id: "integrateddynamics:smelting/menril_log_filled_coal" });
        event.remove({ id: "integrateddynamics:blasting/menril_log_coal" });

        event.remove({ type: "integrateddynamics:drying_basin" });
        event.remove({ type: "integrateddynamics:mechanical_drying_basin" });
        event.remove({ type: "integrateddynamics:squeezer" });
        event.remove({ type: "integrateddynamics:mechanical_squeezer" });
    }

    // why?
    event.remove({ id: "gtceu:centrifuge/lava_separation" });

    event.remove({ id: "gtceu:arc_furnace/arc_prospector.luv" });
    event.remove({ id: "gtceu:macerator/macerate_prospector.luv" });

    event.remove({ id: /gtceu:shaped.*_kinetic_mixer/ });

    // too easy!
    event.remove({ output: "createaddition:electric_motor" });
    event.remove({ output: "createaddition:alternator" });

    // we have our own
    event.remove({ output: /.*battery.*/, type: "gtceu:canner" });

    cleanupGTCEuOreProcessingRecipes(event);

    // remove all circuit assembler recipes that use liquid tin. this keeps lead relevant
    // throughout the entire game.
    // requires a bit of a hack as KJS seemingly can't match on the fluid input?
    // event.remove({input: "gtceu:tin", type: "gtceu:circuit_assembler"});
    event.remove({ type: "gtceu:circuit_assembler", not: { id: /.*_soldering_alloy$/ } });

    if (MODPACK_SETTINGS.applyTierAdjustments) {
        // nuke all recycling recipes, they're mismatched to the wrong tier.
        event.remove({ type: "gtceu:arc_furnace", id: /arc_(?:(?:u?[lmheiu]|lu)v|zpm)_.*/ });
        event.remove({ type: "gtceu:macerator", id: /macerate_(?:(?:u?[lmheiu]|lu)v|zpm)_.*/ });
        event.remove({ type: "gtceu:arc_furnace", input: /.*(?:extruder|casting|empty)_mold/ });
        event.remove({ type: "gtceu:macerator", input: /.*(?:extruder|casting|empty)_mold/ });

        event.remove({ input: "gtceu:pyrolyse_oven" });

        removeGTGenerators(event);

        // primitive blast furnace is replaced with the bessemer process.
        event.remove({ type: "gtceu:primitive_blast_furnace" });

        event.remove({ id: "gtceu:shapeless/dust_brass" });
    }

    if (MODPACK_SETTINGS.deleteToolRecipes) {
        cleanupManualToolRecipes(event);
        cleanupRollingMachineRecipes(event);
    }

    fixupCreate(event);
    unfuckCoalRecipes(event);
};
