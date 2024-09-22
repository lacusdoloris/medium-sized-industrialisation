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

    // undo gtceu PR 1791
    // who asked for this? fucking kill yourself!
    event
        .shaped(`gtceu:${tier.name}_input_bus`, [" C ", " H "], {
            C: "#forge:chests/wooden",
            H: tier.machineHull,
        })
        .id(`nijika:auto/multiblock/${tier.name}/input_bus`);

    event
        .shaped(`gtceu:${tier.name}_output_bus`, [" H ", " C "], {
            C: "#forge:chests/wooden",
            H: tier.machineHull,
        })
        .id(`nijika:auto/multiblock/${tier.name}/output_bus`);

    event
        .shaped(`gtceu:${tier.name}_input_hatch`, [" C ", " H "], {
            C: "#forge:glass",
            H: tier.machineHull,
        })
        .id(`nijika:auto/multiblock/${tier.name}/input_hatch`);

    event
        .shaped(`gtceu:${tier.name}_output_hatch`, [" H ", " C "], {
            C: "#forge:glass",
            H: tier.machineHull,
        })
        .id(`nijika:auto/multiblock/${tier.name}/output_hatch`);
};
