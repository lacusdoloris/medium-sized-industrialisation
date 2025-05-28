// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { addNickelCatalystMaterials, addNickelCatalystRecipes } from "./nickel";
import { addWilkinsonsCatalystMaterials, addWilkinsonsCatalystRecipes } from "./wilkinsons";

export const addCatalystMaterials = (event) => {
    addNickelCatalystMaterials(event);
    addWilkinsonsCatalystMaterials(event);
};

/**
 * Adds the recipes for catalyst items.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addCatalystRecipes = (event) => {
    addNickelCatalystRecipes(event);
    addWilkinsonsCatalystRecipes(event);

    event.recipes.gtceu
        .assembler("nijika:catalysts/empty")
        .itemInputs("1x gtceu:stainless_steel_frame")
        .itemOutputs("64x nijika:empty_catalyst")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(1 * 20)
        .circuit(9);
};
