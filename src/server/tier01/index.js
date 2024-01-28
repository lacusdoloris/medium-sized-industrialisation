
// LV, that is.

import { addGalliumArsenicRecipes } from "./gallium_arsenic";

/** @param {Internal.RecipesEventJS} event */
export const doTier01Content = (event) => {
    event.recipes.gtceu.bessemer_smelting("nijika:tier01/steel_ingot_bessemer_process")
        .itemInputs(
            "64x #forge:ingots/iron",
            "8x create:limestone",
        )
        .inputFluids(Fluid.of("gtceu:air").withAmount(10 * FluidAmounts.BUCKET))
        .itemOutputs("64x gtceu:steel_ingot")
        .EUt(128)
        .circuit(1)
        .duration(20 * 60 * 20);  // 20 minutes at MV

    event.recipes.gtceu.bessemer_smelting("nijika:tier01/steel_block_bessemer_process")
        .itemInputs(
            "64x #forge:storage_blocks/iron",
            "64x create:limestone",
        )
        .inputFluids(Fluid.of("gtceu:air").withAmount(90 * FluidAmounts.BUCKET))
        .itemOutputs("64x gtceu:steel_block")
        .EUt(128)
        .circuit(1)
        .duration(20 * 60 * 40);  // 40 minutes at MV

    // im so sorry.
    event.recipes.create.sequenced_assembly(
        "1x gtceu:small_wrought_iron_gear",
        "1x gtceu:wrought_iron_plate",
        [
            event.recipes.create.deploying(
                "gtceu:wrought_iron_plate", ["gtceu:wrought_iron_plate", "#forge:rods/wrought_iron"]
            ),
            event.recipes.create.pressing(
                "gtceu:wrought_iron_plate", ["gtceu:wrought_iron_plate"]
            )
        ]
    ).transitionalItem("gtceu:wrought_iron_plate").loops(4).id("nijika:tier01/evil_gear_recipe");

    addGalliumArsenicRecipes(event);
}
