
/** 
 * Adjusts recipes for the Create: New Age mod.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const adjustCreateNewAgeRecipes = (event) => {
    // new age has some janky recipes, you can easily make a fluxated magnet and not
    // bother with the inbetweens.
    // for now, the only available magnets are the basic magnet (magnetic iron) and the fluxated
    // magnet (neodymium). 
    // TODO: look into gtnh recipes, possibly?

    event.remove({id: "create_new_age:shaped/redstone_magnet"})
    event.remove({id: "create_new_age:shaped/layered_magnet"});
    event.remove({id: "create_new_age:shaped/fluxuated_magnetite"});
    event.remove({id: "create_new_age:shaped/netherite_magnet"})

    event.shaped(
        "4x create_new_age:magnetite_block",
        ["FFF", "FIF", "FFF"],
        {F: "#forge:foils/magnetic_iron", I: "#forge:storage_blocks/iron"}
    ).id("nijika:mods/new_age/basic_magnet");

    event.shaped(
        "1x create_new_age:fluxuated_magnetite",
        ["FFF", "FMF", "FFF"],
        {F: "#forge:foils/magnetic_neodymium", M: "create_new_age:magnetite_block"}
    ).id("nijika:mods/new_age/fluxated_magnet");

    event.remove({id: "create_new_age:shaped/generator_coil"});
    event.shaped(
        "1x create_new_age:generator_coil",
        ["WWW", "WAW", "WWW"],
        {W: "#forge:fine_wires/copper", A: "#forge:storage_blocks/andesite_alloy"}
    ).id("nijika:mods/new_age/generator_coil");

    event.remove({id: "create_new_age:shaped/carbon_brushes"});
    event.shaped(
        "1x create_new_age:carbon_brushes",
        ["PSP", "CMC", "PSP"],
        {
            P: "#forge:plates/iron",
            S: "create:shaft",
            M: "gtceu:lv_electric_motor",
            C: "#nijika:carbon_rich_dusts"
        }
    ).id("nijika:mods/new_age/carbon_brushes");
}
