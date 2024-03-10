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

    event.recipes.gtceu.assembler("nijika:tier04/ore_sorter")
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
};
