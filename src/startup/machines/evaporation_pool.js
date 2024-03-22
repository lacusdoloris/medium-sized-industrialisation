// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * @param {Internal.GTRecipeType} type
 */
export const addEvaporationRecipeType = (type) => {
    type.setEUIO("in")
        .setMaxIOSize(0, 2, 1, 1)
        .setProgressBar(GuiTextures.PROGRESS_BAR_BOILER_HEAT, FillDirection.DOWN_TO_UP)
        .setSound(GTSoundEntries.BOILER);
};

/**
 * @param {Internal.MultiblockMachineBuilder} builder
 */
export const addEvaporationPoolMultiblock = (builder) => {
    /** @param {Internal.MultiblockMachineDefinition} definition */
    const patternCallback = (definition) => {
        return FactoryBlockPattern.start()
            .aisle("B".repeat(11), "B".repeat(11))
            .aisleRepeatable(9, 9, "B".repeat(11), "B" + "X".repeat(9) + "B")
            .aisle("BBBBBCBBBBB", "B".repeat(11))
            .where("X", Predicates.blocks("minecraft:water"))
            .where(
                "B",
                Predicates.blocks("gtceu:steam_machine_casing").or(
                    Predicates.autoAbilities(definition.getRecipeTypes())
                )
            )
            .where("C", Predicates.controller(Predicates.blocks(definition.get())))
            .build();
    };

    builder
        .pattern(patternCallback)
        .rotationState(RotationState.NON_Y_AXIS)
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_bronze_plated_bricks",
            "gtceu:block/machines/ore_washer" // TODO: Custom texture?
        )
        .recipeType("evaporation_pool")
        .recipeModifier(
            GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK)
        );
};
