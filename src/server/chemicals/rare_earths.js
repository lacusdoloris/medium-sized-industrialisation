// See doi:10.1088/1742-6596/1436/1/012070 (open access) for the Monazite processing.

// TODO: Bastanite, other rare earth containing minerals?
// TODO: Uranium extraction.

/**
 * Adds the basic rare earth processing chains.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const addRareEarthProcessingChain = (event) => {
    // This is a slightly modified version of the chain in the paper linked above,
    // where it outputs directly to a centrifugable "rare earth mixture" instead of rare earth
    // hydroxides.

    // TODO: Figure out how to keep this for helium production.
    event.remove({id: "gtceu:extractor/monazite_extraction"})

    // 1) Decomposition of monazite dust via sodium hydroxide.
    // (Ce...)(PO4) + 6NaOH = (Ce...)2O3.3H2O + 2Na3PO4
    // or, abstracting away the hydrous form:
    // (Ce...)(PO4) + 3NaOH = (Ce...)(OH)3 + Na3PO44

    event.recipes.gtceu.chemical_reactor("nijika:chemicals/rare_earths/monazite_decomposition")
        .itemInputs(
            "1x gtceu:monazite_dust",
            "3x gtceu:sodium_hydroxide_dust",
        )
        .itemOutputs(
            "1x gtceu:trisodium_phosphate_dust"
        )
        .outputFluids(Fluid.of("gtceu:rare_earth_hydroxides").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .duration(60 * 20);
    
    // 2) Dissolution using hydrochloric acid.
    // (Ce...)(OH)3 + 3HCL -> (Ce...)Cl3 + 3H20

    event.recipes.gtceu.chemical_reactor("nijika:chemicals/rare_earths/rare_earth_hydroxide_chlorides")
        .inputFluids(
            Fluid.of("gtceu:rare_earth_hydroxides").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrochloric_acid").withAmount(3 * FluidAmounts.BUCKET)
        )
        .itemOutputs("3x gtceu:rare_earth_chlorides_dust")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(5 * 20);

    // 3) Precipitation of uranium and thorium hydroxide.
    // (Ce...)Cl3 + 3NH4OH = (Ce...)OH + 3NH4Cl
    event.recipes.gtceu.chemical_reactor("nijika:chemicals/rare_earths/rare_earth_precipitation")
        .itemInputs("1x gtceu:rare_earth_chlorides_dust")
        .inputFluids(Fluid.of("gtceu:ammonium_hydroxide").withAmount(3 * FluidAmounts.BUCKET))
        .itemOutputs(
            "1x gtceu:rare_earth_mixture_dust",
            "3x gtceu:ammonium_chloride_dust"
        )
        .chancedOutput("3x gtceu:small_thorium_hydroxide_dust", 5000, 5.0)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(5 * 20);

    // see Table 1. the numbers have been adjusted for gameplay purposes.
    event.recipes.gtceu.centrifuge("nijika:chemicals/rare_earths/centrifuging_result")
        .itemInputs("2x gtceu:rare_earth_mixture_dust")
        .chancedOutput("1x gtceu:cerium_iv_oxide_dust", 6200.0, 500.0)
        .chancedOutput("1x gtceu:lanthanum_iii_oxide_dust", 3500.0, 500.0)
        .chancedOutput("1x gtceu:neodymium_iii_oxide_dust", 3000.0, 500.0)
        .chancedOutput("1x gtceu:yttrium_iii_oxide_dust", 1300.0, 500.0)
        .chancedOutput("1x gtceu:samarium_iii_oxide_dust", 7000, 750.0)
        .chancedOutput("1x gtceu:small_rare_earth_hydroxides_dust", 5000.0, 0.0)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(1 * 20);

    // reduction of lanthanum to nickel-lanthanum alloy using calcium hydride.
    // https://patents.google.com/patent/US3918933A/en
    // La2O3 + 3 CaH2 + 10 Ni = 2 LaNi5 + 3 CaO + 3 H2

    event.recipes.gtceu.electric_blast_furnace("nijika:chemicals/rare_earth/lanthanum_reduction_calcium")
        .itemInputs(
            "1x gtceu:lanthanum_iii_oxide_dust",
            "3x gtceu:calcium_hydride_dust",
            "10x gtceu:nickel_dust",
        )
        .itemOutputs(
            "2x gtceu:lanthanum_nickel_alloy_ingot", 
            "3x gtceu:quicklime_dust",
        )
        .outputFluids(Fluid.of("gtceu:hydrogen").withAmount(3 * FluidAmounts.BUCKET))
        .EUt(GTValues.V[GTValues.MV])
        .duration(90 * 20)
        .blastFurnaceTemp(1400);
}
