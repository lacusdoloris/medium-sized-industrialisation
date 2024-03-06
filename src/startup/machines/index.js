import { addBessemerMultiblock, addBessemerRecipeType } from "./bessemer";
import { addButcheringMultiblock, addButcheringRecipeType } from "./butcher";
import { addEvaporationPoolMultiblock, addEvaporationRecipeType } from "./evaporation_pool";
import { addOreSortingMultiblock, addOreSortingRecipeType } from "./ore_sorter";

// some notes
//
// 1) an "aisle" is more accurately "a wall". patterns go from the back wall, defined as a series
//    of *rows*, to the front wall.
// 2) ``MultiblockMachineBuilder``'s methods will return ``this`` for multiblock-specific methods,
//    but ``MachineBuilder<out MachineDefinition>`` for non-multiblock-specific methods.
//    this is fine, just do thee multiblock specific ones first.

/**
 * Adds all custom recipe types.
 *
 * @param {Internal.GTRegistryEventJS<string, Internal.GTRecipeType>} event
 */
export const addAllRecipeTypes = (event) => {
    let bessemer = event.create("bessemer_smelting");
    addBessemerRecipeType(bessemer);

    let brine = event.create("evaporation_pool");
    addEvaporationRecipeType(brine);

    let butcher = event.create("butchering");
    addButcheringRecipeType(butcher);

    let sorter = event.create("ore_sorting");
    addOreSortingRecipeType(sorter);
};

/**
 * Adds all machine types.
 *
 * @param {Internal.GTRegistryEventJS<string, Internal.MachineDefinition>} event
 */
export const addAllMachineTypes = (event) => {
    let bessemer = event.create("nijika:bessemer_furnace", "multiblock");
    addBessemerMultiblock(bessemer);

    let brine = event.create("nijika:evaporation_pool", "multiblock");
    addEvaporationPoolMultiblock(brine);

    let butcher = event.create("nijika:butcher", "multiblock");
    addButcheringMultiblock(butcher);

    let sorter = event.create("nijjika:ore_sorter", "multiblock");
    addOreSortingMultiblock(sorter);
};
