
// LV, that is.
/** @param {Internal.RecipesEventJS} event */
export const doTier01Content = (event) => {
    // im so sorry.
    event.recipes.create.sequenced_assembly(
        "1x gtceu:wrought_iron_small_gear",
        "1x gtceu:wrought_iron_plate",
        [
            event.recipes.create.deploying(
                "gtceu:wrought_iron_plate", ["gtceu:wrought_iron_plate", "#forge:rods/wrought_iron"]
            ),
            event.recipes.create.pressing(
                "gtceu:wrought_iron_plate", ["gtceu:wrought_iron_plate"]
            )
        ]
    ).transitionalItem("gtceu:wrought_iron_plate").loops(4).id("nijika:tier01/evil_gear_recipe");

}
