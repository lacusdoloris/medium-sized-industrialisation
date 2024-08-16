// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { getStackForTagPrefix } from "../../shared/utils";

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

    // CCA wires are kinda useful, so let's just add a recipee for some of them
    event.remove({ id: "createaddition:crafting/copper_spool"});

    event.recipes.gtceu
        .assembler("nijika:mods/cca/copper_spooled_wire")
        .itemInputs(getStackForTagPrefix(TagPrefix.wireGtSingle, "copper").withCount(4))
        .itemInputs("createaddition:spool")
        .itemOutputs("createaddition:copper_spool")
        .EUt(2)
        .duration(2 * 20);

    event.remove({ id: "createaddition:crafting/gold_spool"});

    event.recipes.gtceu
        .assembler("nijika:mods/cca/gold_spooled_wire")
        .itemInputs(getStackForTagPrefix(TagPrefix.wireGtSingle, "gold").withCount(4))
        .itemInputs("createaddition:spool")
        .itemOutputs("createaddition:gold_spool")
        .EUt(2)
        .duration(2 * 20);

    event.remove({ id: "createaddition:crafting/electrum_spool"});

    event.recipes.gtceu
        .assembler("nijika:mods/cca/electrum_spooled_wire")
        .itemInputs(getStackForTagPrefix(TagPrefix.wireGtSingle, "electrum").withCount(4))
        .itemInputs("createaddition:spool")
        .itemOutputs("createaddition:electrum_spool")
        .EUt(2)
        .duration(2 * 20);

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

    event.recipes.createaddition
        .liquid_burning(10 * 60 * 20, {
            fluidTag: "#forge:light_fuel",
            amount: 1 * FluidAmounts.BUCKET,
        })
        .id("nijika:mods/createaddition/light_fuel_blaze_burner");

    // doesn't really make sense for lathing... but who cares?!
    event.recipes.gtceu
        .lathe("nijika:mods/createaddition/straw_from_stick")
        .itemInputs("1x #forge:rods/wood")
        .itemOutputs("1x createaddition:straw")
        .circuit(1)
        .duration(10)
        .EUt(2);

    event.recipes.gtceu
        .lathe("nijika:mods/createaddition/straw_from_bamboo")
        .itemInputs("1x minecraft:bamboo")
        .itemOutputs("1x createaddition:straw")
        .circuit(1)
        .duration(10)
        .EUt(2);
};
