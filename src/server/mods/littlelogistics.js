/**
 * Adjusts all recipes for the Little Logistics mod.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustLittleLogisticsRecipes = (event) => {
    event.remove({ id: "littlelogistics:spring" });
    event.shaped("littlelogistics:spring", ["SIS" /*con*/], {
        S: "#forge:string",
        I: "#forge:small_springs/iron",
    });

    // == LL Misc == //
    event.remove({ id: "littlelogistics:fluid_hopper" });
    event
        .shapeless("littlelogistics:fluid_hopper", ["minecraft:hopper", "create:fluid_tank"])
        .id("nijika:railways/ll/fluid_hopper");

    // == Little Logistics Trains == //
    event.remove({ id: "littlelogistics:conductors_wrench" });
    event
        .shaped("1x littlelogistics:conductors_wrench", ["  C", " RD", "R  "], {
            C: "littlelogistics:spring",
            R: "#forge:rods/iron",
            D: "#forge:dyes/red",
        })
        .id("nijika:railways/ll/wrench");

    event.remove({ id: "littlelogistics:seater_car" });
    event
        .shaped("1x littlelogistics:seater_car", ["SSS", "P P"], {
            S: "#minecraft:wooden_slabs",
            P: "#forge:plates/iron",
        })
        .id("nijika:railways/ll/seater_car");

    // TODO: pipe tag
    event.remove({ id: "littlelogistics:steam_locomotive" });
    event
        .shaped("1x littlelogistics:steam_locomotive", [" P ", "GFG", "ICI"], {
            P: "gtceu:bronze_small_fluid_pipe",
            G: "gtceu:iron_gear",
            F: "minecraft:furnace",
            I: "#forge:plates/iron",
            C: "littlelogistics:seater_car",
        })
        .id("nijika:railways/ll/steam_train");

    event.remove({ id: "littlelogistics:fluid_car" });
    event
        .shapeless("1x littlelogistics:fluid_car", [
            "littlelogistics:seater_car",
            "create:fluid_tank",
        ])
        .id("nijika:railways/ll/fluid_car");

    // this just makes this one shapeless.
    event.remove({ id: "littlelogistics:chest_car" });
    event
        .shapeless("1x littlelogistics:chest_car", ["littlelogistics:seater_car", "#forge:chests"])
        .id("nijika:railways/ll/chest_car");

    // == Little Logistics Navy == //
    event.replaceInput(
        { id: "littlelogistics:tug_dock" },
        "#forge:ingots/iron",
        "#forge:plates/iron",
    );
    event.replaceInput(
        { id: "littlelogistics:barge_dock" },
        "#forge:ingots/iron",
        "#forge:plates/iron",
    );

    // actually the chest barge
    event.replaceInput(
        { id: "littlelogistics:barge" },
        "#forge:ingots/iron",
        "#nijika:valid_boat_bottoms",
    );
    event.replaceInput(
        { id: "littlelogistics:fishing_barge" },
        "#forge:ingots/iron",
        "#nijika:valid_boat_bottoms",
    );
    event.remove({ id: "littlelogistics:fluid_barge" });
    event
        .shaped("littlelogistics:fluid_barge", ["SFS", "BBB"], {
            S: "#forge:sticks/wood",
            F: "create:fluid_tank",
            B: "#nijika:valid_boat_bottoms",
        })
        .id("nijika:railways/ll/fluid_barge");

    event.remove({ id: "littlelogistics:seater_barge" });
    event
        .shaped("littlelogistics:seater_barge", ["RSR", "BBB"], {
            R: "#forge:sticks/wood",
            S: "#create:seats",
            B: "#nijika:valid_boat_bottoms",
        })
        .id("nijika:railways/ll/seater_barge");

    event.remove({ id: "littlelogistics:tug" });
    event
        .shaped("littlelogistics:tug", [" P ", "GFG", "BBB"], {
            P: "gtceu:bronze_small_fluid_pipe",
            G: "gtceu:iron_gear",
            F: "minecraft:furnace",
            B: "#nijika:valid_boat_bottoms",
        })
        .id("nijika:railways/ll/steam_tug");
};
