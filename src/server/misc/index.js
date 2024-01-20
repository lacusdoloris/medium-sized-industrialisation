import { redoGlassProcessing } from "./glass";
import { rewriteRailwayRecipes } from "./railways"

/** 
 * Dumping ground for recipes that don't fit cleanly into other categories.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const adjustVariousMiscRecipes = (event) => {
    event.remove({id: "gtceu:shaped/sticky_piston_resin"});
    event.remove({id: "minecraft:sticky_piston"})
    
    if (Platform.isLoaded("embers")) {
        // fundamentally the same as our recipe, but worse
        event.remove({id: "embers:sticky_piston_adhesive"});
    }

    event.shaped(
        "minecraft:sticky_piston",
        ["S", "P"],
        {S: "#nijika:glues", P: "minecraft:piston"}
    ).id("nijika:misc/sticky_piston");

    rewriteRailwayRecipes(event);
    redoGlassProcessing(event);
}
