// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { addChromiumMaterials, addChromiteProcessingRecipes } from "./metallurgy/chromium";
import { addGalliumArsenicMaterials, addGalliumArsenicRecipes } from "./metallurgy/gallum_arsenic";
import { addAluminiumMaterials, addAluminiumProcessingRecipes } from "./metallurgy/aluminium";
import { addTantalumMaterials, addTantaliteProcessingChain } from "./metallurgy/tantalum";
import { addManganeseMaterials, addManganeseProcessingRecipes } from "./metallurgy/manganese";
import { addVanadiumMaterials, addVanadiumChemicalChain } from "./metallurgy/vanadium";
import { addRareEarthMaterials, addRareEarthProcessingChain } from "./rare_earths";
import { addMagnesiumMaterials, addMagnesiumProcessingRecipes } from "./metallurgy/magnesium";
import { addMolybdenumMaterials, addMolybdenumProcessingRecipes } from "./metallurgy/molybdenum";
import { addGoldMaterials, addGoldProcessingRecipes } from "./metallurgy/gold";
import { addCyanideMaterials, addCyanideRecipes } from "./metallurgy/cyanide";
import { addBrineMaterials, addBrineRecipes } from "./brine";
import { addTitaniumMaterials, addTitaniumRecipes } from "./metallurgy/titanium";
import { addCopperMaterials, addCopperRecipes } from "./metallurgy/copper";
import { addBaseOreMaterials } from "../../shared/ores/bocchi";
import { addTungstenMaterials, addTungstenRecipes } from "./metallurgy/tungsten";
import { addPhosphorusMaterials, addPhosphorusRecipes } from "./phosphorus";
import { addBariumMaterials, addBariumRecipes } from "./metallurgy/barium";
import { addCatalystMaterials, addCatalystRecipes } from "./catalysts";
import { addOrganicChemMaterials, addOrganicChemRecipes } from "./organic";
import { addIronMaterials, addMiscIronRecipes } from "./metallurgy/iron";
import { addHydrogenPeroxideMaterials, addHydrogenPeroxideRecipes } from "./hydrogen_peroxide";
import { addIodineMaterials, addIodineRecipes } from "./metallurgy/iodine";
import { addPlatinumGroupMaterials, addPlatinumGroupRecipes } from "./metallurgy/platinum";
import { addAmmoniaMaterials, addAmmoniaRecipes } from "./ammonia";
import { addRheniumMaterials, addRheniumRecipes } from "./metallurgy/rhenium";
import { addIronSlagMaterials, addIronSlagReprocessingRecipes } from "./metallurgy/iron_slag";
import { addWastewaterMaterials, addWastewaterRecipes } from "./wastewater";
import { addArsenopyriteMaterials, addArsenopyriteRecipes } from "./metallurgy/arsenopyrite";

export const addChemicalMaterials = (event) => {
    addBaseOreMaterials(event);

    addCatalystMaterials(event);

    addAluminiumMaterials(event);
    addArsenopyriteMaterials(event);
    addBariumMaterials(event);
    addChromiumMaterials(event);
    addCopperMaterials(event);
    addCyanideMaterials(event);
    addGalliumArsenicMaterials(event);
    addGoldMaterials(event);
    addIronMaterials(event);
    addIronSlagMaterials(event);
    addIodineMaterials(event);
    addMagnesiumMaterials(event);
    addManganeseMaterials(event);
    addMolybdenumMaterials(event);
    addPlatinumGroupMaterials(event);
    addRheniumMaterials(event);
    addRareEarthMaterials(event);
    addTantalumMaterials(event);
    addTitaniumMaterials(event);
    addTungstenMaterials(event);
    addVanadiumMaterials(event);

    addOrganicChemMaterials(event);

    addAmmoniaMaterials(event);
    addBrineMaterials(event);
    addHydrogenPeroxideMaterials(event);

    addPhosphorusMaterials(event);
    addWastewaterMaterials(event);
};

/**
 * Adds various chemical or metallurgical processing recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addChemicalProcessingRecipes = (event) => {
    addGalliumArsenicRecipes(event);
    addAluminiumProcessingRecipes(event);
    addChromiteProcessingRecipes(event);
    addVanadiumChemicalChain(event);
    addManganeseProcessingRecipes(event);
    addTantaliteProcessingChain(event);
    addRareEarthProcessingChain(event);
    addMiscIronRecipes(event);
    addMagnesiumProcessingRecipes(event);
    addMolybdenumProcessingRecipes(event);
    addCyanideRecipes(event);
    addGoldProcessingRecipes(event);
    addBrineRecipes(event);
    addTitaniumRecipes(event);
    addCopperRecipes(event);
    addTungstenRecipes(event);
    addPhosphorusRecipes(event);
    addBariumRecipes(event);
    addHydrogenPeroxideRecipes(event);
    addIodineRecipes(event);
    addPlatinumGroupRecipes(event);
    addRheniumRecipes(event);
    addIronSlagReprocessingRecipes(event);
    addArsenopyriteRecipes(event);

    addAmmoniaRecipes(event);
    addCatalystRecipes(event);
    addOrganicChemRecipes(event);

    addWastewaterRecipes(event);

    event.recipes.gtceu
        .mixer("nijika:chemicals/misc/diluted_hydrochloric_acid")
        .inputFluids(
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrochloric_acid").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:diluted_hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VH[GTValues.ULV])
        .duration(10)
        .circuit(1);

    // BeH2 + 2 HCl → BeCl2 + 2 H2
    event.recipes.gtceu
        .chemical_bath("nijika:misc/beryllium_chloride")
        .itemInputs("1x gtceu:beryllium_hydride_dust")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("1x gtceu:beryllium_chloride_dust")
        .outputFluids(Fluid.of("gtceu:hydrogen").withAmount(2 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(2 * 20);

    // Direct reaction of calcium and hydrogen gets calcium hydride.
    event.recipes.gtceu
        .chemical_reactor("nijika:misc/calcium_hydride")
        .inputFluids(Fluid.of("gtceu:hydrogen").withAmount(2 * FluidAmounts.BUCKET))
        .itemInputs("gtceu:calcium_dust")
        .itemOutputs("1x gtceu:calcium_hydride_dust")
        .EUt(GTValues.VH[GTValues.LV])
        .duration(5 * 20);

    // Direct preparation of Calcium sillicate.
    // 2 CaO + SiO2 = Ca2SiO4
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/calcium_sillicate")
        .itemInputs("2x gtceu:quicklime_dust", "1x gtceu:silicon_dioxide_dust")
        .itemOutputs("1x gtceu:calcium_silicate_dust")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(2 * 20);

    // TODO: own file, add deepslate decomposition
    event.remove({ id: "gtceu:centrifuge/stone_dust_separation" });
    event.remove({ id: "gtceu:centrifuge/decomposition_centrifuging__deepslate" });
    event.recipes.gtceu
        .centrifuge("nijika:chemicals/misc/stone_dust_separation")
        .itemInputs("1x gtceu:stone_dust")
        .chancedOutput("gtceu:quartzite_dust", 6500.0, 0.0)
        .chancedOutput("gtceu:rock_salt_dust", 2400.0, 0.0)
        .chancedOutput("gtceu:marble_dust", 2222.0, 0.0)
        .chancedOutput("gtceu:salt_dust", 2800.0, 0.0)
        .chancedOutput("gtceu:metal_mixture_dust", 650.0, 0.0)
        .EUt(GTValues.VA[GTValues.LV])
        .duration(6 * 20 + 10);

    // formic acid needs a circuit to avoid conflicting with solvay
    // I don't think this is a real reaction... come back to this.
    event.recipes.gtceu
        .chemical_reactor("gtceu:formic_acid")
        .inputFluids(
            Fluid.of("gtceu:carbon_dioxide").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:formic_acid").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:oxygen").withAmount(1 * FluidAmounts.BUCKET)
        )
        .circuit(4)
        .EUt(GTValues.VA[GTValues.LV])
        .duration(5 * 20);
};
