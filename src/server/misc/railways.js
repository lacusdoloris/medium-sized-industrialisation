
// TODO: Consider using GT springs for chains?

/** 
 * Rewrites railway (little logistics, create trains, etc) recipes and minecart recipes.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const rewriteRailwayRecipes = (event) => {
    // == Rails == //
    // Uses treated wood and rods.
    event.remove({id: "gtceu:shaped/treated_wood_planks"});
    event.recipes.create.filling(
        "1x gtceu:treated_wood",
        [
            "1x #minecraft:planks",
            Fluid.of("gtceu:creosote").withAmount(100 * FluidAmounts.MB)
        ]
    ).id("nijika:railways/treated_wood");

    event.remove({id: "minecraft:rail"});
    event.shaped(
        "16x minecraft:rail",
        ["STS", "STS", "STS"],
        {S: "#forge:rods/iron", T: "#forge:rods/treated_wood"}
    ).id("nijika:railways/minecart_rail");

    event.remove({id: "minecraft:powered_rail"});
    event.shaped(
        "6x minecraft:powered_rail",
        ["STS", "GRG", "STS"],
        {
            S: "#forge:rods/iron", 
            T: "#forge:rods/treated_wood", 
            G: "#forge:rods/gold", 
            R: "#forge:dusts/redstone"
        }
    ).id("nijika:railways/powered_rail");

    // Both of these use regular powered rails and are shapeless recipes instead.
    event.remove({id: "minecraft:detector_rail"});
    event.shapeless(
        "1x minecraft:detector_rail",
        ["1x minecraft:powered_rail", "#forge:dusts/redstone"]
    ).id("nijika:railways/detector_rail");
    
    event.remove({id: "minecraft:activator_rail"})
    event.shapeless(
        "1x minecraft:activator_rail",
        ["1x minecraft:powered_rail", "minecraft:redstone_torch"]
    ).id("nijika:railways/activator_rail");

    // == LL Misc == //
    event.remove({id: "littlelogistics:fluid_hopper"});
    event.shapeless(
        "littlelogistics:fluid_hopper",
        ["minecraft:hopper", "create:fluid_tank"]
    ).id("nijika:railways/ll/fluid_hopper");
    
    // == Little Logistics Trains == //
    event.remove({id: "littlelogistics:conductors_wrench"});
    event.shaped(
        "1x littlelogistics:conductors_wrench",
        ["  C", " RD", "R  "],
        {C: "littlelogistics:spring", R: "#forge:rods/iron", D: "#forge:dyes/red"}
    ).id("nijika:railways/ll/wrench");

    event.remove({id: "littlelogistics:seater_car"});
    event.shaped(
        "1x littlelogistics:seater_car",
        ["SSS", "P P"],
        {S: "#minecraft:wooden_slabs", P: "#forge:plates/iron"}
    ).id("nijika:railways/ll/seater_car");

    // TODO: pipe tag
    event.remove({id: "littlelogistics:steam_locomotive"});
    event.shaped(
        "1x littlelogistics:steam_locomotive",
        [" P ", "GFG", "ICI"],
        {
            P: "create:fluid_pipe", 
            G: "create:cogwheel",
            F: "minecraft:furnace",
            I: "#forge:plates/iron",
            C: "littlelogistics:seater_car"
        }
    ).id("nijika:railways/ll/steam_train");

    event.remove({id: "littlelogistics:fluid_car"});
    event.shapeless(
        "1x littlelogistics:fluid_car",
        ["littlelogistics:seater_car", "create:fluid_tank"]
    ).id("nijika:railways/ll/fluid_car");

    // this just makes this one shapeless.
    event.remove({id: "littlelogistics:chest_car"});
    event.shapeless(
        "1x littlelogistics:chest_car",
        ["littlelogistics:seater_car", "#forge:chests"]
    ).id("nijika:railways/ll/chest_car");

    // == Little Logistics Navy == //
    event.replaceInput({id: "littlelogistics:tug_dock"}, "#forge:ingots/iron", "#forge:plates/iron");
    event.replaceInput({id: "littlelogistics:barge_dock"}, "#forge:ingots/iron", "#forge:plates/iron");

    // actually the chest barge
    event.replaceInput({id: "littlelogistics:barge"}, "#forge:ingots/iron", "#nijika:valid_boat_bottoms");
    event.replaceInput({id: "littlelogistics:fishing_barge"}, "#forge:ingots/iron", "#nijika:valid_boat_bottoms");
    event.remove({id: "littlelogistics:fluid_barge"});
    event.shaped(
        "littlelogistics:fluid_barge",
        ["SFS", "BBB"],
        {
            S: "#forge:sticks/wood",
            F: "create:fluid_tank",
            B: "#nijika:valid_boat_bottoms"
        }
    ).id("nijika:railways/ll/fluid_barge");

    event.remove({id: "littlelogistics:seater_barge"});
    event.shaped(
        "littlelogistics:seater_barge",
        ["RSR", "BBB"],
        {
            R: "#forge:sticks/wood",
            S: "#create:seats",
            B: "#nijika:valid_boat_bottoms"
        }
    ).id("nijika:railways/ll/seater_barge");

    event.remove({id: "littlelogistics:tug"});
    event.shaped(
        "littlelogistics:tug",
        [" P ", "GFG", "BBB"],
        {
            P: "create:fluid_pipe", 
            G: "create:cogwheel",
            F: "minecraft:furnace",
            B: "#nijika:valid_boat_bottoms"
        }
    ).id("nijika:railways/ll/steam_tug");
    
}
