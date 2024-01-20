/**
 * This is the primary entrypoint for Bigger Industrialisation's content tweaks. Please avoid adding
 * things here directly, and instead call the appropriate function from the two mega-events.
 */

import { doCleanups } from "./cleanups";
import { addCreateLvMvMaterialRecipes, addPressingRecipes, applyHullcasingTiers } from "./material_tiers";
import { adjustVariousMiscRecipes } from "./misc";
import { doModRecipes } from "./mods";
import { setupItemTags } from "./tags";
import { doTier00Content } from "./tier00";


ServerEvents.tags("items", setupItemTags);

ServerEvents.recipes((event) => {
    // == COMMON == //
    doCleanups(event);
    applyHullcasingTiers(event);

    adjustVariousMiscRecipes(event);
    doModRecipes(event);

    // == EARLYGAME == //
    addCreateLvMvMaterialRecipes(event);
    addPressingRecipes(event);
    doTier00Content(event);
});
