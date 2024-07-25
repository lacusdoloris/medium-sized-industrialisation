// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// Cock and baww towtuwe fwom Wikipedia, the fwee encycwopedia at en.wikipedia.owg

/**
 * @param {Internal.GTRecipeType} type
 */
export const addBallGrinderRecipeType = (type) => {
    type.setEUIO("in")
        .setMaxIOSize(3, 4, 0, 0)
        .setProgressBar(GuiTextures.PROGRESS_BAR_MACERATE, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.MACERATOR);
};

/**
 * @param {Internal.MultiblockMachineBuilder} builder
 */
export const addBallGrinderMultiblock = (builder) => {
    const patternCallback = (definition) => {
        return FactoryBlockPattern.start()
            .aisle("#########", "#########", "##SSSSS##", "##SSSSS##", "##SSSSS##")
            .aisle("M#######M", "M#######M", "M#SSSSS#M", "MPPPPPPPM", "##SSSSS##")
            .aisle("#########", "#########", "##SSCSS##", "##SSSSS##", "##SSSSS##")
            .where("C", Predicates.controller(Predicates.blocks(definition.get())))
            .where("#", Predicates.any())
            .where("S", Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get()))
            .where("P", Predicates.blocks(GTBlocks.CASING_STEEL_PIPE.get()))
            .where(
                "M",
                Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get()).or(
                    Predicates.autoAbilities(definition.getRecipeTypes())
                )
            )
            .build();
    };

    builder
        .pattern(patternCallback)
        .rotationState(RotationState.NON_Y_AXIS)
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_solid_steel",
            "gtceu:block/machines/macerator"
        )
        .recipeType("ball_grinding")
        .appearanceBlock(GTBlocks.CASING_INVAR_HEATPROOF)
        .recipeModifiers([
            GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.NON_PERFECT_OVERCLOCK),
        ]);
};
