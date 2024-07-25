/* eslint-disable no-unexpected-multiline */
// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import {
    copyAmount,
    getMaterial,
    getOreProperty,
    getStackForTagPrefix,
    iterateOverAllMaterials,
    PropertyKey,
} from "../utils";
import { ORESTONE_DEFINITIONS } from "./orestones";

/** A mapping of {ball type: tick count divisor} for grinding recipes. */
const BALL_TYPES = {
    iron: 1,
    steel: 2,
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
                .ball_grinding(`nijika:grinding/${name}/${ballType}`)
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

        iterateOverAllMaterials((material) => {
            let oreProp = getOreProperty(material);
            if (oreProp === null) return;

            let modId = material.getModid();
            let matName = material.getName();

            let crushedStack = getStackForTagPrefix(
                TagPrefix.crushed,
                material,
                oreProp.getOreMultiplier()
            );

            let maceratorBuilder = event.recipes.gtceu
                .ball_grinding(`nijika:grinding/${modId}_${matName}/${ballType}`)
                .itemOutputs(
                    copyAmount(crushedStack, crushedStack.getCount() * 2),
                    getStackForTagPrefix(TagPrefix.round, ballMaterial, 6)
                )
                .EUt(GTValues.VA[GTValues.MV])
                .duration(10 * 20 * divisor)
                [
                    "inputItems(com.gregtechceu.gtceu.api.data.tag.TagPrefix,com.gregtechceu.gtceu.api.data.chemical.material.Material)"
                ](TagPrefix.rawOre, material)
                .itemInputs(`8x #forge:rounds/${ballType}`)
                .circuit(2);

            // ores with empty byproducts just get their dust as an extra byproduct.
            let byproductMat;
            if (oreProp.getOreByProducts().isEmpty()) {
                byproductMat = material;
            } else {
                byproductMat = oreProp.getOreByProducts()[0];
            }

            let byproduct;
            if (byproductMat.hasProperty(PropertyKey.GEM)) {
                byproduct = getStackForTagPrefix(TagPrefix.gem, byproductMat);
            } else {
                byproduct = getStackForTagPrefix(TagPrefix.dust, byproductMat);
            }
            maceratorBuilder.chancedOutput(byproduct, 2000, 0);

            // no stone dust outputs, fuck that noise.
        });
    }
};
