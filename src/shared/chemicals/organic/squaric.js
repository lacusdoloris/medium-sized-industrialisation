// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAqueousIntermediate, createDustIntermediate } from "../../materials/helpers";

/*
graph TB

    MA[Ethylene] & MB[Oxygen] & Silver{{Silver Dust}} -..-> _1[Large Chemical Reactor]
    _1 --> MC[Ethylene Oxide] & MF[Water]
    MC & MD[Ammonia] & MF --> _2[Chemical Reactor]
    _2 --> ME[Diethanolamine] & MF
    ME & MSulfuric{{Sulfuric Acid}} --> _3[Chemical Reactor]
    _3 --> MR[Morpholine] & MF

    HX1[Chlorine] & HX2[Butadiene] & AlCl3{{AlCl3}} ---> _4[Chemical Reactor]
    _4 --> HX3[Hexachlorobutadiene] & HX4[Hydrogen]

    HX3 & MR & SA1{{Toluene}} --> _5[Large Chemical Reactor]
    _5 --> SQI1[TMBD] & MHX[Morpholine Hydrochloride]
    SQI1 & SQW[Water] --> _6[Chemical Reactor]
    _6 --> SQI2[MCB] & MR
    SQI2 & SQW2[Water] --> _7[Large Chemical Reactor]
    _7 --> SQO[Squaric Acid] & MHX

    MHX & SA[Sodium Hydroxide] --> _8[Chemical Reactor]
    _8 --> MR

    SQO & NH4[Ammonium Hydroxide] --> _9[Chemical Reactor]
    _9 --> NH4C4O4[Ammonium Squarate]

    MNO2[Manganese Dioxide] & NO2 --> _10[Chemical Reactor]
    _10 --> MNNO3[Manganese Nitrate]

    MNNO3 & NH4C4O4 --> MNC4O4[Manganese Squarate]
*/

export const addSquaricAcidMaterials = (event) => {
    createAqueousIntermediate(event, "ethylene_oxide", 0xc5c8d6);
    createAqueousIntermediate(event, "diethanolamine", 0x94d6c7);
    createAqueousIntermediate(event, "morpholine", 0xbad9e0);

    createAqueousIntermediate(event, "hexachlorobutadiene", 0x88c478);

    // 1,1,3-trichloro-2,4,4-trimorpholinobutadiene
    createAqueousIntermediate(event, "tmbd", 0x88a381);
    // 3-morpholinotrichloro-2-cyclobuten-1-one
    createAqueousIntermediate(event, "mcb", 0x6e7a6a);

    // C4H10ClNO
    createAqueousIntermediate(event, "morpholine_hydrochloride", 0x566a6b).components(
        "4x gtceu:carbon",
        "10x gtceu:hydrogen",
        "1x gtceu:hydrogen",
        "1x gtceu:nitrogen",
        "1x gtceu:oxygen"
    );

    createAqueousIntermediate(event, "squaric_acid", 0x29e6e6);
    createDustIntermediate(event, "ammonium_squarate", 0x696b82);
    createDustIntermediate(event, "ammonium_nitrate", 0x333d45, true).components(
        "2x gtceu:nitrogen",
        "4x gtceu:hydrogen",
        "3x gtceu:oxygen"
    );
};

/**
 * Adds recipes relating to squaric acid.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addSquaricAcidRecipes = (event) => {
    // With exotic chemicals like this, we begin to step firmly out of the realm of tried and
    // tested chemistry and into the realm of cobbling things together from patents.
    // Given that I'm not a formally trained organic chemist, I don't really know how to assemble
    // chemicals just given their formulas and general structure.
    //
    // This uses the mechanism from the patent US4104308 Synthesis of Squaric Acid, which is
    // analysed in more detail by the paper
    // Paine, A. J. (1984). Mechanisms and intermediates for squaric acid synthesis from
    // hexachlorobutadiene and morpholine. Tetrahedron Letters, 25(2), 135–138.
    // doi:10.1016/s0040-4039(00)99822-8

    // Direct ethylene oxidation using silver as the catalyst.
    // The idealised reaction is 2 CH2CH2 + O2 = 2 C2H4O, but small amounts of carbon dioxide
    // and water are produced: CH2CH2 + 3 O2 = 2 CO2 + 2 H2O
    //
    // Today ethylene oxide can be produced industrially with *90 % selectivity through the
    // epoxidation of ethylene over silver catalyst.
    // The Mechanism of Ethylene Epoxidation Catalysis, 10.1007/s10562-012-0957-3
    //
    // So for every 20 moles of ethylene, 18 end up as ethylene oxide, and two end up as CO2/H2O.3
    // Thus...
    // 20 CH2CH2 + 24 O2 = 18 C2H40 + 4 CO2 + 4 H2O
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/squaric_acid/direct_ethylene_oxidation")
        .itemInputs("28x gtceu:tiny_silver_dust")
        .inputFluids(
            Fluid.of("gtceu:ethylene").withAmount(20 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:oxygen").withAmount(48 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:ethylene_oxide").withAmount(18 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:carbon_dioxide").withAmount(4 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(4 * FluidAmounts.BUCKET)
        )
        .itemOutputs("18x gtceu:tiny_silver_dust")
        .EUt(GTValues.V[GTValues.EV])
        .duration(30 * 20);

    // Derivation: Ethylene oxide and ammonia.
    //
    // The reaction of EO with ammonia takes place slowly and is accelerated by water [41].
    // -- Ullman's Encyclopedia, Ethanolamines
    //
    // 2 C2H4O + NH3 = HN(CH2CH2OH)2
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/squaric_acid/diethanolamine")
        .inputFluids(
            Fluid.of("gtceu:ethylene_oxide").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:ammonia").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(2 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:diethanolamine").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(1500 * FluidAmounts.MB)
        )
        .EUt(GTValues.VA[GTValues.EV])
        .duration(15 * 20)
        .circuit(2);

    // Morpholine, a solvent and intermediate for, e.g., optical  brighteners and rubber chemicals,
    // is obtained from diethanolamine by dehydration with 70% H2SO4 to close the ring:
    // - Oxidation Products of Ethylene, Industrial Organic Chemistry
    //
    // HN(CH2CH2OH)2 = O(CH2CH2)2NH + H2O

    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/squaric_acid/morpholine")
        .inputFluids(
            Fluid.of("gtceu:diethanolamine").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sulfuric_acid").withAmount(700 * FluidAmounts.MB)
        )
        .outputFluids(
            Fluid.of("gtceu:morpholine").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sulfuric_acid").withAmount(500 * FluidAmounts.MB),
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(8 * 20);
    3;

    // 1. In a process for the preparation of 3,4-dihydroxy-3-cyclobutene-1,2-dione by the steps of
    // (a) reacting hexachlorobutadiene with an excess of morpholine, the morpholine being
    //     present at the start of the reaction in a molar ratio of about 6 to 1 with respect to
    //     the hexachlorobutadiene,
    // (b) converting the thus formed 1,1,3-trichloro-2,4,4-trimorpholinobutadiene to
    //    3-morpholinotrichloro-2-cyclobuten-1-one by heating, and
    // (c) hydrolyzing the 3-morpholinotrichloro-2-cyclobuten-1-one to
    //     3,4-dihydroxy-3-cyclobutene-1,2-dione
    //
    // Hexachlorobutadiene is made in real life exclusively as a byproduct from e.g.
    // trichloroethylene. But let's do some fantasy chemistry.
    //
    // 3 Cl2 + C4H6 = Cl2CC(Cl)C(Cl)CCl2 + 3 H2
    // Catalysed by a Lewis acid (i.e. aluminium chloride).
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/squaric_acid/hexachlorobutadiene")
        .itemInputs("1x gtceu:tiny_aluminium_chloride_dust")
        .inputFluids(
            Fluid.of("gtceu:butadiene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:chlorine").withAmount(6 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:hexachlorobutadiene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(6 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(10 * 20)
        .circuit(3);

    // Direct production of Squaric Acid at ZPM from hexachlorobutadiene and morpholine, using
    // aluminium chloride and sulfuric as the catalysts.
    // 4 H2O + Cl2CC(Cl)C(Cl)CCl2 + 6 O(CH2CH2)2NH = C4O2(OH)2 + 6 C4H10ClNO
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/squaric_acid/squaric_fast")
        .inputFluids(
            Fluid.of("gtceu:hexachlorobutadiene").withAmount(1 * 40 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:morpholine").withAmount(6 * 40 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(4 * 40 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sulfuric_acid").withAmount(250 * 40 * FluidAmounts.MB)
        )
        .itemInputs("8x gtceu:aluminium_chloride_dust")
        .outputFluids(
            Fluid.of("gtceu:squaric_acid").withAmount(1 * 40 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:morpholine_hydrochloride").withAmount(6 * 40 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.V[GTValues.ZPM])
        .duration(60 * 20) // 1.5 seconds per mole.
        .circuit(7);

    // Intermediate production of TMBD, catalysed by Toluene.
    // This does produce 3-Methoxyazetidine hydrochloride as a byproduct, but that is *literally*
    // useless. Just neutralise it and recycle the morpholine.
    //
    // 6 O(CH2CH2)2NH + Cl2CC(Cl)C(Cl)CCl2 = C16H24Cl3N3O3 + 3 C4H10ClNO
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/squaric_acid/tmbd")
        .inputFluids(
            Fluid.of("gtceu:hexachlorobutadiene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:morpholine").withAmount(6 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:toluene").withAmount(750 * FluidAmounts.MB)
        )
        .outputFluids(
            Fluid.of("gtceu:tmbd").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:morpholine_hydrochloride").withAmount(3 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:toluene").withAmount(500 * FluidAmounts.MB)
        )
        .EUt(GTValues.VH[GTValues.EV])
        .duration(20 * 20);

    // Production of MCB from TMBD.
    // H2O + C16H24Cl3N3O3 = C8H8Cl3NO2 + 2 C4H9NO
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/squaric_acid/mbd")
        .inputFluids(
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:tmbd").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:mcb").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:morpholine").withAmount(2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(10 * 20);

    // Finally, production of squaric acid from the hydrolysis of MCB.
    // C8H8Cl3NO2 + 3 H2O = C4O2(OH)2 + C4H10ClNO + 2 HCl
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/squaric_acid/squaric_slow")
        .inputFluids(
            Fluid.of("gtceu:mcb").withAmount(1 * 10 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(3 * 10 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sulfuric_acid").withAmount(200 * 10 * FluidAmounts.MB)
        )
        .outputFluids(
            Fluid.of("gtceu:squaric_acid").withAmount(1 * 10 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:morpholine_hydrochloride").withAmount(1 * 10 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrochloric_acid").withAmount(2 * 10 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.V[GTValues.EV])
        .duration(30 * 20); // 3s per molen

    // Recovery of morpholine from the hydrochloride salt using sodium hydroxide.
    // C4H10ClNO + NaOH = C4H9NO + NaCl + H2O
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/squaric_acid/morpholine_recovery")
        .itemInputs("1x gtceu:sodium_hydroxide_dust")
        .inputFluids(Fluid.of("gtceu:morpholine_hydrochloride").withAmount(1 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:salt_dust")
        .outputFluids(Fluid.of("gtceu:morpholine").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.V[GTValues.HV])
        .duration(3 * 20 + 15);

    // Formation of ammonium squarate from ammonium hydroxide solution.
    // 4 NH4OH + 2 C4O2(OH) => 2 (NH4)2C4O4
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/squaric_acid/ammonium_squarate_salt")
        .inputFluids(
            Fluid.of("gtceu:ammonium_hydroxide").withAmount(4 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:squaric_acid").withAmount(2 * FluidAmounts.BUCKET)
        )
        .itemOutputs("2x gtceu:ammonium_squarate_dust")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20 * 20);

    // Finally, formation of nether star dust, with the reaction taking place in toluene.
    // (NH4)2C4O4 + Mn(NO3)2 = Mn(C4O4) + 2 NH4NO3
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/squaric_acid/nether_star_dust")
        .itemInputs("20x gtceu:ammonium_squarate_dust", "20x gtceu:manganese_nitrate_dust")
        .itemOutputs("20x gtceu:nether_star_dust", "40x gtceu:ammonium_nitrate_dust")
        .EUt(GTValues.V[GTValues.EV])
        .duration(240 * 20);
};
