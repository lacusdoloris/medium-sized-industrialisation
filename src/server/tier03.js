
// HV!

/** @param {Internal.RecipesEventJS} event */
export const doTier03Content = (event) => {
    // for whattever reason, CEu has this at EV.
    // so let's move it down to HV.
    event.remove({id: "gtceu:shaped/distillation_tower"});

    event.shaped(
        "gtceu:distillation_tower",
        ["CFC", "PHP", "CFC"],
        {
            C: "#gtceu:circuits/hv", 
            F: "gtceu:vanadium_steel_large_fluid_pipe",
            P: "gtceu:hv_electric_pump",
            H: "gtceu:hv_machine_hull"
        }
    ).id("nijika:tier03/distillation_tower_fixed");

    // actual stainless steel production is made from ferromanganese and ferrochrome.
    event.remove({id: "gtceu:mixer/stainless_steel_from_invar"});
    event.remove({id: "gtceu:mixer/stainless_steel_from_elements"});

    event.recipes.gtceu.bessemer_smelting("nijika:tier03/stainless/from_ingots")
        .itemInputs(
            "16x #forge:ingots/iron",
            "16x #forge:ingots/invar",
            "16x #forge:ingots/ferromanganese",
            "16x #forge:ingots/ferrochrome",
            "8x #nijika:bessemer_limestone"
        )
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(2100 * FluidAmounts.MILLIBUCKET))
        .itemOutputs("64x gtceu:stainless_steel_ingot")
        .EUt(GTValues.VA[GTValues.EV])
        .duration((20 * 60) * 20)
        .circuit(3)
        .blastFurnaceTemp(2700);

    event.recipes.gtceu.bessemer_smelting("nijika:tier03/stainless/from_blocks")
        .itemInputs(
            "16x #forge:storage_blocks/iron",
            "16x #forge:storage_blocks/invar",
            "16x #forge:storage_blocks/ferromanganese",
            "16x #forge:storage_blocks/ferrochrome",
            "64x #nijika:bessemer_limestone"
        )
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(18900 * FluidAmounts.MILLIBUCKET))
        .itemOutputs("64x gtceu:stainless_steel_block")
        .EUt(GTValues.VA[GTValues.EV])
        .duration((20 * 60) * 20)
        .circuit(3)
        .blastFurnaceTemp(2700);

}
