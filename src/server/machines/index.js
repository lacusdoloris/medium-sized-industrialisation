// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { addIonExchangerRecipes } from "./ion_exchanger";
import { addMobFarmRelatedRecipes } from "./mob_farming";

/**
 * Adds recipes for various multiblock machines.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addNonSpecificMachineRecipes = (event) => {
    addMobFarmRelatedRecipes(event);
    addIonExchangerRecipes(event);
};
