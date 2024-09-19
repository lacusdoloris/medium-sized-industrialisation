// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAqueousIntermediate, createDustIntermediate } from "../../materials/helpers";

export const addPolyvinylButyralMaterials = (event) => {
    createDustIntermediate(event, "sodium_formate", 0x4a5069, true).components(
        "1x gtceu:sodium",
        "2x gtceu:oxygen",
        "1x gtceu:carbon",
        "1x gtceu:hydrogen"
    );

    // Used as a plasticizer.
    createDustIntermediate(event, "trimethylolpropane", 0xa98cad);

    // Used as an intermediate for PVB.
    createAqueousIntermediate(event, "polyvinyl_alcohol", 0x6b5e43);
};

/**
 * Adds recipes for the processing of Polyvinyl butyral.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addPolyvinylButyralRecipes = (event) => {
    event.remove({ id: "gtceu:chemical_reactor/butraldehyde" });
    event.remove({ id: "gtceu:large_chemical_reactor/butraldehyde" });
    event.remove({ id: "gtceu:chemical_reactor/polyvinyl_butyral" });
    event.remove({ id: "gtceu:large_chemical_reactor/polyvinyl_butyral" });
    event.remove({ id: /^gtceu:(?:large_)?chemical_reactor\/pva.*/ });

    event.remove({ id: "gtceu:chemical_reactor/acetic_acid_from_methanol" });
    event.remove({ id: "gtceu:large_chemical_reactor/acetic_acid_from_methanol" });
    event.remove({ id: "gtceu:chemical_reactor/acetic_acid_from_ethylene" });
    event.remove({ id: "gtceu:large_chemical_reactor/acetic_acid_from_ethylene" });
    event.remove({ id: "gtceu:chemical_reactor/acetic_acid_from_monoxide" });
    event.remove({ id: "gtceu:large_chemical_reactor/acetic_acid_from_monoxide" });
    event.remove({ id: "gtceu:chemical_reactor/acetic_acid_from_elements" });
    event.remove({ id: "gtceu:large_chemical_reactor/acetic_acid_from_elements" });
    event.remove({ id: "gtceu:chemical_reactor/vinyl_acetate" });
    event.remove({ id: "gtceu:large_chemical_reactor/vinyl_acetate" });

    // Catalytic synthesis of Butyralddehyde using Wilkinson's catalyst.
    // TODO: tppts?
    // CH3CH=CH2 + H2 + CO => CH3CH2CH2CHO
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/pvb/butraldehyde_catalytic_synthesis")
        .itemInputs("1x nijika:wilkinson_catalyst")
        .inputFluids(
            Fluid.of("gtceu:propene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:carbon_monoxide").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:butyraldehyde").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(5 * 20)
        .circuit(2);

    // In 1970, Monsanto commercialized an improved homogeneous methanol carbonylation process
    // using a methyl-iodide-promoted Rh catalyst [3–6]. Compared to other acetic acid synthesis
    // routes (ethanol fermentation, and acetaldehyde, n-butane, or naphtha oxidation),
    // homogeneous Rh catalyzed methanol carbonylation is an efficient route that exhibits high
    // productivity and yields.
    //
    // doi:10.1016/s0926-860x(01)00800-6
    //
    // Without proper iodine chemistry, methyl iodide is a pain to get, so we'll just use regular
    // homogenous rhodium dust for this reaction. TODO: Proper carbonyl catalysts and methyl iodide.
    //
    // CH4O + CO = C2H4O2
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/pvb/acetic_acid")
        .itemInputs("1x gtceu:tiny_rhodium_dust")
        .inputFluids(
            Fluid.of("gtceu:methanol").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:carbon_monoxide").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:acetic_acid").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(9 * 20 + 5);

    // Synthesis of vinyl acetate in the presence of a palladium-gold catalyst.
    // The synthesis of vinyl acetate (VA) from ethylene, acetic acid (ACOH), and oxygen over
    // Pd-based catalysts is an important industrial process [1]. The reaction occurs ideally
    // as C2H4 + CH3COOH + 1/2 O2 → C2H3OOCCH3 + H2O.
    // https://doi.org/10.1016/j.jcat.2004.02.028
    //
    // Or, balanced out to avoid that nasty half oxygen:
    // 2 C2H4 + 2 CH3COOH + O2 → 2 C2H3OOCCH3 + 2 H2O.

    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/pvb/vinyl_acetate")
        .itemInputs("1x gtceu:small_palladium_dust", "1x gtceu:tiny_gold_dust")
        .inputFluids(
            Fluid.of("gtceu:ethylene").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:acetic_acid").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:oxygen").withAmount(2 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:vinyl_acetate").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(5 * 20);

    // Trimethylolpropane is made by the base-catalyzed aldol addition of butyraldehyde with
    // formaldehyde followed by Cannizzaro reaction of the intermediate
    // 2,2-bis(hydroxymethyl)butanal with additional formaldehyde and at least a stoichiometric
    // quantity of base (see Scheme 1)

    // In our case, we do this as a single reaction.
    // CH3CH2CH2CHO + 3 CH2O + NaOH = CH3CH2C(CH2OH)3 + NaO2CH
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/pvb/trimethylolpropane")
        .itemInputs("40x gtceu:sodium_hydroxide_dust")
        .inputFluids(
            Fluid.of("gtceu:butyraldehyde").withAmount(40 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:formaldehyde").withAmount(120 * FluidAmounts.BUCKET)
        )
        .itemOutputs("40x gtceu:trimethylolpropane_dust", "40x gtceu:sodium_formate_dust")
        .EUt(GTValues.V[GTValues.EV])
        .duration(60 * 20);

    // vinyl acetate => poly(vinyl acetate), using trimethylolpropane as the plasticizer
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/pvb/polyvinyl_acetate")
        .itemInputs("10x gtceu:trimethylolpropane_dust") // 20% plasticizer by weight?
        .inputFluids(Fluid.of("gtceu:vinyl_acetate").withAmount(50 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:polyvinyl_acetate").withAmount(50 * FluidAmounts.BUCKET))
        .duration(60 * 20)
        .EUt(GTValues.V[GTValues.HV]);

    // The preferred process for the production of poly(vinyl acetate) for further processing to
    // poly(vinyl alcohol) is polymerization in methanol.
    //
    // Conversion of poly(vinyl acetate) to poly(vinyl alcohol) can be carried out in solution,
    // suspension, or emulsion with alkaline or acidic catalysts. The preferred process is
    // transesterification in methanol in the presence of catalytic amounts of sodium
    // methoxide, with formation of poly(vinyl alcohol) and methyl acetate.
    // -- Ullman's Encyclopedia, Polyvinyl Compounds, Other
    // We actually use sodium hydroxide, because why not?

    // poly(vinyl acetate) + methanol => poly(vinyl alcohol) + methyl acetate
    // C4H6O2 + CH3OH = C2H3(OH) + C3H6O2
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/pvb/polyvinyl_alcohol")
        .itemInputs("16x gtceu:sodium_hydroxide_dust")
        .inputFluids(
            Fluid.of("gtceu:polyvinyl_acetate").withAmount(75 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:methanol").withAmount(75 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:polyvinyl_alcohol").withAmount(75 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:methyl_acetate").withAmount(75 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.EV])
        .duration(180 * 20);

    // Finally, the actual synthesis of polyvinyl butyral.
    // 2 C2H3(OH) + CH3CH2CH2CHO = C8H14O2 + H2O
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/pvb/polyvinyl_butyral")
        .inputFluids(
            Fluid.of("gtceu:polyvinyl_alcohol").withAmount(60 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:butyraldehyde").withAmount(30 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:polyvinyl_butyral").withAmount(30 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(30 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.V[GTValues.EV])
        .duration(120 * 20);
};
