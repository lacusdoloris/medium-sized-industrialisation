
/**
 * Reworks early-game glass processing a bit.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const redoGlassProcessing = (event) => {
    event.recipes.create.milling(
        "gtceu:quartz_sand_dust",
        "#forge:sand/colorless"
    ).id("nijika:glass/quartz_sand_dust");
    event.recipes.create.milling(
        "gtceu:flint_dust",
        "#forge:gems/flint"
    ).id("nijika:glass/flint_dust");

    // make molten glass with create for either making glass tubes or regular glass
    event.recipes.create.mixing(
        Fluid.of("gtceu:glass").withAmount(144 * FluidAmounts.MB),
        ["#forge:dusts/quartz_sand", "#forge:tiny_dusts/flint"]
    ).heated().id("nijika:glass/mix_molten_glass_from_raw_dusts");
    event.recipes.create.mixing(
        Fluid.of("gtceu:glass").withAmount(144 * FluidAmounts.MB),
        "#forge:dusts/glass"
    ).heated().id("nijika:glass/mix_molten_glass_from_glass_dust");

    // yeah... this doesn't really make sense.
    event.recipes.create.compacting(
        "minecraft:glass",
        Fluid.of("gtceu:glass").withAmount(144 * FluidAmounts.MB)
    ).id("nijika:glass/dont_think_about_it_too_hard");
};
