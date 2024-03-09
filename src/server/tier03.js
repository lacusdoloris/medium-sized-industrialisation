// HV!

import { GT_MACHINE_TIERS } from "../shared/definition";

/** @param {Internal.RecipesEventJS} event */
export const doTier03Content = (event) => {
    // for whattever reason, CEu has this at EV.
    // so let's move it down to HV.
    event.remove({ id: "gtceu:shaped/distillation_tower" });

    event
        .shaped("gtceu:distillation_tower", ["CFC", "PHP", "CFC"], {
            C: "#gtceu:circuits/hv",
            F: "gtceu:vanadium_steel_large_fluid_pipe",
            P: "gtceu:hv_electric_pump",
            H: "gtceu:hv_machine_hull",
        })
        .id("nijika:tier03/distillation_tower_fixed");

    // actual stainless steel production is made from ferromanganese and ferrochrome.
    event.remove({ id: "gtceu:mixer/stainless_steel_from_invar" });
    event.remove({ id: "gtceu:mixer/stainless_steel_from_elements" });

    event.recipes.gtceu
        .bessemer_smelting("nijika:tier03/stainless/from_ingots")
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
        .duration(20 * 60 * 20)
        .circuit(3)
        .blastFurnaceTemp(2700);

    event.recipes.gtceu
        .bessemer_smelting("nijika:tier03/stainless/from_blocks")
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
        .duration(20 * 60 * 20)
        .circuit(3)
        .blastFurnaceTemp(2700);

    // fix up the cleanroom to use the right tier materials
    event.remove({ id: "gtceu:shaped/cleanroom" });
    event
        .shaped("gtceu:cleanroom", ["FFF", "RHR", "MCM"], {
            F: "gtceu:item_filter",
            R: GT_MACHINE_TIERS.HV.materials.rotor.tagged("rotors"),
            H: GT_MACHINE_TIERS.HV.machineHull,
            M: "gtceu:hv_electric_motor",
            C: GT_MACHINE_TIERS.HV.circuitTag,
        })
        .id("nijika:tier03/cleanroom");

    event.recipes.gtceu
        .assembler("nijika:tier03/cadmium_battery")
        .itemInputs(
            "8x gtceu:cadmium_dust",
            "4x gtceu:nickel_foil",
            "4x gtceu:polyvinyl_chloride_foil",
            "1x gtceu:hv_battery_hull"
        )
        .inputFluids(Fluid.of("gtceu:hydrogen").withAmount(6 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:hv_cadmium_battery")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(5 * 20);

    event.remove({ id: "gtceu:assembler/hv_fluid_drilling_rig" });
    // same as the original recipe, but moved down to HV.
    event.recipes.gtceu
        .assembler("nijika:tier03/hv_fluid_drilling_rig")
        .itemInputs(
            GT_MACHINE_TIERS.HV.machineHull,
            "4x gtceu:titanium_frame",
            "4x #gtceu:circuits/hv",
            "4x gtceu:hv_electric_motor",
            "4x gtceu:hv_electric_pump",
            GT_MACHINE_TIERS.HV.materials.gear.tagged("gears")
        )
        .itemOutputs("gtceu:hv_fluid_drilling_rig")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20 * 20)
        .circuit(2);
};
