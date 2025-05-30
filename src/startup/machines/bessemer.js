// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * @param {Internal.GTRecipeType} type
 */
export const addBessemerRecipeType = (type) => {
    type.setEUIO("in")
        .setMaxIOSize(6, 1, 1, 0)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.BOILER);
};

/**
 * @param {Internal.MultiblockMachineBuilder} builder
 */
export const addBessemerMultiblock = (builder) => {
    /** @param {Internal.MultiblockMachineDefinition} definition */
    const patternCallback = (definition) => {
        return FactoryBlockPattern.start()
            .aisle(
                // Outer back wall: two jutting out invar
                "#######",
                "#######",
                "IIIIIII",
                "IIIIIII",
                "#######",
                "#######"
            )
            .aisle(
                // Inner back wall: invar bottom, firebrick wall
                "#IIIII#",
                "#FFFFF#",
                "FFFFFFF",
                "FFFFFFF",
                "#FFFFF#",
                "#FFFFF#"
            )
            .aisle(
                // Middle gap: invar floor, firebricks wall, two layeers of limestone, firebricks
                "#IIIII#",
                "#FXXXF#",
                "FFXXXFF",
                "FFXXXFF",
                "#FXXXF#",
                "#FIIIF#"
            )
            .aisle("#IIIII#", "#FXXXF#", "FFXXXFF", "FFXXXFF", "#FXXXF#", "#FIMIF#")
            .aisle("#IIIII#", "#FXXXF#", "FFXXXFF", "FFXXXFF", "#FXXXF#", "#FIIIF#")
            .aisle("#IIIII#", "#FFFFF#", "FFFFFFF", "FFFFFFF", "#FFFFF#", "#FFFFF#")
            .aisle(
                // Outer front wall: two jutting out firebricks and controller.
                "#######",
                "#######",
                "IIICIII",
                "IIIIIII",
                "#######",
                "#######"
            )
            .where("#", Predicates.any())
            .where("X", Predicates.air())
            .where(
                "I",
                Predicates.blocks(GTBlocks.CASING_INVAR_HEATPROOF.get()).or(
                    Predicates.autoAbilities(definition.getRecipeTypes())
                )
            )
            .where("M", Predicates.abilities(PartAbility.MUFFLER))
            .where("F", Predicates.blocks("gtceu:firebricks"))
            .where("C", Predicates.controller(Predicates.blocks(definition.get())))
            .build();
    };

    builder
        .pattern(patternCallback)
        .rotationState(RotationState.NON_Y_AXIS)
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_heatproof",
            "gtceu:block/multiblock/primitive_blast_furnace"
        )
        .recipeType("bessemer_smelting")
        .appearanceBlock(GTBlocks.CASING_INVAR_HEATPROOF)
        // what could this mean?
        .recipeModifiers([
            GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.NON_PERFECT_OVERCLOCK),
        ]);
};
