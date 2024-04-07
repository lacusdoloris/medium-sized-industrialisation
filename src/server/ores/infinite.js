import { BASE_ORES, COMBO_SORTING } from "../../shared/base_ores";

const goldify = (what) => {
    if (what == "gold") {
        return "minecraft:raw_gold";
    } else {
        return `gtceu:raw_${what}`;
    }
};

/**
 * Creates and adjusts the recipes for the base ores.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addBaseOreRecipes = (event) => {
    event.remove({ type: "createoreexcavation:vein" });
    event.remove({ type: "createoreexcavation:drilling" });
    event.remove({ type: "createoreexcavation:extracting" });

    // TODO: Find a way to only register these if we're loaded on a Vanilla world preset.

    for (let [name, oreData] of Object.entries(BASE_ORES)) {
        event.recipes.createoreexcavation
            .vein(Component.translatable(`vein.nijika.${name}`), `gtceu:raw_${name}`)
            .biomeWhitelist("bigglobe:overworld")
            .placement(128, 32, oreData.seed)
            .id(`nijika:veins/overworld/${name}`);

        event.recipes.createoreexcavation
            .vein(Component.translatable(`vein.nijika.${name}`), `gtceu:raw_${name}`)
            .biomeWhitelist("minecraft:is_overworld")
            .placement(128, 32, oreData.seed)
            .id(`nijika:veins/overworld_vanilla/${name}`);

        event.recipes.createoreexcavation
            .drilling(`gtceu:raw_${name}`, `nijika:veins/overworld/${name}`, 200)
            .fluid(Fluid.of("gtceu:drilling_fluid").withAmount(165 * FluidAmounts.MILLIBUCKET))
            .id(`nijika:drilling/overworld/${name}`);

        event.recipes.createoreexcavation
            .drilling(`gtceu:raw_${name}`, `nijika:veins/overworld_vanilla/${name}`, 200)
            .fluid(Fluid.of("gtceu:drilling_fluid").withAmount(165 * FluidAmounts.MILLIBUCKET))
            .id(`nijika:drilling/overworld_vanilla/${name}`);

        // Similar to Angel's Refining.
        //
        // Crushed ore sorting: ore 1 + 2 + slag
        // Impure ore (chunks): ore 1 + 2 + 3 + slag
        // Refined ore (crystals): ore 1 + 2 + 3 + 4 + slag
        // Pure ore (... yeah): all 7 ores, no slag

        event.remove({ input: `gtceu:crushed_${name}_ore` });
        event.recipes.gtceu
            .ore_sorting(`nijika:base_ores/${name}/sorting_tier_1`)
            .itemInputs(`4x gtceu:crushed_${name}_ore`)
            .itemOutputs(
                `2x ${goldify(oreData.intoOres[0])}`,
                `1x ${goldify(oreData.intoOres[1])}`,
                "1x nijika:slag"
            )
            .duration(5 * 20)
            .EUt(GTValues.VA[GTValues.HV])
            .circuit(1);

        // Washing of crushed ore with distilled water.
        // TODO: Wastewaterr.
        event.remove({ input: `gtceu:impure_${name}_dust` });
        event.recipes.gtceu
            .ore_washer(`nijika:base_ores/${name}/washing`)
            .itemInputs(`1x gtceu:crushed_${name}_ore`)
            .inputFluids(Fluid.of("gtceu:distilled_water").withAmount(2 * FluidAmounts.BUCKET))
            .itemOutputs(`1x gtceu:impure_${name}_dust`)
            .chancedOutput(`1x gtceu:raw_${oreData.gem}`, 5000.0, 0.0)
            .EUt(GTValues.VHA[GTValues.EV])
            .duration(20 * 20);

        event.recipes.gtceu
            .ore_sorting(`nijika:base_ores/${name}/sorting_tier_2`)
            .itemInputs(`4x gtceu:impure_${name}_dust`)
            .itemOutputs(
                `3x ${goldify(oreData.intoOres[0])}`,
                `1x ${goldify(oreData.intoOres[1])}`,
                `1x ${goldify(oreData.intoOres[2])}`,
                "1x nijika:slag"
            )
            .duration(5 * 20)
            .EUt(GTValues.VA[GTValues.EV])
            .circuit(2);
    }

    // Combination sorting.
    for (let [inp1, inp2, output] of COMBO_SORTING.brown) {
        event.recipes.gtceu
            .ore_sorting(`nijika:base_ores/combo_sorting/${output}`)
            .itemInputs(
                `3x gtceu:crushed_${inp1}_ore`,
                `3x gtceu:crushed_${inp2}_ore`,
                "1x nijika:catalysator_brown"
            )
            .itemOutputs(`6x ${goldify(output)}`)
            .duration(10 * 20)
            .EUt(GTValues.V[GTValues.HV])
            .circuit(11);
    }
};
