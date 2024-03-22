// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// TODO: Fix vanilla ore veins for vanilla world type.
/**
 * Removes the ore veins for the vanilla dimensions.
 *
 * @param {Internal.GTOreVeinEventJS} event
 */
export const removeVanillaDimensionOreVeins = (event) => {
    // le sigh.
    // can't use event.removeAll (for whatever fucking reason) and im not figuring out why
    // rhino is shitting itself.
    // so just directly iterate over the registry instead. lol!

    let toRemove = [];
    GTRegistries.ORE_VEINS.entries().forEach((it) => {
        for (let dimension of it.value.dimensionFilter()) {
            if (dimension.namespace == "minecraft") {
                toRemove.push(it.key);
            }
        }
    });

    toRemove.forEach((key) => event.remove(key));
};

/**
 * Adds Create: Ore Excavation ore veins.
 *
 * @param {Internal.GTOreVeinEventJS} _event
 */
export const addFreshOreVeinsEvent = (_event) => {};
