
import { addAluminiumProcessingRecipes } from "./aluminium";
import { addChromiteProcessingRecipes } from "./chromium";
import { addGalliumArsenicRecipes } from "./gallum_arsenic";
import { addVanadiumChemicalChain } from "./vanadium";

/**
 * Adds various chemical or metallurgical processing recipes.
 */
export const addChemicalProcessingRecipes = (event) => {
    addGalliumArsenicRecipes(event);
    addAluminiumProcessingRecipes(event);
    addChromiteProcessingRecipes(event);
    addVanadiumChemicalChain(event);
}
