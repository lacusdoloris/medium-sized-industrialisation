
// LV, that is.
/** @param {Internal.RecipesEventJS} event */
export const doTier01Content = (event) => {
    // im so sorry.
    event.recipes.create.sequenced_assembly(
        "1x gtceu:iron_small_gear",
        "1x gtceu:iron_plate",
        [
            event.recipes.create.deploying(
                "gtceu:iron_plate", ["gtceu:iron_plate", "#forge:rods/iron"]
            ),
            event.recipes.create.pressing(
                "gtceu:iron_plate", ["gtceu:iron_plate"]
            )
        ]
    ).transitionalItem("gtceu:iron_plate").loops(4).id("nijika:tier01/evil_gear_recipe");

}
