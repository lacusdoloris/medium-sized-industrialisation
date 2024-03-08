import {
    createAcidicIntermediate,
    createAqueousIntermediate,
    createChemicalIntermediate,
    createDustIntermediate,
} from "../../materials/helpers";

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

    createAqueousIntermediate(event, "hydrogen_heptafluorotantalite", 0xd4e0bf);
    createDustIntermediate(event, "potassium_heptafluorotantalite", 0x4c1212);
    createAqueousIntermediate(event, "tantalite_slag", 0x171b45);
    createAcidicIntermediate(event, "ammonium_fluoride", 0xb58b8b);

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
    // This skips the methyl isobutyl ketone separation, and moves recovery of Niboium to processing
    // the Tantalum slag instead, because MIBK requires Palladium catalysts, and platinum processing
    // isn't until IV.

    // 1) Tantalite ore + Hydrofluoric acid -> Hydrogen Heptafluorotantalite + water
    // Ta2O5 + 14 HF = 2 H2[TaF7] + 5 H2O
    // This loses some oxygen from the initial tantalum.

    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/tantalum/heptafluorotantalite")
        .itemInputs("1x gtceu:tantalite_dust")
        .inputFluids(Fluid.of("gtceu:hydrofluoric_acid").withAmount(14 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:hydrogen_heptafluorotantalite").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(5 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(3 * 20 + 10);

    // 2) Hydrogen Heptafluorotantalite + Potassium Fluoride -> Potassium Heptafluorotantalite + Tantalum Slag
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/tantalum/potassium_heptafluorotantalite")
        .itemInputs("2x gtceu:potassium_fluoride_dust")
        .inputFluids(
            Fluid.of("gtceu:hydrogen_heptafluorotantalite").withAmount(2 * FluidAmounts.BUCKET)
        )
        .itemOutputs("1x gtceu:potassium_heptafluorotantalite_dust")
        .chancedOutput("2x gtceu:small_potassium_heptafluorotantalite_dust", 7500.0, 0.0)
        .outputFluids(Fluid.of("gtceu:tantalite_slag").withAmount(500 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(5 * 20);

    // 3a) Potassium heptafluorotantalite + Sodium fluoride => Pure tantalum metal.
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/tantalum/tantalum_reduction")
        .itemInputs("1x gtceu:potassium_heptafluorotantalite_dust", "5x gtceu:sodium_dust")
        .notConsumable("17x gtceu:salt_dust") // heat control catalyst
        .itemOutputs(
            "3x gtceu:small_potassium_fluoride_dust",
            "5x gtceu:sodium_fluoride_dust",
            "1x gtceu:tantalum_dust"
        )
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(20 * 20)
        .blastFurnaceTemp(1900);

    // 2) Alternative path: Neutralise with Ammonia to get Ta2O5 plus some slag.
    // 2 H2TaF7 + 14 (NH4)OH = Ta2O5 + 14 NH4F + 9 H2O
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/tantalum/tantalum_ammonia_neutralisation")
        .inputFluids(
            Fluid.of("gtceu:hydrogen_heptafluorotantalite").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:ammonium_hydroxide").withAmount(14 * FluidAmounts.BUCKET)
        )
        .itemOutputs("2x gtceu:small_tantalum_pentoxide_dust")
        .outputFluids(
            Fluid.of("gtceu:ammonium_fluoride").withAmount(14 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(9 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:tantalite_slag").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(15 * 20);

    // 3b) 3 Ta2O5 + 10 Al = 6 Ta + 5 Al2O3
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/tantalum/tantalum_reduction_aluminium")
        .itemInputs("3x gtceu:tantalum_pentoxide_dust", "10x gtceu:aluminium_dust")
        .itemOutputs("6x gtceu:tantalum_dust", "5x gtceu:alumina_dust")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(15 * 20)
        .blastFurnaceTemp(1500);

    // Bonus fictional chain: Tantalum Slag + Hydrochloric Acid -> Tantalite Slag Slurry
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/tantalum/tantalum_slag_slurry")
        .inputFluids(
            Fluid.of("gtceu:tantalite_slag"),
            Fluid.of("gtceu:hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET)
        )
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
        .blastFurnaceTemp(3600);

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/tantalum/tantalum_carbide_alt")
        .itemInputs("1x gtceu:tantalum_dust", "1x gtceu:graphite_dust")
        .itemOutputs("1x gtceu:hot_tantalum_carbide_ingot")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(60 * 20)
        .blastFurnaceTemp(3600);

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/tantalum/tantalum_carbide_alt_helium")
        .itemInputs("1x gtceu:tantalum_dust", "1x gtceu:graphite_dust")
        .inputFluids(Fluid.of("gtceu:helium").withAmount(100 * FluidAmounts.MB))
        .itemOutputs("1x gtceu:hot_tantalum_carbide_ingot")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(40 * 20 + 4)
        .blastFurnaceTemp(3600);
};
