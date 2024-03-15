import { addChloroethaneMaterials, addChloroethaneRecipes } from "./chloroethane";
import { addMIBKMaterials, addMIBKProcess } from "./mibk";
import { addPolystyreneMaterials, addPolysytreneRecipes } from "./polystyrene";

export const addOrganicChemMaterials = (event) => {
    addChloroethaneMaterials(event);
    addMIBKMaterials(event);
    addPolystyreneMaterials(event);
};

/**
 * Adds the recipes for the organic chemistry chains.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addOrganicChemRecipes = (event) => {
    addChloroethaneRecipes(event);
    addMIBKProcess(event);
    addPolysytreneRecipes(event);
};
