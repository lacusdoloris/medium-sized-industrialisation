// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { Tier } from "../../shared/tier";
import { getStackForTagPrefix } from "../../shared/utils";

/**
 * Adjusts multiblock component recipes for a single tier.
 *
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
export const adjustMultiblockComponentsForTier = (event, tier) => {
    event.remove({ id: `gtceu:shaped/${tier.name}_muffler_hatch` });

    event
        .shaped(`gtceu:${tier.name}_muffler_hatch`, ["CM", "PR"], {
            C: tier.machineHull,
            M: `gtceu:${tier.name}_electric_motor`,
            P: getStackForTagPrefix(TagPrefix.pipeNormalFluid, tier.materials.pipe),
            R: getStackForTagPrefix(TagPrefix.rotor, tier.materials.rotor),
        })
        .id(`nijika:auto/multiblock/${tier.name}/muffler`);
};
