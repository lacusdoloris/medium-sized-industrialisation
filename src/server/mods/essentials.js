// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { GT_MACHINE_TIERS } from "../../shared/tier";

/** @param {Internal.RecipesEventJS} event */
export const adjustEssentialsRecipes = (event) => {
    event.remove({ id: "essentials:auto_crafter" });
    event
        .shaped("essentials:auto_crafter", ["PLP", "THT", "PCP"], {
            P: "#forge:plates/iron",
            T: "#forge:workbench",
            L: "#forge:gems/lapis",
            H: GT_MACHINE_TIERS.LV.machineHull,
            C: GT_MACHINE_TIERS.LV.circuitTag,
        })
        .id("nijika:mods/essentials/auto_crafter");

    event.replaceInput(
        { mod: "essentials" },
        "#forge:ingots/gold",
        "#forge:plates/corinthian_bronze"
    );
};
