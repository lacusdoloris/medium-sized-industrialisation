// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createBlockTag } from "../../shared/utils";

/**
 * @param {Internal.GTRecipeType} type
 */
export const addRockSynthesisRecipeType = (type) => {
    type.setEUIO("in")
        .setMaxIOSize(1, 5, 1, 0)
        .setProgressBar(GuiTextures.PROGRESS_BAR_CRYSTALLIZATION, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.BOILER);
};

/**
 * @param {Internal.MultiblockMachineBuilder} builder
 */
export const addRockSynthesiserMultiblock = (builder) => {
    /** @param {Internal.MultiblockMachineDefinition} definition */
    const patternCallback = (definition) => {
        return FactoryBlockPattern.start()
            .aisle("BBBBB", "A###A", "A###A", "#####", "#####")
            .aisle("BBBBB", "#AAA#", "#####", "#####", "#####")
            .aisle("BBVBB", "#ABA#", "##B##", "##B##", "##B##")
            .aisle("BBBBB", "#ACA#", "##C##", "#####", "#####")
            .aisle("BBBBB", "A###A", "A###A", "#####", "#####")
            .where("B", Predicates.blocks("gtceu:heatproof_machine_casing"))
            .where("V", Predicates.blockTag(createBlockTag("nijika", "vent_blocks")))
            .where(
                "A",
                Predicates.blocks("gtceu:heatproof_machine_casing").or(
                    Predicates.autoAbilities(definition.getRecipeTypes())
                )
            )
            .where("C", Predicates.controller(Predicates.blocks(definition.get())))
            .where("#", Predicates.any())
            .build();
    };

    builder
        .pattern(patternCallback)
        .rotationState(RotationState.NON_Y_AXIS)
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_heatproof",
            "gtceu:block/machines/rock_crusher"
        )
        .recipeType("rock_synthesis")
        .tooltips(Component.translatable("nijika.tooltip.no_overclock"))
        .appearanceBlock(GTBlocks.CASING_INVAR_HEATPROOF);
};
