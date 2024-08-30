// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { getMaterial, getStackForTagPrefix, nijikaId } from "../utils";

// todo: insert vanadite

export const BASE_ORES = {
    bocchinium: {
        colour: 0xf7a0b5,
        iconSet: GTMaterialIconSet.BRIGHT,
        seed: 809651466,
        intoOres: ["ilmenite", "monazite", "realgar"],
        gem: "amethyst",
    },

    nijikaite: {
        seed: 1929496478,
        colour: 0xf3e5a1,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["beryllium", "scheelite", "fluorite"],
        gem: "emerald",
    },

    ryoite: {
        seed: 155659298,
        colour: 0x49679f,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["pyrolusite", "gold", "hematite"],
        gem: "sapphire",
    },

    kitakitaite: {
        seed: 649130079,
        colour: 0xd2625a,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["pentlandite", "tantalite", "asbestos"],
        gem: "ruby",
    },

    kikurite: {
        seed: 1321746503,
        colour: 0x995678,
        iconSet: GTMaterialIconSet.DULL,
        intoOres: ["molybdenite", "tricalcium_phosphate", "stibnite"],
        gem: "opal",
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

        // Similar to Angel's Refining.
        //
        // Crushed ore sorting: ore 1 + 2 + slag
        // Impure ore (chunks): ore 1 + 2 + 3 + slag
        // Refined ore (crystals): ore 1 + 2 + 3 + 4 + slag
        // Pure ore (... yeah): all 7 ores, no slag

        event.remove({ input: `gtceu:crushed_${name}_ore` });
        event.recipes.gtceu
            .ore_sorting(`nijika:base_ores/${name}/sorting_tier_1`)
            .itemInputs(`32x gtceu:crushed_${name}_ore`)
            .itemOutputs(
                getStackForTagPrefix(TagPrefix.rawOre, oreData.intoOres[0]).withCount(16),
                getStackForTagPrefix(TagPrefix.rawOre, oreData.intoOres[1]).withCount(8)
            )
            .duration(5 * 20)
            .EUt(GTValues.VA[GTValues.HV])
            .circuit(1);

        // Washing of crushed ore with distilled water.
        // TODO: Wastewaterr.
        event.remove({ input: `gtceu:impure_${name}_dust` });
        event.recipes.gtceu
            .bulk_washing(`nijika:base_ores/${name}/washing`)
            .itemInputs(`64x gtceu:crushed_${name}_ore`)
            .inputFluids(Fluid.of("gtceu:distilled_water").withAmount(9600 * FluidAmounts.MB))
            .itemOutputs(`64x gtceu:impure_${name}_dust`)
            .itemOutputsRanged(
                getStackForTagPrefix(TagPrefix.rawOre, getMaterial(oreData.gem)),
                15,
                35
            )
            .EUt(GTValues.VHA[GTValues.MV])
            .duration(20 * 20);

        event.recipes.gtceu
            .ore_sorting(`nijika:base_ores/${name}/sorting_tier_2`)
            .itemInputs(`32x gtceu:impure_${name}_dust`)
            .itemOutputs(
                getStackForTagPrefix(TagPrefix.rawOre, oreData.intoOres[0]).withCount(16),
                getStackForTagPrefix(TagPrefix.rawOre, oreData.intoOres[1]).withCount(16),
                getStackForTagPrefix(TagPrefix.rawOre, oreData.intoOres[2]).withCount(8)
            )
            .duration(5 * 20)
            .EUt(GTValues.VA[GTValues.EV])
            .circuit(2);
    }
};
