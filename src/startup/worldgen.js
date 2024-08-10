// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// why is this a startup event? it's a mystery/

/** @param {Internal.RemoveWorldgenEventJS} event */
export const adjustWorldgenRemovals = (event) => {
    // remove all non-GT ores
    // reasonably sure GTCEu itself takes care of deleting the vanilla ones

    if (Platform.isLoaded("create_new_age")) {
        event.removeFeatureById("underground_ores", [
            "create_new_age:magnetite",
            "create_new_age:ore_thorium",
        ]);
    }

    if (Platform.isLoaded("rftoolsbase")) {
        event.removeFeatureById("underground_ores", [
            "rftoolsbase:dimshard_dimensions",
            "rftoolsbase:dimshard_overworld",
        ]);
    }

    event.removeFeatureById("underground_ores", [
        "create:zinc_ore",
        "gtceu:red_granite_blob",
        "gtceu:marble_blob",
    ]);

    // remove the fucking oil spouts!
    event.removeFeatureById("fluid_springs", ["gtceu:raw_oil_sprout"]);
};
