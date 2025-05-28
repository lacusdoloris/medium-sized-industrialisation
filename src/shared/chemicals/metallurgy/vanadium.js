// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// Ref: Vanadium and Vanadium Compounds
// https://doi.org/10.1002/14356007.a27_367

import {
    createAcidicIntermediate,
    createChemicalIntermediate,
    createDustIntermediate,
} from "../../materials/helpers";

export const addVanadiumMaterials = (event) => {
    createDustIntermediate(event, "vanadium_pentoxide", 0xd5bf6b).components(
        "2x gtceu:vanadium",
        "5x gtceu:oxygen"
    );

    createChemicalIntermediate(event, "vanadium_oxytrichloride", 0xf5f242).components(
        "1x gtceu:vanadium",
        "1x gtceu:oxygen",
        "3x gtceu:chlorine"
    );

    createAcidicIntermediate(event, "sodium_vanadate", 0xd1ac77).components(
        "1x gtceu:sodium",
        "1x gtceu:vanadium",
        "3x gtceu:oxygen"
    );

    event
        .create(new ResourceLocation("nijika:ferrovanadium"))
        .ingot()
        .dust()
        .color(0xc2cc9b)
        .components("gtceu:iron", "gtceu:vanadium")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.NO_WORKING)
        .iconSet(GTMaterialIconSet.DULL);
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
        .duration(5 * 20)
        .blastFurnaceTemp(1700);

    // ferrovanadium production from iron oxide
    // 3 Fe2O3 + 3 V2O5 + 16 Al = 6 FeV + 8 Al2O3
    event.recipes.gtceu
        .electric_blast_furnace("nijika:tier02/vanadium/ferrovanadium")
        .itemInputs(
            "3x #forge:dusts/iron_oxide",
            "3x #forge:dusts/vanadium_pentoxide",
            "16x #nijika:blast_recipes/aluminothermics"
        )
        .itemOutputs("6x gtceu:ferrovanadium_ingot", "8x gtceu:alumina_dust")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(12 * 20)
        .blastFurnaceTemp(1700);

    // Vanadiumsteel can be made in the Bessemer Converter as an alloy of chrome, iron, and
    // vanadium.
    event.remove({ id: "gtceu:mixer/vanadiumsteel" });
    event.remove({ id: "gtceu:electric_blast_furnace/blast_vanadium_steel_gas" });
    event.remove({ id: "gtceu:alloy_blast_smelter/vanadium_steel_gas" });
    event.remove({ id: "gtceu:alloy_blast_smelter/vanadium_steel" });

    event.recipes.gtceu
        .bessemer_smelting("nijika:tier02/vanadium/vanadium_steel_from_blocks")
        .itemInputs(
            "64x #forge:storage_blocks/iron",
            "9x #forge:storage_blocks/ferrochrome",
            "9x #forge:storage_blocks/ferrovanadium",
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
        .chemical_reactor("nijika:chemicals/vanadium/oxytrichloride_dust_hydrolysis")
        .inputFluids(Fluid.of("minecraft:water").withAmount(3 * FluidAmounts.BUCKET))
        .itemInputs("2x gtceu:vanadium_oxytrichloride_dust")
        .outputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(6 * FluidAmounts.BUCKET))
        .itemOutputs("gtceu:vanadium_pentoxide_dust")
        .EUt(GTValues.VH[GTValues.MV])
        .duration(2 * 20 + 10)
        .circuit(1);
};
