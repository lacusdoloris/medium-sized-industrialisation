// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { addOrganoaluminiumMaterials, addOrganoaluminiumRecipes } from "./aluminium";
import { addAmineMaterials, addAmineRecipes } from "./amines";
import { addChloroethaneMaterials, addChloroethaneRecipes } from "./chloroethane";
import { addDehpaMaterials, addDehpaRecipes } from "./dehpa";
import { addZieglerProcessMaterials, addZieglerProcessRecipes } from "./fatty_alcohols";
import { addMIBKMaterials, addMIBKProcess } from "./mibk";
import { addPolystyreneMaterials, addPolysytreneRecipes } from "./polystyrene";
import { addPolyvinylButyralMaterials, addPolyvinylButyralRecipes } from "./pvb";
import { addSquaricAcidMaterials, addSquaricAcidRecipes } from "./squaric";
import { addTributylPhosphateMaterials, addTributylPhosphateRecipes } from "./tributyl_phosphate";

export const addOrganicChemMaterials = (event) => {
    addChloroethaneMaterials(event);
    addMIBKMaterials(event);
    addPolystyreneMaterials(event);
    addOrganoaluminiumMaterials(event);
    addZieglerProcessMaterials(event);
    addAmineMaterials(event);
    addPolyvinylButyralMaterials(event);
    addDehpaMaterials(event);
    addSquaricAcidMaterials(event);
    addTributylPhosphateMaterials(event);
};

/**
 * Adds the recipes for the organic chemistry chains.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addOrganicChemRecipes = (event) => {
    addChloroethaneRecipes(event);
    addMIBKProcess(event);
    addPolysytreneRecipes(event);
    addOrganoaluminiumRecipes(event);
    addZieglerProcessRecipes(event);
    addAmineRecipes(event);
    addPolyvinylButyralRecipes(event);
    addDehpaRecipes(event);
    addSquaricAcidRecipes(event);
    addTributylPhosphateRecipes(event);

    event.remove({ id: "gtceu:chemical_reactor/cyclohexane" });
    event.remove({ id: "gtceu:large_chemical_reactor/cyclohexane" });

    // fuck off, gtceu
    event.remove({ id: "gtceu:chemical_reactor/formaldehyde" });
    event.remove({ id: "gtceu:large_chemical_reactor/formaldehyde" });

    // C6H6 + 3 H2 = C6H12
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/cyclohexane_hydrogenation")
        .itemInputs("1x nijika:nickel_catalyst")
        .inputFluids(
            Fluid.of("gtceu:benzene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(6 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:cyclohexane").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(10 * 20);

    // 2 CH3OH + O2 = 2 CH2O + 2 H2O
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/formaldehyde")
        .itemInputs("1x gtceu:tiny_iron_oxide_dust")
        .inputFluids(
            Fluid.of("gtceu:methanol").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:oxygen").withAmount(2 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:formaldehyde").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(5 * 20)
        .circuit(2);

    // Catalytic toluene synthesis.
    // C6H6 + CH3OH = C6H5CH3 + H2O
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/toluene/catalytic_synthesis")
        .itemInputs("1x gtceu:tiny_polystyrene_sulfonate_dust")
        .inputFluids(
            Fluid.of("gtceu:benzene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:methanol").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:toluene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.EV])
        .duration(2 * 20 + 10);

    // water-gas shift reaction, fast hydrogen from natural gas
    event.remove({ id: "gtceu:chemical_reactor/carbon_dioxide_from_methane" });

    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/water_gas_shift_hydrogen_from_raw_gas")
        .inputFluids(
            Fluid.of("gtceu:refinery_gas").withAmount(1500 * FluidAmounts.MB),
            Fluid.of("gtceu:steam").withAmount(2 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:carbon_dioxide").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(8 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.LV])
        .duration(7 * 20 + 10)
        .circuit(8);

    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/water_gas_shift_hydrogen_from_methane")
        .inputFluids(
            Fluid.of("gtceu:methane").withAmount(1000 * FluidAmounts.MB),
            Fluid.of("gtceu:steam").withAmount(2 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:carbon_dioxide").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(8 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.LV])
        .duration(5 * 20)
        .circuit(8);
};
