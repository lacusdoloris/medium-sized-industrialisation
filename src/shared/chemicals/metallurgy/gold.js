import { createAqueousIntermediate, createChemicalIntermediate } from "../../materials/helpers";

export const addGoldMaterials = (event) => {
    createChemicalIntermediate(event, "sodium_dicyanoaurate", 0xf0f6f1);
    createAqueousIntermediate(event, "gold_slurry", 0xc9ebae);
    createAqueousIntermediate(event, "gold_pulp_residue", 0x87967a);

    createAqueousIntermediate(event, "gold_hydroxide", 0xd6c436);
};

/**
 * Adds a full gold processing chain.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addGoldProcessingRecipes = (event) => {
    // Mostly fictional!

    event.remove({ id: "gtceu:arc_furnace/arc_clock" });
    event.remove({ output: "gtceu:purified_gold_ore" });
    event.remove({ output: "gtceu:refined_gold_ore" });
    event.remove({ output: "gtceu:impure_gold_dust" });
    event.remove({ output: "#forge:ingots/gold", type: "minecraft:smelting" });
    event.remove({ id: "gtceu:macerator/macerate_netherrack" });

    event.remove({ id: "gtceu:centrifuge/glowstone_separation" });

    // 1) Wash the crushed gold ore to get gold slurry.
    event.recipes.gtceu
        .chemical_bath("nijika:chemicals/gold/gold_slurry")
        .itemInputs("12x gtceu:crushed_gold_ore")
        .inputFluids(Fluid.of("gtceu:distilled_water").withAmount(10 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:gold_slurry").withAmount(10 * FluidAmounts.BUCKET))
        .chancedOutput("3x gtceu:small_magnetite_dust", 3200.0, 700.0)
        .chancedOutput("10x gtceu:tiny_sphalerite_dust", 4100.0, 435.0)
        .chancedOutput("1x gtceu:silver_dust", 5500.0, 110.0)
        .EUt(GTValues.VA[GTValues.LV])
        .duration(2 * 20 + 10);

    // 2) React the slurry with sodium cyanide to get a small amount of cyanotic gold slurry.
    //    This produces a bunch of the gold slurry back, as well as some of the original ore.
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/gold/gold_cyanosis_pt1")
        .itemInputs("2x gtceu:sodium_cyanide_dust", "2x gtceu:calcium_hydroxide")
        .inputFluids(Fluid.of("gtceu:gold_slurry").withAmount(2 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:sodium_dicyanoaurate").withAmount(200 * FluidAmounts.MB),
            Fluid.of("gtceu:gold_slurry").withAmount(800 * FluidAmounts.B)
        )
        .chancedOutput("1x gtceu:crushed_gold_ore", 3500.0, 0.0)
        .EUt(GTValues.VA[GTValues.LV])
        .duration(5 * 20);

    // 3) Process the Sodium Dicyanoaurate with Carbon to get a small amount of pure gold.
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/gold/carbon_in_pulp")
        .inputFluids(Fluid.of("gtceu:sodium_dicyanoaurate").withAmount(1 * FluidAmounts.BUCKET))
        .itemInputs("12x gtceu:coke_dust")
        .itemOutputs("4x minecraft:gold_nugget")
        .outputFluids(Fluid.of("gtceu:gold_pulp_residue").withAmount(600 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(10 * 20)
        .circuit(2);

    // 4) Gold pulp residue can be washed in hydrochloric acid to get some reactants back.
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/gold/pulp_processing")
        .inputFluids(
            Fluid.of("gtceu:gold_pulp_residue").withAmount(4 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrochloric_acid").withAmount(12 * FluidAmounts.BUCKET)
        )
        .itemOutputs("1x gtceu:salt_dust", "1x gtceu:calcium_chloride_dust")
        .outputFluids(Fluid.of("gtceu:carbon_dioxide").withAmount(6 * FluidAmounts.BUCKET))
        .chancedFluidOutput(
            Fluid.of("gtceu:sodium_dicyanoaurate").withAmount(200 * FluidAmounts.BUCKET),
            1500.0,
            650.0
        )
        .chancedOutput("3x gtceu:small_silver_dust", 2700.0, 7.0)
        .chancedOutput("11x gtceu:tiny_copper_cyanide_dust", 1510.0, 7.0)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(3 * 20 + 10);

    // Recovery of gold from MIBK mixture.
    // https://patents.google.com/patent/US4297134A/en
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/gold/mibk_recovery")
        .inputFluids(Fluid.of("gtceu:gold_mibk_mixture").withAmount(250 * FluidAmounts.MB))
        .itemInputs("4x gtceu:sodium_hydroxide_dust")
        .itemOutputs("4x gtceu:salt_dust") // TODO: This might magic up chlorine.
        .outputFluids(Fluid.of("gtceu:methyl_isobutyl_ketone").withAmount(185 * FluidAmounts.MB))
        .chancedFluidOutput(
            Fluid.of("gtceu:gold_hydroxide").withAmount(100 * FluidAmounts.MB),
            6500.0,
            0.0
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(5 * 20);

    // Reduction with good old hydrogen.
    // 2 Au(OH)3 + 3 H2 = 2 Au + 6 H2O
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/gold/hydroxide_reduction")
        .inputFluids(
            Fluid.of("gtceu:gold_hydroxide").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(3 * FluidAmounts.BUCKET)
        )
        .itemOutputs("1x gtceu:gold_dust")
        .outputFluids(Fluid.of("minecraft:water").withAmount(6 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(2 * 20 + 10);
};
