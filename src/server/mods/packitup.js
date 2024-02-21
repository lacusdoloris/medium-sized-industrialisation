/**
 * Adjusts Pack it Up recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustPackItUpRecipes = (event) => {
    event.remove({ id: "pack_it_up:lunchpack_bag" });
    event.remove({ id: "pack_it_up:lunchpack_packing" });

    event
        .shaped("pack_it_up:backpack_bag", ["KCK", "CHC", "KCK"], {
            K: "minecraft:dried_kelp",
            C: "pack_it_up:cloth",
            H: "minecraft:chest",
        })
        .id("pack_it_up:backpack_bag");

    event
        .shaped("pack_it_up:large_backpack_bag", ["PCP", "CBC", "PCP"], {
            P: "#nijika:copper_alloy_plates",
            C: "pack_it_up:cloth",
            B: "pack_it_up:backpack_bag",
        })
        .id("pack_it_up:large_backpack_bag");

    event
        .shaped("pack_it_up:orepack_bag", ["123", "4B5", "678"], {
            1: "#forge:raw_materials/gold",
            2: "#forge:raw_materials/cassiterite",
            3: "#forge:raw_materials/magnetite",
            4: "#forge:raw_materials/silver",
            5: "#forge:raw_materials/chalcopyrite",
            6: "#forge:raw_materials/bauxite",
            7: "#forge:raw_materials/garnierite",
            8: "#forge:raw_materials/galena",
            B: "pack_it_up:large_backpack_bag",
        })
        .id("pack_it_up:orepack_bag");
};
