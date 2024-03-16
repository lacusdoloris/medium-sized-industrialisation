import { createAqueousIntermediate, createChemicalIntermediate } from "../materials/helpers";

export const addBrineMaterials = (event) => {
    createAqueousIntermediate(event, "brine", 0x9da9b0);
    createChemicalIntermediate(event, "calcium_hydroxide", 0xc4afc2, true).components(
        "1x gtceu:calcium",
        "2x gtceu:oxygen",
        "2x gtceu:hydrogen"
    );

    createChemicalIntermediate(event, "potassium_hydroxide", 0x9bc2bf, true).components(
        "1x gtceu:potassium",
        "2x gtceu:oxygen",
        "2x gtceu:hydrogen"
    );

    createChemicalIntermediate(event, "potassium_fluoride", 0x889e9c, true).components(
        "1x gtceu:potassium",
        "1x gtceu:fluorine"
    );
};

// refs:
// Sustainable potassium chloride production from concentrated KCl brine via  a membrane-promoted crystallization process
// (https://doi.org/10.1016/j.desal.2021.115389)

/**
 * Adds brine-related recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addBrineRecipes = (event) => {
    event.recipes.gtceu
        .evaporation_pool("nijika:chemicals/brine/brine_evaporation")
        .inputFluids(Fluid.of("gtceu:salt_water").withAmount(200 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:brine").withAmount(35 * FluidAmounts.BUCKET))
        .EUt(GTValues.V[GTValues.MV])
        .duration(300 * 20);

    // potassium chloride extraction from brine using alumina as the catalyst.
    // this is VERY loosely based on the mechanism from the chinese paper above (not really).
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/brine/potassium_chloride_extraction")
        .inputFluids(Fluid.of("gtceu:brine").withAmount(1 * FluidAmounts.BUCKET))
        .notConsumable("17x gtceu:alumina_dust")
        .chancedOutput("5x gtceu:small_rock_salt_dust", 8900.0, 0.0)
        .EUt(GTValues.VH[GTValues.LV])
        .duration(5 * 20)
        .circuit(3);

    // potassium hydroxide production
    // uh, is this brine? can't think of anywheree else to put it lol.
    // KCl + H2O = KOH + H + Cl
    event.recipes.gtceu
        .electrolyzer("nijika:chemicals/brine/potassium_hydroxide_electrolysis")
        .itemInputs("1x gtceu:rock_salt_dust")
        .inputFluids(Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:potassium_hydroxide_dust")
        .outputFluids(
            Fluid.of("gtceu:hydrogen").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:chlorine").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.LV])
        .duration(64);

    // KOH + HF = KF + H2O
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/brine/potassium_fluoride")
        .itemInputs("1x gtceu:potassium_hydroxide_dust")
        .itemOutputs("1x gtceu:potassium_fluoride_dust")
        .inputFluids(Fluid.of("gtceu:hydrofluoric_acid").withAmount(1 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(48);

    // calcium hydroxide preparation
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/misc/calcium_hydroxide")
        .inputFluids(Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET))
        .itemInputs("1x gtceu:quicklime_dust")
        .itemOutputs("1x gtceu:calcium_hydroxide_dust")
        .EUt(GTValues.VH[GTValues.ULV])
        .duration(10);

    // calcium hydroxide neutralisation
    // 2 HCl + Ca(OH)2 = CaCl2 + 2 H2O
    // TODO: Ammonia recipe?
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/misc/calcium_hydroxide_neutralisation")
        .inputFluids(
            Fluid.of("gtceu:calcium_hydroxide").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrochloric_acid").withAmount(2)
        )
        .itemOutputs("1x gtceu:calcium_chloride_dust")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(2 * 20);

    // magnesium hydroxide precipitation with calcium hydroxide
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/brine/magnesium_hydroxide")
        .inputFluids(
            Fluid.of("gtceu:calcium_hydroxide").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:brine").withAmount(12 * FluidAmounts.BUCKET)
        )
        .itemOutputs("1x gtceu:magnesium_hydroxide_dust")
        .duration(5 * 20)
        .EUt(GTValues.VA[GTValues.HV]);
};
