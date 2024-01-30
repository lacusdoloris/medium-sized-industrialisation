
// MV!

import { GT_MACHINE_TIERS } from "../../shared/definition";

/** @param {Internal.RecipesEventJS} event */
export const doTier02Content = (event) => {
    let mvTier = GT_MACHINE_TIERS[1];

    event.shaped(
        "gtceu:brine_tower",
        ["RGR", "CHC", "PBP"],
        {
            R: mvTier.materials.rotor.tagged("rotors"),
            G: mvTier.materials.glass,
            C: "#gtceu:circuits/mv",
            H: "gtceu:mv_machine_hull",
            P: "gtceu:mv_electric_pump",
            B: "#forge:plates/bronze"
        }
    ).id("nijika:tier02/brine_evaporation");

    event.recipes.gtceu.brine_tower("nijika:tier02/basic_brine_production")
        .inputFluids(Fluid.of("minecraft:water").withAmount(250 * FluidAmounts.BUCKET))
        .outputFluids(Fluid.of("gtceu:salt_water").withAmount(50 * FluidAmounts.BUCKET))
        .chancedOutput("8x gtceu:sodium_hydroxide_dust", 5000.0, 0.0)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20 * 60);
}
