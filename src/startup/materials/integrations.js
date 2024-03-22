// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { nijikaId } from "../../shared/utils";
import { createDustIntermediate } from "../../shared/materials/helpers";

export const addIntegrationMaterials = (event) => {
    createDustIntermediate(event, "beryllium_hydride", 0x2b4f61).components(
        "1x gtceu:beryllium",
        "2x gtceu:hydrogen"
    );

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
};
