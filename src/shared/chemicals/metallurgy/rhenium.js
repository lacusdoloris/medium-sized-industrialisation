import {
    createAcidicIntermediate,
    createAqueousIntermediate,
    createDustIntermediate,
} from "../../materials/helpers";
import { GasTier, nijikaId } from "../../utils";

export const addRheniumMaterials = (event) => {
    createAcidicIntermediate(event, "sulfuric_molybdenite_runoff", 0xc2a976);
    createAqueousIntermediate(event, "rhenium_tbp_mixture", 0x52574f);

    createDustIntermediate(event, "ammonium_perrhenate", 0x39354a);

    event
        .create(nijikaId("rhenium_superalloy"))
        .color(0x7be3d0)
        .ingot()
        .dust()
        .fluid()
        .iconSet(GTMaterialIconSet.SHINY)
        .components("1x gtceu:rhenium", "1x gtceu:ruthenium", "18x gtceu:nickel") // 5% rhenium, 5% ruthenium, 90% nickel
        .blastTemp(3460, GasTier.MID, GTValues.VA[GTValues.EV])
        .rotorStats(10.0, 3.0, 4200)
        .flags(
            GTMaterialFlags.GENERATE_FRAME,
            GTMaterialFlags.GENERATE_FOIL,
            GTMaterialFlags.GENERATE_PLATE,
            GTMaterialFlags.GENERATE_ROD,
            GTMaterialFlags.GENERATE_ROTOR,
            GTMaterialFlags.GENERATE_RING,
            GTMaterialFlags.DISABLE_DECOMPOSITION
        );
};

/**
 * Adds recipes for Rhenium processing.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addRheniumRecipes = (event) => {
    // Selective recovery of rhenium from molybdenite flue-dust leach liquor using solvent extraction with TBP

    // First... let's actually leach off the molybdenite flue.
    event.recipes.gtceu
        .mixer("nijika:chemicals/rhenium/sulfuric_molybdenite_runoff")
        .inputFluids(
            Fluid.of("gtceu:molybdenum_flue").withAmount(6 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(4 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:sulfuric_molybdenite_runoff").withAmount(6 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.MV])
        .duration(2 * 20 + 10);

    // The runoff is now a mixture of sulfuric acid, molybdenum trioxide, and rhenium oxide.
    // The rhenium can be separated out with tributyl phosphate liquid-liquid extraction, and
    // converted into ammonia salts by neutralisation.
    // TODO: Extra molybdenum?
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/rhenium/rhenium_separation")
        .inputFluids(
            Fluid.of("gtceu:sulfuric_molybdenite_runoff").withAmount(1800 * FluidAmounts.MB),
            Fluid.of("gtceu:tributyl_phosphate").withAmount(200 * FluidAmounts.MB),
            Fluid.of("gtceu:toluene").withAmount(750 * FluidAmounts.MB)
        )
        .outputFluids(
            Fluid.of("gtceu:rhenium_tbp_mixture").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sulfuric_acid").withAmount(900 * FluidAmounts.MB)
        )
        .EUt(GTValues.VA[GTValues.MV])
        .duration(20);

    // ReO4{-} + NH4{+} = NH4ReO4
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/rhenium/ammonium_perrhenate")
        .inputFluids(
            Fluid.of("gtceu:rhenium_tbp_mixture").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:ammonium_hydroxide").withAmount(144 * FluidAmounts.MB)
        )
        .outputFluids(
            Fluid.of("gtceu:tributyl_phosphate").withAmount(150 * FluidAmounts.MB),
            Fluid.of("gtceu:toluene").withAmount(700 * FluidAmounts.MB)
        )
        .itemOutputs("1x gtceu:tiny_ammonium_perrhenate_dust")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(5 * 20);

    // Reduction with hydrogen.
    // 2 NH4ReO4 + 7 H2 = 2 Re + 8 H2O + 2 NH3
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/rhenium/ammonium_reduction")
        .itemInputs("2x gtceu:ammonium_perrhenate_dust")
        .inputFluids(Fluid.of("gtceu:hydrogen").withAmount(14 * FluidAmounts.BUCKET))
        .itemOutputs("2x gtceu:rhenium_dust")
        .outputFluids(Fluid.of("gtceu:ammonia").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.EV])
        .duration(10 * 20)
        .blastFurnaceTemp(2100);
};
