import { getMaterial } from "../../shared/utils";

/** 
 * @param {Internal.GTRecipeType} type
 */
export const addButcheringRecipeType = (type) => {
    type
        .setEUIO("in")
        .setMaxIOSize(1, 4, 0, 1)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.BOILER);
}

/**
 * @param {Internal.MultiblockMachineBuilder} builder
 */
export const addButcheringMultiblock = (builder) => {
    /** @param {Internal.MultiblockMachineDefinition} definition */
    const patternCallback = (definition) => {
        return FactoryBlockPattern.start()
            .aisle("SSSSS", "SGGGS", "SGGGS", "SGGGS", "SSSSS")
            .aisle("SFFFS", "GFBFG", "GFBFG", "GFBFG", "SFFFS")
            .aisle("SFFFS", "GB#BG", "GB#BG", "GB#BG", "SFFFS")
            .aisle("SFFFS", "GFBFG", "GFBFG", "GFBFG", "SFFFS")
            .aisle("SSSSS", "SGGGS", "SG1GS", "SGGGS", "SSSSS")
            .where("1", Predicates.controller(Predicates.blocks(definition.get())))
            .where("S", Predicates.blocks("gtceu:solid_machine_casing").or(Predicates.autoAbilities(definition.getRecipeTypes())))
            .where("G", Predicates.blocks("minecraft:glass").or(Predicates.blocks("create:framed_glass")))
            .where("B", Predicates.blocks("minecraft:blackstone"))
            .where("#", Predicates.air())
            .where("F", Predicates.frames(getMaterial("steel")))
            .build();
    }

    builder
        .pattern(patternCallback)
        .rotationState(RotationState.NON_Y_AXIS)
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_solid_steel",
            "gtceu:block/machines/cutter"  // TODO: Custom texture?
        )
        .recipeType("butchering")
        .tooltips(Component.translatable("gtceu.multiblock.parallelizable.tooltip"))
        .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
        .recipeModifier(GTRecipeModifiers.PARALLEL_HATCH.apply(OverclockingLogic.PERFECT_OVERCLOCK, GTRecipeModifiers.ELECTRIC_OVERCLOCK))

}
