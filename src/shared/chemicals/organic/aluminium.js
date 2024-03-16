import { createAqueousIntermediate } from "../../materials/helpers";

export const addOrganoaluminiumMaterials = (event) => {
    createAqueousIntermediate(event, "triethylaluminium", 0x87de9e);
    createAqueousIntermediate(event, "ethylaluminium_sesquichloride", 0x87c39e);
};

/**
 * Adds recipes for organoaluminium compounds.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addOrganoaluminiumRecipes = (event) => {
    // Derivation: Reaction of ethyl chloride and aluminum.

    // The reaction is carried out with aluminum in the form of turnings, shavings, granules, or
    // powder. Oxygen and moisture must be rigorously excluded. The reaction can be
    // initiated with a small amount of mercury or iodine.

    // 2 Al + 3 CH3CH2Cl = Et3Al2Cl3
    // Incredibly slow, to incentivise upgrading to the recursive triethylaluminium process.
    event.recipes.gtceu
        .chemical_reactor(
            "nijika:chemicals/organoaluminium/ethylaluminium_sesquichloride_from_chloroethane"
        )
        .itemInputs("1x nijika:iodine_catalyst", "2x gtceu:aluminium_dust")
        .inputFluids(Fluid.of("gtceu:chloroethane").withAmount(3 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:ethylaluminium_sesquichloride").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.EV])
        .duration(60 * 20);

    // Reduction by sodium metal of ethylaluminium sesquichloride to get triethylaluminium.
    // 2 Et3Al2Cl3 + 6 Na = Al2Et6 + 2 Al + 6 NaCl
    event.recipes.gtceu
        .large_chemical_reactor(
            "nijika:chemicals/organoaluminium/triethylaluminium_from_sesquichloride"
        )
        .itemInputs("6x gtceu:sodium_dust")
        .inputFluids(
            Fluid.of("gtceu:ethylaluminium_sesquichloride").withAmount(2 * FluidAmounts.BUCKET)
        )
        .itemOutputs("2x gtceu:aluminium_dust", "6x gtceu:salt_dust")
        .outputFluids(Fluid.of("gtceu:triethylaluminium").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.EV])
        .duration(30 * 20);

    // Alternative path via the "two-step" (one-step) process.
    // This is abstracted a bit but you gett the idea.
    // 2 Al + 6 Et = Al2Et6
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/organoaluminium/triethylaluminium_two_step")
        .inputFluids(
            Fluid.of("gtceu:triethylaluminium").withAmount(250 * FluidAmounts.MB),
            Fluid.of("gtceu:ethylene").withAmount(4500 * FluidAmounts.MB),
            Fluid.of("gtceu:hydrogen").withAmount(1 * FluidAmounts.BUCKET) // fake catalyst
        )
        .itemInputs("8x gtceu:small_aluminium_dust")
        .outputFluids(Fluid.of("gtceu:triethylaluminium").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.V[GTValues.EV])
        .duration(10 * 20);

    event.recipes.gtceu
        .assembler("nijika:chemicals/organoaluminium/triethylaluminium_catalyst")
        .itemInputs("32x nijika:empty_catalyst")
        .inputFluids(
            Fluid.of("gtceu:triethylaluminium").withAmount(1500 * FluidAmounts.MB)
        )
        .itemOutputs("32x nijika:triethylaluminium_catalyst")
        .duration(10)
        .EUt(GTValues.VA[GTValues.ULV])
        .circuit(9);
};
