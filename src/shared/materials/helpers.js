// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { nijikaId } from "../utils";

/**
 * Creates a new dust intermediate.
 */
export const createDustIntermediate = (event, id, colour, allowDecomposition) => {
    let builder = event.create(nijikaId(id)).dust().color(colour);

    if (typeof allowDecomposition !== "boolean" || !allowDecomposition) {
        builder = builder.flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
    }
    return builder;
};

/**
 * Creates a new aqueous intermediate.
 */
export const createAqueousIntermediate = (event, id, colour, allowDecomposition) => {
    let builder = event.create(nijikaId(id)).fluid().color(colour);

    if (typeof allowDecomposition !== "boolean" || !allowDecomposition) {
        builder = builder.flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
    }

    return builder;
};

/**
 * @callback fluidCallback
 * @param {GTFluidBuilder} builder
 * @returns {GTFluidBuilder}
 */

/**
 * Adds a new aqueous intermediate with a custom builder.
 *
 * @param {fluidCallback} callback
 */
export const addCustomAqueousIntermediate = (event, id, colour, callback, allowDecomposition) => {
    let fluid = callback(new GTFluidBuilder());
    let builder = event.create(nijikaId(id)).liquid(fluid).color(colour);

    if (typeof allowDecomposition !== "boolean" || !allowDecomposition) {
        builder = builder.flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
    }

    return builder;
};

/**
 * Creates a new acidic intermediate (an aqueous intermediate with the acidic flag).
 */
export const createAcidicIntermediate = (event, id, colour) => {
    return event
        .create(nijikaId(id))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .color(colour)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
};

/**
 * Creates a chemical (dust + aqueous) intermediate.
 */
export const createChemicalIntermediate = (event, id, colour, allowDecomposition) => {
    let builder = event.create(nijikaId(id)).dust().fluid().color(colour);

    if (typeof allowDecomposition !== "boolean" || !allowDecomposition) {
        builder = builder.flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
    }

    return builder;
};
