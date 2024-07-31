/* eslint-disable no-unexpected-multiline */
// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import {
    getMaterial,
    getOreProperty,
    getStackForTagPrefix,
    iterateOverAllMaterials,
    PropertyKey,
} from "../utils";
import { ORESTONE_DEFINITIONS } from "./orestones";

// TODO: Allow modifying byproduct rate based on ball type.
/** A mapping of {ball type: tick count divisor} for grinding recipes. */
const BALL_TYPES = {
    iron: 1,
    steel: 2,
};

/**
 * Gets the byproduct material for macerator recipes (i.e. the first byproduct).
 *
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material
 * @param {Internal.OreProperty} oreProp
 * @param {Internal.OreProperty} oreProp
 */
const getMaceratorByproduct = (material, oreProp, slot) => {
    let realSlot = typeof slot === "undefined" ? 0 : slot;

    let byproductMat;
    let byproducts = oreProp.getOreByProducts();
    if (byproducts.isEmpty() || byproducts.size() <= slot) {
        // ores with empty byproducts just get their dust as an extra byproduct.
        byproductMat = material;
    } else {
        byproductMat = oreProp.getOreByProducts()[realSlot];
    }

    let byproduct;
    if (byproductMat.hasProperty(PropertyKey.GEM)) {
        byproduct = getStackForTagPrefix(TagPrefix.gem, byproductMat);
    } else {
        byproduct = getStackForTagPrefix(TagPrefix.dust, byproductMat);
    }

    return byproduct;
};

/**
 * Adds a recipe for raw -> crushed ore.
 *
 * @param {Internal.RecipesEventJS} event
 * @param {string} ballType
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} ballMaterial
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material
 * @param {Internal.OreProperty} oreProp
 */
const addRawToCrushedRecipe = (event, ballType, ballMaterial, material, oreProp) => {
    let modId = material.getModid();
    let matName = material.getName();

    let crushedStack = getStackForTagPrefix(TagPrefix.crushed, material);
    let inputCount = Math.ceil(64 / oreProp.getOreMultiplier() / 2);
    let inputStack = getStackForTagPrefix(TagPrefix.rawOre, material, inputCount);

    event.recipes.gtceu
        .ball_grinding(`nijika:${modId}_${matName}/${ballType}/raw_to_crushed`)
        .itemInputs(inputStack, `8x #forge:rounds/${ballType}`)
        .itemOutputs(
            crushedStack.withCount(64),
            getMaceratorByproduct(material, oreProp).withCount(14), // 22.5% of 64, rounded down
            getStackForTagPrefix(TagPrefix.round, ballMaterial, 6)
        )
        .EUt(GTValues.VA[GTValues.MV])
        .duration(Math.ceil(((inputCount * 8) / BALL_TYPES[ballType]) * 20))
        .circuit(2);
};

/**
 * Adds a recipe for crushed -> impure ore.
 *
 * @param {Internal.RecipesEventJS} event
 * @param {string} ballType
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} ballMaterial
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material
 * @param {Internal.OreProperty} oreProp
 */
const addCrushedToImpure = (event, ballType, ballMaterial, material, oreProp) => {
    let modId = material.getModid();
    let matName = material.getName();

    let maceratorByproduct = getMaceratorByproduct(material, oreProp);

    event.recipes.gtceu
        .ball_grinding(`nijika:${modId}_${matName}/${ballType}/crushed_to_impure`)
        .itemInputs(
            getStackForTagPrefix(TagPrefix.crushed, material).withCount(64),
            getStackForTagPrefix(TagPrefix.round, ballMaterial).withCount(8)
        )
        .itemOutputs(
            getStackForTagPrefix(TagPrefix.dustImpure, material).withCount(64),
            maceratorByproduct.withCount(14), // 22.5% of 64, rounded down
            getStackForTagPrefix(TagPrefix.round, ballMaterial, 6)
        )
        .EUt(GTValues.VA[GTValues.MV])
        .duration(Math.ceil(((64 * 8) / BALL_TYPES[ballType]) * 20)) // TODO: cache
        .circuit(2);
};

/**
 * Adds a recipe for purified ore -> pure dust.
 *
 * @param {Internal.RecipesEventJS} event
 * @param {string} ballType
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} ballMaterial
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material
 * @param {Internal.OreProperty} oreProp
 */
const addPurifiedToPureDust = (event, ballType, ballMaterial, material, oreProp) => {
    // the byproduct in this case is byproduct number TWO!
    let modId = material.getModid();
    let matName = material.getName();

    let maceratorByproduct = getMaceratorByproduct(material, oreProp);

    event.recipes.gtceu
        .ball_grinding(`nijika:${modId}_${matName}/${ballType}/purified_to_purified`)
        .itemInputs(
            getStackForTagPrefix(TagPrefix.crushedPurified, material).withCount(64),
            getStackForTagPrefix(TagPrefix.round, ballMaterial).withCount(8)
        )
        .itemOutputs(
            getStackForTagPrefix(TagPrefix.dustPure, material).withCount(64),
            maceratorByproduct.withCount(14), // 22.5% of 64, rounded down
            getStackForTagPrefix(TagPrefix.round, ballMaterial, 6)
        )
        .EUt(GTValues.VA[GTValues.MV])
        .duration(Math.ceil(((64 * 8) / BALL_TYPES[ballType]) * 20)) // TODO: cache
        .circuit(2);
};

/**
 * Adds recipes for the ball bearing grinding machine.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addBallGrinderRecipes = (event) => {
    for (let [ballType, divisor] of Object.entries(BALL_TYPES)) {
        let ballMaterial = getMaterial(ballType);

        // grinding mill can also do orestones...
        for (let [name, definition] of Object.entries(ORESTONE_DEFINITIONS)) {
            let builder = event.recipes.gtceu
                .ball_grinding(`nijika:${name}/${ballType}`)
                .itemInputs(`64x create:${name}`, `8x #forge:rounds/${ballType}`)
                .itemOutputs(`44x gtceu:crushed_${definition.ore70Percent}_ore`)
                .EUt(GTValues.VA[GTValues.MV])
                .duration((100 * 20) / divisor); // 100 seconds by default, or 1.5s per block

            if (definition.ore40Percent !== null) {
                builder = builder.itemOutputs(`24x gtceu:crushed_${definition.ore40Percent}_ore`);
            }
            if (definition.nugget !== null) {
                builder = builder.itemOutputs(`18x ${definition.nugget}`);
            }
            builder.itemOutputs(getStackForTagPrefix(TagPrefix.round, ballMaterial, 6));
        }

        // There's two ways of doing this.
        // 1) Iterate over all of the macerator recipes with the recipe manager, test to see if
        //    they're an ore, and if so copy into our own recipe type.
        //
        //    This means that if macerator recipe logic is ever changed, our recipes will be updated
        //    appropriately.
        //
        // 2) Reimplement most or all of the macerator recipe generation ourselves.
        //
        // I initially tried variant 1, but with how weird the inner workings of the GT recipe
        // system are, it was too annoying, so here's variant 2.
        // See https://sourcegraph.com/github.com/GregTechCEu/GregTech-Modern@aad7de834bde62e0580f49601fb5245a228176d7/-/blob/src/main/java/com/gregtechceu/gtceu/data/recipe/generated/OreRecipeHandler.java?L113:39-113:56
        // for what was implemented.
        //
        // Also, wtf is their problem with using lambdas everywhere? Why are they calling into
        // TagPrefix just to give it as a receiver? Fucking mojang level shitcode.

        iterateOverAllMaterials((material) => {
            let oreProp = getOreProperty(material);
            if (oreProp === null) return;

            addRawToCrushedRecipe(event, ballType, ballMaterial, material, oreProp);

            // these have custom processing that we don't want to intrude on.
            if (material.hasFlag(GTMaterialFlags.NO_ORE_PROCESSING_TAB)) return;
            addCrushedToImpure(event, ballType, ballMaterial, material, oreProp);
            addPurifiedToPureDust(event, ballType, ballMaterial, material, oreProp);
        });
    }
};
