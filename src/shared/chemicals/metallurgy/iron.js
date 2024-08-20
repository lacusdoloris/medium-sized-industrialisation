// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createDustIntermediate } from "../../materials/helpers";
import { nijikaId } from "../../utils";

export const addIronMaterials = (event) => {
    createDustIntermediate(event, "iron_oxide", 0x5f412f).components(
        "2x gtceu:iron",
        "3x gtceu:oxygen"
    );

    event
        .create(nijikaId("iron_slag"))
        .gem()
        .dust()
        .color(0xbacfc9)
        .iconSet(GTMaterialIconSet.GLASS);
};

/**
 * Adds a handful of miscellaneous iron processing recipes.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addMiscIronRecipes = (event) => {
    // have to do this here instead of when tweaking materials to prevent the removal of magnetite
    // to iron ingots.
    event.remove({ id: "gtceu:smelting/dust_magnetite__dust_to_ingot" });

    // Magnetite and hematite to iron and slag.
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/iron/bulk_crushed_magnetite")
        .itemInputs("32x #forge:crushed_ores/magnetite", "8x #nijika:carbon_rich_dusts")
        .itemOutputs("24x minecraft:iron_ingot", "8x gtceu:iron_slag_gem")
        .EUt(GTValues.VA[GTValues.MV])
        .blastFurnaceTemp(1700)
        .duration(30 * 20)
        .circuit(8);

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/iron/bulk_crushed_hematite")
        .itemInputs("32x #forge:crushed_ores/hematite")
        .itemOutputs("24x gtceu:iron_oxide_dust", "8x gtceu:iron_slag_gem")
        .EUt(GTValues.VA[GTValues.MV])
        .blastFurnaceTemp(1700)
        .duration(30 * 20)
        .circuit(8);

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/iron/bulk_crushed_hematite_reduction")
        .itemInputs("32x #forge:crushed_ores/hematite", "8x #nijika:carbon_rich_dusts")
        .itemOutputs("24x minecraft:iron_ingot", "8x gtceu:iron_slag_gem")
        .EUt(GTValues.VA[GTValues.MV])
        .blastFurnaceTemp(1700)
        .duration(30 * 20)
        .circuit(18);

    // Reduction of Magnetite dust with hydrogen to pig iron:
    // Fe3O4 + 4 H2 = 3 Fe + 4 H2O
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/iron/magnetite_reduction")
        .itemInputs("1x gtceu:magnetite_dust")
        .inputFluids(Fluid.of("gtceu:hydrogen").withAmount(8 * FluidAmounts.BUCKET))
        .itemOutputs("3x minecraft:iron_ingot")
        .outputFluids(Fluid.of("minecraft:water").withAmount(4 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.MV])
        .duration(5 * 20)
        .blastFurnaceTemp(1100);

    // Similar aluminothermic reaction.
    // 8 Al + 3 Fe3O4 = 4 Al2O3 + 9 Fe
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/iron/magnetite_aluminothermic")
        .itemInputs("8x #nijika:blast_recipes/aluminothermics", "3x gtceu:magnetite_dust")
        .itemOutputs("4x gtceu:alumina_dust", "9x minecraft:iron_ingot")
        .EUt(GTValues.VH[GTValues.MV])
        .duration(5 * 20)
        .blastFurnaceTemp(1100);

    // Carbinothermic reduction of both Hematite and Iron(III) Oxide.
    // 2 Fe2O3 + 3 C = 4 Fe + 3 CO2
    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/iron/hematite_reduction")
        .itemInputs("2x gtceu:hematite_dust", "3x #nijika:carbon_rich_dusts")
        .itemOutputs("4x minecraft:iron_ingot")
        .outputFluids(Fluid.of("gtceu:carbon_dioxide").withAmount(3 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.MV])
        .duration(5 * 20)
        .blastFurnaceTemp(1100);

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/iron/iron_oxide_reduction")
        .itemInputs("2x gtceu:iron_oxide_dust", "3x #nijika:carbon_rich_dusts")
        .itemOutputs("4x minecraft:iron_ingot")
        .outputFluids(Fluid.of("gtceu:carbon_dioxide").withAmount(3 * FluidAmounts.BUCKET))
        .EUt(GTValues.VH[GTValues.MV])
        .duration(5 * 20)
        .blastFurnaceTemp(1100);

    // Production of Iron (III) Chloride.
    // 2 Fe + 6 HCl = 2 FeCl3 + 3 H2
    event.remove({ id: "gtceu:chemical_reactor/iron_3_chloride" }); // Uses non-molar hydrogen.
    event.remove({ id: "gtceu:large_chemical_reactor/iron_3_chloride" });
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/iron/iron_iii_chloride_sucky")
        .itemInputs("2x gtceu:iron_dust")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(6 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:iron_iii_chloride").withAmount(2 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(6 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.LV])
        .duration(30 * 20)
        .circuit(1);

    // Fe2O3 + 6 HCl = 2 FeCl3 + 3 H2O
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/iron/iron_iii_chloride")
        .itemInputs("32x gtceu:iron_oxide_dust")
        .inputFluids(Fluid.of("gtceu:chlorine").withAmount(6 * 2 * 32 * FluidAmounts.BUCKET))
        .outputFluids(
            Fluid.of("gtceu:iron_iii_chloride").withAmount(2 * 32 * FluidAmounts.BUCKET),
            Fluid.of("minecraft:water").withAmount(3 * 32 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.V[GTValues.HV])
        .duration(180 * 20); // regular is 15s per bucket, this is 5.65.
};
