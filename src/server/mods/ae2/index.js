// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { adjustAe2MaterialsRecipes } from "./materials";
import { adjustAe2CableRecipes } from "./cables";
import { adjustAe2CircuitRecipes } from "./circuits";
import { adjustMegaCellsRecipes } from "./mega";
import { adjustAe2StorageCellRecipes } from "./cells";
import { adjustAe2NetworkRecipes } from "./network";

/**
 * Begrudgingly adjusts recipes for AE2.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustAe2Recipes = (event) => {
    // clean up inscriber -> dust recipes
    event.remove({ type: "ae2:inscriber", output: "#forge:dusts" });

    event.remove({ id: "ae2:charger/meteorite_compass" });

    // clean up a lot of recipes to make it clearer how to actually get certus quartz.
    event.remove({ output: "#forge:gems/certus_quartz", type: "minecraft:smelting" });
    event.remove({ output: "#forge:gems/certus_quartz", type: "gtceu:macerator" });

    event
        .shaped("2x ae2:blank_pattern", ["QGQ", "GCG", "VVV"], {
            Q: "ae2:quartz_glass",
            G: "#forge:dusts/glowstone",
            V: "#forge:plates/polyvinyl_chloride",
            C: "#forge:gems/certus_quartz",
        })
        .id("ae2:network/crafting/patterns_blank");

    event
        .shaped("2x ae2:basic_card", ["SI ", "RCI", "SI "], {
            S: "#forge:plates/silver",
            I: "#forge:plates/iron",
            R: "gtceu:fine_copper_wire",
            C: "ae2:calculation_processor",
        })
        .id("ae2:materials/basiccard");

    event
        .shaped("2x ae2:advanced_card", ["DP ", "RCP", "DP "], {
            D: "#forge:gems/diamond",
            P: "#forge:plates/iron",
            R: "#forge:dusts/redstone",
            C: "ae2:basic_card",
        })
        .id("ae2:materials/advancedcard");

    adjustAe2MaterialsRecipes(event);
    adjustAe2CableRecipes(event);
    adjustAe2CircuitRecipes(event);
    adjustAe2StorageCellRecipes(event);
    adjustAe2NetworkRecipes(event);

    if (Platform.isLoaded("megacells")) {
        adjustMegaCellsRecipes(event);
    }
};
