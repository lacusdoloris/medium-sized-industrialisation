// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { getMaterial } from "../utils";

/**
 * Fixes up some of the ore veins for the vanilla dimensions.
 *
 * @param {Internal.GTOreVeinEventJS} event
 */
export const fixupBuiltinOreVeins = (event) => {
    event.removeAll((a, b) => true);
    return;
};

/**
 * Adds new GT ore veins.
 *
 * @param {Internal.GTOreVeinEventJS} event
 */
export const addFreshOreVeinsEvent = (_event) => {};
