import { rewriteComponentTieredRecipes } from "./components";
import { addCreateRecipes } from "./create"
import { fixExtruderRecipeTier } from "./extruder";

/**
 * Adjusts recipes relating to the material system and BI's adjusted tiers.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const adjustMaterialTierRecipes = (event) => {
    // in preparation for fixing the extruder, remove the existing gtceu recipes for both it
    // and the allow smelter
    event.remove({
        type: "gtceu:extruder",
        input: /gtceu:(?:small_)?(?:gear|rotor)_(?:extruder|casting)_mold/
    });

    event.remove({
        type: "gtceu:extruder",
        input: /gtceu:(?:tiny|small|normal|large|huge)_pipe_extruder_mold/
    });

    // so true...
    event.smelting(
        "3x gtceu:rubber_nugget",
        "#forge:dusts/rubber"
    ).id("nijika:misc/rubber_dust_to_ingot_earlygame");

    addCreateRecipes(event);
    rewriteComponentTieredRecipes(event);
    fixExtruderRecipeTier(event);
}
