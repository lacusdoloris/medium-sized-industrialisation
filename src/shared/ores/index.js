// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { addBallGrinderRecipes, addWashingChannelRecipes } from "./bulk_processing";
import { addBaseOreMaterials, addBaseOreRecipes } from "./bocchi";
import { adjustOrestoneTransformationRecipes } from "./orestones";

// custom ores means the sorted ores,

/**
 * Adds all the custom ores.
 */
export const addCustomOreMaterials = (event) => {
    addBaseOreMaterials(event);
};

/**
 * Adds all of the processing recipes for custom ores.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addCustomOreProcessingRecipes = (event) => {
    adjustOrestoneTransformationRecipes(event);
    addBaseOreRecipes(event);
    addBallGrinderRecipes(event);
    addWashingChannelRecipes(event);
};
