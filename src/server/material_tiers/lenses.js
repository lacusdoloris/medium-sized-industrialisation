// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

let DyeColour = Java.loadClass("net.minecraft.world.item.DyeColor");

/**
 * Fixes lens recipes to be MV rather than HV.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const fixLensRecipes = (event) => {
    event.remove({ output: "#forge:lenses", type: "gtceu:chemical_bath" });

    for (let colour of DyeColour.values()) {
        if (colour == DyeColour.WHITE) continue;

        // property getter doesn't work?
        let colourName = colour.getName().toLowerCase();
        event.recipes.gtceu
            .chemical_bath(`nijika:auto/glass_lens/${colourName}`)
            .itemInputs("1x #forge:lenses")
            .inputFluids(
                Fluid.of(`gtceu:${colourName}_dye`).withAmount(144 * FluidAmounts.MILLIBUCKET)
            )
            .itemOutputs(`gtceu:${colourName}_glass_lens`)
            .EUt(GTValues.VA[GTValues.MV])
            .duration(10 * 20);
    }
};
