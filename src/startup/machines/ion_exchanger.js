// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * @param {Internal.GTRecipeType} type
 */
export const addIonExchangerRecipeType = (type) => {
    type.setEUIO("in")
        .setMaxIOSize(4, 4, 4, 4)
        .setProgressBar(GuiTextures.PROGRESS_BAR_MIXER, FillDirection.DOWN_TO_UP)
        .setSound(GTSoundEntries.CHEMICAL);
};

/**
 * @param {Internal.MultiblockMachineBuilder} builder
 */
export const addIonExchangerMultiblock = (builder) => {
    /** @param {Internal.MultiblockMachineDefinition} definition */
    const patternCallback = (definition) => {
        return FactoryBlockPattern.start()
            .aisle(
                // Back wall
                "#VVVVVVV#",
                "VGGGGGGGV",
                "IVVVVVVVO",
                "IV     VO",
                "IV     VO",
                "VV     VV"
            )
            .aisle(
                // Middle wall
                "VVVVVVVVV",
                "IPPPPPPPO",
                "IPVVVVVPO",
                "IPV###VPO",
                "IPV###VPO",
                "VVV###VVV"
            )
            .aisle(
                // Front wall
                "#VVVEVVV#",
                "VGGGCGGGV",
                "IVVVEVVVO",
                "IV     VO",
                "IV     VO",
                "VV     VV"
            )
            .where("#", Predicates.any())
            .where(
                "V",
                Predicates.blocks(GTBlocks.CASING_STAINLESS_CLEAN.get()).or(
                    Predicates.abilities(PartAbility.PARALLEL_HATCH)
                )
            )
            .where("G", Predicates.blocks(GTBlocks.CASING_TEMPERED_GLASS.get()))
            .where("P", Predicates.blocks(GTBlocks.CASING_POLYTETRAFLUOROETHYLENE_PIPE.get()))
            .where(
                "I",
                Predicates.blocks(GTBlocks.CASING_STAINLESS_CLEAN.get()).or(
                    Predicates.abilities(PartAbility.IMPORT_FLUIDS)
                        .setMinGlobalLimited(1, 6)
                        .or(Predicates.abilities(PartAbility.IMPORT_ITEMS))
                )
            )
            .where(
                "O",
                Predicates.blocks(GTBlocks.CASING_STAINLESS_CLEAN.get()).or(
                    Predicates.abilities(PartAbility.EXPORT_FLUIDS)
                        .setMinGlobalLimited(1, 6)
                        .or(Predicates.abilities(PartAbility.EXPORT_ITEMS))
                )
            )
            .where(
                "E",
                Predicates.abilities(PartAbility.INPUT_ENERGY)
                    .setMinGlobalLimited(1, 2)
                    .setMaxGlobalLimited(2)
                    .or(Predicates.blocks(GTBlocks.CASING_STAINLESS_CLEAN.get()))
            )
            .where("C", Predicates.controller(Predicates.blocks(definition.get())))
            .build();
    };

    builder
        .pattern(patternCallback)
        .rotationState(RotationState.NON_Y_AXIS)
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_clean_stainless_steel",
            "gtceu:block/machines/sifter"
        )
        .recipeTypes("ion_exchange")
        .tooltips(Component.translatable("gtceu.multiblock.parallelizable.tooltip"))
        .appearanceBlock(GTBlocks.CASING_STAINLESS_CLEAN)
        .recipeModifiers([
            GTRecipeModifiers.PARALLEL_HATCH,
            GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.NON_PERFECT_OVERCLOCK),
        ]);
};
