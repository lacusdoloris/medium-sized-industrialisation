import { createAqueousIntermediate, createDustIntermediate } from "../materials/helpers";

// wow, gtceu doesn't have h2o2?
export const addHydrogenPeroxideMaterials = (event) => {
    createDustIntermediate(event, "ammonium_sulfate", 0x63663d);
    createDustIntermediate(event, "ammonium_bisulfate", 0xb3b686);
    createDustIntermediate(event, "ammonium_persulfate", 0xb19186);

    createAqueousIntermediate(event, "hydrogen_peroxide", 0xc9f3f5).components(
        "2x gtceu:hydrogen",
        "2x gtceu:oxygen"
    );
};

/**
 * Adds recipes for hydrogen peroxide.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addHydrogenPeroxideRecipes = (event) => {
    // Derivation: (1) Autoxidation of an alkyl anthrahydroquinone such as the 2-ethyl derivative
    // in a cyclic continuous process in which the quinone formed in the oxidation step is reduced
    // to the starting material by hydrogen in the presence of a supported palladium catalyst;
    // (2) by electrolytic processes in which aqueous sulfuric acid or acidic ammonium bisulfate
    // is converted electrolytically to the peroxydisulfate, which is then hydrolyzed to form
    // hydrogen peroxide; (3) by autoxidation of isopropyl alcohol. Method (1) is most widely used.

    // The initial mechanism is method 2 in EV (for iodine), which is replaced by methodd 1
    // as soon as the platinum chain is completed.

    // Ammonium sulfate from reaction of ammonia and sulfuric acid.
    // 2 NH3 + H2SO4 = (NH4)2SO4
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/hydrogen_peroxide/ammonium_sulfate")
        .inputFluids(
            Fluid.of("gtceu:ammonia").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sulfuric_acid").withAmount(1 * FluidAmounts.BUCKET)
        )
        .itemOutputs("1x gtceu:ammonium_sulfate_dust")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(5 * 20);

    // Thermal decomposition of ammonium sulfate to get ammonium bisulfate.
    event
        .smelting("gtceu:ammonium_bisulfate_dust", "gtceu:ammonium_sulfate_dust")
        .id("nijika:chemicals/hydrogen_peroxide/ammonium_bisulfate");

    // Catalytic electrolysis of ammonium bisulfate to get ammonium persulfate.
    // 2 (NH4)HSO4 = H2 + (NH4)2S2O8
    // The H2SO4 is consumed here to make it less attractive to keep using this once palladium
    // catalysts are available.
    event.recipes.gtceu
        .electrolyzer("nijika:chemicals/hydrogen_peroxide/ammonium_persulfate")
        .itemInputs("2x gtceu:ammonium_bisulfate_dust")
        .itemOutputs("1x gtceu:ammonium_persulfate_dust")
        .inputFluids(Fluid.of("gtceu:sulfuric_acid").withAmount(250 * FluidAmounts.MB))
        .outputFluids(Fluid.of("gtceu:hydrogen").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .duration(60 * 20);

    // This then produces a cycle, returning to ammonium bisulfate.
    // (NH4)2S2O8 + 2 H2O = 2 (NH4)HSO4 + H2O2
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/hydrogen_peroxide/from_ammonium_persulfate")
        .itemInputs("1x gtceu:ammonium_persulfate_dust")
        .inputFluids(Fluid.of("minecraft:water").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("2x gtceu:ammonium_bisulfate_dust")
        .outputFluids(Fluid.of("gtceu:hydrogen_peroxide").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .duration(5 * 20);
};
