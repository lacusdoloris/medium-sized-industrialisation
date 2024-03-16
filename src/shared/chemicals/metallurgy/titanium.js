import { createAcidicIntermediate, createAqueousIntermediate } from "../../materials/helpers";

export const addTitaniumMaterials = (event) => {
    // Crude TiCl4
    createAcidicIntermediate(event, "impure_titanium_tetrachloride", 0x43041d).components(
        "1x gtceu:titanium",
        "4x gtceu:chlorine"
    );
    // Distilled TiCl4
    createAcidicIntermediate(event, "impure_titanium_tetrachloride_1", 0x5c0528).components(
        "1x gtceu:titanium",
        "4x gtceu:chlorine"
    );
    // Precipitated TiCl4
    createAcidicIntermediate(event, "impure_titanium_tetrachloride_2", 0x740632).components(
        "1x gtceu:titanium",
        "4x gtceu:chlorine"
    );

    // Not strictly part of the reaction, but there's no tin/silicon sections yet.
    createAqueousIntermediate(event, "trichlorosilane", 0xddf0e7, true).components(
        "1x gtceu:hydrogen",
        "3x gtceu:chlorine",
        "1x gtceu:silicon"
    );

    createAqueousIntermediate(event, "tin_iv_chloride", 0xc9f2df, true).components(
        "1x gtceu:tin",
        "4x gtceu:chlorine"
    );
};

/**
 * Adds titanium processing recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addTitaniumRecipes = (event) => {
    event.remove({ id: "gtceu:chemical_reactor/titanium_tetrachloride" });
    event.remove({ id: "gtceu:large_chemical_reactor/titanium_tetrachloride" });

    // TiO2 + 2 Cl2 + 2 C = TiCl4 + 2 CO, same as the gtceu recipe
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/titanium/crude_ticl4")
        .itemInputs("2x #nijika:carbon_rich_dusts", "1x #forge:dusts/rutile")
        .inputFluids(Fluid.of("gtceu:chlorine").withAmount(4 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:carbon_monoxide").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:impure_titanium_tetrachloride").withAmount(1 * FluidAmounts.BUCKET)
        )
        .duration(20 * 20)
        .EUt(GTValues.VA[GTValues.HV]);

    // distill the impure ticl4 to get [2/3] ticl4 and some byproducts
    // impure TiCl4 is about 94% pure
    event.recipes.gtceu
        .distillation_tower("nijika:chemicals/titanium/semipure_ticl4")
        .inputFluids(
            Fluid.of("gtceu:impure_titanium_tetrachloride").withAmount(20 * FluidAmounts.BUCKET)
        )
        .chancedFluidOutput(
            Fluid.of("gtceu:trichlorosilane").withAmount(200 * FluidAmounts.MILLIBUCKET),
            6500,
            0.0
        )
        .chancedFluidOutput(
            Fluid.of("gtceu:tin_iv_chloride").withAmount(150 * FluidAmounts.MILLIBUCKET),
            3500,
            0.0
        )
        .outputFluids(
            Fluid.of("gtceu:impure_titanium_tetrachloride_1").withAmount(
                18800 * FluidAmounts.MILLIBUCKET
            )
        )
        .duration(30 * 20)
        .EUt(GTValues.VA[GTValues.HV])
        .disableDistilleryRecipes(true);

    // fuck OFF gtceu
    event.remove({
        type: "gtceu:distillery",
        input: Fluid.of("gtceu:impure_titanium_tetrachloride"),
    });

    // precipitate out vanadium
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/titanium/ticl4_vanadium")
        .inputFluids(
            Fluid.of("gtceu:impure_titanium_tetrachloride_1").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen_sulfide").withAmount(1 * FluidAmounts.BUCKET)
        )
        .notConsumable("4x #forge:dusts/copper")
        .outputFluids(
            Fluid.of("gtceu:titanium_tetrachloride").withAmount(980 * FluidAmounts.MB),
            Fluid.of("gtceu:hydrogen_sulfide").withAmount(910 * FluidAmounts.MB)
        )
        .chancedOutput("2x gtceu:tiny_vanadium_oxytrichloride_dust", 7800.0, 0.0)
        .duration(7 * 20 + 10)
        .EUt(GTValues.VA[GTValues.MV]);
};
