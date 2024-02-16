// LV, that is.

import { GT_MACHINE_TIERS, TIER_TO_HIGHER_TIER_MAP } from "../shared/definition";

/** @param {Internal.RecipesEventJS} event */
export const doTier01Content = (event) => {
    event.remove({ output: "#forge:ingots/steel", type: "gtceu:electric_blast_furnace" });
    event.remove({ id: "gtceu:shaped/bronze_primitive_blast_furnace" }); // not bronze?

    event
        .shaped("gtceu:bessemer_furnace", ["FFF", "CHC", "WWW"], {
            F: "gtceu:firebricks",
            C: "#gtceu:circuits/lv",
            H: "gtceu:heatproof_machine_casing",
            W: GT_MACHINE_TIERS.LV.quadHeatingWire,
        })
        .id("nijika:tier01/bessemer_furnace");

    event.recipes.gtceu
        .bessemer_smelting("nijika:tier01/steel_ingot_bessemer_process")
        .itemInputs("64x #forge:ingots/iron", "8x #nijika:bessemer_limestone")
        .inputFluids(Fluid.of("gtceu:air").withAmount(10 * FluidAmounts.BUCKET))
        .itemOutputs("64x gtceu:steel_ingot")
        .EUt(GTValues.VA[GTValues.MV])
        .circuit(1)
        .duration(20 * 60 * 20); // 20 minutes at MV

    event.recipes.gtceu
        .bessemer_smelting("nijika:tier01/steel_block_bessemer_process")
        .itemInputs("64x #forge:storage_blocks/iron", "64x #nijika:bessemer_limestone")
        .inputFluids(Fluid.of("gtceu:air").withAmount(90 * FluidAmounts.BUCKET))
        .itemOutputs("64x gtceu:steel_block")
        .EUt(GTValues.VA[GTValues.MV])
        .circuit(1)
        .duration(20 * 60 * 40); // 40 minutes at MV

    // alt recipe using oxygen directly
    event.recipes.gtceu
        .bessemer_smelting("nijika:tier01/steel_block_bessemer_with_o2")
        .itemInputs("64x #forge:storage_blocks/iron", "64x #nijika:bessemer_limestone")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(18900 * FluidAmounts.MILLIBUCKET))
        .itemOutputs("64x gtceu:steel_block")
        .EUt(GTValues.VA[GTValues.MV])
        .circuit(1)
        .duration(20 * 60 * 40);

    // im so sorry.
    event.recipes.create
        .sequenced_assembly("1x gtceu:small_wrought_iron_gear", "1x gtceu:wrought_iron_plate", [
            event.recipes.create.deploying("gtceu:wrought_iron_plate", [
                "gtceu:wrought_iron_plate",
                "#forge:rods/wrought_iron",
            ]),
            event.recipes.create.pressing("gtceu:wrought_iron_plate", ["gtceu:wrought_iron_plate"]),
        ])
        .transitionalItem("gtceu:wrought_iron_plate")
        .loops(4)
        .id("nijika:tier01/evil_gear_recipe");

    event.recipes.gtceu
        .assembler("nijika:tier01/nickel_cadmium_battery")
        .itemInputs(
            "gtceu:lv_battery_hull",
            "2x gtceu:cadmium_dust",
            "1x gtceu:nickel_foil",
            "1x minecraft:paper",
        )
        .itemOutputs("gtceu:lv_cadmium_battery")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(20 * 5);
};
