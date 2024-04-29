// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { GasTier, nijikaId } from "../../shared/utils";
import { createDustIntermediate } from "../../shared/materials/helpers";
import { addIntegrationMaterials } from "./integrations";
import { addChemicalMaterials } from "../../shared/chemicals";
import { addSlagProcessingMaterials } from "../../server/misc/slag_processing";
import { addGenericIonExchangerMaterials } from "../../server/machines/ion_exchanger";

/**
 * Adds new custom materials.
 */
export const addCustomMaterials = (event) => {
    addIntegrationMaterials(event);
    addChemicalMaterials(event);
    addSlagProcessingMaterials(event);
    addGenericIonExchangerMaterials(event);

    // misc stuff.
    event.create(nijikaId("blood")).liquid().color(0xff0000);
    event
        .create(nijikaId("fluorite"))
        .gem()
        .ore()
        .color(0x0c9949)
        .iconSet(GTMaterialIconSet.DIAMOND)
        .components("1x gtceu:calcium", "2x gtceu:fluorine");

    event
        .create(nijikaId("corinthian_bronze"))
        .color(0xa99023)
        .ingot()
        .dust()
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD)
        .iconSet(GTMaterialIconSet.SHINY)
        .rotorStats(13.0, 2.0, 196)
        .components("4x gtceu:copper", "1x gtceu:silver");

    // fine to create decompositions for this, actually.
    event
        .create(nijikaId("sodium_fluoride"))
        .dust()
        .color(0xfffdd6)
        .components("1x gtceu:sodium", "1x gtceu:fluorine");

    // == Niobium == //
    createDustIntermediate(event, "niobium_pentoxide", 0x260a0c).components(
        "2x gtceu:niobium",
        "5x gtceu:oxygen"
    );

    // == Tier Materials == //
    event
        .create(nijikaId("nitinol"))
        .color(0xa874e8)
        .ingot()
        .dust()
        .fluid()
        .iconSet(GTMaterialIconSet.SHINY)
        .components("1x gtceu:titanium", "1x gtceu:nickel")
        .blastTemp(3050, GasTier.MID, GTValues.VA[GTValues.EV])
        .fluidPipeProperties(2426, 150, true)
        .flags(
            GTMaterialFlags.GENERATE_FRAME,
            GTMaterialFlags.GENERATE_FOIL,
            GTMaterialFlags.GENERATE_PLATE,
            GTMaterialFlags.GENERATE_GEAR,
            GTMaterialFlags.DISABLE_DECOMPOSITION
        );

    event
        .create(nijikaId("az_91"))
        .ingot()
        .dust()
        .fluid()
        .blastTemp(3100, GasTier.MID, GTValues.VA[GTValues.EV])
        .iconSet(GTMaterialIconSet.SHINY)
        .components("1x gtceu:magnesium", "1x gtceu:aluminium") // dummy components to force alloy generation
        .flags(
            GTMaterialFlags.GENERATE_GEAR,
            GTMaterialFlags.GENERATE_FOIL,
            GTMaterialFlags.GENERATE_PLATE,
            GTMaterialFlags.GENERATE_ROTOR,
            GTMaterialFlags.GENERATE_FRAME,
            GTMaterialFlags.GENERATE_LONG_ROD,
            GTMaterialFlags.GENERATE_SMALL_GEAR,
            GTMaterialFlags.DISABLE_DECOMPOSITION,
            GTMaterialFlags.DISABLE_ALLOY_BLAST
        )
        .color(0x99bee8);
};
