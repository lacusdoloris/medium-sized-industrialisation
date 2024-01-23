/**
 * This is the primary entrypoint for Bigger Industrialisation's content tweaks. Please avoid adding
 * things here directly, and instead call the appropriate function from the two mega-events.
 */

import { doCleanups } from "./cleanups";
import { adjustMaterialTierRecipes } from "./material_tiers";
import { adjustVariousMiscRecipes } from "./misc";
import { doModRecipes } from "./mods";
import { setupItemTags } from "./tags";
import { doTier00Content } from "./tier00";
import { doTier01Content } from "./tier01";


ServerEvents.tags("items", setupItemTags);

ServerEvents.recipes((event) => {
    // == COMMON == //
    doCleanups(event);
    adjustMaterialTierRecipes(event);

    adjustVariousMiscRecipes(event);
    doModRecipes(event);

    // == EARLYGAME == //

    doTier00Content(event);
    doTier01Content(event);
});
