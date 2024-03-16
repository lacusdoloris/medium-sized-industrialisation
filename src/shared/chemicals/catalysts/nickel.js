import { createDustIntermediate } from "../../materials/helpers";
import { GasTier, nijikaId } from "../../utils";

export const addNickelCatalystMaterials = (event) => {
    event
        .create(nijikaId("nickel_aluminium_mixture"))
        .ingot()
        .dust()
        .fluid()
        .color(0x97e8ae)
        .components("1x gtceu:nickel", "1x gtceu:aluminium")
        .blastTemp(1100, GasTier.LOW, GTValues.VA[GTValues.MV])
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    createDustIntermediate(event, "spongy_nickel", 0x969696).components(
        "1x gtceu:nickel",
        "1x gtceu:aluminium"
    );
};

/**
 * Adds the process for producing Raney nickel.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addNickelCatalystRecipes = (event) => {
    event.recipes.gtceu
        .mixer("nijika:catalysts/nickel/mixed_dust")
        .itemInputs("1x gtceu:nickel_dust", "1x gtceu:aluminium_dust")
        .itemOutputs("2x gtceu:nickel_aluminium_mixture_dust")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(10);

    // Sodium hydroxide activation of nickel-aluminium mixture.
    event.recipes.gtceu
        .chemical_reactor("nijika:catalysts/nickel/activation")
        .itemInputs("1x gtceu:nickel_aluminium_mixture_dust", "1x gtceu:sodium_hydroxide_dust")
        .itemOutputs("2x gtceu:small_spongy_nickel_dust")
        .outputFluids(Fluid.of("gtceu:sodium_aluminate").withAmount(500 * FluidAmounts.MB))
        .duration(5 * 20)
        .EUt(GTValues.VA[GTValues.HV]);

    event.recipes.gtceu
        .assembler("nijika:catalysts/nickel/assembly")
        .itemInputs("32x nijika:empty_catalyst", "2x gtceu:spongy_nickel_dust")
        .itemOutputs("32x nijika:nickel_catalyst")
        .duration(10)
        .EUt(GTValues.VA[GTValues.ULV])
        .circuit(9);
};
