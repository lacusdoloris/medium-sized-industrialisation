// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Adjusts the recipes for AE2 storage cells.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustAe2StorageCellRecipes = (event) => {
    // remove regular shaped assembly recipes for storage cells
    event.remove({
        type: "minecraft:crafting_shaped",
        id: /^ae2:network\/cells\/(?:item|fluid)_storage_cell_[0-9]+k$/,
    });
    event.remove({ id: "ae2:network/cells/view_cell" });

    // require polyethylene for item storage cells
    event
        .shaped("ae2:item_cell_housing", ["FRF", "R R", "PPP"], {
            F: "ae2:quartz_glass",
            R: "#forge:dusts/redstone",
            P: "#forge:plates/polyethylene",
        })
        .id("ae2:network/cells/item_cell_housing");

    // additional recipe in the assembler using liquid LE
    event.recipes.gtceu
        .assembler("nijika:mods/ae2/item_cell_housing_assembler")
        .itemInputs("2x ae2:quartz_glass", "3x #forge:dusts/redstone")
        .inputFluids(Fluid.of("gtceu:polyethylene").withAmount(144 * 3 * FluidAmounts.MB))
        .itemOutputs("ae2:item_cell_housing")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(5 * 20);

    // Similar to how fluid tanks are made, these are just coated in creosote.
    event.remove({ id: "ae2:network/cells/fluid_cell_housing" });
    event.recipes.gtceu
        .assembler("nijika:mods/ae2/fluid_cell_housing")
        .itemInputs("1x ae2:item_cell_housing")
        .inputFluids(Fluid.of("gtceu:creosote").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("1x ae2:fluid_cell_housing")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(5 * 20);
};
