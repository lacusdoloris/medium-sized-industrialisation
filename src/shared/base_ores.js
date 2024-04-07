// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { nijikaId } from "./utils";

export const BASE_ORES = {
    bocchinium: {
        colour: 0xf7a0b5,
        iconSet: GTMaterialIconSet.BRIGHT,
        seed: 809651466,
        intoOres: ["ilmenite", "orpiment", "realgar"],
        gem: "amethyst",
    },

    nijikaite: {
        seed: 1929496478,
        colour: 0xf3e5a1,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["beryllium", "scheelite", "fluorite"],
        gem: "emerald",
    },

    ryoite: {
        seed: 155659298,
        colour: 0x49679f,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["pyrolusite", "gold", "hematite"],
        gem: "sapphire",
    },

    kitakitaite: {
        seed: 649130079,
        colour: 0xd2625a,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["pentlandite", "sphalerite", "tricalcium_phosphate"],
        gem: "ruby",
    },

    kikurite: {
        seed: 1321746503,
        colour: 0x995678,
        iconSet: GTMaterialIconSet.DULL,
        intoOres: ["molybdenite", "asbestos", "stibnite"],
        gem: "opal",
    },

    yoyokite: {
        seed: 1191360869,
        colour: 0x5a3c2d,
        iconSet: GTMaterialIconSet.DULL,
        intoOres: ["bauxite", "chromite", "monazite"],
        gem: "realgar",
    },
};

export const COMBO_SORTING = {
    brown: [
        ["bocchinium", "nijikaite", "hematite"],
        ["ryoite", "bocchinium", "pyrolusite"],
        ["kitakitaite", "nijikaite", "cassiterite"],
        ["kitakitaite", "ryoite", "molybdenite"],
        // approved by hamazi-san herself!
        ["bocchinium", "yoyokite", "bauxite"],
    ],
};

/**
 * Adds the base ore materials.
 */
export const addBaseOreMaterials = (event) => {
    for (let [name, data] of Object.entries(BASE_ORES)) {
        event.create(nijikaId(name)).color(data.colour).ore().dust().iconSet(data.iconSet);
    }
};
