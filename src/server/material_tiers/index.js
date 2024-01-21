import { rewriteComponentTieredRecipes } from "./components";
import { addCreateRecipes } from "./create"
import { fixExtruderRecipeTier } from "./extruder";

export const adjustMaterialTierRecipes = (event) => {
    addCreateRecipes(event);
    rewriteComponentTieredRecipes(event);
    fixExtruderRecipeTier(event);
}
