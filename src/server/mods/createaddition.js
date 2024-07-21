// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// Char's: Counter & Attack
/** @param {Internal.RecipesEventJS} event */
export const adjustCCARecipes = (event) => {
    event.recipes.create
        .compacting(Fluid.of("gtceu:seed_oil").withAmount(10 * FluidAmounts.MB), "#forge:seeds")
        .id("createaddition:compacting/seed_oil");

    event.recipes.gtceu
        .brewery("nijika:mods/cca/biomass_from_biomass")
        .itemInputs("1x createaddition:biomass")
        .inputFluids(Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:biomass").withAmount(1 * FluidAmounts.BUCKET))
        .duration(5 * 20)
        .EUt(2);

    // remove some of the stupidly easy recipes for biomass
    event.remove({ id: "createaddition:mixing/biomass_from_flowers" });
    event.remove({ id: "createaddition:mixing/biomass_from_plants" });
    event.remove({ id: "createaddition:mixing/biomass_from_leaves" });
    event.remove({ id: "createaddition:mixing/biomass_from_sticks" });

    // require many more crops to be input
    // fucking kubejs. let me use fluid tags

    let cropIngredients = Array(8).fill({ tag: "forge:crops" });
    cropIngredients.push({ fluidTag: "forge:plantoil", amount: 100 });

    event
        .custom({
            type: "create:mixing",
            ingredients: cropIngredients,
            results: [
                {
                    item: "createaddition:biomass",
                    count: 1,
                },
            ],
            heatRequirement: "heated",
        })
        .id("createaddition:mixing/biomass_from_crops");

    // same with saplings
    let saplingIngredients = Array(16).fill({ tag: "minecraft:saplings" });
    saplingIngredients.push({ fluidTag: "forge:plantoil", amount: 100 });
    event
        .custom({
            type: "create:mixing",
            ingredients: saplingIngredients,
            results: [
                {
                    item: "createaddition:biomass",
                    count: 1,
                },
            ],
            heatRequirement: "heated",
        })
        .id("createaddition:mixing/biomass_from_saplings");

    // ... and with plant foods
    let plantFoods = Array(8).fill({ tag: "createaddition:plant_foods" });
    plantFoods.push({ fluidTag: "forge:plantoil", amount: 100 });
    event
        .custom({
            type: "create:mixing",
            ingredients: plantFoods,
            results: [
                {
                    item: "createaddition:biomass",
                    count: 1,
                },
            ],
            heatRequirement: "heated",
        })
        .id("createaddition:mixing/biomass_from_plant_foods");
};
