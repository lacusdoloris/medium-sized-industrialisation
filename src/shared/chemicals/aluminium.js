import { createAcidicIntermediate, createDustIntermediate } from "../materials/helpers";
import { nijikaId } from "../utils";

export const addAluminiumMaterials = (event) => {
    createDustIntermediate(event, "aluminium_hydroxide", 0xbcd8e8).components(
        "1x gtceu:aluminium",
        "3x gtceu:oxygen",
        "3x gtceu:hydrogen"
    );

    event
        .create(nijikaId("sodium_aluminate"))
        .liquid(new GTFluidBuilder().temperature(2100))
        .color(0x505b6b)
        .components("1x gtceu:sodium", "1x gtceu:aluminium", "2x gtceu:oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    createDustIntermediate(event, "alumina", 0xa1c2c1).components(
        "2x gtceu:aluminium",
        "3x gtceu:oxygen"
    );

    createAcidicIntermediate(event, "red_mud", 0xff0000).dust();
    createAcidicIntermediate(event, "red_mud_slurrry", 0xaf3300);
};

/**
 * Adds the aluminium processing chain.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addAluminiumProcessingRecipes = (event) => {
    event.remove({ id: "gtceu:electrolyzer/bauxite_electrolysis" });
    event.remove({ id: "gtceu:electrolyzer/decomposition_electrolyzing_clay" });
    event.remove({ id: "gtceu:extractor/extract_red_mud_dust" }); // where's my FLAG

    // Step 1: Al2O3 + 2 NaOH → 2 NaAlO2
    // Red mud is produced in a 1:1.25 ratio with aluminate. This loses some of the aluminium
    // into the mixture, as its now part of the red mud.
    // Chemical reactor only supports two outputs, so just skip on the water output.
    event.recipes.gtceu
        .chemical_reactor("nijika:tier02/aluminium/bayer_pt_1")
        .itemInputs("2x #forge:dusts/bauxite", "2x #forge:dusts/sodium_hydroxide")
        .inputFluids(Fluid.of("minecraft:water").withAmount(4 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:sodium_aluminate").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:red_mud").withAmount(2.5 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.MV])
        .duration(10 * 20);

    // Step 2: 2 H2O + NaAlO2 → Al(OH)3 + NaOH
    // water is omitted for sanity purposes.
    event.recipes.gtceu
        .autoclave("nijika:tier02/aluminium/bayer_pt_2")
        .inputFluids(Fluid.of("gtceu:sodium_aluminate").withAmount(1 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:aluminium_hydroxide_dust", "1x gtceu:sodium_hydroxide_dust")
        .outputFluids("1x gtceu:red_mud")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(10 * 20);

    // Step 3: 2 Al(OH)3 → Al2O3 + 3 H2O
    event.recipes.gtceu
        .electric_blast_furnace("nijika:tier02/aluminium/bayer_pt_3")
        .itemInputs("2x gtceu:aluminium_hydroxide_dust")
        .itemOutputs("1x gtceu:alumina_dust")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(6 * 20)
        .blastFurnaceTemp(1470);

    // Step 4: Al2O3 -> 2Al + 3O
    event.recipes.gtceu
        .electrolyzer("nijika:tier02/aluminium/not_hall_heroult")
        .itemInputs("gtceu:alumina_dust")
        .itemOutputs("2x gtceu:aluminium_dust")
        .outputFluids(Fluid.of("gtceu:oxygen").withAmount(3 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .duration(15 * 20);

    // Bonus: Red Mud -> Red Mud Dust
    // event.recipes.gtceu.brine_tower()
    event.recipes.gtceu
        .evaporation_pool("nijika:tier02/aluminium/red_mud_dust")
        .inputFluids(Fluid.of("gtceu:red_mud").withAmount(100 * FluidAmounts.BUCKET))
        .itemOutputs("20x gtceu:red_mud_dust")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(60 * 20);

    // Red Mud Dust -> Red Mud Slurry
    event.recipes.gtceu
        .chemical_bath("nijika:tier02/aluminium/red_mud_slurry")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(1 * FluidAmounts.BUCKET))
        .itemInputs("2x gtceu:red_mud_dust")
        .outputFluids(Fluid.of("gtceu:red_mud_slurry").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .duration(3 * 20);

    // Red Mud Slurry -> various outputs
    event.recipes.gtceu
        .centrifuge("nijika:tier02/aluminium/red_mud_centrifuging")
        .inputFluids(Fluid.of("gtceu:red_mud_slurry").withAmount(1 * FluidAmounts.BUCKET))
        .chancedOutput("1x gtceu:sodium_hydroxide_dust", 8000.0, 0.0) // 80%, never boosted
        .chancedOutput("1x gtceu:rutile_dust", 1500.0, 800.0) // 15%, 8% boost per tier
        .chancedOutput("1x gtceu:iron_oxide_dust", 8000.0, 0.0) // 80%, never boosted
        .chancedOutput("1x gtceu:alumina_dust", 3000.0, 500.0) // 30%, 5% boost
        .chancedOutput("1x gtceu:silicon_dioxide_dust", 5000, 0.0) // 50%, never boosted
        .chancedOutput("1x gtceu:gallium_dust", 1100.0, 800.0) // 11%, 8% boost per tier
        .outputFluids(
            Fluid.of("gtceu:diluted_hydrochloric_acid").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.MV])
        .duration(20);
};
