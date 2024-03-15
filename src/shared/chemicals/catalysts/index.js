import { addNickelCatalystMaterials, addNickelCatalystRecipes } from "./nickel";

export const addCatalystMaterials = (event) => {
    addNickelCatalystMaterials(event);
};

/**
 * Adds the recipes for catalyst items.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addCatalystRecipes = (event) => {
    addNickelCatalystRecipes(event);

    event.recipes.gtceu
        .assembler("nijika:catalysts/empty")
        .itemInputs("1x gtceu:stainless_steel_frame")
        .itemOutputs("64x nijika:empty_catalyst")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(1 * 20)
        .circuit(9);
};
