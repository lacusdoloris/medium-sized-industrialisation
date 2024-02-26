// Anger, G., Halstenberg, J., Hochgeschwender, K., Scherhag, C., Korallus, U., Knopf, H., … Ohlinger, M. (2000). Chromium Compounds. Ullmann’s Encyclopedia of Industrial Chemistry. doi:10.1002/14356007.a07_067
import { createChemicalIntermediate, createDustIntermediate } from "../materials/helpers";

export const addChromiumMaterials = (event) => {
    createDustIntermediate(event, "sodium_dichromate", 0xe37b2b).components(
        "2x gtceu:sodium",
        "2x gtceu:chromium",
        "7x gtceu:oxygen"
    );

    createDustIntermediate(event, "sodium_chromate", 0xf4d015).components(
        "2x gtceu:sodium",
        "gtceu:chromium",
        "4x gtceu:oxygen"
    );

    createDustIntermediate(event, "chromium_iii_oxide", 0x9cbc7b).components(
        "2x gtceu:chromium",
        "3x gtceu:oxygen"
    );

    event
        .create(new ResourceLocation("nijika:ferrochrome"))
        .ingot()
        .dust()
        .color(0x446476)
        .components("gtceu:iron", "gtceu:chromium")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.NO_WORKING)
        .iconSet(GTMaterialIconSet.SHINY);
};

/**
 * Adds recipes for Chromite processing.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addChromiteProcessingRecipes = (event) => {
    // Step 1: Chromite + Soda Ash + Oxygen -> Sodium Chromate + Iron(II) Oxide + CO2
    // 4 FeCr2O4 + 8 Na2CO3 + 7 O2 = 8 Na2CrO4 + 2 Fe2O3 + 8 CO2

    event.recipes.gtceu
        .electric_blast_furnace("nijika:tier02/chromium/chromite_to_sodium_chromate")
        .itemInputs("4x #forge:dusts/chromite", "8x #forge:dusts/soda_ash")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(7 * FluidAmounts.BUCKET))
        .itemOutputs("8x gtceu:sodium_chromate_dust", "2x gtceu:iron_oxide_dust")
        .outputFluids(Fluid.of("gtceu:carbon_dioxide").withAmount(8 * FluidAmounts.BUCKET))
        .EUt(GTValues.V[GTValues.MV])
        .blastFurnaceTemp(1300) // circa 1000C in the paper
        .duration(10 * 20);

    // Step 2: Sodium Chromate + Hydrochloric Acid -> Sodium Dichromate + Salt + Water
    // 2 Na2CrO4 + 2 HCl = Na2Cr2O7 + 2 NaCl + H2O
    // Unlike the book linked at the top, this uses hydrochloric acid instead of sulfuric acid.
    // The outcome is the same, anyway.

    event.recipes.gtceu
        .chemical_bath("nijika:tier02/chromium/nacr2_to_na2cr")
        .itemInputs("2x #forge:dusts/sodium_chromate")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:sodium_dichromate_dust", "2x gtceu:salt_dust")
        .outputFluids(Fluid.of("minecraft:water").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .duration(3 * 20);

    // Step 3: Reduce the Sodium Dichromate with Carbon or Sulfur to get Chromium(III) Oxide.
    // Na2Cr2O7 + 2 C = Cr2O3 + Na2CO3 + CO
    // Na2Cr2O7 + S = Cr2O3 + Na2SO4

    // Chromium(III) oxide destined for aluminothermic production of pure chromium metal
    // must be heated additionally at 1000 �C to increase its grain size.
    // (see Chromium(III) oxides section)

    event.recipes.gtceu
        .electric_blast_furnace("nijika:tier02/chromium/c3o_using_carbon")
        .itemInputs("1x gtceu:sodium_dichromate_dust", "2x #nijika:carbon_rich_dusts")
        .itemOutputs("1x gtceu:chromium_iii_oxide_dust", "1x gtceu:soda_ash_dust")
        .outputFluids(Fluid.of("gtceu:carbon_monoxide").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.V[GTValues.MV])
        .blastFurnaceTemp(1300)
        .duration(20 * 20);

    // Step 4: Aluminothermic reaction to get raw elemental Chromium.
    // 2 Al + Cr2O3 = Al2O3 + 2 Cr

    event.recipes.gtceu
        .electric_blast_furnace("nijika:tier02/chromium/chromium_aluminothermic")
        .itemInputs("1x gtceu:chromium_iii_oxide_dust", "2x #forge:dusts/aluminium")
        .itemOutputs("2x gtceu:chromium_dust", "1x gtceu:alumina_dust")
        .EUt(GTValues.VA[GTValues.HV])
        .blastFurnaceTemp(1300)
        .duration(5 * 20);

    // Side recipe: FeCr2O4 + 2C -> FeCr + 2 CO2, for stainless steel later on.

    event.recipes.gtceu
        .electric_blast_furnace("nijika:tier02/chromium/ferrochrome")
        .itemInputs("1x gtceu:chromite_dust", "#nijika:carbon_rich_dusts")
        .itemOutputs("1x gtceu:ferrochrome_ingot")
        .outputFluids(Fluid.of("gtceu:carbon_dioxide").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .blastFurnaceTemp(2700)
        .duration(30 * 20);
};
