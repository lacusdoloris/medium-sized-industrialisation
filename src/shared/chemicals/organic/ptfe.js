// Copyright (c) 2024 Lura Skye
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Adjusts recipes for polytetrafluoroethylene.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const adjustPtfeRecipes = (event) => {
    event.remove({id: /gtceu:(?:large_)?chemical_reactor\/ptfe_from_.*/});
    // Brubaker19 subsequently published, comprehensively, the method for conventional radical suspension
    // polymerization of TFE in an aqueous medium, using alkali or ammonium persulfate.
    // -- 10.1021/acs.chemrev.8b00458
    // 
    // In our case, we use sodium persfulate as the polymerisation activator.
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/ptfe/polymerisation_basic")
        .inputFluids(
            Fluid.of("gtceu:tetrafluoroethylene").withAmount(144 * FluidAmounts.MB),
            Fluid.of("gtceu:sodium_persulfate").withAmount(10 * FluidAmounts.MB)
        )
        .outputFluids(Fluid.of("gtceu:polytetrafluoroethylene").withAmount(216 * FluidAmounts.MB))
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(8 * 20)
        .circuit(1);

    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/ptfe/polymerisation_bulk")
        .inputFluids(
            Fluid.of("gtceu:tetrafluoroethylene").withAmount(100 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sodium_persulfate").withAmount(300 * FluidAmounts.MB)
        )
        .outputFluids(Fluid.of("gtceu:polytetrafluoroethylene").withAmount(100 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(120 * 20)
        .circuit(2);
}
