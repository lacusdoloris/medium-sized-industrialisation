
import { addAluminiumProcessingRecipes } from "./aluminium";
import { addChromiteProcessingRecipes } from "./chromium";
import { addGalliumArsenicRecipes } from "./gallum_arsenic";
import { addManganeseProcessingRecipes } from "./manganese";
import { addTantaliteProcessingChain } from "./tantalum";
import { addVanadiumChemicalChain } from "./vanadium";

/**
 * Adds various chemical or metallurgical processing recipes.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const addChemicalProcessingRecipes = (event) => {
    addGalliumArsenicRecipes(event);
    addAluminiumProcessingRecipes(event);
    addChromiteProcessingRecipes(event);
    addVanadiumChemicalChain(event);
    addManganeseProcessingRecipes(event);
    addTantaliteProcessingChain(event);

    // BeH2 + 2 HCl → BeCl2 + 2 H2
    event.recipes.gtceu.chemical_bath("nijika:misc/beryllium_chloride")
        .itemInputs("1x gtceu:beryllium_hydride_dust")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:beryllium_chloride_dust")
        .outputFluids(Fluid.of("gtceu:hydrogen").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(2 * 20);
}
