// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// TODO: Consider adding purification of the output MoO3.

import {
    createAcidicIntermediate,
    createAqueousIntermediate,
    createDustIntermediate,
} from "../../materials/helpers";
import { nijikaId } from "../../utils";

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
    createDustIntermediate(event, "technical_molybdenum_trioxide", 0xb5b8ed);

    createAqueousIntermediate(event, "ammonium_molybdate", 0x2123a9).components(
        "2x gtceu:ammonia",
        "1x gtceu:molybdenum",
        "4x gtceu:oxygen"
    );

    createDustIntermediate(event, "ammonium_dimolybdate", 0x31329a).components(
        "2x gtceu:ammonia",
        "2x gtceu:molybdenum",
        "7x gtceu:oxygen"
    );

    createAqueousIntermediate(event, "sodium_molybdate", 0xdede87).components(
        "2x gtceu:sodium",
        "1x gtceu:molybdenum",
        "4x gtceu:oxygen"
    );

    createDustIntermediate(event, "molybdenum_trioxide", 0xb6f8bd).components(
        "1x gtceu:molybdenum",
        "3x gtceu:oxygen"
    );
    createDustIntermediate(event, "molybdenum_disulfide", 0x8d9641).components(
        "1x gtceu:molybdenum",
        "2x gtceu:sulfur"
    );

    event
        .create(nijikaId("molybdenum_flue"))
        .gas()
        .color(0xe3dd6d)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

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

    event.remove({ input: "gtceu:crushed_molybdenite_ore" });
    event.remove({ input: "gtceu:crushed_wulfenite_ore" });
    event.remove({ id: "gtceu:smelting/smelt_raw_wulfenite_ore_to_ingot" });
    event.remove({ id: "gtceu:smelting/smelt_raw_molybdenite_ore_to_ingot" });
    event.remove({ id: "gtceu:extractor/extract_cyanotic_molybdenum_trioxide_dust" });

    // Wulfenite processing.
    // PbMoO4 + 2 NaOH = Pb(OH)2 + Na2MoO4
    // TODO: Lead hydroxide!
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/molybdenum/wulfenite_leaching")
        .itemInputs("1x gtceu:crushed_wulfenite_ore", "2x gtceu:sodium_hydroxide_dust")
        .outputFluids(Fluid.of("gtceu:sodium_molybdate").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.EV]) // Not a mistake! EV!
        .duration(15 * 20);

    // From there, Sodium molybdenate can be cconverted straight to impure MoO3.
    // Na2MoO4 + 2 HCl = MoO3 + 2 NaCl + H2O
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/molybdenum/moo3_from_sodium_molybdate")
        .inputFluids(
            Fluid.of("gtceu:sodium_molybdate").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET)
        )
        .itemOutputs("gtceu:impure_molybdenum_trioxide_dust", "2x gtceu:salt_dust")
        .outputFluids(Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(10 * 20);

    // Molybdenum roasting.
    // 2 MoS2 + 7 O2 = 2 MoO3 + 4 SO2 (hehehe)
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/molybdenum/molybdenite_roasting")
        .itemInputs("2x gtceu:crushed_molybdenite_ore")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(14 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:impure_molybdenum_trioxide_dust")
        .chancedOutput("1x gtceu:impure_molybdenum_trioxide_dust", 6500.0, 0.0) // Flat 65% chance, no boost!
        .outputFluids(Fluid.of("gtceu:molybdenum_flue").withAmount(4 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.EV])
        .duration(6 * 20)
        .blastFurnaceTemp(900);

    // MoS2 + 6 MoO3 = 7 MoO2 + 2 SO2
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/molybdenum/molybdenite_oxidising")
        .itemInputs("1x gtceu:crushed_molybdenite_ore", "6x gtceu:impure_molybdenum_trioxide_dust")
        .itemOutputs("7x gtceu:molybdenum_dioxide_dust")
        .outputFluids(Fluid.of("gtceu:molybdenum_flue").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.EV])
        .duration(10 * 20)
        .blastFurnaceTemp(950)
        .circuit(1);

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
        .outputFluids(Fluid.of("minecraft:water").withAmount(6 * FluidAmounts.BUCKET))
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

    // Centrifuge it away to get technical molybdenum trioxide.
    event.recipes.gtceu
        .centrifuge("nijika:chemicals/molybdenum/chlorinated_centrifuging")
        .inputFluids(
            Fluid.of("gtceu:chlorinated_molybdenum_trioxide").withAmount(6 * FluidAmounts.BUCKET)
        )
        .itemOutputs("3x gtceu:technical_molybdenum_trioxide_dust")
        .outputFluids(
            Fluid.of("gtceu:diluted_hydrochloric_acid").withAmount(500 * FluidAmounts.MILLIBUCKET)
        )
        .chancedOutput("2x gtceu:small_calcium_chloride_dust", 1630.0, 150.0)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(10);

    // React technical molybdenum trioxide with ammonium to get ammonium molybdate:
    // MoO3 + 2 NH3 + H2O → (NH4)2MoO
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/molybdenum/ammonium_molybdate")
        .itemInputs("gtceu:technical_molybdenum_trioxide_dust")
        .inputFluids(Fluid.of("gtceu:ammonium_hydroxide").withAmount(2 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:ammonium_molybdate").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(5 * 20);

    // Autoclave it to get ammonium dimolybdate (dust, but it's really crystals).
    event.recipes.gtceu
        .autoclave("nijika:chemicals/molybdenum/ammonium_dimolybdate")
        .inputFluids(Fluid.of("gtceu:ammonium_molybdate").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("gtceu:ammonium_dimolybdate_dust")
        .outputFluids(Fluid.of("gtceu:ammonia").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(30 * 20);

    // Finally... smelt the dimolybdate to get pure molybdenum trioxide.
    event
        .smelting("gtceu:molybdenum_trioxide_dust", "gtceu:ammonium_dimolybdate_dust")
        .id("nijika:chemicals/molybdenum/pure_molybdenum_trioxide");

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
            "2x #nijika:blast_recipes/basic_irons",
            "6x #nijika:blast_recipes/aluminothermics"
        )
        .itemOutputs("3x gtceu:ferromolybdenum_ingot", "3x gtceu:alumina_dust")
        .EUt(GTValues.V[GTValues.EV])
        .duration(30 * 20)
        .blastFurnaceTemp(2700);

    // Produce molybdenum trioxide from the disulfide.
    // 2 MoS2 + 7 O2 = 2 MoO3 + 4 SO2
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/molybdenum/desulfurisation")
        .itemInputs("2x gtceu:molybdenum_disulfide_dust")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(14 * FluidAmounts.BUCKET))
        .itemOutputs("2x gtceu:technical_molybdenum_trioxide_dust")
        .outputFluids(Fluid.of("gtceu:sulfur_dioxide").withAmount(4 * FluidAmounts.BUCKET))
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(10 * 20)
        .blastFurnaceTemp(1100);

    // I saw the word "shock synthesis" in a paper and immediately knew that this is what I needed
    // to implement. Fuck everything else. I'm going to kill myself when I'm done with this project.
    // My life has no meaning outside of my creations.
    event.remove({ id: "gtceu:mixer/molybdenum_disilicide" });
    event.recipes.gtceu
        .implosion_compressor("nijika:chemicals/molybdenum/fuck_it_we_boom")
        .itemInputs(
            "1x gtceu:molybdenum_dust",
            "2x gtceu:silicon_dust",
            "1x minecraft:tnt" // TODO: Tags?
        )
        .itemOutputs("1x gtceu:molybdenum_disilicide_ingot")
        .chancedOutput("1x gtceu:dark_ash_dust", 2500.0, 0.0)
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(2 * 20);
};
