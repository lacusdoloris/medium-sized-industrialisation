// Please don't add anything here. Instead, add it to the ``index.js`` files in the various
// subfolders. Thank you!

import { addAllMachineTypes, addAllRecipeTypes } from "./machines";
import { addCustomMaterials } from "./materials";
import { customiseMaterials } from "./materials/modification";
/**
 * @param {Internal.GTRegistryEventJS<string, com.gregtechceu.gtceu.api.data.chemical.material.Material>} event
 */
GTCEuStartupEvents.registry("gtceu:material", addCustomMaterials);

GTCEuStartupEvents.materialModification((_) => {
    // event has... no properties. ok
    customiseMaterials();
});

GTCEuStartupEvents.registry("gtceu:machine", addAllMachineTypes);
GTCEuStartupEvents.registry("gtceu:recipe_type", addAllRecipeTypes);
