import { createAqueousIntermediate, createChemicalIntermediate } from "../../materials/helpers";

export const addGoldMaterials = (event) => {
    createChemicalIntermediate(event, "sodium_dicyanoaurate", 0xf0f6f1);
    createAqueousIntermediate(event, "gold_slurry", 0xc9ebae);
    createAqueousIntermediate(event, "gold_pulp_residue", 0x87967a);
};

/**
 * Adds a full gold processing chain.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const addGoldProcessingRecipes = (event) => {
    // Mostly fictional!

    event.remove({ id: "gtceu:arc_furnace/arc_clock" })
    event.remove({output: "gtceu:purified_gold_ore"});
    event.remove({output: "gtceu:refined_gold_ore"});
    event.remove({output: "gtceu:impure_gold_dust"});
    event.remove({ output: "#forge:ingots/gold", type: "minecraft:smelting" });
    event.remove({id: "gtceu:macerator/macerate_netherrack"});

    // 1) Wash the crushed gold ore to get gold slurry.
    event.recipes.gtceu.chemical_bath("nijika:chemicals/gold/gold_slurry")
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
    event.recipes.gtceu.chemical_reactor("nijika:chemicals/gold/gold_cyanosis_pt1")
        .itemInputs(
            "2x gtceu:sodium_cyanide_dust",
            "2x gtceu:calcium_hydroxide"
        )
        .inputFluids(Fluid.of("gtceu:gold_slurry").withAmount(2 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:sodium_dicyanoaurate").withAmount(200 * FluidAmounts.MB),
            Fluid.of("gtceu:gold_slurry").withAmount(800 * FluidAmounts.B)
        )
        .chancedOutput("1x gtceu:crushed_gold_ore", 3500.0, 0.0)
        .EUt(GTValues.VA[GTValues.LV])
        .duration(5 * 20);

    // 3) Process the Sodium Dicyanoaurate with Carbon to get a small amount of pure gold.
    event.recipes.gtceu.chemical_reactor("nijika:chemicals/gold/carbon_in_pulp")
        .inputFluids(Fluid.of("gtceu:sodium_dicyanoaurate").withAmount(1 * FluidAmounts.BUCKET))
        .itemInputs("12x gtceu:coke_dust")
        .itemOutputs("4x minecraft:gold_nugget")
        .outputFluids(Fluid.of("gtceu:gold_pulp_residue").withAmount(600 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(10 * 20)
        .circuit(2);

    // 4) Gold pulp residue can be washed in hydrochloric acid to get some reactants back.
    event.recipes.gtceu.chemical_reactor("nijika:chemicals/gold/pulp_processing")
        .inputFluids(
            Fluid.of("gtceu:gold_pulp_residue").withAmount(4 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrochloric_acid").withAmount(12 * FluidAmounts.BUCKET)
        )
        .itemOutputs(
            "1x gtceu:salt_dust",
            "1x gtceu:calcium_chloride_dust",
        )
        .outputFluids(Fluid.of("gtceu:carbon_dioxide").withAmount(6 * FluidAmounts.BUCKET))
        .chancedFluidOutput(
            Fluid.of("gtceu:sodium_dicyanoaurate").withAmount(200 * FluidAmounts.BUCKET),
            1500.0, 650.0,
        )
        .chancedOutput("3x gtceu:small_silver_dust", 2700.0, 7.0)
        .chancedOutput("11x gtceu:tiny_copper_cyanide_dust", 1510.0, 7.0)
        .EUt(GTValues.VA[GTValues.LV])
        .duration(3 * 20 + 10);
};
