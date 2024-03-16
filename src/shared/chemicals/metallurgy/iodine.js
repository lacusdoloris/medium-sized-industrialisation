import {
    createAcidicIntermediate,
    createAqueousIntermediate,
    createDustIntermediate,
} from "../../materials/helpers";
import { PropertyKey, getMaterial } from "../../utils";

// Anything higher than Helium is a metal.

export const addIodineMaterials = (event) => {
    createDustIntermediate(event, "sea_plant_ash", 0xc1c2b8).iconSet(GTMaterialIconSet.DULL);
    createAcidicIntermediate(event, "sea_ash_peroxide_mix", 0x7d5f71);
    createAqueousIntermediate(event, "iodine_cyclohexane_mixture", 0x604857);

    getMaterial("iodine").properties.ensureSet(PropertyKey.DUST, true);
};

/**
 * Adds recipes for iodine synthesis.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addIodineRecipes = (event) => {
    // Burn sea salt
    event.recipes.gtceu
        .pyrolyse_oven("nijika:chemicals/iodine/sea_plant_ash")
        .itemInputs("48x #nijika:sea_plants")
        .itemOutputs("12x gtceu:sea_plant_ash_dust")
        .outputFluids(Fluid.of("minecraft:water").withAmount(12 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .duration(8 * 20)
        .circuit(1); // all the other recipes have it...

    // Mix with hydrogen peroxide to allow the iodide ions to be oxidised into regular iodine.
    // 2 I{-} + H2O2 + 2 H{+} = I2 + 2 H2O
    event.recipes.gtceu
        .mixer("nijika:chemicals/iodine/oxidising")
        .itemInputs("1x gtceu:sea_plant_ash_dust")
        .inputFluids(
            Fluid.of("gtceu:hydrogen_peroxide").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sulfuric_acid").withAmount(50 * FluidAmounts.MB)
        )
        .outputFluids(Fluid.of("gtceu:sea_ash_peroxide_mix").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VHA[GTValues.MV])
        .duration(5 * 20);

    // Mix again with cyclohexane to get the iodine-cyclohexane mixture.
    event.recipes.gtceu
        .mixer("nijika:chemicals/iodine/cyclohexane_mixture")
        .inputFluids(
            Fluid.of("gtceu:sea_ash_peroxide_mix").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:cyclohexane").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:iodine_cyclohexane_mixture").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen_peroxide").withAmount(250 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.MV])
        .duration(15 * 20);

    // Finally, distill away the iodine-cyclohexane mixture to get pure iodine.
    event.recipes.gtceu
        .distillery("nijika:chemicals/iodine/pure_iodine_crystals")
        .inputFluids(
            Fluid.of("gtceu:iodine_cyclohexane_mixture").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:cyclohexane").withAmount(900 * FluidAmounts.MB))
        .itemOutputs("1x gtceu:iodine_dust")
        .EUt(GTValues.V[GTValues.LV])
        .duration(60 * 20);

    event.recipes.gtceu
        .assembler("nijika:catalysts/iodine/assembly")
        .itemInputs("32x nijika:empty_catalyst", "2x gtceu:iodine_dust")
        .itemOutputs("32x nijika:iodine_catalyst")
        .duration(10)
        .EUt(GTValues.VA[GTValues.ULV])
        .circuit(9);
};
