// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Checks if producing crushed ore should give byproducts.
 */
export const shouldCrushedOreGiveByproducts = (material, oreProp) => {
    if (material.hasFlag(GTMaterialFlags.NO_ORE_PROCESSING_TAB)) {
        if (oreProp.getOreByProducts().length <= 0) {
            // zero length means the only byproduct would be its own dust.
            return false;
        }
        if (oreProp.getOreByProducts()[0] == material) {
            // if our first byproduct (the macerator one) is ourselves, don't drop a byproduct.
            return false;
        }
    }

    return true;
};
