import { createAqueousIntermediate } from "../../materials/helpers";

export const addMIBKMaterials = (event) => {
    createAqueousIntermediate(event, "diacetone_alcohol", 0xb7cf7c);
    createAqueousIntermediate(event, "mesityl_oxide", 0xafba93);
    createAqueousIntermediate(event, "methyl_isobutyl_ketone", 0xd8eba9);

    createAqueousIntermediate(event, "diacetone_mixture", 0x3d3d36);
};

/**
 * Adds recipes for the synthesis of methyl isobutyl ketone.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addMIBKProcess = (event) => {
    /*
    First acetone is condensed by contacting it with a solid alkaline catalyst such as barium 
    hydroxide in the liquid phase at a temperature of 10 to 20°C and under atmospheric pressure to 
    prepare diacetone alcohol. Then the diacetone alcohol thus prepared is separated from unreacted 
    acetone and dehydrated by heating at 100 to 120°C in the liquid phase in the presence of an 
    acid catalyst such as sulfuric acid or phosphoric acid to prepare mesityl oxide. Subsequently 
    this mesityl oxide is separated and purified, and then hydrogenated in the present of, 
    e.g., a Raney nickel catalyst to prepare MIBK.
    */

    // Barium hydroxide catalysted aldol self-condensation of Acetone.
    // This is an inefficient and poorly catalysed mechanism.
    // 2 C3H6O = CH3C(O)CH2C(OH)(CH3)2
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/mibk/barium_hydroxide_aldol_condensation")
        .itemInputs("1x gtceu:tiny_barium_hydroxide_dust")
        .inputFluids(Fluid.of("gtceu:acetone").withAmount(1 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:diacetone_mixture").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(10 * 20);

    event.recipes.gtceu
        .distillation_tower("nijika:chemicals/mibk/diacetone_mixture_distillation")
        .inputFluids(Fluid.of("gtceu:diacetone_mixture").withAmount(12 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:acetone").withAmount(11040 * FluidAmounts.MB),
            Fluid.of("gtceu:diacetone_alcohol").withAmount(480 * FluidAmounts.MB)
        )
        .EUt(GTValues.VHA[GTValues.HV]) // mercifully, you can overclock it.
        .duration(5 * 20);

    // Mesityl oxide production from the aforementioned diacetone.
    // CH3C(O)CH2C(OH)(CH3)2 = CH3C(O)CHC(CH3)2 + H2O
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/mibk/mesityl_oxide")
        .inputFluids(
            Fluid.of("gtceu:diacetone_alcohol").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sulfuric_acid").withAmount(50 * FluidAmounts.MB)
        )
        .outputFluids(
            Fluid.of("gtceu:mesityl_oxide").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(2 * 20 + 10);

    // Finally, synthesis of MIBK from Mesityl oxide and hydrogen in the presence of nickel.
    // TODO: Replace with proper honeycomb catalysts.
    // CH3C(O)CHC(CH3)2 + H2 = (CH3)2CHCH2C(O)CH3
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/mibk/mibk_from_mesityl")
        .inputFluids(
            Fluid.of("gtceu:mesityl_oxide").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(2 * FluidAmounts.BUCKET)
        )
        .itemInputs("1x nijika:nickel_catalyst")
        .outputFluids(Fluid.of("gtceu:methyl_isobutyl_ketone").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.EV])
        .duration(10 * 20);
};
