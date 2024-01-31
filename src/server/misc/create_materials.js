/**
 * Adds rock processing recipes for various Create rocks.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const addCreateRockProcessingRecipes = (event) => {
    event.recipes.gtceu.macerator("nijika:misc/calcite_from_limestone")
        .itemInputs("1x create:limestone")
        .itemOutputs("1x gtceu:calcite_dust")
        .EUt(2)
        .duration((7 * 20) + 10);

    event.recipes.gtceu.rock_breaker("nijika:misc/limestone_rock_breaker")
        .notConsumable("1x create:limestone")
        .itemOutputs("1x create:limestone")
        .duration(16)
        .EUt(GTValues.VA[GTValues.HV])
        ["addData(java.lang.String,java.lang.String)"]("fluidA", "minecraft:lava")
        ["addData(java.lang.String,java.lang.String)"]("fluidB", "minecraft:water");
}
