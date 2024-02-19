/**
 * Adjusts recipes for the Create mod.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustCreateRecipes = (event) => {
    event.remove({ output: "#create:crushed_raw_materials" });
    event.remove({ input: "#create:crushed_raw_materials" });

    // for some fucking reason the precision mechanism doesn't show up in game!
    // so, let's just recreate it!
    event.recipes.create
        .sequenced_assembly("1x create:precision_mechanism", "#forge:plates/gold", [
            event.recipes.create.deploying("1x create:incomplete_precision_mechanism", [
                "create:incomplete_precision_mechanism",
                "create:cogwheel",
            ]),
            event.recipes.create.deploying("1x create:incomplete_precision_mechanism", [
                "create:incomplete_precision_mechanism",
                "create:large_cogwheel",
            ]),
            event.recipes.create.deploying("1x create:incomplete_precision_mechanism", [
                "create:incomplete_precision_mechanism",
                "#forge:nuggets/iron",
            ]),
        ])
        .transitionalItem("create:incomplete_precision_mechanism")
        .loops(5)
        .id("create:sequenced_assembly/precision_mechanism");

    event.shaped(
        "2x create:mechanical_belt",
        ["RRR", "RRR"],
        {R: "#nijika:rubber_plates"}
    ).id("nijika:misc/red_belts");

    event.recipes.gtceu
        .macerator("nijika:misc/calcite_from_limestone")
        .itemInputs("1x create:limestone")
        .itemOutputs("1x gtceu:calcite_dust")
        .EUt(2)
        .duration(7 * 20 + 10);

    event.recipes.gtceu
        .macerator("nijika:misc/calcite_from_calcite")
        .itemInputs("1x minecraft:calcite")
        .itemOutputs("1x gtceu:calcite_dust")
        .EUt(2)
        .duration(7 * 20 + 10);

    event.recipes.gtceu
        .rock_breaker("nijika:misc/limestone_rock_breaker")
        .notConsumable("1x create:limestone")
        .itemOutputs("1x create:limestone")
        .duration(16)
        .EUt(GTValues.VA[GTValues.HV])
        ["addData(java.lang.String,java.lang.String)"]("fluidA", "minecraft:lava")
        ["addData(java.lang.String,java.lang.String)"]("fluidB", "minecraft:water");
};
