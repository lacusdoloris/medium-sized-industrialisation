// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

export const MODPACK_SETTINGS = {
    /**
     * If True, then most tier-related GT recipes will be removed and replaced with our own.
     *
     * Breaks the entire pack when set to false. This is entirely for seeing the original recipes
     * in game!
     */
    applyTierAdjustments: true,

    /**
     * If True, then hand-tool recipes will be removed.
     *
     * Disable to enable the "back path".
     */
    deleteToolRecipes: true,
};
