// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// Please don't add anything here. Instead, add it to the ``index.js`` files in the various
// subfolders. Thank you!

import { nijikaId } from "../shared/utils";
import { addCatalystItems } from "./catalysts";
import { addAllMachineTypes, addAllRecipeTypes } from "./machines";
import { addCustomMaterials } from "./materials";
import { customiseMaterials } from "./materials/modification";
import { adjustWorldgenRemovals } from "./worldgen";
import { ORESTONE_DEFINITIONS } from "../shared/ores/orestones";

/**
 * @param {Internal.GTRegistryEventJS<string, com.gregtechceu.gtceu.api.data.chemical.material.Material>} event
 */
GTCEuStartupEvents.registry("gtceu:material", addCustomMaterials);

GTCEuStartupEvents.materialModification(() => {
    // this is definitely ran before item generation.
    // dirty hack: vaporise this hashmap so that cauldron behaviours are never registered.
    GTMaterialItems.purifyMap.clear();

    // event has... no properties. ok
    customiseMaterials();
});

GTCEuStartupEvents.registry("gtceu:machine", addAllMachineTypes);
GTCEuStartupEvents.registry("gtceu:recipe_type", (evt) => {
    addAllRecipeTypes(evt);

    GTRecipeTypes.MIXER_RECIPES.setMaxIOSize(6, 1, 3, 1);
    GTRecipeTypes.ORE_WASHER_RECIPES.setMaxIOSize(2, 3, 1, 1);
});

StartupEvents.registry("item", (ev) => {
    ev.create(nijikaId("slag"));
    ev.create(nijikaId("catalysator_brown"));

    addCatalystItems(ev);
});

WorldgenEvents.remove((evt) => {
    adjustWorldgenRemovals(evt);
});

ProjectEEvents.registerWorldTransmutations((evt) => {
    let rockKeys = Object.keys(ORESTONE_DEFINITIONS);
    console.log("adding world transmutations;");

    for (let [idx, el] of rockKeys.entries()) {
        let into = rockKeys[(idx + 1) % rockKeys.length];
        console.log(`create:${el} -> create:${into}`);
        evt.transform(`create:${el}`, `create:${into}`);
    }
});
