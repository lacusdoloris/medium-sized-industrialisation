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

ServerEvents.tags("items", setupItemTags);

ServerEvents.recipes((event) => {
    // == COMMON == //
    doCleanups(event);
    adjustMaterialTierRecipes(event);
    adjustVariousMiscRecipes(event);
    doModRecipes(event);
    addChemicalProcessingRecipes(event);
    addCustomOreProcessingRecipes(event);
    addNonSpecificMachineRecipes(event);

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
