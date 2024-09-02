// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { getStackForTagPrefix, nijikaId } from "../utils";

// todo: insert vanadite
//
// The orestones are fine, but they scale poorly due to a lack of overclocks and requiring you to
// find the actual vents.
//
// Ore drills can be stacked much more densely in an ore chunk, and can produce multiple ores via
// ore sorting. Later on, the Rock Synthesis Plant Kai will be able to outdo both. These are
// designed to *complement* the orestones, not entirely replace them.

export const BASE_ORES = {
    bocchinium: {
        colour: 0xf7a0b5,
        iconSet: GTMaterialIconSet.BRIGHT,
        seed: 809651466,
        intoOres: ["hematite", "ilmenite", "diamond"],
        runoff: "sulfuric",
    },

    nijikaite: {
        seed: 1929496478,
        colour: 0xf3e5a1,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["tetrahedrite", "molybdenite", "emerald"],
        runoff: "sulfuric",
    },

    ryoite: {
        seed: 155659298,
        colour: 0x49679f,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["cassiterite", "scheelite", "topaz"],
        runoff: "fluoric",
    },

    kitakitaite: {
        seed: 649130079,
        colour: 0xd2625a,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["silver", "gold", "tricalcium_phosphate"],
        runoff: "sulfuric",
    },

    kikurite: {
        seed: 1321746503,
        colour: 0x995678,
        iconSet: GTMaterialIconSet.DULL,
        intoOres: ["bauxite", "tantalite", "salt"],
        runoff: "fluoric",
    },

    /*yoyokite: {
        seed: 1191360869,
        colour: 0x5a3c2d,
        iconSet: GTMaterialIconSet.DULL,
        intoOres: ["bauxite", "chromite", "monazite"],
        gem: "realgar",
    },*/
};

/**
 * Adds the base ore materials.
 */
export const addBaseOreMaterials = (event) => {
    for (let [name, data] of Object.entries(BASE_ORES)) {
        event
            .create(nijikaId(name))
            .color(data.colour)
            .ore()
            .dust()
            .iconSet(data.iconSet)
            .flags(GTMaterialFlags.NO_ORE_PROCESSING_TAB, GTMaterialFlags.NO_ORE_SMELTING);
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

    for (let [name, oreData] of Object.entries(BASE_ORES)) {
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

        // Similar to Angel's Refining, but with only one extra ore per tier.
        //
        // Crushed ore sorting: ore 1 + 2 + runoff
        // Impure ore (chunks): ore 1 + 2 + 3 + runoff
        // Refined ore (crystals): wip
        // Pure ore (... yeah): wip

        event.remove({ input: `gtceu:crushed_${name}_ore` });
        event.recipes.gtceu
            .ore_sorting(`nijika:base_ores/${name}/sorting_tier_1`)
            .itemInputs(
                `64x gtceu:crushed_${name}_ore`,
                `64x gtceu:crushed_${name}_ore`,
                `64x gtceu:crushed_${name}_ore`
            )
            .itemOutputs(
                getStackForTagPrefix(TagPrefix.rawOre, oreData.intoOres[0]).withCount(64),
                getStackForTagPrefix(TagPrefix.rawOre, oreData.intoOres[0]).withCount(32),
                getStackForTagPrefix(TagPrefix.rawOre, oreData.intoOres[1]).withCount(64)
            )
            .duration(50 * 20)
            .EUt(GTValues.VA[GTValues.HV])
            .circuit(1);

        // Washing of crushed ore with distilled water.
        event.remove({ input: `gtceu:impure_${name}_dust` });
        event.recipes.gtceu
            .bulk_washing(`nijika:base_ores/${name}/washing`)
            .itemInputs(`64x gtceu:crushed_${name}_ore`)
            .inputFluids(Fluid.of("gtceu:distilled_water").withAmount(9600 * FluidAmounts.MB))
            .itemOutputs(`64x gtceu:impure_${name}_dust`)
            .outputFluids(
                Fluid.of(`gtceu:${oreData.runoff}_wastewater`).withAmount(4800 * FluidAmounts.MB)
            )
            .EUt(GTValues.VHA[GTValues.MV])
            .duration(20 * 20);

        // tier 2 sorting
        if (oreData.intoOres.length > 2) {
            event.recipes.gtceu
                .ore_sorting(`nijika:base_ores/${name}/sorting_tier_2`)
                .itemInputs(
                    `64x gtceu:crushed_${name}_ore`,
                    `64x gtceu:crushed_${name}_ore`,
                    `64x gtceu:crushed_${name}_ore`
                )
                .itemOutputs(
                    getStackForTagPrefix(TagPrefix.rawOre, oreData.intoOres[0]).withCount(64),
                    getStackForTagPrefix(TagPrefix.rawOre, oreData.intoOres[0]).withCount(64),
                    getStackForTagPrefix(TagPrefix.rawOre, oreData.intoOres[1]).withCount(64),
                    getStackForTagPrefix(TagPrefix.rawOre, oreData.intoOres[1]).withCount(32),
                    getStackForTagPrefix(TagPrefix.rawOre, oreData.intoOres[2]).withCount(32)
                )
                .duration(75 * 20)
                .EUt(GTValues.VA[GTValues.EV])
                .circuit(1);
        }
    }
};
