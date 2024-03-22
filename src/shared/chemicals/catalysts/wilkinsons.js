// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// Wilkinson’s catalyst, formally chloridotris(triphenylphosphine)rhodium(I) [RhCl(PPh3)3],
// is a coordination complex that catalyzes a wide range of organic reactions, principally the
// hydrogenation of alkenes and alkynes and hydrofunctionalization reactions across double bonds
// such as hydroacylation (hydroformylation) and hydrosilylation.
// - ACS, https://www.acs.org/molecule-of-the-week/archive/w/wilkinsons-catalyst.html

import { createDustIntermediate } from "../../materials/helpers";
import { nijikaId } from "../../utils";

export const addWilkinsonsCatalystMaterials = (event) => {
    createDustIntermediate(event, "rhodium_iii_oxide", 0xe4e685).components(
        "2x gtceu:rhodium",
        "3x gtceu:oxygen"
    );
    createDustIntermediate(event, "rhodium_trichloride", 0x964841).components(
        "1x gtceu:rhodium",
        "3x gtceu:chlorine"
    );
    createDustIntermediate(event, "rhodium_trichloride_trihydrate", 0xafe3c5);

    createDustIntermediate(event, "triphenylphosphine", 0xafc7b7);
    createDustIntermediate(event, "triphenylphosphine_oxide", 0x6f9e7e);
    createDustIntermediate(event, "triphenylphosphine_chloride", 0x489661);

    createDustIntermediate(event, "wilkinson_catalyst_raw", 0x6b4645);

    event
        .create(nijikaId("ozone"))
        .gas()
        .color(0xc2ede3)
        .components("3x gtceu:oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event
        .create(nijikaId("phosgene"))
        .gas()
        .color(0xaffab9)
        .components("1x gtceu:carbon", "1x gtceu:oxygen", "2x gtceu:chlorine")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
};

/**
 * Adds recipes for making Wilinson's catalyst.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addWilkinsonsCatalystRecipes = (event) => {
    // Ozone "production".
    // 3 O2 = 2 O3
    event.recipes.gtceu
        .arc_furnace("nijika:chemicals/misc/ozone")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(6 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:ozone").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.EV])
        .duration(20)
        .circuit(18);

    // The anhydrous chloride is prepared by heating the metal in a stream of Cla at about 400°C.
    // Above 800°C, it redecomposes to the metal and chlorine. This chloride is red and insoluble
    // in water and acids.
    //
    // However, the hydrated rhodium (III) oxide mentioned on page 1588 dissolves readily in
    // hydrochloric acid, giving a yellow solution. On evaporation of this solution,
    // a residue of the hydrated chloride RhCl3 • xH3O (x = 3-4) is left as a red deliquescent
    // mass, which is called "water-soluble rhodium chloride" to distinguish it from the first
    // product. Heating above 200°C converts this product to the water-insoluble RhCl3.

    // Very pure Rh3O3 is obtained by heating RhCl3 to 750-800°C in a stream of O3 until Cl3
    // is no longer given off.
    // - Handbook of Preparative Inorganic Chemistry

    // this is a bit of a silly reaction.
    // 2 Rh + 3 Cl2 = 2 RhCl3
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/wilkinsons/rhodium_chloride")
        .itemInputs("2x gtceu:rhodium_dust")
        .inputFluids(Fluid.of("gtceu:chlorine").withAmount(6 * FluidAmounts.BUCKET))
        .itemOutputs("2x gtceu:rhodium_trichloride_dust")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(10 * 20);

    // 2 RhCl3 + O3 = Rh2O3 + 3 Cl2
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/wilkinsons/rhodium_iii_oxide")
        .itemInputs("2x gtceu:rhodium_trichloride_dust")
        .inputFluids(Fluid.of("gtceu:ozone").withAmount(1 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:rhodium_iii_oxide_dust")
        .outputFluids(Fluid.of("gtceu:chlorine").withAmount(6 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(10 * 20)
        .blastFurnaceTemp(1050);

    // Finally, dissolve and skim off the Rh2O3.
    // Rh2O3 + 6 HCl + 3 H2O = 2 RhCl3(H2O)3
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/wilkinsons/rhodium_trichloride_trihydrate")
        .itemInputs("1x gtceu:rhodium_iii_oxide_dust")
        .inputFluids(
            Fluid.of("gtceu:diluted_hydrochloric_acid").withAmount(12 * FluidAmounts.BUCKET)
        )
        .itemOutputs("2x gtceu:rhodium_trichloride_trihydrate_dust")
        .outputFluids(Fluid.of("gtceu:water").withAmount(3 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(6 * 20 + 10);

    // Chlorobenzene requires a Lewis acid as a catalyst.
    // Derivation: By passing dry chlorine into benzene with a catalyst.
    event.remove({ id: "gtceu:chemical_reactor/chlorobenzene" });
    event.remove({ id: "gtceu:large_chemical_reactor/chlorobenzene" });
    // Cl2 + C6H6 = C6H5Cl + HCl
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/wilkinsons/chlorobenzene")
        .itemInputs("1x gtceu:tiny_aluminium_chloride_dust")
        .inputFluids(
            Fluid.of("gtceu:chlorine").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:benzene").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:chlorobenzene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrochloric_acid").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.LV])
        .duration(12 * 20)
        .circuit(1);

    // Triphenylphosphine derivation from chlorobenzene.
    // PCl3 + 3 (H6C5)Cl + 6 Na = P(H6C5)3 + 6 NaCl
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/wilkinsons/triphenylphosphine")
        .itemInputs("6x gtceu:sodium_dust")
        .inputFluids(
            Fluid.of("gtceu:phosphorus_trichloride").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:chlorobenzene").withAmount(3 * FluidAmounts.BUCKET)
        )
        .itemOutputs("1x gtceu:triphenylphosphine_dust", "6x gtceu:salt_dust")
        .EUt(GTValues.V[GTValues.HV])
        .duration(10 * 20);

    // Synthesis of Tris(triphenylphosphine)chlororhodium(I), aka Wilkinson's catalyst.
    // RhCl3(H2O)3 + 4 PPh3 = RhCl(PPh3)3 + OPPh3 + 2 HCl + 2 H2O
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/wilkinsons/raw_catalyst")
        .itemInputs(
            "16x gtceu:rhodium_trichloride_trihydrate_dust",
            "64x gtceu:triphenylphosphine_dust"
        )
        .itemOutputs(
            "16x gtceu:wilkinson_catalyst_raw_dust",
            "16x gtceu:triphenylphosphine_oxide_dust"
        )
        .outputFluids(
            Fluid.of("gtceu:hydrochloric_acid").withAmount(32 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:water").withAmount(32 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.V[GTValues.EV])
        .duration(60 * 20)
        .circuit(16);

    // There's some leftover triphenylphosphine. Let's reduce it back into regular
    // triphenylphosphine.

    // Phosgene synthesis. TODO: Move this out, maybe?
    // Phosgene is produced industrially in the vapor phase by mixing carbon monoxide and
    // chlorine in the presence of activated carbon as catalyst
    // CO + Cl2 = COCl2
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/wilkinsons/phosgene")
        .inputFluids(
            Fluid.of("gtceu:carbon_monoxide").withAmount(125 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:chlorine").withAmount(250 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:phosgene").withAmount(125 * FluidAmounts.BUCKET))
        .notConsumable("64x #nijika:carbon_rich_dusts")
        .EUt(GTValues.V[GTValues.EV])
        .duration(120 * 20);

    // Oxidation of triphenylphosphine oxide into triphenylphosphine chloride.
    // OPPh3 + COCl2 = PPh3Cl2 + CO2
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/wilkinsons/triphenylphosphine_oxide_oxidation")
        .itemInputs("1x gtceu:triphenylphosphine_oxide_dust")
        .inputFluids(Fluid.of("gtceu:phosgene").withAmount(1 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:triphenylphosphine_chloride_dust")
        .outputFluids(Fluid.of("gtceu:carbon_dioxide").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(2 * 20 + 10);

    // Reduction of the triphenylphosphine chloride with aluminium.
    // 3 PPh3Cl2 + 2 Al = 3 PPh3 + 2 AlCl3
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/wilkinsons/triphenylphosphine_chloride_reduction")
        .itemInputs("3x gtceu:triphenylphosphine_chloride_dust", "2x gtceu:aluminium_dust")
        .itemOutputs("3x gtceu:triphenylphosphine_dust", "2x gtceu:aluminium_chloride_dust")
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(10 * 20)
        .blastFurnaceTemp(1100);

    event.recipes.gtceu
        .assembler("nijika:chemicals/wilkinsons/catalyst_assembly")
        .itemInputs("32x nijika:empty_catalyst", "4x gtceu:wilkinson_catalyst_raw_dust")
        .itemOutputs("32x nijika:wilkinson_catalyst")
        .duration(10)
        .EUt(GTValues.VA[GTValues.ULV])
        .circuit(9);
};
