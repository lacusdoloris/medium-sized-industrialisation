// TODO: Consider adding purification of the output MoO3.

/**
 * Adds recipes for the processing of molybdenum.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addMolybdenumProcessingRecipes = (event) => {
    // see ullman's Molybdenum and Molybdenum Compounds.

    // Molybdenum roasting.
    // 2 MoS2 + 7 O2 = 2 MoO3 + 4 SO2 (hehehe)
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/molybdenum/molybdenite_roasting")
        .itemInputs("2x gtceu:molybdenite_dust")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(14 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:molybdenum_trioxide_dust")
        .chancedOutput("1x gtceu:molybdenum_trioxide_dust", 6500.0, 0.0) // Flat 65% chance, no boost!
        .outputFluids(Fluid.of("gtceu:sulfur_dioxide").withAmount(4 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.EV])
        .duration(6 * 20)
        .blastFurnaceTemp(900);

    // MoS2 + 6 MoO3 = 7 MoO2 + 2 SO2
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/molybdenum/molybdenite_oxidising")
        .itemInputs("1x gtceu:molybdenite_dust", "6x gtceu:molybdenum_trioxide_dust")
        .itemOutputs("7x gtceu:molybdenum_dioxide_dust")
        .outputFluids(Fluid.of("gtceu:sulfur_dioxide").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.EV])
        .duration(10 * 20)
        .blastFurnaceTemp(950);

    // 2 MoO2 + O2 = 2 MoO3
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/molybdenum/molybdenum_oxidising")
        .itemInputs("2x gtceu:molybdenum_dioxide_dust")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("2x gtceu:molybdenum_trioxide_dust")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(6 * 20)
        .blastFurnaceTemp(923);

    // Reduce using hydrogen to get raw Molybdenum metal...
    // MoO3 + 3 H2 = Mo + 3 H2O
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/molybdenum/molybdenum_direct_reduction")
        .itemInputs("1x gtceu:molybdenum_trioxide_dust")
        .inputFluids(Fluid.of("gtceu:hydrogen").withAmount(6 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:molybdenum_dust")
        .outputFluids(Fluid.of("minecraft:water").withAmount(3 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.EV])
        .duration(10 * 20)
        .blastFurnaceTemp(800);

    // ... or reduce using aluminium to get ferromolybdenum (Mo3Fe2).
    // 3 MoO3 + 2 Fe + 6 Al = Fe2Mo3 + 3 Al2O3
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/molybednum/ferromolybenum")
        .itemInputs(
            "3x gtceu:molybdenum_trioxide_dust",
            "2x gtceu:iron_dust",
            "6x gtceu:aluminium_dust"
        )
        .itemOutputs("3x gtceu:ferromolybdenum_ingot", "3x gtceu:alumina_dust")
        .EUt(GTValues.V[GTValues.EV])
        .duration(30 * 20)
        .blastFurnaceTemp(2700);
};
