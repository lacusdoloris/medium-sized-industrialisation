import { createAqueousIntermediate, createDustIntermediate } from "../materials/helpers";

export const addCyanideMaterials = (event) => {
    createAqueousIntermediate(event, "hydrogen_cyanide", 0xf2f5c6)
        .components("1x gtceu:hydrogen", "1x gtceu:carbon", "1x gtceu:hydrogen");

    createDustIntermediate(event, "sodium_cyanide", 0xccc9f5)
        .components("1x gtceu:sodium", "1x gtceu:carbon", "1x gtceu:hydrogen");

    createDustIntermediate(event, "copper_cyanide", 0xbd945e)
        .components("1x gtceu:copper", "1x gtceu:carbon", "1x gtceu:hydrogen");
}

/**
 * Adds cyanide processing recipes.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const addCyanideRecipes = (event) => {
    // Production of Hydrogen cyanide via the Shawinigan process.
    // 2 C3H8 + 6 NH4 = 6 HCN + 17 H2
    event.recipes.gtceu.chemical_reactor("nijika:chemicals/cyanide/shawinigan_process")
        .inputFluids(
            Fluid.of("gtceu:propane").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:ammonia").withAmount(6 * FluidAmounts.BUCKET)
        )
        .notConsumable("1x gtceu:coke_dust")
        .outputFluids(
            Fluid.of("gtceu:hydrogen_cyanide").withAmount(6 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(17 * 2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.V[GTValues.MV])
        .duration(15 * 20);

    // HCN + NaOH = NaCN + H2O
    event.recipes.gtceu.chemical_bath("nijika:chemicals/cyanide/sodium_cyanide")
        .inputFluids(Fluid.of("gtceu:hydrogen_cyanide").withAmount(1 * FluidAmounts.BUCKET))
        .itemInputs("1x gtceu:sodium_hydroxide_dust")
        .itemOutputs("1x gtceu:sodium_cyanide_dust")
        .outputFluids(Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .duration(3 * 20 + 10);
}
