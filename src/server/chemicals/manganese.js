/**
 * Adds manganese-related processing recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addManganeseProcessingRecipes = (event) => {
    // Standard carbinothermic and aluminothermic reductions of MnO2.
    // 2 Mn2O3 + 3 C = 4 Mn + 3 CO2
    // Mn2O3 + 2 Al = Al2O3 + 2 Mn

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/manganese/pyrolusite_reduction_carbon")
        .itemInputs("2x gtceu:pyrolusite_dust", "3x #nijika:carbon_rich_dusts")
        .itemOutputs("4x gtceu:manganese_dust")
        .outputFluids(Fluid.of("gtceu:carbon_dioxide").withAmount(3 * FluidAmounts.BUCKET))
        .circuit(2)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(10 * 20)
        .blastFurnaceTemp(1500);

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/manganese/pyrolusite_reduction_alumina")
        .itemInputs("gtceu:pyrolusite_dust", "2x gtceu:aluminium_dust")
        .itemOutputs("2x gtceu:manganese_dust", "1x gtceu:alumina_dust")
        .circuit(2)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(10 * 20)
        .blastFurnaceTemp(1500);

    // Ferromanganese production from reduction alongside iron dust.
    // This is a completely fictional reaction.
    // Mn2O3 + 4 Fe + 2 Al = 2 MnFe2 + Al2O3
    // Mn2O3 + 2 Fe2O3 + 6 Al = 2 MnFe2 + 3 Al2O3

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/manganese/ferromanganese_aluminium")
        .itemInputs("gtceu:pyrolusite_dust", "4x gtceu:iron_dust", "2x gtceu:aluminium_dust")
        .itemOutputs("2x gtceu:ferromanganese_ingot", "1x gtceu:alumina_dust")
        .circuit(1)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(15 * 20)
        .blastFurnaceTemp(1600);

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/manganese/ferromanganese_from_fe2o3")
        .itemInputs(
            "1x gtceu:pyrolusite_dust",
            "2x gcyr:iron_oxide_dust",
            "6x gtceu:aluminium_dust",
        )
        .itemOutputs("2x gtceu:ferromanganese_ingot", "3x gtceu:alumina_dust")
        .circuit(1)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(15 * 20)
        .blastFurnaceTemp(1600);
};
