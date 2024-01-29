import { rewriteComponentTieredRecipes } from "./components";
import { addCreateRecipes } from "./create"
import { adjustExtruderBasePlateRecipe, fixExtruderRecipeTier } from "./extruder";
import { MODPACK_SETTINGS } from "../../settings";
import { adjustMachineRecipesForTier } from "./machines";
import { GT_MACHINE_TIERS } from "../../shared/definition";

/**
 * Adjusts recipes relating to the material system and BI's adjusted tiers.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const adjustMaterialTierRecipes = (event) => {
    if (!MODPACK_SETTINGS.applyTierAdjustments) return;

    // remove the existing extruder recipes for the categories we'ree going to change...
    event.remove({
        type: "gtceu:extruder",
        input: /gtceu:(?:small_)?(?:gear|rotor|bolt)_(?:extruder|casting)_mold/
    });

    event.remove({
        type: "gtceu:extruder",
        input: /gtceu:(?:tiny|small|normal|large|huge)_pipe_extruder_mold/
    });

    // ... and also remove the completely useless ones that just clog up EMI.
    event.remove({
        type: "gtceu:extruder",
        input: /gtceu:(?:long_)?(?:rod|block|wire|plate|ingot)_extruder_mold/,
    })

    // so true...
    event.smelting(
        "3x gtceu:rubber_nugget",
        "#forge:dusts/rubber"
    ).id("nijika:misc/rubber_dust_to_ingot_earlygame");

    addCreateRecipes(event);
    rewriteComponentTieredRecipes(event);
    fixExtruderRecipeTier(event);
    adjustExtruderBasePlateRecipe(event);

    for (let tier of GT_MACHINE_TIERS) {
        adjustMachineRecipesForTier(event, tier);
    }
}
