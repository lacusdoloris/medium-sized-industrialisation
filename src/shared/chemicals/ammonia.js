import { createAcidicIntermediate } from "../materials/helpers";

export const addAmmoniaMaterials = (event) => {
    createAcidicIntermediate(event, "ammonium_hydroxide", 0xcdd6f7).components(
        "1x gtceu:ammonia",
        "1x gtceu:oxygen",
        "1x gtceu:hydrogen"
    );
};

/**
 * Adds recipes relating to ammonia.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addAmmoniaRecipes = (event) => {
    // NH3 + H2O ↽ − ⇀ NH+4 + OH−.
    // ammonium hydroxide -> ammonia + water
    event.recipes.gtceu
        .centrifuge("nijika:chemicals/ammonia/ammonium_hydroxide_centrifuging")
        .inputFluids(Fluid.of("gtceu:ammonium_hydroxide").withAmount(1 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:ammonia").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VH[GTValues.LV])
        .duration(10);

    // ... and the other way around.
    event.recipes.gtceu
        .mixer("nijika:chemicals/ammonia/ammonium_hydroxide_mixing")
        .outputFluids(Fluid.of("gtceu:ammonium_hydroxide").withAmount(1 * FluidAmounts.BUCKET))
        .inputFluids(
            Fluid.of("gtceu:ammonia").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VH[GTValues.LV])
        .duration(10);

    // N2 + 3 H2 = 2 NH3
    event.remove({ id: "gtceu:chemical_reactor/ammonia_from_elements" });
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/ammonia/haber_process")
        .inputFluids(
            Fluid.of("gtceu:nitrogen").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(6 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:ammonia").withAmount(2 * FluidAmounts.BUCKET))
        .duration(24 * 20)
        .EUt(384)
        .circuit(1);

    // Catalytic synthesis of ammonia with Iron (III) oxide.
    // This is significantly faster than the regular method.
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/ammonia/haber_process_catalysed")
        .itemInputs("1x gtceu:tiny_iron_oxide_dust")
        .inputFluids(
            Fluid.of("gtceu:nitrogen").withAmount(20 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(60 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:ammonia").withAmount(20 * FluidAmounts.BUCKET))
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(20 * 20) // or 1 second per bucket, vs 15.
        .circuit(10);

    // Solvay process for ammonium chloride.
    // CO2 + 2 NH3 + 2 NaCl + H2O => 2 NH4Cl + Na2CO3
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/ammonia/solvay_process")
        .itemInputs("2x gtceu:salt_dust")
        .inputFluids(
            Fluid.of("gtceu:ammonia").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:carbon_dioxide").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET)
        )
        .itemOutputs("2x gtceu:ammonium_chloride_dust", "1x gtceu:soda_ash_dust")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(2 * 20);
};
