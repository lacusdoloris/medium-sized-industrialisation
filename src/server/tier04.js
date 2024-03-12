import { GT_MACHINE_TIERS } from "../shared/definition";

/** @param {Internal.RecipesEventJS} event */
export const doTier04Content = (event) => {
    event.remove({ id: "gtceu:assembler/casing_high_temperature_smelting" });

    // Calcium silicate is commonly used as a safe alternative to asbestos for high-temperature
    // insulation materials. [citation needed]
    //
    // https://en.wikipedia.org/wiki/Calcium_silicate
    event.recipes.gtceu
        .assembler("nijika:tier04/high_temperature_casing")
        .itemInputs(
            "4x gtceu:titanium_carbide_plate",
            "2x gtceu:hsla_steel_plate",
            "1x gtceu:tungsten_carbide_frame",
            "4x gtceu:calcium_silicate_dust"
        )
        .itemOutputs("2x gtceu:high_temperature_smelting_casing")
        .EUt(GTValues.VH[GTValues.LV])
        .duration(2 * 20 + 10)
        .circuit(6);

    event.remove({ id: "gtceu:mixer/hsla_steel" });
    event.recipes.gtceu
        .bessemer_smelting("nijika:tier04/hsla_steel")
        .itemInputs(
            "32x #forge:storage_blocks/invar",
            "10x #forge:storage_blocks/titanium",
            "10x #forge:storage_blocks/vanadium",
            "12x #forge:storage_blocks/ferromolybdenum",
            "64x #nijika:bessemer_limestone"
        )
        .itemOutputs("64x gtceu:hsla_steel_block")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(81 * FluidAmounts.BUCKET))
        .duration(40 * 60 * 20)
        .EUt(GTValues.VA[GTValues.EV])
        .circuit(4);

    event.remove({ id: "gtceu:mixer/drilling_fluid" });
    event.recipes.gtceu
        .mixer("nijika:tier04/drilling_fluid")
        .itemInputs("1x #forge:dusts/deepslate")
        .inputFluids(
            Fluid.of("gtceu:lubricant").withAmount(20 * FluidAmounts.MILLIBUCKET),
            Fluid.of("minecraft:water").withAmount(4980 * FluidAmounts.MILLIBUCKET)
        )
        .outputFluids(Fluid.of("gtceu:drilling_fluid").withAmount(5 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.MV])
        .duration(64);

    event.recipes.gtceu
        .assembler("nijika:tier04/ore_sorter")
        .itemInputs(
            "1x gtceu:hv_machine_hull",
            "4x gtceu:titanium_frame",
            "8x #gtceu:circuits/hv",
            `4x ${GT_MACHINE_TIERS.HV.materials.rotor.tagged("rotors")}`,
            "2x gtceu:hv_conveyor_module",
            "1x minecraft:diamond_shovel"
        )
        .itemOutputs("1x gtceu:ore_sorter")
        .circuit(2)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20);

    // fix up AZ91 alloy recipes
    // eh, it's closer to 10% aluminium.
    event.recipes.gtceu
        .alloy_blast_smelter("nijika:tier04/az91_slow")
        .itemInputs(
            "9x #forge:dusts/magnesium",
            "1x #forge:dusts/aluminium",
            "1x gtceu:tiny_zinc_dust"
        )
        .outputFluids(Fluid.of("gtceu:molten_az_91").withAmount(144 * 10 * FluidAmounts.MB))
        .circuit(3)
        .EUt(GTValues.VA[GTValues.EV])
        .duration(77 * 20 + 10);

    event.recipes.gtceu
        .alloy_blast_smelter("nijika:tier04/az91_fast")
        .itemInputs(
            "9x #forge:dusts/magnesium",
            "1x #forge:dusts/aluminium",
            "1x gtceu:tiny_zinc_dust"
        )
        .inputFluids(Fluid.of("gtceu:argon").withAmount(50 * 10 * FluidAmounts.MB))
        .outputFluids(Fluid.of("gtceu:molten_az_91").withAmount(144 * 10 * FluidAmounts.MB))
        .circuit(13)
        .EUt(GTValues.VA[GTValues.EV])
        .duration(51 * 20 + 18);

    // and of course there's no generated recipe in the vacuum freezer.
    event.recipes.gtceu
        .vacuum_freezer("nijika:tier04/az91_freeze_slow")
        .notConsumable("gtceu:ingot_casting_mold")
        .inputFluids(Fluid.of("gtceu:molten_az_91").withAmount(144 * FluidAmounts.MB))
        .itemOutputs("1x gtceu:az_91_ingot")
        .duration(3 * 20 + 15)
        .EUt(GTValues.VA[GTValues.MV]);
};
