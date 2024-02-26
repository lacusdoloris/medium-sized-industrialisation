/**
 * Adds a handful of miscellaneous iron processing recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addMiscIronRecipes = (event) => {
    // Reduction of Magnetite dust with hydrogen to pig iron:
    // Fe3O4 + 4 H2 = 3 Fe + 4 H2O
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/iron/magnetite_reduction")
        .itemInputs("1x gtceu:magnetite_dust")
        .inputFluids(Fluid.of("gtceu:hydrogen").withAmount(8 * FluidAmounts.BUCKET))
        .itemOutputs("3x gtceu:iron_dust")
        .outputFluids(Fluid.of("minecraft:water").withAmount(4 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.MV])
        .duration(5 * 20)
        .blastFurnaceTemp(1100);

    // Similar aluminothermic reaction.
    // 8 Al + 3 Fe3O4 = 4 Al2O3 + 9 Fe
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/iron/magnetite_aluminothermic")
        .itemInputs("8x gtceu:aluminium_dust", "3x gtceu:magnetite_dust")
        .itemOutputs("4x gtceu:alumina_dust", "9x gtceu:iron_dust")
        .EUt(GTValues.VH[GTValues.MV])
        .duration(5 * 20)
        .blastFurnaceTemp(1100);

    // Carbinothermic reduction of both Hematite and Iron(III) Oxide.
    // 2 Fe2O3 + 3 C = 4 Fe + 3 CO2
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/iron/hematite_reduction")
        .itemInputs("2x gtceu:hematite_dust", "3x #nijika:carbon_rich_dusts")
        .itemOutputs("4x gtceu:iron_dust")
        .outputFluids(Fluid.of("gtceu:carbon_dioxide").withAmount(3 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.MV])
        .duration(5 * 20)
        .blastFurnaceTemp(1100);

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/iron/iron_oxide_reduction")
        .itemInputs("2x gtceu:iron_oxide_dust", "3x #nijika:carbon_rich_dusts")
        .itemOutputs("4x gtceu:iron_dust")
        .outputFluids(Fluid.of("gtceu:carbon_dioxide").withAmount(3 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.MV])
        .duration(5 * 20)
        .blastFurnaceTemp(1100);
};
