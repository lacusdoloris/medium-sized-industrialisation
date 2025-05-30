// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAqueousIntermediate } from "../../materials/helpers";

export const addChloroethaneMaterials = (event) => {
    createAqueousIntermediate(event, "chloroethane", 0xb2f781);
};

/**
 * Adds recipes relating to Chloroethane.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addChloroethaneRecipes = (event) => {
    event.remove({ id: "gtceu:chemical_reactor/vinyl_chloride_from_chlorine" });
    event.remove({ id: "gtceu:large_chemical_reactor/vinyl_chloride_from_chlorine" });
    event.remove({ id: "gtceu:chemical_reactor/vinyl_chloride_from_hydrochloric" });
    event.remove({ id: "gtceu:large_chemical_reactor/vinyl_chloride_from_hydrochloric" });
    event.remove({ id: "gtceu:chemical_reactor/vinyl_chloride_from_ethane" });
    event.remove({ id: "gtceu:large_chemical_reactor/vinyl_chloride_from_ethane" });
    event.remove({ id: "gtceu:chemical_reactor/dichloroethane" });
    event.remove({ id: "gtceu:large_chemical_reactor/dichloroethane" });

    // Hydrochlorination of ethylene, using aluminium chloride as a catalyst.
    // C2H4 + HCl -> CH3CH2Cl
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/chloroethane/hydrochlorination")
        .itemInputs("1x gtceu:tiny_aluminium_chloride_dust")
        .inputFluids(
            Fluid.of("gtceu:hydrochloric_acid").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:ethylene").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:chloroethane").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .duration(5 * 20)
        .circuit(2);

    // Chlorination of ethylene, using Iron (III) Chloride as a catalyst.
    // C2H4 + Cl2 = ClCH2CH2Cl
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/chloroethane/dichloroethane")
        .inputFluids(
            Fluid.of("gtceu:ethylene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:chlorine").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:iron_iii_chloride").withAmount(1 * FluidAmounts.NUGGET)
        )
        .outputFluids(Fluid.of("gtceu:dichloroethane").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .duration(2 * 20 + 10)
        .circuit(1);

    // Thermal cracking of 1,2-dichloroethane to get Vinyl Chloride.
    // ClCH2CH2Cl = CH2CHCl + HCl
    event.recipes.gtceu
        .cracker("nijika:chemicals/chloroethane/vinyl_chloride")
        .inputFluids(
            Fluid.of("gtceu:dichloroethane").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:steam").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:vinyl_chloride").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:diluted_hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(6 * 20)
        .circuit(3);

    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/chloroethane/vinyl_chloride_sucky")
        .inputFluids(
            Fluid.of("gtceu:dichloroethane").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:steam").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:vinyl_chloride").withAmount(500 * FluidAmounts.MB),
            Fluid.of("gtceu:diluted_hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(6 * 20)
        .circuit(3);
};
