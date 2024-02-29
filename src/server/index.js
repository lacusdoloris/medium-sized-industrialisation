/**
 * This is the primary entrypoint for Bigger Industrialisation's content tweaks. Please avoid adding
 * things here directly, and instead call the appropriate function from the two mega-events.
 */

import { MODPACK_SETTINGS } from "../settings";
import { addChemicalProcessingRecipes } from "../shared/chemicals";
import { adjustBaseOresRecipes } from "./base_ores";
import { doCleanups } from "./cleanups";
import { adjustMaterialTierRecipes } from "./material_tiers";
import { adjustVariousMiscRecipes } from "./misc";
import { doModRecipes } from "./mods";
import { addFreshOreVeinsEvent, removeVanillaDimensionOreVeins } from "./ore_veins";
import { setupItemTags } from "./tags";
import { doTier00Content } from "./tier00";
import { doTier01Content } from "./tier01";
import { doTier02Content } from "./tier02";
import { doTier03Content } from "./tier03";
import { doTier04Content } from "./tier04";

ServerEvents.tags("items", setupItemTags);

ServerEvents.recipes((event) => {
    // == COMMON == //
    doCleanups(event);
    adjustMaterialTierRecipes(event);
    adjustVariousMiscRecipes(event);
    doModRecipes(event);
    addChemicalProcessingRecipes(event);
    adjustBaseOresRecipes(event);

    // == TIERED CONTENT == //

    doTier00Content(event);
    doTier01Content(event);
    doTier02Content(event);
    doTier03Content(event);
    doTier04Content(event);
});

GTCEuServerEvents.oreVeins((event) => {
    if (MODPACK_SETTINGS.deleteVanillaOreVeins) {
        removeVanillaDimensionOreVeins(event);
    }

    addFreshOreVeinsEvent(event);
});
