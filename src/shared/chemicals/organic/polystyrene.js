// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAcidicIntermediate } from "../../materials/helpers";
import { nijikaId } from "../../utils";

export const addPolystyreneMaterials = (event) => {
    createAcidicIntermediate(event, "polystyrene_sulfonate", 0xcfd4a7).dust();

    event
        .create(nijikaId("sodium_polystyrene_sulfonate"))
        .polymer(1)
        .color(0x8f917a)
        .iconSet(GTMaterialIconSet.ROUGH)
        .flags(GTMaterialFlags.GENERATE_ROUND);

    createAcidicIntermediate(event, "chlorosulfuric_acid", 0xbeebc3, true).components(
        "1x gtceu:hydrogen",
        "1x gtceu:sulfur",
        "3x gtceu:oxygen",
        "1x gtceu:chlorine"
    );
};

/**
 * Adds recipes relating to the production of Polystyrene and Polystyrene products.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addPolysytreneRecipes = (event) => {
    event.remove({ id: "gtceu:chemical_reactor/styrene_from_benzene" });
    event.remove({ id: "gtceu:large_chemical_reactor/styrene_from_benzene" });
    event.remove({ id: "gtceu:chemical_reactor/styrene_from_ethylbenzene" });
    event.remove({ id: "gtceu:large_chemical_reactor/styrene_from_ethylbenzene" });

    // Catalytic synthesis of Ethylbenzene from Bezene and Ethylene.
    // C6H6 + C2H4 = C6H5C2H5
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/polystyrene/ethylbenzene")
        .itemInputs("1x gtceu:tiny_aluminium_chloride_dust")
        .inputFluids(
            Fluid.of("gtceu:ethylene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:benzene").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:ethylbenzene").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VHA[GTValues.EV]) // so that you need to use coal tar first
        .duration(3 * 20);

    // Synthesis of sytrene from ethylbenzene and steam.
    // C6H5C2H5 = C8H8 + H2
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/polystyrene/styrene")
        .inputFluids(
            Fluid.of("gtceu:steam").withAmount(12 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:ethylbenzene").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:styrene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VH[GTValues.MV])
        .duration(5 * 20);

    // There's no real usage for polystyrene itself. It's a brittle plastic mostly used for
    // packaging... but there's no packaging in game.
    // Maybe in the future.

    // Polymerization of styrene into polystyrene.
    /*event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/polystyrene/polymerisation_air")
        .inputFluids(
            Fluid.of("gtceu:air").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:styrene").withAmount(144 * FluidAmounts.MB)
        )
        .outputFluids(Fluid.of("gtceu:polystyrene").withAmount(144 * FluidAmounts.MB))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(8 * 20);

    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/polystyrene/polymerisation_o2")
        .inputFluids(
            Fluid.of("gtceu:oxygen").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:styrene").withAmount(144 * FluidAmounts.MB)
        )
        .outputFluids(Fluid.of("gtceu:polystyrene").withAmount(216 * FluidAmounts.MB))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(8 * 20);*/

    // Prroduction of chlorosulfuric acid.
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/polystyrene/chlorosulfuric_acid")
        .inputFluids(
            Fluid.of("gtceu:hydrochloric_acid").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:sulfur_trioxide").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:chlorosulfuric_acid").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .duration(2 * 20);

    // Polystyrene sulfonation to get... polystyrene sulfonate.
    // CH2CHC6H5 + HSO3Cl = CH2CHC6H4SO3H + HCl
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/polystyrene/styrene_sulfonation")
        .inputFluids(
            Fluid.of("gtceu:styrene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:chlorosulfuric_acid").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:polystyrene_sulfonate").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:diluted_hydrochloric_acid").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(10 * 20);

    // Finally, react it with Sodium Hydroxide to get the sodium salt.
    // CH2CHC6H4SO3H + NaOH = CH2CHC6H4SO3Na + H2O
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/polystyrene/sodium_polystyrene_sulfonate")
        .inputFluids(Fluid.of("gtceu:polystyrene_sulfonate").withAmount(1 * FluidAmounts.BUCKET))
        .itemInputs("1x gtceu:sodium_hydroxide_dust")
        .outputFluids(
            Fluid.of("gtceu:sodium_polystyrene_sulfonate").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET)
        )
        .duration(5 * 20)
        .EUt(GTValues.VHA[GTValues.HV]);
};
