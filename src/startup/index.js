// Please don't add anything here. Instead, add it to the ``index.js`` files in the various 
// subfolders. Thank you!

import { MODPACK_SETTINGS } from "../settings";
import { getMaterial, iterateOverAllMaterials } from "../shared/utils";
import { addMaterials } from "./custom_materials";
import { addAllMachineTypes, addAllRecipeTypes } from "./machines";


/** @param {Internal.GTRegistryEventJS<string, com.gregtechceu.gtceu.api.data.chemical.material.Material>} event */
export const customiseMaterials = (event) => {

    // add foil flag here, for fluxed magnets
    getMaterial("magnetic_neodymium").addFlags(GTMaterialFlags.GENERATE_FOIL);

    // used for LV pistons
    getMaterial("wrought_iron").addFlags(GTMaterialFlags.GENERATE_SMALL_GEAR);

    // add the disable_decomposition flag... not that it seems to help.
    const sulfurContainingMaterials = [
        "stibnite", "sphalerite", "pyrite", "pentlandite",
        "tetrahedrite", "cobaltite", "galena", "chalcopyrite",
        "realgar",
    ]

    for (let sulfurMaterial of sulfurContainingMaterials) {
        getMaterial(sulfurMaterial).addFlags(GTMaterialFlags.DISABLE_DECOMPOSITION);
    }

};

/**
 * @param {Internal.GTRegistryEventJS<string, com.gregtechceu.gtceu.api.data.chemical.material.Material>} event
 */
GTCEuStartupEvents.registry("gtceu:material", (event) => {
    addMaterials(event);

    customiseMaterials(event);
});


// Insane kubejs bug: This just inexplicably doesn't fucking work. It complains about 
// "missing extra".
/*GTCEuStartupEvents.materialModification("gtceu:material", (event) => {

})*/

GTCEuStartupEvents.registry("gtceu:machine", (event) => {
    addAllMachineTypes(event);
});


GTCEuStartupEvents.registry("gtceu:recipe_type", (event) => {
    addAllRecipeTypes(event);
});
