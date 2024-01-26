
/** 
 * @param {Internal.GTRecipeType} type
 */
export const addBessemerRecipeType = (type) => {
    type
        .setEUIO("in")
        .setMaxIOSize(2, 1, 1, 0)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.BOILER);
}

/**
 * @param {Internal.MultiblockMachineBuilder} builder
 */
export const addBessemerMultiblock = (builder) => {
    /** @param {Internal.MultiblockMachineDefinition} definition */
    const patternCallback = (definition) => {
        return FactoryBlockPattern.start()
            .aisle(
                // Outer back wall: two jutting out firebricks
                "#######", "#######", "FFFFFFF", "FFFFFFF", "#######", "#######",
            )
            .aisle(
                // Inner back wall: invar bottom, firebricks, full limestone, firebricks
                "#IIIII#", "#FFFFF#", "FLLLLLF", "FLLLLLF", "#FFFFF#", "#FFFFF#",
            )
            .aisle(
                // Middle gap: invar floor, firebricks wall, two layeers of limestone, firebricks
                "#IIIII#", "#FXXXF#", "FLXXXLF", "FLXXXLF", "#FXXXF#", "#FIIIF#",
            )
            .aisle(
                "#IIIII#", "#FXXXF#", "FLXXXLF", "FLXXXLF", "#FXXXF#", "#FIMIF#",
            )
            .aisle(
                "#IIIII#", "#FXXXF#", "FLXXXLF", "FLXXXLF", "#FXXXF#", "#FIIIF#",
            )
            .aisle(
                // Inner front wall: invar bottom, firebricks, full limestone, firebricks
                "#IIIII#", "#FFFFF#", "FLLLLLF", "FLLLLLF", "#FFFFF#", "#FFFFF#",
            )
            .aisle(
                // Outer front wall: two jutting out firebricks and controller.
                "#######", "#######", "FFFCFFF", "FFFFFFF", "#######", "#######",
            )
            .where("#", Predicates.any())
            .where("X", Predicates.air())
            .where("I", 
                Predicates.blocks(GTBlocks.CASING_INVAR_HEATPROOF.get())
                    .or(Predicates.autoAbilities(definition.getRecipeTypes()))
            )
            .where("M", Predicates.abilities(PartAbility.MUFFLER))
            .where("F", Predicates.blocks("gtceu:firebricks"))
            .where("L", Predicates.blocks("create:cut_limestone"))
            .where("C", Predicates.controller(Predicates.blocks(definition.get())))
            .build()

    }

    builder
        .pattern(patternCallback)
        .rotationState(RotationState.NON_Y_AXIS)
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_heatproof",
            "gtceu:block/multiblock/primitive_blast_furnace"
        )
        .recipeType("bessemer_smelting")
        .appearanceBlock(GTBlocks.CASING_PRIMITIVE_BRICKS)
        // what could this mean?
        .recipeModifier(GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.NON_PERFECT_OVERCLOCK));
 
}
