
import { addAluminiumProcessingRecipes } from "./aluminium";
import { addChromiteProcessingRecipes } from "./chromium";
import { addGalliumArsenicRecipes } from "./gallum_arsenic";
import { addManganeseProcessingRecipes } from "./manganese";
import { addTantaliteProcessingChain } from "./tantalum";
import { addVanadiumChemicalChain } from "./vanadium";

/**
 * Adds various chemical or metallurgical processing recipes.
 */
export const addChemicalProcessingRecipes = (event) => {
    addGalliumArsenicRecipes(event);
    addAluminiumProcessingRecipes(event);
    addChromiteProcessingRecipes(event);
    addVanadiumChemicalChain(event);
    addManganeseProcessingRecipes(event);
    addTantaliteProcessingChain(event);
}
