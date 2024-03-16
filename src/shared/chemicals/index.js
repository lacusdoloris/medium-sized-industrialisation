import { addAluminiumProcessingRecipes } from "./metallurgy/aluminium";
import { addChromiteProcessingRecipes } from "./metallurgy/chromium";
import { addCyanideRecipes } from "./metallurgy/cyanide";
import { addGalliumArsenicRecipes } from "./metallurgy/gallum_arsenic";
import { addMiscIronRecipes } from "./metallurgy/iron";
import { addMagnesiumProcessingRecipes } from "./metallurgy/magnesium";
import { addManganeseProcessingRecipes } from "./metallurgy/manganese";
import { addMolybdenumProcessingRecipes } from "./metallurgy/molybdenum";
import { addRareEarthProcessingChain } from "./rare_earths";
import { addTantaliteProcessingChain } from "./metallurgy/tantalum";
import { addVanadiumChemicalChain } from "./metallurgy/vanadium";
import { addBrineRecipes } from "./brine";
import { addGoldProcessingRecipes } from "./metallurgy/gold";
import { addTitaniumRecipes } from "./metallurgy/titanium";
import { addCopperRecipes } from "./metallurgy/copper";
import { addPhosphorusRecipes } from "./phosphorus";
import { addBariumRecipes } from "./metallurgy/barium";
import { addCatalystRecipes } from "./catalysts";
import { addOrganicChemRecipes } from "./organic";
import { addTungstenRecipes } from "./metallurgy/tungsten";

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
    addRareEarthProcessingChain(event);
    addMiscIronRecipes(event);
    addMagnesiumProcessingRecipes(event);
    addMolybdenumProcessingRecipes(event);
    addCyanideRecipes(event);
    addGoldProcessingRecipes(event);
    addBrineRecipes(event);
    addTitaniumRecipes(event);
    addCopperRecipes(event);
    addTungstenRecipes(event);
    addPhosphorusRecipes(event);
    addBariumRecipes(event);

    addCatalystRecipes(event);
    addOrganicChemRecipes(event);

    // BeH2 + 2 HCl → BeCl2 + 2 H2
    event.recipes.gtceu
        .chemical_bath("nijika:misc/beryllium_chloride")
        .itemInputs("1x gtceu:beryllium_hydride_dust")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:beryllium_chloride_dust")
        .outputFluids(Fluid.of("gtceu:hydrogen").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(2 * 20);

    // NH3 + H2O ↽ − ⇀ NH+4 + OH−.
    // ammonium hydroxide -> ammonia + water
    event.recipes.gtceu
        .centrifuge("nijika:misc/ammonium_hydroxide_centrifuging")
        .inputFluids(Fluid.of("gtceu:ammonium_hydroxide").withAmount(1 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:ammonia").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VH[GTValues.LV])
        .duration(10);

    // ... and the other way around.
    event.recipes.gtceu
        .mixer("nijika:misc/ammonium_hydroxide_mixing")
        .outputFluids(Fluid.of("gtceu:ammonium_hydroxide").withAmount(1 * FluidAmounts.BUCKET))
        .inputFluids(
            Fluid.of("gtceu:ammonia").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VH[GTValues.LV])
        .duration(10);

    // Direct reaction of calcium and hydrogen gets calcium hydride.
    event.recipes.gtceu
        .chemical_reactor("nijika:misc/calcium_hydride")
        .inputFluids(Fluid.of("gtceu:hydrogen").withAmount(2 * FluidAmounts.BUCKET))
        .itemInputs("gtceu:calcium_dust")
        .itemOutputs("1x gtceu:calcium_hydride_dust")
        .EUt(GTValues.VH[GTValues.LV])
        .duration(5 * 20);

    // Direct preparation of Calcium sillicate.
    // 2 CaO + SiO2 = Ca2SiO4
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/calcium_sillicate")
        .itemInputs("2x gtceu:quicklime_dust", "1x gtceu:silicon_dioxide_dust")
        .itemOutputs("1x gtceu:calcium_silicate_dust")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(2 * 20);
};
