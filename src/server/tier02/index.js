
// MV!
/** @param {Internal.RecipesEventJS} event */
export const doTier02Content = (event) => {
    event.recipes.gtceu.brine_tower("nijika:tier02/basic_brine_production")
        .inputFluids(Fluid.of("minecraft:water").withAmount(250 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:salt_water").withAmount(50 * FluidAmounts.BUCKET))
        .chancedOutput("8x gtceu:sodium_hydroxide_dust", 5000.0, 0.0)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20 * 60);
}
