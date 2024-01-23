// Please don't add anything here. Instead, add it to the ``index.js`` files in the various 
// subfolders. Thank you!

import { MODPACK_SETTINGS } from "../settings";
import { getMaterial } from "../shared/utils";
import { addAllMachineTypes, addAllRecipeTypes } from "./machines";


/** @param {Internal.GTRegistryEventJS<string, com.gregtechceu.gtceu.api.data.chemical.material.Material>} event */
export const customiseMaterials = (event) => {

    // add foil flag here, for fluxed magnets
    getMaterial("magnetic_neodymium").addFlags(GTMaterialFlags.GENERATE_FOIL);

    // used for LV pistons
    getMaterial("wrought_iron").addFlags(GTMaterialFlags.GENERATE_SMALL_GEAR);
};

GTCEuStartupEvents.registry("gtceu:material", (event) => {
    customiseMaterials(event);
});


GTCEuStartupEvents.registry("gtceu:machine", (event) => {
    addAllMachineTypes(event);
});


GTCEuStartupEvents.registry("gtceu:recipe_type", (event) => {
    addAllRecipeTypes(event);
});
