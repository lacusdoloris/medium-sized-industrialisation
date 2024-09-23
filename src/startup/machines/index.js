// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { addBallGrinderMultiblock, addBallGrinderRecipeType } from "./ball_grinder";
import { addBessemerMultiblock, addBessemerRecipeType } from "./bessemer";
import { addButcheringMultiblock, addButcheringRecipeType } from "./butcher";
import { addEvaporationPoolMultiblock, addEvaporationRecipeType } from "./evaporation_pool";
import { addHaberBoschChamberMultiblock, addHaberBoschChamberRecipeType } from "./haber_bosch_chamber";
import { addIonExchangerMultiblock, addIonExchangerRecipeType } from "./ion_exchanger";
import { addOreSortingMultiblock, addOreSortingRecipeType } from "./ore_sorter";
import { addRockSynthesiserMultiblock, addRockSynthesisRecipeType } from "./rock_synthesiser";
import { addWashingChannelMultiblock, addWashingChannelRecipeType } from "./washing_channel";

// some notes
//
// 1) an "aisle" is more accurately "a wall". patterns go from the back wall, defined as a series
//    of *rows*, to the front wall.
// 2) ``MultiblockMachineBuilder``'s methods will return ``this`` for multiblock-specific methods,
//    but ``MachineBuilder<out MachineDefinition>`` for non-multiblock-specific methods.
//    this is fine, just do thee multiblock specific ones first.

/**
 * Adds all custom recipe types.
 *
 * @param {Internal.GTRegistryEventJS<string, Internal.GTRecipeType>} event
 */
export const addAllRecipeTypes = (event) => {
    addBessemerRecipeType(event.create("bessemer_smelting"));
    addEvaporationRecipeType(event.create("evaporation_pool"));
    addButcheringRecipeType(event.create("butchering"));
    addOreSortingRecipeType(event.create("ore_sorting"));
    addIonExchangerRecipeType(event.create("ion_exchange"));
    addRockSynthesisRecipeType(event.create("rock_synthesis"));
    addBallGrinderRecipeType(event.create("ball_grinding"));
    addWashingChannelRecipeType(event.create("bulk_washing"));
    addHaberBoschChamberRecipeType(event.create("haber_bosch_process"));
};

/**
 * Adds all machine types.
 *
 * @param {Internal.GTRegistryEventJS<string, Internal.MachineDefinition>} event
 */
export const addAllMachineTypes = (event) => {
    addBessemerMultiblock(event.create("nijika:bessemer_furnace", "multiblock"));
    addEvaporationPoolMultiblock(event.create("nijika:evaporation_pool", "multiblock"));
    addButcheringMultiblock(event.create("nijika:butcher", "multiblock"));
    addOreSortingMultiblock(event.create("nijjika:ore_sorter", "multiblock"));
    addIonExchangerMultiblock(event.create("nijika:ion_exchanger", "multiblock"));
    addRockSynthesiserMultiblock(event.create("nijika:rock_synthesiser", "multiblock"));
    addBallGrinderMultiblock(event.create("nijika:ball_grinder", "multiblock"));
    addWashingChannelMultiblock(event.create("nijika:washing_channel", "multiblock"));
    addHaberBoschChamberMultiblock(event.create("nijika:haber_bosch_chamber", "multiblock"));
};
