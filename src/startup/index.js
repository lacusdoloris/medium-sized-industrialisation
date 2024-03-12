// Please don't add anything here. Instead, add it to the ``index.js`` files in the various
// subfolders. Thank you!

import { nijikaId } from "../shared/utils";
import { addAllMachineTypes, addAllRecipeTypes } from "./machines";
import { addCustomMaterials } from "./materials";
import { customiseMaterials } from "./materials/modification";
/**
 * @param {Internal.GTRegistryEventJS<string, com.gregtechceu.gtceu.api.data.chemical.material.Material>} event
 */
GTCEuStartupEvents.registry("gtceu:material", addCustomMaterials);

GTCEuStartupEvents.materialModification((_) => {
    // this is definitely ran before item generation.
    // dirty hack: vaporise this hashmap so that cauldron behaviours are never registered.
    GTItems.purifyMap.clear();

    // event has... no properties. ok
    customiseMaterials();
});

GTCEuStartupEvents.registry("gtceu:machine", addAllMachineTypes);
GTCEuStartupEvents.registry("gtceu:recipe_type", (evt) => {
    addAllRecipeTypes(evt);

    GTRecipeTypes.MIXER_RECIPES.setMaxIOSize(6, 1, 3, 1);
});

StartupEvents.registry("item", (ev) => {
    ev.create(nijikaId("slag"));
});
