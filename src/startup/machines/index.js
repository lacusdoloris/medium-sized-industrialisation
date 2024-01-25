import { addBessemerMultiblock, addBessemerRecipeType } from "./bessemer";

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
}

/**
 * Adds all machine types.
 * 
 * @param {Internal.GTRegistryEventJS<string, Internal.MachineDefinition>} event
 */
export const addAllMachineTypes = (event) => {
    let bessemer = event.create("nijika:bessemer_furnace", "multiblock");
    addBessemerMultiblock(bessemer);
}
