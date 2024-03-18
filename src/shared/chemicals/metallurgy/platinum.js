// Here we go. Here's the big one.
//
// Various TODOs:
// - Maybe use other amines too, rather than just trioctylamine?
// - Dimethylglyoxime extraction of palladium, instead of extracting it with MIBK.

import { createAqueousIntermediate, createDustIntermediate } from "../../materials/helpers";

export const addPlatinumGroupMaterials = (event) => {
    createAqueousIntermediate(event, "dissolved_platinum_group_sludge", 0x323338);
    createDustIntermediate(event, "silver_chloride", 0xd3dce0, true).components(
        "1x gtceu:silver",
        "1x gtceu:chlorine"
    );

    // Gold parts of the sludge.
    createAqueousIntermediate(event, "gold_palladium_mibk_mixture", 0xede49f);
    createAqueousIntermediate(event, "gold_mibk_mixture", 0x5f0cc);

    createAqueousIntermediate(event, "dissolved_platinum_group_1", 0x5d6656);
    createAqueousIntermediate(event, "dissolved_platinum_group_2", 0x708878);
    createAqueousIntermediate(event, "dissolved_platinum_group_3", 0x8ca193)
    // Pt-Ir separation.
    createAqueousIntermediate(event, "platinum_iridium_mixture_1", 0x70665a);
    createAqueousIntermediate(event, "platinum_iridium_mixture_2", 0x8e8171);

    createAqueousIntermediate(event, "platinum_amine_mixture", 0xd8cae3);

    // The actual salts of the metals that need reduction.
    createAqueousIntermediate(event, "ammonium_hexachloroplatinate", 0xbfa8d1);
    createAqueousIntermediate(event, "ammonium_hexachloroiridate", 0x6f6675);
    createAqueousIntermediate(event, "ammonium_hexachloropalladate", 0xf2c877);
};

/**
 * Adds recipes for the platinum-group metals.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addPlatinumGroupRecipes = (event) => {
    // A lot of this is pieced together from various patents, papers, and encyclopedias.
    // It *roughly* follows Modern Separation Process F from Ullman's Encylopedia, but not exactly.
    //
    // This also references:
    // Patent GB2065092:  Solvent extraction of platinum group metals
    // Patent US3979207A: Refining of noble group metals
    //
    // These two patents are more focused on Platinum/Iridium extraction.
    //
    // As a design note; we assume that the platinum group sludge extracted has 1/6th of a
    // molar mass of every platinum group element in it, allowing for the processes to operate
    // in single molar masses. As far as I know, this differs from e.g. GTNH platline or the base
    // platinum line as it means we don't have to fuck about with ratioing off chemicals.
    //
    // In addition, the actual chemistry taking place here may not be perfectly balanced; ideally,
    // no elements should be accidentally synthesised, but it's okay if some elements are
    // accidentally removed.

    event.remove({ id: "gtceu:centrifuge/pgs_separation" });

    // Dissolve with HCl to get dissolved sludge and some silver chloride.
    event.recipes.gtceu
        .chemical_bath("nijika:chemicals/platinum/dissolved_pgs_sludge")
        .itemInputs("4x gtceu:platinum_group_sludge_dust")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(1 * FluidAmounts.BUCKET))
        .chancedOutput("3x gtceu:tiny_silver_chloride_dust", 3400.0, 54.0)
        .outputFluids(
            Fluid.of("gtceu:dissolved_platinum_group_sludge").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.EV])
        .duration(10 * 20);

    // Solution: Pd, Pt, Ir, Os, Rh, Ru

    // Solvent extraction using Methyl isobutyl ketone of gold. Also extracts out palladium.
    // "Extraction kinetics are fast and virtually instantaneous."
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/platinum/gold_extraction_using_mibk")
        .inputFluids(
            Fluid.of("gtceu:dissolved_platinum_group_sludge").withAmount(12 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:methyl_isobutyl_ketone").withAmount(2 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:gold_palladium_mibk_mixture").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:dissolved_platinum_group_1").withAmount(10 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.EV])
        .duration(15);

    // React out the palladium. This will use Dimethylglyoxime eventually, but for now we
    // directly introduce ammonium hydroxide to the mixture.
    // NH4+ + ClPd6- = (NH4)2[ClPd6]
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/platinum/ammonium_hexachloropalladate")
        .inputFluids(
            Fluid.of("gtceu:gold_palladium_mibk_mixture").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrochloric_acid").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:ammonium_hydroxide").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen_peroxide").withAmount(4 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:ammonium_hexachloropalladate").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:gold_mibk_mixture").withAmount(2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.EV])
        .duration(10 * 20);

    // Reduce the palladium.
    // (NH4)2[PdCl6] + 2 H2 + 6 NaOH = Pd + 2 NH3 + 6 H2O + 6 NaCl
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/platinum/palladium_reduction")
        .itemInputs("6x gtceu:sodium_hydroxide_dust")
        .inputFluids(
            Fluid.of("gtceu:ammonium_hexachloropalladate").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(4 * FluidAmounts.BUCKET)
        )
        .itemOutputs("1x gtceu:palladium_dust", "6x gtceu:salt_dust")
        .outputFluids(
            Fluid.of("gtceu:ammonia").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(6 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.V[GTValues.EV])
        .duration(15 * 20);

    // With Gold + Silver removed, we now have a relatively pure solution of platinum group
    // salts.
    // Solution: Pt, Ir, Os, Rh, Ru

    // ---
    // Pt is then extracted by the use of a tertiary amine extractant such as Alamine 336.
    // The Pt is preferably stripped from the Alamine 336 by the use of an alkaline stripping
    // solution. Alkali metal hydroxides, carbonates or bicarbonates or ammonium hydroxide were
    // recommended for this purpose. - GB2065092
    //
    // According to a first aspect of the present invention a process for the separation and
    // purification of platinum,  rhodium and iridium present as salts in aqueous soluion comprises
    // the steps of:
    //  a. adjusting the pH, as necessary, to provide an acidic  solution;
    //  b. contacting the acidic solution with an oxidising agent sufficient to effect the
    //     oxidation of all iridium  present to Ir(IV);
    //  c. contacting the oxidised solution with a nitrogen so containing organic compound
    //     selected from the group consisting of secondary amines, tertiary amines and quaternary
    //     ammonium compounds;
    //  d. removing from contact with the oxidised solution an organic phase containing
    //     substantially all of the platinum and iridium present in association with
    //     the nitrogen-containing organic compound used in step (c);
    // - US3979207A
    // ---
    //
    // The acidic solution is already provided with the hydrochloric acid dissolution,
    // and we can reuse hydrogen peroxide as the oxidising agent.
    //
    // ---
    // Trioctylamine is used widely for the solvent extraction of large amounts of platinum from
    // refniery solutions [146–148]. It is also used for the solvent extraction of IrIV (Fig. 16).
    // Stripping can be facilitated by changing the stripping solution or the valence of the metal.
    // Diluent solvents are also employed when carrying out solvent extraction with amines.
    // - Ullman's Encyclopedia
    // ---
    //
    // Since it's easier to model this as one big reaction, trioctylamine and hydrogen peroxide
    // are mixed with some additional hydrochloric acid and the dissolved platinum group mixture
    // in the LCR to get the platinum-iridium salt mixture.

    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/platinum/platinum_organic_contact_1")
        .inputFluids(
            Fluid.of("gtceu:dissolved_platinum_group_1").withAmount(12 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen_peroxide").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:trioctylamine").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrochloric_acid").withAmount(350 * FluidAmounts.MB)
        )
        .outputFluids(
            Fluid.of("gtceu:dissolved_platinum_group_2").withAmount(8 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:platinum_iridium_mixture_1").withAmount(4 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.EV])
        .duration(10 * 20);

    // We'll put the rest of the platinums aside for now, and focus on the platinum-iridium
    // mixture.
    //
    // ---
    // e'. removing the platinum and iridium from the organic phase with an alkaline strip liquor;
    // f'. acidifying and reducing the iridium in the strip liquor to Ir(III);
    // g'. extracting the platinum from the reduced strip liquor with a tertiary amine
    //     RN in which R is  Cs-Co alkyl with normal Cs predominating;
    // h'. stripping the platinum from the solvent with alkaline strip liquor.
    // - US3979207A
    // ---
    //
    // We use ammonium hydroxide as the strip liquor for the platinum-iridium mixture, as well as
    // some extra hydrochloric acid and hydrogen peroxide to acidify and reduce the iridium.

    // Steps e'-f'.
    // Allows recovering some of the trioctylamine used in the process.
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/platinum/platinum_iridium_stripping")
        .inputFluids(
            Fluid.of("gtceu:platinum_iridium_mixture_1").withAmount(4 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:ammonium_hydroxide").withAmount(4 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrochloric_acid").withAmount(300 * FluidAmounts.MB),
            Fluid.of("gtceu:hydrogen_peroxide").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:platinum_iridium_mixture_2").withAmount(4 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:trioctylamine").withAmount(1200 * FluidAmounts.MB)
        )
        .EUt(GTValues.VA[GTValues.EV])
        .duration(7 * 20 + 10);

    // Step g'.
    // This extracts 1 mole of ammonium hexachloroplatinate from the mixture using trioctylamine
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/platinum/platinum_iridium_separation")
        .inputFluids(
            Fluid.of("gtceu:platinum_iridium_mixture_2").withAmount(4 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:trioctylamine").withAmount(2 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:ammonium_hexachloroiridate").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:platinum_amine_mixture").withAmount(2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(20);

    // Finally, step h': strip ammonium hexachloroplatinate from the trimethylamine to get
    // ammonium hexachloroplatinate.
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/platinum/ammonium_platinum_solvent_seapration")
        .inputFluids(Fluid.of("gtceu:platinum_amine_mixture").withAmount(2 * FluidAmounts.BUCKET))
        .itemInputs("1x gtceu:small_sodium_hydroxide_dust")
        .outputFluids(
            Fluid.of("gtceu:ammonium_hexachloroplatinate").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:trioctylamine").withAmount(1200 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(5 * 20);

    // Reduction of platinum salt with sodium hydroxide and hydrogen to get pure platinum metal.
    // (NH4)2[PtCl6] + 2 H2 + 6 NaOH = Pt + 2 NH3 + 6 H2O + 6 NaCl
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/platinum/platinum_reduction")
        .itemInputs("6x gtceu:sodium_hydroxide_dust")
        .inputFluids(
            Fluid.of("gtceu:ammonium_hexachloroplatinate").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(4 * FluidAmounts.BUCKET)
        )
        .itemOutputs("1x gtceu:platinum_dust", "6x gtceu:salt_dust")
        .outputFluids(
            Fluid.of("gtceu:ammonia").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(6 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.V[GTValues.EV])
        .duration(15 * 20);

    // Reduction of ammonium salt with sodium hydroxide and hydrogen to get pure iridium metal.
    // (NH4)2[IrCl6] + 2 H2 + 6 NaOH = Ir + 2 NH3 + 6 H2O + 6 NaCl
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/platinum/iridium_reduction")
        .itemInputs("6x gtceu:sodium_hydroxide_dust")
        .inputFluids(
            Fluid.of("gtceu:ammonium_hexachloroiridate").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(4 * FluidAmounts.BUCKET)
        )
        .itemOutputs("1x gtceu:iridium_dust", "6x gtceu:salt_dust")
        .outputFluids(
            Fluid.of("gtceu:ammonia").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(6 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.V[GTValues.EV])
        .duration(15 * 20);

    // Solution: Os, Rh, Ru

    // Removal of Osmium using hydrogen peroxide, a small amount of sulfuric acid, and formaldehyde.
    // This causes it to precipitate out as a solid metal.
    // OsO4 + 2 CH2O = Os + 2 H2O + 2 CO2
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/platinum/osmium_precipitation")
        .inputFluids(
            Fluid.of("gtceu:dissolved_platinum_group_2").withAmount(6 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:formaldehyde").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen_peroxide").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sulfuric_acid").withAmount(100 * FluidAmounts.MB)
        )
        .outputFluids(
            Fluid.of("gtceu:dissolved_platinum_group_3").withAmount(4 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:carbon_dioxide").withAmount(2 * FluidAmounts.BUCKET)
        )
        .itemOutputs("1x gtceu:osmium_dust")
        .EUt(GTValues.V[GTValues.EV])
        .duration(5 * 20);
};
