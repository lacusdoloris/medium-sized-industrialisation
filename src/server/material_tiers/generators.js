// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { GT_MACHINE_TIERS, Tier } from "../../shared/tier";
import { getStackForTagPrefix } from "../../shared/utils";

/**
 * Adjusts the tier data for GregTech generators.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustGtGeneratorTiers = (event) => {
    for (let tierName of ["LV", "MV", "HV"]) {
        /** @type {Tier} */
        let tier = GT_MACHINE_TIERS[tierName];

        event.remove({ id: `gtceu:shaped/diesel_generator_${tier.name}` });
        event
            .shaped(`gtceu:${tier.name}_combustion`, ["PCP", "MHM", "GWG"], {
                P: `gtceu:${tier.name}_electric_piston`,
                C: tier.circuitTag,
                M: `gtceu:${tier.name}_electric_motor`,
                H: tier.machineHull,
                G: tier.gear,
                W: tier.singleCable,
            })
            .id(`nijika:auto/generators/${tier.name}_combustion`);

        event.remove({ id: `gtceu:shaped/steam_turbine_${tier.name}` });
        event
            .shaped(`gtceu:${tier.name}_steam_turbine`, ["PCP", "RHR", "MWM"], {
                P: getStackForTagPrefix(TagPrefix.pipeNormalFluid, tier.materials.pipe),
                C: tier.circuitTag,
                R: getStackForTagPrefix(TagPrefix.rotor, tier.materials.rotor),
                H: tier.machineHull,
                M: `gtceu:${tier.name}_electric_motor`,
                W: tier.singleCable,
            })
            .id(`nijika:auto/generators/${tier.name}_steam`);

        event.remove({ id: `gtceu:shaped/gas_turbine_${tier.name}` });
        event
            .shaped(`gtceu:${tier.name}_gas_turbine`, ["CRC", "RHR", "MWM"], {
                C: tier.circuitTag,
                R: getStackForTagPrefix(TagPrefix.rotor, tier.materials.rotor),
                H: tier.machineHull,
                M: `gtceu:${tier.name}_electric_motor`,
                W: tier.singleCable,
            })
            .id(`nijika:auto/generators/${tier.name}_gas`);
    }
};
