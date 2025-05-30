// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// See doi:10.1088/1742-6596/1436/1/012070 (open access) for the Monazite processing.

import { createChemicalIntermediate, createDustIntermediate } from "../materials/helpers";

// TODO: Bastanite, other rare earth containing minerals?
// TODO: Uranium extraction.
// TODO: Custom decomposition reactions.
//
// Heavy rare earths are samarium-ytterbium, light rare earths are lanthanum-promethium.

export const addRareEarthMaterials = (event) => {
    event
        .create(new ResourceLocation("nijika:calcium_hydride"))
        .dust()
        .color(0xf7e3e1)
        .components("1x gtceu:calcium", "2x gtceu:hydrogen");

    createDustIntermediate(event, "rare_earth_hydroxides", 0xa7acd9);
    createDustIntermediate(event, "rare_earth_mixture", 0x18453f);
    createChemicalIntermediate(event, "rare_earth_chlorides", 0x447a12);

    // TODO: custom decomposition?
    event
        .create(new ResourceLocation("nijika:trisodium_phosphate"))
        .dust()
        .color(0xff47a1)
        .components("3x gtceu:sodium", "1x gtceu:phosphorus", "3x gtceu:oxygen");

    // light vs heavy rare earths.
    createDustIntermediate(event, "heavy_rare_earth_oxides", 0x2c1736);
    createDustIntermediate(event, "light_rare_earth_oxides", 0xc9a7d9);

    createDustIntermediate(event, "lanthanum_iii_oxide", 0x53a1c7, true).components(
        "2x gtceu:lanthanum",
        "3x gtceu:oxygen"
    );

    createDustIntermediate(event, "neodymium_iii_oxide", 0x4d506b, true).components(
        "2x gtceu:neodymium",
        "3x gtceu:oxygen"
    );

    createDustIntermediate(event, "samarium_iii_oxide", 0xf37a7a, true).components(
        "2x gtceu:samarium",
        "3x gtceu:oxygen"
    );

    createDustIntermediate(event, "yttrium_iii_oxide", 0x4561a8, true).components(
        "2x gtceu:yttrium",
        "3x gtceu:oxygen"
    );

    createDustIntermediate(event, "cerium_iv_oxide", 0x62b9d7, true).components(
        "1x gtceu:cerium",
        "2x gtceu:oxygen"
    );

    createDustIntermediate(event, "thorium_hydroxide", 0x232323, true).components(
        "1x gtceu:thorium",
        "4x gtceu:oxygen",
        "4x gtceu:hydrogen"
    );

    createDustIntermediate(event, "europium_iii_oxide", 0x615d8c, true).components(
        "2x gtceu:europium",
        "3x gtceu:oxygen"
    );

    event
        .create(new ResourceLocation("nijika:lanthanum_nickel_alloy"))
        .ingot()
        .dust()
        .color(0x53a18f)
        .flags(GTMaterialFlags.GENERATE_FOIL, GTMaterialFlags.DISABLE_DECOMPOSITION)
        .blastTemp(1400)
        .components("1x gtceu:lanthanum", "5x gtceu:nickel");
};

/**
 * Adds the basic rare earth processing chains.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addRareEarthProcessingChain = (event) => {
    // This is a slightly modified version of the chain in the paper linked above,
    // where it outputs directly to a centrifugable "rare earth mixture" instead of rare earth
    // hydroxides.

    // TODO: Figure out how to keep this for helium production.
    event.remove({ id: "gtceu:extractor/monazite_extraction" });

    // 1) Decomposition of monazite dust via sodium hydroxide.
    // (Ce...)(PO4) + 6NaOH = (Ce...)2O3.3H2O + 2Na3PO4
    // or, abstracting away the hydrous form:
    // (Ce...)(PO4) + 3NaOH = (Ce...)(OH)3 + Na3PO44

    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/rare_earths/monazite_decomposition")
        .itemInputs("1x gtceu:monazite_dust", "3x gtceu:sodium_hydroxide_dust")
        .itemOutputs("1x gtceu:trisodium_phosphate_dust", "1x gtceu:rare_earth_hydroxides_dust")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(60 * 20);

    // 2) Dissolution using hydrochloric acid.
    // (Ce...)(OH)3 + 3HCL -> (Ce...)Cl3 + 3H20

    event.recipes.gtceu
        .chemical_bath("nijika:chemicals/rare_earths/rare_earth_hydroxide_chlorides")
        .itemInputs("1x gtceu:rare_earth_hydroxides_dust")
        .inputFluids(Fluid.of("gtceu:hydrochloric_acid").withAmount(3 * FluidAmounts.BUCKET))
        .itemOutputs("3x gtceu:rare_earth_chlorides_dust")
        .outputFluids(Fluid.of("minecraft:water").withAmount(3 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.MV])
        .duration(5 * 20);

    // 3) Precipitation of uranium and thorium hydroxide.
    // (Ce...)Cl3 + 3NH4OH = (Ce...)OH + 3NH4Cl
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/rare_earths/rare_earth_precipitation")
        .itemInputs("40x gtceu:rare_earth_chlorides_dust")
        .inputFluids(Fluid.of("gtceu:ammonium_hydroxide").withAmount(3 * 40 * FluidAmounts.BUCKET))
        .itemOutputs("40x gtceu:rare_earth_mixture_dust", "120x gtceu:ammonium_chloride_dust")
        .chancedOutput("50x gtceu:small_thorium_hydroxide_dust", 5000, 0.0) // tfw no ranged outputs
        .EUt(GTValues.VA[GTValues.EV])
        .duration(20 * 20);

    // Separate out the heavy ones from the light onees with DEHPA.
    event.recipes.gtceu
        .ion_exchange("nijika:chemicals/rare_earths/dehpa_separation")
        .itemInputs("50x gtceu:rare_earth_mixture_dust")
        .inputFluids(
            Fluid.of("gtceu:dehpa").withAmount(75 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:solvent_extraction_helper").withAmount(50 * FluidAmounts.BUCKET)
        )
        .itemOutputs(
            "35x gtceu:light_rare_earth_oxides_dust",
            "15x gtceu:heavy_rare_earth_oxides_dust"
        )
        .outputFluids(
            Fluid.of("gtceu:dehpa").withAmount(60 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:solvent_extraction_helper").withAmount(25 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VA[GTValues.EV])
        .duration(35 * 20);

    // see Table 1. the numbers have been adjusted for gameplay purposes.
    event.recipes.gtceu
        .centrifuge("nijika:chemicals/rare_earths/light_centrifuging")
        .itemInputs("2x gtceu:light_rare_earth_oxides_dust")
        .chancedOutput("1x gtceu:cerium_iv_oxide_dust", 6200.0, 500.0)
        .chancedOutput("1x gtceu:lanthanum_iii_oxide_dust", 3500.0, 500.0)
        .chancedOutput("1x gtceu:neodymium_iii_oxide_dust", 3000.0, 500.0)
        .chancedOutput("1x gtceu:small_rare_earth_hydroxides_dust", 5000.0, 0.0)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(1 * 20);

    event.recipes.gtceu
        .centrifuge("nijika:chemicals/rare_earths/heavy_centrifuging")
        .itemInputs("2x gtceu:heavy_rare_earth_oxides_dust")
        .chancedOutput("1x gtceu:yttrium_iii_oxide_dust", 1300.0, 500.0)
        .chancedOutput("1x gtceu:samarium_iii_oxide_dust", 7000.0, 750.0)
        .chancedOutput("1x gtceu:small_europium_iii_oxide_dust", 670.0, 350.0)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(1 * 20);

    // reduction of lanthanum to nickel-lanthanum alloy using calcium hydride.
    // https://patents.google.com/patent/US3918933A/en
    // La2O3 + 3 CaH2 + 10 Ni = 2 LaNi5 + 3 CaO + 3 H2

    event.recipes.gtceu
        .electric_blast_furnace("nijika:chemicals/rare_earth/lanthanum_reduction_calcium")
        .itemInputs(
            "3x gtceu:lanthanum_iii_oxide_dust",
            "9x gtceu:calcium_hydride_dust",
            "30x gtceu:nickel_dust"
        )
        .itemOutputs("6x gtceu:lanthanum_nickel_alloy_ingot", "9x gtceu:quicklime_dust")
        .outputFluids(Fluid.of("gtceu:hydrogen").withAmount(18 * FluidAmounts.BUCKET))
        .EUt(GTValues.V[GTValues.MV])
        .duration(90 * 20)
        .blastFurnaceTemp(1400);
};
