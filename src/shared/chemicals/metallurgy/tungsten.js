import {
    createAcidicIntermediate,
    createAqueousIntermediate,
    createDustIntermediate,
} from "../../materials/helpers";

export const addTungstenMaterials = (event) => {
    createAqueousIntermediate(event, "trimethylamine", 0xc1c0f0);

    // Pre-treated Scheelite Slurry
    createAcidicIntermediate(event, "pretreated_scheelite", 0x8fbdb7).dust();

    // post-roasting scheelite
    createDustIntermediate(event, "desulfurised_scheelite", 0xa3b082);

    // impure sodium tungstate
    createAqueousIntermediate(event, "impure_sodium_tungstate", 0xe6b48c).components(
        "2x gtceu:sodium",
        "1x gtceu:tungsten",
        "4x gtceu:oxygen"
    );
};

/**
 * Adds recipes for the Tungsten processing chain.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addTungstenRecipes = (event) => {
    event.remove({ input: "gtceu:crushed_scheelite_ore" });
    event.remove({ id: "gtceu:smelting/smelt_raw_scheelite_ore_to_ingot" });

    // == Part 1: Scheelite Treatment == //
    // Pre-treatment of Scheelite with HCl to dissolve sulfphide and arsenic materials.
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/scheelitee/pre_treatment")
        .itemInputs("32x gtceu:crushed_scheelite_ore")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(12 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:pretreated_scheelite").withAmount(12 * FluidAmounts.BUCKET))
        .chancedOutput("5x gtceu:small_arsenic_trioxide_dust", 4400.0, 74.0)
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(20 * 20);

    event.recipes.gtceu
        .centrifuge("nijika:chemicals/scheelite/pre_treatment_separation")
        .inputFluids(Fluid.of("gtceu:pretreated_scheelite").withAmount(16 * FluidAmounts.BUCKET))
        .itemOutputs("32x gtceu:pretreated_scheelite_dust")
        .chancedOutput("18x gtceu:small_pretreated_scheelite_dust", 7500.0, 0.0)
        .chancedOutput("23x gtceu:small_arsenic_trioxide_dust", 3500.0, 0.0)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(2 * 20);

    // Roasting of pre-treated Scheelite to get Roasted Scheelite.
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/scheelite/roasting")
        .itemInputs("64x gtceu:pretreated_scheelite_dust")
        .itemOutputs("52x gtceu:desulfurised_scheelite_dust")
        .chancedOutput("16x gtceu:gypsum_dust", 3500.0, 55.0)
        .outputFluids(Fluid.of("gtceu:sulfur_dioxide").withAmount(8 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.EV])
        .duration(60 * 20);

    // The first paper suggests using Na2CO3 for digestion, but chinese plants use regular NaOH.

    // CaWO4 + 2 NaOH => Na2WO4 + Ca(OH)2
    // CaWO4 + Na2CO3 => Na2WO4 + CaCO3
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/scheelite/digestion_naoh")
        .itemInputs("32x gtceu:desulfurised_scheelite_dust", "64x gtceu:sodium_hydroxide_dust")
        .itemOutputs("32x gtceu:calcium_hydroxide_dust")
        .outputFluids(
            Fluid.of("gtceu:impure_sodium_tungstate").withAmount(32 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(150 * 20);

    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/scheelite/digestion_na2co3")
        .itemInputs("32x gtceu:desulfurised_scheelite_dust", "32x gtceu:soda_ash_dust")
        .itemOutputs("32x gtceu:calcite_dust")
        .outputFluids(
            Fluid.of("gtceu:impure_sodium_tungstate").withAmount(32 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(150 * 20);

    // TODO: Wulfenite.

    // == Part 3: Sodium Tungstate Reactions == //

    // == Part 4: Tungsten Extraction == //
};
