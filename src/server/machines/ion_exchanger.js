// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { GT_MACHINE_TIERS } from "../../shared/tier";
import { createAqueousIntermediate } from "../../shared/materials/helpers";
import { getStackForTagPrefix } from "../../shared/utils";

/**
 * Adds generic ion exchanger materials.
 */
export const addGenericIonExchangerMaterials = (event) => {
    createAqueousIntermediate(event, "solvent_extraction_helper", 0xd4d689);
};

/**
 * Adds recipes for the Ion Exchanger.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addIonExchangerRecipes = (event) => {
    event
        .shaped("gtceu:ion_exchanger", ["PRP", "FHF", "RCR"], {
            P: "gtceu:hv_electric_pump",
            R: getStackForTagPrefix(TagPrefix.rotor, GT_MACHINE_TIERS.HV.materials.rotor, 4),
            F: "gtceu:ptfe_pipe_casing",
            C: GT_MACHINE_TIERS.HV.circuitTag,
            H: GT_MACHINE_TIERS.HV.machineHull,
        })
        .id("nijika:machines/ion_exchanger");

    // Solvent extraction helper; a mixture of toluene and tributyl phosphate.
    event.recipes.gtceu
        .mixer("nijika:machines/ion_exchanger/solvent_helper")
        .inputFluids(
            Fluid.of("gtceu:toluene").withAmount(860 * FluidAmounts.MB),
            Fluid.of("gtceu:tributyl_phosphate").withAmount(140 * FluidAmounts.MB)
        )
        .outputFluids(
            Fluid.of("gtceu:solvent_extraction_helper").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(10 * 20);
};
