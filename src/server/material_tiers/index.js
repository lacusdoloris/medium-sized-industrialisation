import { rewriteComponentTieredRecipes } from "./components";
import { addCreateRecipes } from "./create"

export const adjustMaterialTierRecipes = (event) => {
    addCreateRecipes(event);
    rewriteComponentTieredRecipes(event);
}
