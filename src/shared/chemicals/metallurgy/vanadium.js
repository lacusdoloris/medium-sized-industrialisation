// Ref: Vanadium and Vanadium Compounds
// https://doi.org/10.1002/14356007.a27_367

import { createChemicalIntermediate, createDustIntermediate } from "../../materials/helpers";

export const addVanadiumMaterials = (event) => {
    // == Vanadium == //
    createDustIntermediate(event, "vanadium_pentoxide", 0xd5bf6b).components(
        "2x gtceu:vanadium",
        "5x gtceu:oxygen"
    );

    createChemicalIntermediate(event, "vanadium_oxytrichloride", 0xf5f242).components(
        "1x gtceu:vanadium",
        "1x gtceu:oxygen",
        "3x gtceu:chlorine"
    );
};

/**
 * Adds the vanadium chemical processing chain.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addVanadiumChemicalChain = (event) => {
    // Vanadium(V) oxide is recovered from slag processing from magnetite.
    // It can be converted to raw Vanadium dust by reduction with calcium.
    // V2O5 + 5 Ca = 5 CaO + 2 V

    event.recipes.gtceu
        .electric_blast_furnace("nijika:tier02/vanadium/vanadium_reduction")
        .itemInputs("1x gtceu:vanadium_pentoxide_dust", "5x gtceu:calcium_dust")
        .itemOutputs("5x gtceu:quicklime_dust", "2x gtceu:vanadium_dust")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(30 * 20)
        .blastFurnaceTemp(1700);

    // Vanadiumsteel can be made in the Bessemer Converter as an alloy of chrome, iron, and
    // vanadium.
    event.remove({ id: "gtceu:mixer/vanadiumsteel" });
    event.remove({ id: "gtceu:electric_blast_furnace/blast_vanadium_steel_gas" });
    event.remove({ id: "gtceu:alloy_blast_smelter/vanadium_steel_gas" });
    event.remove({ id: "gtceu:alloy_blast_smelter/vanadium_steel" });

    event.recipes.gtceu
        .bessemer_smelting("nijika:tier02/vanadium/vanadium_steel")
        .itemInputs(
            "47x #forge:ingots/iron",
            "9x #forge:ingots/chromium",
            "9x #forge:ingots/vanadium",
            "8x #nijika:bessemer_limestone"
        )
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(2100 * FluidAmounts.MILLIBUCKET))
        .itemOutputs("64x gtceu:vanadium_steel_ingot")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20 * 60 * 20)
        .circuit(2);

    event.recipes.gtceu
        .bessemer_smelting("nijika:tier02/vanadium/vanadium_steel_from_dusts")
        .itemInputs(
            "47x #forge:dusts/iron",
            "9x #forge:dusts/chromium",
            "9x #forge:dusts/vanadium",
            "8x #nijika:bessemer_limestone"
        )
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(2100 * FluidAmounts.MILLIBUCKET))
        .itemOutputs("64x gtceu:vanadium_steel_ingot")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20 * 60 * 20)
        .circuit(2);

    event.recipes.gtceu
        .bessemer_smelting("nijika:tier02/vanadium/vanadium_steel_from_blocks")
        .itemInputs(
            "47x #forge:storage_blocks/iron",
            "9x #forge:storage_blocks/chromium",
            "9x #forge:storage_blocks/vanadium",
            "64x #nijika:bessemer_limestone"
        )
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(18900 * FluidAmounts.MILLIBUCKET))
        .itemOutputs("64x gtceu:vanadium_steel_block")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(40 * 60 * 20)
        .circuit(2);

    // replace clean stainless steel casing with vanadium steel casing
    event.remove({ id: "gtceu:assembler/casing_stainless_clean" });
    event.remove({ id: "gtceu:arc_furnace/arc_clean_machine_casing" });
    event.remove({ id: "gtceu:macerator/macerate_clean_machine_casing" });

    event.recipes.gtceu
        .assembler("nijika:misc/casings/clean")
        .itemInputs("6x #forge:plates/vanadium_steel", "1x gtceu:vanadium_steel_frame")
        .itemOutputs("2x gtceu:clean_machine_casing")
        .EUt(16)
        .duration(2 * 20 + 10)
        .circuit(6);

    // oxytrichloride hydrolysis
    // 2 VOCl3 + 3 H2O = V2O5 + 6 HCl
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/vanadium/oxytrichloride_hydrolysis")
        .inputFluids(
            Fluid.of("gtceu:vanadium_oxytrichloride").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(3 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(6 * FluidAmounts.BUCKET))
        .itemOutputs("gtceu:vanadium_pentoxide_dust")
        .EUt(GTValues.VH[GTValues.HV])
        .duration(5 * 20)
        .circuit(1);

    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/vanadium/oxytrichloride_dust_hydrolysis")
        .inputFluids(Fluid.of("minecraft:water").withAmount(3 * FluidAmounts.BUCKET))
        .itemInputs("2x gtceu:vanadium_oxytrichloride_dust")
        .outputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(6 * FluidAmounts.BUCKET))
        .itemOutputs("gtceu:vanadium_pentoxide_dust")
        .EUt(GTValues.VH[GTValues.HV])
        .duration(5 * 20)
        .circuit(1);
};
