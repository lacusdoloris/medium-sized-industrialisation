import { createDustIntermediate } from "../../materials/helpers";

export const addCopperMaterials = (event) => {
    createDustIntermediate(event, "copper_cyanide", 0xbd945e).components(
        "1x gtceu:copper",
        "1x gtceu:carbon",
        "1x gtceu:hydrogen"
    );
};

/**
 * Adds copper-related recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addCopperRecipes = (event) => {
    // 4 CuCN + 2 H2O = 4 Cu + 4 HCN + O2
    event.recipes.gtceu
        .electrolyzer("nijika:chemicals/copper/copper_cyanide_electrolysing")
        .itemInputs("4x gtceu:copper_cyanide_dust")
        .inputFluids(Fluid.of("minecraft:water").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("4x gtceu:copper_dust")
        .outputFluids(
            Fluid.of("gtceu:hydrogen_cyanide").withAmount(4 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:oxygen").withAmount(2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.LV])
        .duration(36);
};
