// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * @param {Internal.GTRecipeType} type
 */
export const addHaberBoschChamberRecipeType = (type) => {
    type.setEUIO("in")
        .setMaxIOSize(1, 0, 2, 1)
        .setSlotOverlay(false, false, GuiTextures.DUST_OVERLAY)
        .setSlotOverlay(false, true, GuiTextures.MOLECULAR_OVERLAY_1)
        .setSlotOverlay(true, true, GuiTextures.MOLECULAR_OVERLAY_2)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW_MULTIPLE, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.CHEMICAL);
};

/**
 * @param {Internal.MultiblockMachineBuilder} builder
 */
export const addHaberBoschChamberMultiblock = (builder) => {
    /** @param {Internal.MultiblockMachineDefinition} definition */
    const patternCallback = (definition) => {
        return FactoryBlockPattern.start()
            .aisle("SSSSS", "SSSSS", "SSSSS", "SSSSS", "SSSSS")
            .aisle("SSSSS", "HIIIH", "HIIIH", "HIIIH", "SSSSS")
            .aisle("SSSSS", "HIIIH", "HXXXH", "HIIIH", "SSSSS")
            .aisle("SSSSS", "HIIIH", "HIIIH", "HIIIH", "SSSSS")
            .aisle("SECES", "SSSSS", "SSSSS", "SSSSS", "SSSSS")
            .where("C", Predicates.controller(Predicates.blocks(definition.get())))
            .where("S", Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get()))
            .where("I", Predicates.blocks("minecraft:iron_block"))
            .where("X", Predicates.air())
            .where(
                "H",
                Predicates.abilities(PartAbility.IMPORT_FLUIDS)
                    .setMinGlobalLimited(2)
                    .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setMinGlobalLimited(1))
                    .or(
                        Predicates.abilities(PartAbility.IMPORT_ITEMS)
                            .setMinGlobalLimited(1)
                            .setMaxGlobalLimited(1)
                    )
                    .or(Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get()))
            )
            .where(
                "E",
                Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get()).or(
                    Predicates.abilities(PartAbility.INPUT_ENERGY).setMinGlobalLimited(1)
                )
            )
            .build();
    };

    builder
        .pattern(patternCallback)
        .rotationState(RotationState.NON_Y_AXIS)
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_solid_steel",
            "gtceu:block/machines/chemical_reactor"
        )
        .recipeType("haber_bosch_process")
        .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
        .recipeModifiers([
            GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.NON_PERFECT_OVERCLOCK),
            GTRecipeModifiers.PARALLEL_HATCH,
        ]);
};
