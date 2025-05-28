// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createAqueousIntermediate } from "../../materials/helpers";

export const addGalliumArsenicMaterials = (event) => {
    event
        .create(new ResourceLocation("nijika:orpiment"))
        .gem()
        .ore()
        .color(0xa99300)
        .iconSet(GTMaterialIconSet.EMERALD)
        .components("2x gtceu:arsenic", "3x gtceu:sulfur")
        .addOreByproducts("gtceu:sulfur", "gtceu:antimony", "gtceu:barite")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    createAqueousIntermediate(event, "arsenic_trichloride", 0xfffec8).components(
        "1x gtceu:arsenic",
        "3x gtceu:chlorine"
    );
};

/**
 * Reworks Gallium, Arsenic, and Gallium Arsenide processing for tier 1.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addGalliumArsenicRecipes = (event) => {
    event.remove({ id: "gtceu:mixer/gallium_arsenide" });

    // Realgar roasting, As4S4 + 7 O2 = 2 As2O3 + 4 SO2

    event.recipes.gtceu
        .electric_blast_furnace("nijika:tier01/arsenic/realgar_roasting")
        .itemInputs("1x #forge:dusts/realgar")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(14 * FluidAmounts.BUCKET))
        .itemOutputs("2x gtceu:arsenic_trioxide_dust")
        .outputFluids(Fluid.of("gtceu:sulfur_dioxide").withAmount(4 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .blastFurnaceTemp(1100)
        .duration(120);

    // Orpiment roasting, 2 As2S3 + 9 O2 = 2 As2O3 + 6 SO2

    event.recipes.gtceu
        .electric_blast_furnace("nijika:tier01/arsenic/orpiment_roasting")
        .itemInputs("2x #forge:dusts/orpiment")
        .inputFluids(Fluid.of("gtceu:oxygen").withAmount(18 * FluidAmounts.BUCKET))
        .itemOutputs("2x gtceu:arsenic_trioxide_dust")
        .outputFluids(Fluid.of("gtceu:sulfur_dioxide").withAmount(6 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .blastFurnaceTemp(1100)
        .duration(120);

    // Arsenic trioxide -> Arsenic trichloride, As2O3 + 6 HCl = 2 AsCl3 + 3 H2O

    event.recipes.gtceu
        .chemical_reactor("nijika:tier01/arsenic/trichloride_production")
        .itemInputs("gtceu:arsenic_trioxide_dust")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(6 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:arsenic_trichloride").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(3 * FluidAmounts.BUCKET)
        )
        .duration(10 * 20)
        .EUt(GTValues.VA[GTValues.LV]);

    // Arsenic trichloride + Gallium -> Gallium Arsenide + Chlorine gas
    //  2 Ga + 2 AsCl3 → 2 GaAs + 3 Cl2
    event.recipes.gtceu
        .chemical_reactor("nijika:tier01/arsenic/gallium_arsenide")
        .itemInputs("2x #forge:dusts/gallium")
        .inputFluids(Fluid.of("gtceu:arsenic_trichloride").withAmount(2 * FluidAmounts.BUCKET))
        .itemOutputs("2x gtceu:gallium_arsenide_dust")
        .outputFluids(Fluid.of("gtceu:chlorine").withAmount(6 * FluidAmounts.BUCKET))
        .duration(10 * 20)
        .EUt(GTValues.VA[GTValues.LV]);
};
