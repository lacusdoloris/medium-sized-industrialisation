// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { nijikaId } from "../shared/utils";

// This massively buffs all of the bedrock veins to have a higher base amount, as well as a much
// higher depleted amount.
//
// Because steel fluid miners deplete veins fully, and veins have a very low depletion amount, this
// makes it generally unviable to use fluid miners until EV with titanium drilling rigs which
// don't fully deplete veins and operate significantly faster.
//
// Dev note: Don't be afraid to fiddle with these numbers. FluidDrillLogic#getFluidToProduce
// does a max(depleted amount, stored vein yield), meaning that even if a vein baked into the world
// has a low yield, it'll still produce the depleted yield as long as its higher than the
// baked yield.

/**
 * Adjusts the fluid vein definitions built-in to GTCEu.
 *
 * @param {Internal.GTFluidVeinEventJS} event
 */
export const adjustFluidVeinDefinitions = (event) => {
    event.modify("gtceu:heavy_oil_deposit", (vein) => {
        // Old yield: Min 100, Max 200
        // New yield: Min 250, Max 500
        // Old depleted: 20
        // New depleted: 125
        vein.setMinimumYield(250);
        vein.setMaximumYield(500);
        vein.setDepletedYield(125);
    });

    event.modify("gtceu:light_oil_deposit", (vein) => {
        // Old yield: Min 175, Max 300
        // New yield: Min 450, Max 750
        // Old depleted: 25 (lol)
        // New depleted: 150
        vein.setMinimumYield(450);
        vein.setMaximumYield(875);
        vein.setDepletedYield(150);
    });

    event.modify("gtceu:natural_gas_deposit", (vein) => {
        // Old yield: Min 100, Max 175
        // New yield: Min 450, Max 850
        // Old depleted: 20 (yikes)
        // New depleted: 225
        vein.setMinimumYield(450);
        vein.setMaximumYield(850);
        vein.setDepletedYield(225);
    });

    event.modify("gtceu:oil_deposit", (vein) => {
        // Same as light oil.
        vein.setMinimumYield(450);
        vein.setMaximumYield(875);
        vein.setDepletedYield(150);
    });

    event.modify("gtceu:raw_oil_deposit", (vein) => {
        // Old yield: Min 200, Max 300
        // New yield: Min 500, Max 750
        // Old depleted: 25
        // New depleted: 200
        vein.setMinimumYield(500);
        vein.setMaximumYield(750);
        vein.setDepletedYield(200);
    });
};

/**
 * Adds custom fluid veins to the world.
 *
 * @param {Internal.GTFluidVeinEventJS} event
 */
export const addCustomFluidVeins = (event) => {
    event.add(nijikaId("nether_coal_gas"), (builder) => {
        // UNLIMITED GENOCIDE ON MOJANG CODE STYLE
        // THERE IS NO REASON FOR THIS EVER TO BE A SUPPLIER
        // FUCKING DIE!
        builder
            .fluid(() => GTMaterials.CoalGas.getFluid())
            .weight(40)
            .yield(350, 700)
            .depletedYield(150)
            .depletionAmount(1)
            .depletionChance(100)
            .dimensions("minecraft:the_nether");
    });
};
