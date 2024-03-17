// Here we go. Here's the big one.

import { createAqueousIntermediate, createDustIntermediate } from "../../materials/helpers";

export const addPlatinumGroupMaterials = (event) => {
    createAqueousIntermediate(event, "dissolved_platinum_group_sludge", 0x323338);
    createDustIntermediate(event, "silver_chloride", 0xd3dce0, true).components(
        "1x gtceu:silver",
        "1x gtceu:chlorine"
    );

    // Gold parts of the sludge.
    createAqueousIntermediate(event, "gold_mibk_mixture", 0xede49f);

    createAqueousIntermediate(event, "dissolved_platinum_group_1", 0x5d6656);
};

/**
 * Adds recipes for the platinum-group metals.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addPlatinumGroupRecipes = (event) => {
    // A lot of this is pieced together from various patents, papers, and encyclopedias.
    // It *roughly* follows Modern Separation Process F from Ullman's Encylopedia, but not exactly.
    // (That process is in itself derived from patent GB2065092).

    event.remove({ id: "gtceu:centrifuge/pgs_separation" });

    // Dissolve with HCl to get dissolved sludge and some silver chloride.
    event.recipes.gtceu
        .chemical_bath("nijika:chemicals/platinum/dissolved_pgs_sludge")
        .itemInputs("4x gtceu:platinum_group_sludge_dust")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(1 * FluidAmounts.BUCKET))
        .chancedOutput("3x gtceu:tiny_silver_chloride_dust", 3400.0, 54.0)
        .outputFluids(
            Fluid.of("gtceu:dissolved_platinum_group_sludge").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.EV])
        .duration(10 * 20);

    // Solvent extraction using Methyl isobutyl ketone of gold.
    // "Extraction kinetics are fast and virtually instantaneous."
    event.recipes.gtceu
        .mixer("nijika:chemicals/platinum/gold_extraction_using_mibk")
        .inputFluids(
            Fluid.of("gtceu:dissolved_platinum_group_sludge").withAmount(12 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:methyl_isobutyl_ketone").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:gold_mibk_mixture").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:dissolved_platinum_group_1").withAmount(10 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.EV])
        .duration(15);
};
