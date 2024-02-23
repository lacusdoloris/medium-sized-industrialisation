/**
 * Adds recipes for proceessing magnesium.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const addMagnesiumProcessingRecipes = (event) => {
    // Magnesia reduction, Pigeon process.
    // 2 MgO + 2 CaO + Si = 2 Mg + Ca2SiO4

    event.recipes.gtceu.electric_blast_furnace("nijika:chemicals/magnesium/pigeon_process")
        .itemInputs(
            "2x gtceu:magnesia_dust",
            "2x gtceu:quicklime_dust",
            "1x gtceu:silicon_dust"
        )
        .itemOutputs(
            "2x gtceu:magnesium_dust",
            "1x gtceu:calcium_silicate_dust"
        )
        .EUt(GTValues.VH[GTValues.EV])
        .duration(7 * 20 + 10)
        .blastFurnaceTemp(1700)
        .circuit(1);

    // Dow's process for magnesium production via sea water.
    // Seawater/brine + CaO -> Mg(OH)2
    event.recipes.gtceu.chemical_reactor("nijika:chemicals/magnesium/magnesium_hydroxide")
        .inputFluids(Fluid.of("gtceu:salt_water").withAmount(12 * FluidAmounts.BUCKET))
        .itemInputs("1x gtceu:quicklime_dust")
        .itemOutputs("1x gtceu:magnesium_hydroxide_dust")
        .duration(5 * 20)
        .EUt(GTValues.VA[GTValues.HV]);

    // Mg(OH)2 + 2 HCl = MgCl2 + 2 H2O
    event.recipes.gtceu.chemical_reactor("nijika:chemicals/magnesium/hydroxide_to_chloride")
        .itemInputs("1x gtceu:magnesium_hydroxide_dust")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:magnesium_chloride_dust")
        .outputFluids(Fluid.of("minecraft:water").withAmount(2 * FluidAmounts.BUCKET))
        .duration(20)
        .EUt(GTValues.VH[GTValues.HV]);

}
