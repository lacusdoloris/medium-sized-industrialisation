// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { GasTier, nijikaId } from "../../shared/utils";
import { createDustIntermediate } from "../../shared/materials/helpers";

export const addIntegrationMaterials = (event) => {
    createDustIntermediate(event, "beryllium_hydride", 0x2b4f61).components(
        "1x gtceu:beryllium",
        "2x gtceu:hydrogen"
    );

    // not used; almostunified overwrites this with the AE2 variant.
    createDustIntermediate(event, "sky_stone", 0x000000);

    // no disable decomposition flag here, as this is how it's actually processed in the real
    // worldd.
    event
        .create(nijikaId("beryllium_chloride"))
        .dust()
        .color(0x3b3f51)
        .components("1x gtceu:beryllium", "2x gtceu:chlorine");

    event
        .create(new ResourceLocation("nijika:dimensional_shard"))
        .dust()
        .color(0x61b2b0)
        .secondaryColor(0xbfeded);

    // let almostunified deal with this.
    event
        .create(nijikaId("sky_steel"))
        .color(0x0c0c0c)
        .ingot()
        .dust()
        .fluid()
        .iconSet(GTMaterialIconSet.SHINY)
        .components("1x gtceu:certus_quartz", "1x gtceu:stainless_steel", "1x gtceu:sky_stone")
        .blastTemp(2700, GasTier.MID, GTValues.VA[GTValues.HV])
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.DISABLE_DECOMPOSITION);
};
