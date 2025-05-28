// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// don't want to make it obviously superior to the bending machine, so this only supports a
// short list.
/**
 * A list of specific plates that should get a pressing recipe.
 */
const SPECIFIC_PLATES = [
    "magnetic_iron",
    "rubber",
    "wrought_iron",
    "bronze",
    "silver",
    "tin",
    "corinthian_bronze",
];

/**
 * Adds pressing recipes for the plates that are otherwise missing it.
 *
 * @param {Internal.RecipesEventJS} event
 */
const addPressingRecipes = (event) => {
    for (let plate of SPECIFIC_PLATES) {
        event.recipes.create
            .pressing(`1x gtceu:${plate}_plate`, `1x #forge:ingots/${plate}`)
            .id(`nijika:common/pressing/${plate}`);
    }
};

/**
 * Adds early-game Create recipes.
 */
export const addCreateRecipes = (event) => {
    addPressingRecipes(event);
};
