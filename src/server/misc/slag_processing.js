
// https://www.researchgate.net/figure/Typical-chemical-compositions-of-slag-produced-by-titanomagnetite-smelters-mass_tbl2_350654424

/**
 * Adds slag processing recipes.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const addSlagProcessingRecipes = (event) => {
    // have to do this here instead of when tweaking materials to prevent the removal of magnetite
    // to iron ingots.
    event.remove({id: "gtceu:smelting/dust_magnetite__dust_to_ingot"});

    event.recipes.gtceu.electric_blast_furnace("nijika:misc/slag_processing/magnetite_smelting")
        .itemInputs(
            "32x #forge:raw_materials/magnetite",
            "8x #nijika:carbon_rich_dusts"
        )
        .itemOutputs(
            "24x gtceu:iron_dust",
            "8x gtceu:slag_dust"
        )
        .EUt(GTValues.VA[GTValues.MV])
        .blastFurnaceTemp(1700)
        .duration(30 * 20)
        .circuit(8);

    event.recipes.gtceu.electric_blast_furnace("nijika:misc/slag_processing/hematite_smelting")
        .itemInputs(
            "32x #forge:raw_materials/hematite",
        )
        .itemOutputs(
            "24x gcyr:iron_oxide_dust",
            "8x gtceu:slag_dust"
        )
        .EUt(GTValues.VA[GTValues.MV])
        .blastFurnaceTemp(1700)
        .duration(30 * 20)
        .circuit(8);

    event.recipes.gtceu.electric_blast_furnace("nijika:misc/slag_processing/hematite_smelting_reduction")
        .itemInputs(
            "32x #forge:raw_materials/hematite",
            "8x #nijika:carbon_rich_dusts"
        )
        .itemOutputs(
            "24x gtceu:iron_dust",
            "8x gtceu:slag_dust"
        )
        .EUt(GTValues.VA[GTValues.MV])
        .blastFurnaceTemp(1700)
        .duration(30 * 20)
        .circuit(8);

    // This is a primarily fictional process because I (and nobody) wants to deal with the actual
    // slag refining process...

    // 1) Slag slurry from slag "dust".
    event.recipes.gtceu.chemical_bath("nijika:misc/slag_processing/slag_to_slurry")
        .itemInputs(
            "2x gtceu:slag_dust"
        )
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:slag_slurry").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:diluted_hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.LV])
        .duration(2 * 20 + 10);
    
    // 2) Centrifuge slag slurry to get various outputs.
    // This uses our own custom numbers primarily to make vanadium easier to get.
    event.recipes.gtceu.centrifuge("nijika:misc/slag_processing/centrifuging_slurry")
        .inputFluids(Fluid.of("gtceu:slag_slurry").withAmount(1 * FluidAmounts.BUCKET))
        .chancedOutput("1x gtceu:rutile_dust", 2000.0, 500.0)
        .chancedOutput("1x gtceu:vanadium_pentoxide_dust", 500.0, 500.0)
        .chancedOutput("1x gtceu:alumina_dust", 1500.0, 500.0)
        .chancedOutput("1x gtceu:silicon_dioxide_dust", 2600.0, 0.0)
        .chancedOutput("1x gtceu:magnesia_dust", 800.0, 500.0)
        .EUt(GTValues.VA[GTValues.LV])
        .duration(15 * 20);
}
