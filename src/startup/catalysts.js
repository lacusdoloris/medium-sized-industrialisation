// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { nijikaId } from "../shared/utils";

/**
 * Adds the catalyst items to the game.
 *
 * @param {Registry.Item} event
 */
export const addCatalystItems = (event) => {
    event.create(nijikaId("empty_catalyst"));
    event.create(nijikaId("nickel_catalyst"));
    event.create(nijikaId("iodine_catalyst"));
    event.create(nijikaId("triethylaluminium_catalyst"));
    event.create(nijikaId("wilkinson_catalyst"));
};
