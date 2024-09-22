// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { getMaterial, getStackForTagPrefix, nijikaId } from "../utils";

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
        sortedFrom: ["asurine", "crimsite"],
    },

    nijikaite: {
        seed: 1929496478,
        colour: 0xf3e5a1,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["tetrahedrite", "molybdenite", "emerald"],
        runoff: "sulfuric",
        sortedFrom: ["crimsite", "ochrum"],
    },

    ryoite: {
        seed: 155659298,
        colour: 0x49679f,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["garnierite", "scheelite", "topaz"],
        runoff: "fluoric",
        sortedFrom: ["ochrum", "scorchia"],
    },

    kitakitaite: {
        seed: 649130079,
        colour: 0xd2625a,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["silver", "gold", "cobaltite"],
        runoff: "sulfuric",
        sortedFrom: ["scorchia", "scoria"],
    },

    kikurite: {
        seed: 1321746503,
        colour: 0x995678,
        iconSet: GTMaterialIconSet.DULL,
        intoOres: ["bauxite", "tantalite", "blue_topaz"],
        runoff: "fluoric",
        sortedFrom: ["scoria", "veridium"],
    },

    yoyokite: {
        seed: 1191360869,
        colour: 0x5a3c2d,
        iconSet: GTMaterialIconSet.DULL,
        intoOres: ["pyrolusite", "apatite", "monazite"],
        runoff: "sulfuric",
        sortedFrom: ["veridium", "asurine"],
    },
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
    for (let [name, oreData] of Object.entries(BASE_ORES)) {
        event.recipes.gtceu
            .ore_sorting(`nijika:base_ores/${name}/from_orestones`)
            .itemInputs(
                `64x create:${oreData.sortedFrom[0]}`,
                `64x create:${oreData.sortedFrom[1]}`
            )
            .itemOutputs(
                getStackForTagPrefix(TagPrefix.rawOre, getMaterial(name)).withCount(64),
                getStackForTagPrefix(TagPrefix.rawOre, getMaterial(name)).withCount(64)
            )
            .duration(30 * 20)
            .EUt(GTValues.VA[GTValues.HV])
            .circuit(1);

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
                    `64x gtceu:impure_${name}_dust`,
                    `64x gtceu:impure_${name}_dust`,
                    `64x gtceu:impure_${name}_dust`
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
