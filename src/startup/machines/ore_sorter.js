// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * @param {Internal.GTRecipeType} type
 */
export const addOreSortingRecipeType = (type) => {
    type.setEUIO("in")
        .setMaxIOSize(4, 6, 0, 0)
        .setProgressBar(GuiTextures.PROGRESS_BAR_EXTRACT, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.CENTRIFUGE);
};

/**
 * @param {Internal.MultiblockMachineBuilder} builder
 */
export const addOreSortingMultiblock = (builder) => {
    /** @param {Internal.MultiblockMachineDefinition} definition */
    const patternCallback = (definition) => {
        return FactoryBlockPattern.start()
            .aisle(
                // Outer back wall: Casings and air gaps.
                "CCCxxxCCC",
                "CCCxxxCCC",
                "CCCxxxCCC",
                "CCCxxxCCC",
                "CCCxxxCCC"
            )
            .aisle(
                // Inner wall: Casing floor, frame middle
                "CCCxxxCCC",
                "CAFFFFFAC",
                "CAFFMFFAC",
                "CAFFFFFAC",
                "CFCxxxCFC"
            )
            .aisle(
                // Front wall: Casings and air gaps.
                "CCCxxxCCC",
                "CCCxxxCCC",
                "CCCxxxCCC",
                "CCCxxxCCC",
                "CCCxxxCCC"
            )
            .where("A", Predicates.air())
            .where("x", Predicates.any())
            .where(
                "C",
                Predicates.blocks(GTBlocks.CASING_TITANIUM_STABLE.get()).or(
                    Predicates.autoAbilities(definition.getRecipeTypes())
                )
            )
            .where("F", Predicates.frames(GTMaterials.Titanium))
            .where("M", Predicates.controller(Predicates.blocks(definition.get())))
            .build();
    };

    builder
        .pattern(patternCallback)
        .rotationState(RotationState.NON_Y_AXIS)
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_stable_titanium",
            "gtceu:block/machines/centrifuge"
        )
        .recipeTypes("ore_sorting")
        .tooltips(Component.translatable("gtceu.multiblock.parallelizable.tooltip"))
        .appearanceBlock(GTBlocks.CASING_TITANIUM_STABLE)
        .recipeModifiers([
            GTRecipeModifiers.PARALLEL_HATCH,
            GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.NON_PERFECT_OVERCLOCK),
        ]);
};
