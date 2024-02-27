// TODO: Look into the methyl isobutl ketone processing chain.
// That might replace this once I'm more confident wwith organic chemistry.

import { createChemicalIntermediate } from "../../materials/helpers";

export const addTantalumMaterials = (event) => {
    event
        .create(new ResourceLocation("nijika:tantalite_slurry"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .color(0x9ff1f5)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    createChemicalIntermediate(event, "tantalum_pentoxide", 0x0a0c26).components(
        "2x gtceu:tantalum",
        "5x gtceu:oxygen"
    );

    event
        .create(new ResourceLocation("nijika:tantalum_slag"))
        .dust() // would prefer this to be a gem, but that generates sifter recipes.
        .color(0x171b45)
        .iconSet(GTMaterialIconSet.FLINT)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event
        .create(new ResourceLocation("nijika:tantalum_slag_slurry"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .color(0x9c949c)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event
        .create(new ResourceLocation("nijika:tantalite_residue"))
        .dust()
        .color(0x9c949c)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
};

/**
 * Adds a mostly fictional tantalite processing chain.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addTantaliteProcessingChain = (event) => {
    // This is a mostly fictional chain.

    // 1) Tantalite ore + Hydrofluoric acid -> Tantalite slurry.
    // 3 Ta2O6 + 6 HF -> [3 Ta2O6 + 6 HF]

    event.recipes.gtceu
        .chemical_bath("nijika:chemicals/tantalum/tantalum_slurry")
        .itemInputs("3x gtceu:tantalite_dust")
        .inputFluids(Fluid.of("gtceu:hydrofluoric_acid").withAmount(6 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:tantalite_slurry").withAmount(6 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(2 * 20 + 10);

    // 2) Tantalite slurry + Sodium Hydroxide -> Tantalum Pentoxide + Sodium Fluoride + Tantalum Slag
    // [3 Ta206, 6 HF] + 6 NaOH -> 3 Ta2O5 + 6 NaF + [Slag]
    event.recipes.gtceu
        .chemical_bath("nijika:chemicals/tantalum/tantalum_pentoxide")
        .itemInputs("6x gtceu:sodium_hydroxide_dust")
        .inputFluids(Fluid.of("gtceu:tantalite_slurry").withAmount(6 * FluidAmounts.BUCKET))
        .itemOutputs(
            "3x gtceu:tantalum_pentoxide_dust",
            "6x gtceu:sodium_fluoride_dust",
            "6x gtceu:tantalum_slag_dust"
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(5 * 20);

    // 3) 3 Ta2O5 + 10 Al = 6 Ta + 5 Al2O3
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/tantalum/tantalum_reduction_aluminium")
        .itemInputs("3x gtceu:tantalum_pentoxide_dust", "10x gtceu:aluminium_dust")
        .itemOutputs("6x gtceu:tantalum_dust", "5x gtceu:alumina_dust")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(15 * 20)
        .circuit(1)
        .blastFurnaceTemp(1500);

    // Bonus: Tantalum Slag + Hydrochloric Acid -> Tantalite Slag Slurry
    event.recipes.gtceu
        .chemical_bath("nijika:chemicals/tantalum/tantalum_slag_slurry")
        .itemInputs("2x gtceu:tantalum_slag_dust")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:tantalum_slag_slurry").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:diluted_hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(2 * 20 + 10);

    // Tantalite Slag Slurry -> Tantalite Residue
    event.recipes.gtceu
        .evaporation_pool("nijika:chemicals/tantalum/tantalite_residue")
        .inputFluids(Fluid.of("gtceu:tantalum_slag_slurry").withAmount(50 * FluidAmounts.BUCKET))
        .itemOutputs("15x gtceu:tantalite_residue_dust")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(60 * 20);

    // Tantalite Residue -> Niobium, Manganese Oxide, Iron Oxide, Salt
    event.recipes.gtceu
        .centrifuge("nijika:chemicals/tantalum/tantalite_centrifuge")
        .itemInputs("2x gtceu:tantalite_residue_dust")
        .chancedOutput("1x gtceu:niobium_pentoxide_dust", 8000.0, 2.5) // 80%, 2.5% boost
        .chancedOutput("1x gtceu:manganese_oxide_dust", 7500, 0.0) // 75%, no boost
        .chancedOutput("1x gtceu:iron_oxide_dust", 7500, 0.0) // 75%, no boost
        .chancedOutput("1x gtceu:salt_dust", 9000, 0.0) // 90%, no boost
        .chancedOutput("1x gtceu:tiny_yttrium_dust", 200, 1.5) // 2%, 1.5% boost
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20);

    // Tantalum Pentoxide + Carbon -> Tantalum Carbide + Oxygen
    // 2 Ta2O5 + 4 C = 4 TaC + 5 O2
    event.remove({ id: "gtceu:mixer/tantalum_carbide" });

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/tantalum/tantalum_carbide")
        .itemInputs("2x gtceu:tantalum_pentoxide_dust", "4x #nijika:carbon_rich_dusts")
        .itemOutputs("4x gtceu:tantalum_carbide_dust")
        .outputFluids(Fluid.of("gtceu:oxygen").withAmount(10 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.EV])
        .duration(15 * 20)
        .blastFurnaceTemp(1500);
};
