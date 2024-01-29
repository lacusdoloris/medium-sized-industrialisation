// Please don't add anything here. Instead, add it to the ``index.js`` files in the various 
// subfolders. Thank you!

import { MODPACK_SETTINGS } from "../settings";
import { GT_MACHINE_TIERS } from "../shared/definition";
import { getMaterial, iterateOverAllMaterials } from "../shared/utils";
import { addMaterials } from "./custom_materials";
import { addAllMachineTypes, addAllRecipeTypes } from "./machines";


/** @param {Internal.GTRegistryEventJS<string, com.gregtechceu.gtceu.api.data.chemical.material.Material>} event */
export const customiseMaterials = () => {

    // add foil flag here, for fluxed magnets
    getMaterial("magnetic_neodymium").addFlags(GTMaterialFlags.GENERATE_FOIL);

    // used for LV pistons
    getMaterial("wrought_iron").addFlags(GTMaterialFlags.GENERATE_SMALL_GEAR);

    // used for nickel-cadmium batteries
    getMaterial("nickel").addFlags(GTMaterialFlags.GENERATE_FOIL);

    // make sure that all the materials we need for various tier based recipes have the appropriate
    // flags.
    for (let tier of GT_MACHINE_TIERS) {
        getMaterial(tier.materials.motorWire.id).addFlags(GTMaterialFlags.GENERATE_FINE_WIRE);
    }

    // add the disable_decomposition flag to remove auto-generated decomposition recipes
    const disableDecompositionMaterials = [
        // Sulfur containing materials. These are roasted instead.
        "stibnite", "sphalerite", "pyrite", "pentlandite",
        "tetrahedrite", "cobaltite", "galena", "chalcopyrite",
        "realgar",
        // Arsenic trioxide is flagged because it's only used as an intermediate for Arsenic
        // trichloride.
        "arsenic_trioxide",
    ]

    for (let matName of disableDecompositionMaterials) {
        getMaterial(matName).addFlags(GTMaterialFlags.DISABLE_DECOMPOSITION);
    }

    // remove chromium dust as a byproduct of chromite
    let chromite = getMaterial("chromite");
    {
        /** @type {Internal.OreProperty} */
        let oreProp = chromite.getProperty(PropertyKey.ORE);
        // setOreByProducts acttually *appends*, not sets!
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(getMaterial("iron"), getMaterial("magnesium"));
    }

};

/**
 * @param {Internal.GTRegistryEventJS<string, com.gregtechceu.gtceu.api.data.chemical.material.Material>} event
 */
GTCEuStartupEvents.registry("gtceu:material", addMaterials);

GTCEuStartupEvents.materialModification((event) => {
    // event has... no properties. ok
    customiseMaterials();
});

GTCEuStartupEvents.registry("gtceu:machine", addAllMachineTypes);
GTCEuStartupEvents.registry("gtceu:recipe_type", addAllRecipeTypes);
