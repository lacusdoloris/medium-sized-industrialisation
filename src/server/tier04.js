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
};
