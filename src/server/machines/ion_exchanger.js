// Copyright (c) 2024 Lura Skye
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { GT_MACHINE_TIERS } from "../../shared/definition"

/**
 * Adds recipes for the Ion Exchanger.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const addIonExchangerRecipes = (event) => {
    event.shaped(
        "gtceu:ion_exchanger",
        ["PRP", "FHF", "RCR"],
        {
            P: "gtceu:hv_electric_pump",
            R: GT_MACHINE_TIERS.HV.materials.rotor.tagged("rotors"),
            F: "gtceu:ptfe_pipe_casing",
            C: GT_MACHINE_TIERS.HV.circuitTag,
            H: GT_MACHINE_TIERS.HV.machineHull
        }
    ).id("nijika:machines/ion_exchanger");
}
