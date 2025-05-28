// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createBlockTag } from "../../shared/utils";

/**
 * @param {Internal.GTRecipeType} type
 */
export const addWashingChannelRecipeType = (type) => {
    type.setEUIO("in")
        .setMaxIOSize(1, 3, 1, 1)
        .setProgressBar(GuiTextures.PROGRESS_BAR_BATH, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.BATH);
};

/**
 * @param {Internal.MultiblockMachineBuilder} builder
 */
export const addWashingChannelMultiblock = (builder) => {
    /** @param {Internal.MultiblockMachineDefinition} definition */
    const patternCallback = (definition) => {
        return FactoryBlockPattern.start()
            .aisle("CCCCCCCCC", "CGGGGGGGC", "#########")
            .aisle("1CCCCCCC1", "BFWWWWWFB", "CCCCCCCCC")
            .aisle("AAAAHAAAA", "CGGGGGGGC", "#########")
            .where("C", Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get()))
            .where("G", Predicates.blockTag(createBlockTag("forge", "glass/colorless")))
            .where("W", Predicates.blocks("minecraft:water"))
            .where("H", Predicates.controller(Predicates.blocks(definition.get())))
            .where("F", Predicates.blocks(GTBlocks.FILTER_CASING.get()))
            .where(
                "B",
                Predicates.abilities(PartAbility.IMPORT_ITEMS)
                    .setExactLimit(1)
                    .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setExactLimit(1))
            )
            .where(
                "A",
                Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get())
                    .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setExactLimit(1))
                    .or(Predicates.abilities(PartAbility.INPUT_ENERGY))
            )
            .where(
                "1",
                Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get()).or(
                    Predicates.abilities(PartAbility.EXPORT_FLUIDS).setExactLimit(1)
                )
            )
            .where("#", Predicates.any())
            .build();
    };

    builder
        .pattern(patternCallback)
        .rotationState(RotationState.NON_Y_AXIS)
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_solid_steel",
            "gtceu:block/machines/ore_washer"
        )
        .recipeType("bulk_washing")
        .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
        .recipeModifiers([
            GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.NON_PERFECT_OVERCLOCK),
        ]);
};
