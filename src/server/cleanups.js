import { MODPACK_SETTINGS } from "../settings";

const SWAP_BRASS_PLATES = [
    "create:crafting/logistics/brass_tunnel",
    "create:crafting/logistics/brass_funnel",
    "create:item_application/brass_casing_from_log",
    "create:item_application/brass_casing_from_wood"
];

/** 
 * Removes most of the manual tool recipes.
 * 
 * @param {Internal.RecipesEventJS} event 
 */
const cleanupManualToolRecipes = (event) => {
    event.remove({output: "#forge:plates", input: "#forge:tools/hammers",});
    event.remove({output: "#forge:foils", input: "#forge:tools/hammers"})
    event.remove({output: "#forge:dusts", input: "#forge:tools/mortars"});

    // silent gear sadly adds two ingot recipes so we have to be a bit broader here
    for (let type of ["crafting_shaped", "crafting_shapeless"]) {
        event.remove({output: "#forge:rods", input: "#forge:ingots", type: "minecraft:" + type});
    }

    event.remove({id: "silentgear:bronze_ingot"});

    // wires aren't tagged. sigh. use the nuclear option of (gasp) regexps
    event.remove({
        input: "#forge:tools/wire_cutters",
        output: /gtceu:(.*)_single_wire/,
        type: "minecraft:crafting_shaped"
    });
    event.remove({
        output: "#forge:fine_wires",
        input: "#forge:tools/wire_cutters",
        type: "minecraft:crafting_shapeless",
    });

    // same with pipes
    event.remove({
        input: "#forge:tools/wrenches",
        output: /gtceu:(?:.*)_(?:tiny|small|normal|large|huge)_(?:fluid|item)_pipe/,
        type: "minecraft:crafting_shaped"
    });

    let types = ["small_gears", "gears", "rotors", "bolts", "screws"];
    for (let itemType of types) {
        event.remove({output: `#forge:${itemType}`, type: "minecraft:crafting_shaped"});
    }

    // manual ring removal, to prevent removing other tthings that are tagged rings like
    // curio rings.
    event.remove({output: "#forge:rings", type: "minecraft:crafting_shaped", mod: "gtceu"});

    // remove all hatch/bus/etc recipes that use the screwdriver instead of glass.
    event.remove({
        output: /(?:.*)_(?:input|output)_(?:hatch|bus)/,
        input: "#forge:tools/screwdrivers"
    });

    // no more fucking hand-crafted casing recipes either!
    event.remove({
        output: /(.*)_casing/,
        input: "#forge:tools/hammers",
    });
    event.remove({
        output: /(.*)_frame/,
        input: "#forge:tools/wrenches"
    });
}

/**
 * Cleans up irrelevant rolling machine recipes.
 * 
 * @param {Internal.RecipesEventJS} event
 */
const cleanupRollingMachineRecipes = (event) => {
    event.remove({
        output: "#forge:wires",
        type: "createaddition:rolling"
    });

    // this is so we don't add duplicate rod recipes.
    event.remove({
        output: "#forge:rods",
        type: "createaddition:rolling"
    });
}

/**
 * Fixes various Create recipes.
 * 
 * @param {Internal.RecipesEventJS} event 
 */
const fixupCreate = (event) => {
    for (let id of SWAP_BRASS_PLATES) {
        event.replaceInput(
            {id: id},
            "#forge:ingots/brass",
            "#nijika:copper_alloy_plates"
        );
    }

    for (let mod of ["create", "create_new_age", "railways", "createaddition"]) {
        event.replaceInput(
            {mod: mod}, "#forge:plates/brass", "#nijika:copper_alloy_plates"
        );
    };
}

/**
 * Removes early tier GT generators.
 */
const removeGTGenerators = (event) => {
    event.remove({output: "gtceu:lv_steam_turbine"});
    event.remove({output: "gtceu:mv_steam_turbine"});
    event.remove({output: "gtceu:hv_steam_generator"});

    event.remove({output: "gtceu:lv_combustion"});
    event.remove({output: "gtceu:lv_gas_turbine"});
}

/** @param {Internal.RecipesEventJS} event */
export const doCleanups = (event) => {
    // misc generic cleanups
    event.remove({id: "minecraft:charcoal"});

    // too easy!
    event.remove({output: "createaddition:alternator"});


    if (MODPACK_SETTINGS.applyTierAdjustments) {
        // nuke all recycling recipes, they're mismatched to the wrong tier.
        event.remove({type: "gtceu:arc_furnace", id: /arc_(?:(?:u?[lmheiu]|lu)v|zpm)_(?:.*)/});
        event.remove({type: "gtceu:macerator", id: /macerate_(?:(?:u?[lmheiu]|lu)v|zpm)_(?:.*)/});
        event.remove({type: "gtceu:arc_furnace", input: /.*(?:extruder|casting|empty)_mold/});
        event.remove({type: "gtceu:macerator", input: /.*(?:extruder|casting|empty)_mold/});

        removeGTGenerators(event);

        // primitive blast furnace is replaced with the bessemer process.
        event.remove({type: "gtceu:primitive_blast_furnace"});

        event.remove({id: "gtceu:shapeless/dust_brass"});
    }

    if (MODPACK_SETTINGS.deleteToolRecipes) {
        cleanupManualToolRecipes(event);
        cleanupRollingMachineRecipes(event);
    }

    fixupCreate(event);
}
