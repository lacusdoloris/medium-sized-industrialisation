// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import {
    createAcidicIntermediate,
    createAqueousIntermediate,
    createChemicalIntermediate,
    createDustIntermediate,
} from "../../materials/helpers";

export const addTungstenMaterials = (event) => {
    createAqueousIntermediate(event, "one_butanol", 0xebd5ea);
    // used as part of thee ion-exchange resin mixture
    createAqueousIntermediate(event, "tributyl_phosphate", 0xb5a4a3);

    createAqueousIntermediate(event, "tungstic_ion_exchange_medium", 0xf0717a);
    createAqueousIntermediate(event, "used_up_tungstic_ion_exchange_medium", 0x58090e);

    // Pre-treated Scheelite Slurry
    createAcidicIntermediate(event, "pretreated_scheelite", 0x8fbdb7).dust();

    // post-roasting scheelite
    createDustIntermediate(event, "desulfurised_scheelite", 0xa3b082);

    // impure sodium tungstate
    createAqueousIntermediate(event, "impure_sodium_tungstate", 0xe6b48c).components(
        "2x gtceu:sodium",
        "1x gtceu:tungsten",
        "4x gtceu:oxygen"
    );

    createAqueousIntermediate(event, "sodium_tungstate", 0xf3d0b4).components(
        "2x gtceu:sodium",
        "1x gtceu:tungsten",
        "4x gtceu:oxygen"
    );

    // (NH4)10(H2W12O42)
    createChemicalIntermediate(event, "ammonium_paratungstate", 0xb4e6f3);
};

/**
 * Adds recipes for the Tungsten processing chain.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addTungstenRecipes = (event) => {
    event.remove({ input: "gtceu:crushed_scheelite_ore" });
    event.remove({ id: "gtceu:smelting/smelt_raw_scheelite_ore_to_ingot" });
    event.remove({ id: "gtceu:electrolyzer/tungstic_acid_electrolysis" });
    event.remove({ id: "gtceu:chemical_bath/tungstic_acid_from_tungstate" });
    event.remove({ id: "gtceu:chemical_bath/tungstic_acid_from_scheelite" });

    // Pre-treatment of Scheelite with HCl to dissolve sulfphide and arsenic materials.
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/scheelitee/pre_treatment")
        .itemInputs("32x gtceu:crushed_scheelite_ore")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(12 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:pretreated_scheelite").withAmount(12 * FluidAmounts.BUCKET))
        .chancedOutput("5x gtceu:small_arsenic_trioxide_dust", 4400.0, 74.0)
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(20 * 20);

    event.recipes.gtceu
        .centrifuge("nijika:chemicals/scheelite/pre_treatment_separation")
        .inputFluids(Fluid.of("gtceu:pretreated_scheelite").withAmount(16 * FluidAmounts.BUCKET))
        .itemOutputs("32x gtceu:pretreated_scheelite_dust")
        .chancedOutput("18x gtceu:small_pretreated_scheelite_dust", 7500.0, 0.0)
        .chancedOutput("23x gtceu:small_arsenic_trioxide_dust", 3500.0, 0.0)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(2 * 20);

    // Roasting of pre-treated Scheelite to get Roasted Scheelite.
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/scheelite/roasting")
        .itemInputs("64x gtceu:pretreated_scheelite_dust")
        .itemOutputs("52x gtceu:desulfurised_scheelite_dust")
        .chancedOutput("16x gtceu:gypsum_dust", 3500.0, 55.0)
        .outputFluids(Fluid.of("gtceu:sulfur_dioxide").withAmount(8 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.EV])
        .duration(60 * 20);

    // The first paper suggests using Na2CO3 for digestion, but chinese plants use regular NaOH.

    // CaWO4 + 2 NaOH => Na2WO4 + Ca(OH)2
    // CaWO4 + Na2CO3 => Na2WO4 + CaCO3
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/scheelite/digestion_naoh")
        .itemInputs("32x gtceu:desulfurised_scheelite_dust", "64x gtceu:sodium_hydroxide_dust")
        .itemOutputs("32x gtceu:calcium_hydroxide_dust")
        .outputFluids(
            Fluid.of("gtceu:impure_sodium_tungstate").withAmount(32 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(150 * 20);

    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/scheelite/digestion_na2co3")
        .itemInputs("32x gtceu:desulfurised_scheelite_dust", "32x gtceu:soda_ash_dust")
        .itemOutputs("32x gtceu:calcite_dust")
        .outputFluids(
            Fluid.of("gtceu:impure_sodium_tungstate").withAmount(32 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(150 * 20);

    // precipitate out the molybdenum impurities
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/tungsten/molybdenum_precipitation")
        .inputFluids(
            Fluid.of("gtceu:impure_sodium_tungstate").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sulfuric_acid").withAmount(4 * FluidAmounts.BUCKET)
        )
        .itemInputs("4x gtceu:sodium_sulfide_dust")
        .itemOutputs("1x gtceu:molybdenum_disulfide_dust")
        .outputFluids(
            Fluid.of("gtceu:sulfur_dioxide").withAmount(6 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sodium_tungstate").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(5 * 20);

    // TODO: Wulfenite.

    // 1-Butanol is made from the catalytic hydroformylation of propene.
    // C3H6 + CO + 2 H2 = C4H9OH
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/tungsten/1_butanol")
        .inputFluids(
            Fluid.of("gtceu:propene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:carbon_monoxide").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(4 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:one_butanol").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(15 * 20)
        .circuit(1);

    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/tungsten/1_butanol_fast")
        .itemInputs("1x nijika:wilkinson_catalyst")
        .inputFluids(
            Fluid.of("gtceu:propene").withAmount(50 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:carbon_monoxide").withAmount(50 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(200 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:one_butanol").withAmount(50 * FluidAmounts.BUCKET))
        .EUt(GTValues.V[GTValues.EV])
        .duration(360 * 20)
        .circuit(2);

    // 1-Butanol can be reacted with phosphoryl chloride to get tributyl phosphate, one of the
    // components of the LIX resin.
    // POCl3 + 3 C4H9OH = PO(OC4H9)3 + 3 HCl
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/tungsten/tributyl_phosphate")
        .inputFluids(
            Fluid.of("gtceu:phosphoryl_chloride").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:one_butanol").withAmount(3 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:tributyl_phosphate").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:diluted_hydrochloric_acid").withAmount(6 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(10 * 20);

    // Mix them all together to get the Ion-Exchange resin.
    event.recipes.gtceu
        .mixer("nijika:chemicals/tungsten/ion_exchange_resin")
        .inputFluids(
            Fluid.of("gtceu:trimethylamine").withAmount(3 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:tributyl_phosphate").withAmount(140 * FluidAmounts.MB),
            Fluid.of("gtceu:toluene").withAmount(860 * FluidAmounts.MB)
        )
        .itemInputs("32x gtceu:sodium_polystyrene_sulfonate_round")
        .outputFluids(
            Fluid.of("gtceu:tungstic_ion_exchange_medium").withAmount(4 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(10);

    event.recipes.gtceu
        .mixer("nijika:chemicals/tungsten/ion_exchange_resin_octylamine")
        .inputFluids(
            // yes, I am aware this is not how chemistry works.
            Fluid.of("gtceu:trioctylamine").withAmount(375 * FluidAmounts.MB),
            Fluid.of("gtceu:tributyl_phosphate").withAmount(140 * FluidAmounts.MB),
            Fluid.of("gtceu:toluene").withAmount(860 * FluidAmounts.MB)
        )
        .itemInputs("32x gtceu:sodium_polystyrene_sulfonate_round")
        .outputFluids(
            Fluid.of("gtceu:tungstic_ion_exchange_medium").withAmount(4 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(10);

    // Ion-exchange reaction with the organic solvent, and introduction of ammonia to get
    // ammonium paratungstate.
    // This is the most abstracted part of the process.
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/tungsten/ammonium_paratungstate")
        .inputFluids(
            Fluid.of("gtceu:sodium_tungstate").withAmount(132 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:tungstic_ion_exchange_medium").withAmount(250 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:ammonia").withAmount(200 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:ammonium_paratungstate").withAmount(11 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:used_up_tungstic_ion_exchange_medium").withAmount(
                100 * FluidAmounts.BUCKET
            )
        )
        .EUt(GTValues.VA[GTValues.EV])
        .duration(300 * 20);

    // Recycling of the resin.
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/tungsten/resin_recycling")
        .inputFluids(
            Fluid.of("gtceu:used_up_tungstic_ion_exchange_medium").withAmount(
                25 * FluidAmounts.BUCKET
            ),
            Fluid.of("gtceu:sulfuric_acid").withAmount(25 * FluidAmounts.BUCKET)
        )
        .itemInputs("48x gtceu:sodium_polystyrene_sulfonate_round")
        .outputFluids(
            Fluid.of("gtceu:tungstic_ion_exchange_medium").withAmount(10 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sulfur_dioxide").withAmount(5 * FluidAmounts.BUCKET)
        )
        .chancedOutput("5x gtceu:sodium_sulfide_dust", 7500.0, 0.0)
        .chancedOutput("8x gtceu:small_sodium_sulfide_dust", 2500.0, 0.0)
        .chancedFluidOutput(
            Fluid.of("gtceu:used_up_tungstic_ion_exchange_medium").withAmount(
                2500 * FluidAmounts.MB
            ),
            3500.0,
            0.0
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(60 * 20);

    // Autoclave it to get solid APT crystals.
    event.recipes.gtceu
        .autoclave("nijika:chemicals/tungsten/apt_crystals")
        .inputFluids(Fluid.of("gtceu:ammonium_paratungstate").withAmount(1 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:ammonium_paratungstate_dust")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(5 * 20);

    // Finally, heat it in a hydrogen-rich atmosphere to reduce the crystals to regular tungsten.
    // (NH4)10(H2W12O42) + 36 H2 = 12 W + 42 H2O + 10 NH3
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/tungsten/apt_reduction")
        .itemInputs("1x gtceu:ammonium_paratungstate_dust")
        .inputFluids(Fluid.of("gtceu:hydrogen").withAmount(36 * 2 * FluidAmounts.BUCKET))
        .itemOutputs("12x gtceu:tungsten_dust")
        .outputFluids(Fluid.of("gtceu:ammonia").withAmount(10 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .duration(10 * 20)
        .blastFurnaceTemp(2800);
};
