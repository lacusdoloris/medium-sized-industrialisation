// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * This is the primary entrypoint for Bigger Industrialisation's content tweaks. Please avoid adding
 * things here directly, and instead call the appropriate function from the two mega-events.
 */

import { addChemicalProcessingRecipes } from "../shared/chemicals";
import { doCleanups } from "./cleanups";
import { adjustMaterialTierRecipes } from "./material_tiers";
import { adjustVariousMiscRecipes } from "./misc";
import { doModRecipes } from "./mods";
import { addFreshOreVeinsEvent, fixupBuiltinOreVeins } from "../shared/ores/overworld";
import { setupItemTags } from "./tags";
import { doTier00Content } from "./tier00";
import { doTier01Content } from "./tier01";
import { doTier02Content } from "./tier02";
import { doTier03Content } from "./tier03";
import { doTier04Content } from "./tier04";
import { addNonSpecificMachineRecipes } from "./machines";
import { addCustomOreProcessingRecipes } from "../shared/ores";
import { addCustomFluidVeins, adjustFluidVeinDefinitions } from "./fluid_veins";
import { adjustEmcValues } from "./mods/ee2";

ServerEvents.tags("items", setupItemTags);

ServerEvents.tags("block", (evt) => {
    evt.remove("create:non_movable", [
        "molten_vents:dormant_molten_asurine",
        "molten_vents:dormant_molten_veridium",
        "molten_vents:dormant_molten_ochrum",
        "molten_vents:dormant_molten_scorchia",
        "molten_vents:dormant_molten_scoria",
        "molten_vents:dormant_molten_crimsite",
    ]);
});

ServerEvents.recipes((event) => {
    // Warning! This needs to be called in the right order!
    //
    // The cleanup and material tier code will do mass recipe deletions which are then replaced with
    // our own actual recipes. Do not reorder them!

    // == COMMON CLEANUP == //
    doCleanups(event);
    adjustMaterialTierRecipes(event);

    // == COMMON ADDITIONS == //
    adjustVariousMiscRecipes(event);
    addChemicalProcessingRecipes(event);
    addCustomOreProcessingRecipes(event);
    addNonSpecificMachineRecipes(event);
    doModRecipes(event);

    // == TIERED CONTENT == //

    doTier00Content(event);
    doTier01Content(event);
    doTier02Content(event);
    doTier03Content(event);
    doTier04Content(event);

    // why does this exist?
    // done last to remove any added mixer recipes.
    event.remove({ type: "gtceu:create_mixer" });
});

GTCEuServerEvents.oreVeins((event) => {
    fixupBuiltinOreVeins(event);
    addFreshOreVeinsEvent(event);
});

GTCEuServerEvents.fluidVeins((event) => {
    addCustomFluidVeins(event);
    adjustFluidVeinDefinitions(event);
});

ProjectEEvents.setEMC(event => {
    adjustEmcValues(event);
})
