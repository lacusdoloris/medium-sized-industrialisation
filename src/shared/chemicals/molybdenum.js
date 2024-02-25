// TODO: Consider adding purification of the output MoO3.

import { createAcidicIntermediate, createDustIntermediate } from "../materials/helpers";

export const addMolybdenumMaterials = (event) => {
    createDustIntermediate(event, "impure_molybdenum_trioxide", 0xc6a9fc).components(
        "1x gtceu:molybdenum",
        "3x gtceu:oxygen"
    );

    createDustIntermediate(event, "molybdenum_dioxide", 0x645580).components(
        "1x gtceu:molybdenum",
        "2x gtceu:oxygen"
    );

    createAcidicIntermediate(event, "cyanotic_molybdenum_trioxide", 0x6ca9fc).dust();
    createAcidicIntermediate(event, "chlorinated_molybdenum_trioxide", 0xc69acf);
    createDustIntermediate(event, "molybdenum_trioxide", 0xb5b8ed);

    event
        .create(new ResourceLocation("nijika:ferromolybdenum"))
        .ingot()
        .dust()
        .color(0x7caccc)
        .components("3x gtceu:molybdenum", "2x gtceu:iron")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.NO_WORKING)
        .iconSet(GTMaterialIconSet.SHINY);
};

/**
 * Adds recipes for the processing of molybdenum.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addMolybdenumProcessingRecipes = (event) => {
    // see ullman's Molybdenum and Molybdenum Compounds.

    // Molybdenum roasting.
    // 2 MoS2 + 7 O2 = 2 MoO3 + 4 SO2 (hehehe)
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/molybdenum/molybdenite_roasting")
        .itemInputs("2x gtceu:molybdenite_dust")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(14 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:impure_molybdenum_trioxide_dust")
        .chancedOutput("1x gtceu:impure_molybdenum_trioxide_dust", 6500.0, 0.0) // Flat 65% chance, no boost!
        .outputFluids(Fluid.of("gtceu:sulfur_dioxide").withAmount(4 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.EV])
        .duration(6 * 20)
        .blastFurnaceTemp(900);

    // MoS2 + 6 MoO3 = 7 MoO2 + 2 SO2
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/molybdenum/molybdenite_oxidising")
        .itemInputs("1x gtceu:molybdenite_dust", "6x gtceu:impure_molybdenum_trioxide_dust")
        .itemOutputs("7x gtceu:molybdenum_dioxide_dust")
        .outputFluids(Fluid.of("gtceu:sulfur_dioxide").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.EV])
        .duration(10 * 20)
        .blastFurnaceTemp(950);

    // 2 MoO2 + O2 = 2 MoO3
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/molybdenum/molybdenum_oxidising")
        .itemInputs("2x gtceu:molybdenum_dioxide_dust")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("2x gtceu:impure_molybdenum_trioxide_dust")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(6 * 20)
        .blastFurnaceTemp(923);

    // Leach with Sodium Cyanide (aq) to get Cyanotic Molybdenum.
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/molybdenum/leaching_1")
        .itemInputs("2x gtceu:impure_molybdenum_trioxide_dust", "4x gtceu:sodium_cyanide_dust")
        .inputFluids(Fluid.of("minecraft:water").withAmount(6 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:cyanotic_molybdenum_trioxide").withAmount(6 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(2 * 20);

    event.recipes.gtceu
        .centrifuge("nijika:chemicals/molybdenum/cyanotic_centrifuging")
        .inputFluids(
            Fluid.of("gtceu:cyanotic_molybdenum_trioxide").withAmount(9 * FluidAmounts.BUCKET)
        )
        .itemOutputs("2x gtceu:cyanotic_molybdenum_trioxide_dust")
        .chancedFluidOutput(
            Fluid.of("gtceu:sodium_dicyanoaurate").withAmount(2 * FluidAmounts.BUCKET),
            1500.0,
            5.0
        )
        .chancedOutput("3x gtceu:small_copper_cyanide_dust", 7800, 134.0)
        .outputFluids(Fluid.of("gtceu:water").withAmount(6 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.MV])
        .duration(10);

    // Leach with Iron (III) Chloride to get Chlorinated Molybdenum.
    event.recipes.gtceu
        .chemical_bath("nijika:chemicals/molybdenum/leaching_2")
        .inputFluids(Fluid.of("gtceu:iron_iii_chloride").withAmount(3 * FluidAmounts.BUCKET))
        .itemInputs("2x gtceu:cyanotic_molybdenum_trioxide_dust")
        .outputFluids(
            Fluid.of("gtceu:chlorinated_molybdenum_trioxide").withAmount(3 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(5 * 20);

    event.recipes.gtceu
        .centrifuge("nijika:chemicals/molybdenum/chlorinated_centrifuging")
        .inputFluids(
            Fluid.of("gtceu:chlorinated_molybdenum_trioxide").withAmount(6 * FluidAmounts.BUCKET)
        )
        .itemOutputs("3x gtceu:molybdenum_trioxide_dust")
        .outputFluids(
            Fluid.of("gtceu:diluted_hydrochloric_acid").withAmount(500 * FluidAmounts.MILLIBUCKET)
        )
        .chancedOutput("2x gtceu:small_calcium_chloride_dust", 1630.0, 150.0)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(10);

    // Reduce using hydrogen to get raw Molybdenum metal...
    // MoO3 + 3 H2 = Mo + 3 H2O
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/molybdenum/molybdenum_direct_reduction")
        .itemInputs("1x gtceu:molybdenum_trioxide_dust")
        .inputFluids(Fluid.of("gtceu:hydrogen").withAmount(6 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:molybdenum_dust")
        .outputFluids(Fluid.of("minecraft:water").withAmount(3 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.EV])
        .duration(10 * 20)
        .blastFurnaceTemp(800);

    // ... or reduce using aluminium to get ferromolybdenum (Mo3Fe2).
    // 3 MoO3 + 2 Fe + 6 Al = Fe2Mo3 + 3 Al2O3
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/molybednum/ferromolybenum")
        .itemInputs(
            "3x gtceu:molybdenum_trioxide_dust",
            "2x gtceu:iron_dust",
            "6x gtceu:aluminium_dust"
        )
        .itemOutputs("3x gtceu:ferromolybdenum_ingot", "3x gtceu:alumina_dust")
        .EUt(GTValues.V[GTValues.EV])
        .duration(30 * 20)
        .blastFurnaceTemp(2700);
};
