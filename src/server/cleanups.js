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
    event.remove({
        output: "#forge:plates",
        input: "#forge:tools/hammers",
    });
    event.remove({
        output: "#forge:dusts",
        input: "#forge:tools/mortars"
    });

    // silent gear sadly adds two ingot recipes so we have to be a bit broader here
    for (let type of ["crafting_shaped", "crafting_shapeless"]) {
        event.remove({
            output: "#forge:rods",
            input: "#forge:ingots",
            type: "minecraft:" + type,
        });
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
    event.remove({id: "gtceu:shapeless/dust_brass"});
    event.remove({id: "minecraft:charcoal"});

    // too easy!
    event.remove({output: "createaddition:alternator"});

    // nuke all recycling recipes, they're mismatched to the wrong tier.
    event.remove({type: "gtceu:arc_furnace", id: /arc_(?:(?:u?[lmheiu]|lu)v|zpm)_(?:.*)/})
    event.remove({type: "gtceu:macerator", id: /macerate_(?:(?:u?[lmheiu]|lu)v|zpm)_(?:.*)/});

    // remove the primitive blast furnace recipes
    event.remove({type: "gtceu:primitive_blast_furnace"});
    
    cleanupManualToolRecipes(event);
    cleanupRollingMachineRecipes(event);
    fixupCreate(event);
    removeGTGenerators(event);
}
