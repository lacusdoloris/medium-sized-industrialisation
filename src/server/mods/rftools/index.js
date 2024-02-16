import { GT_MACHINE_TIERS } from "../../../shared/definition";

/**
 * Adds recipes for all of the RFTools submods.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustRfToolsRecipes = (event) => {
    event.remove({ id: "rftoolsbase:dimensionalshard" });

    event.recipes.gtceu
        .mixer("nijika:mods/rftools/dimensional_shard_dust")
        .itemInputs("gtceu:emerald_dust", "gtceu:netherrack_dust", "gtceu:endstone_dust")
        .itemOutputs("1x gtceu:dimensional_shard_dust")
        .EUt(GTValues.VH[GTValues.LV])
        .duration(10);

    // no implosion compressor in LV and below...
    event.recipes.gtceu
        .autoclave("nijika:mods/rftools/dimensional_shard")
        .itemInputs("1x gtceu:dimensional_shard_dust")
        .inputFluids(Fluid.of("gtceu:distilled_water").withAmount(1 * FluidAmounts.BUCKET))
        .itemOutputs("1x rftoolsbase:dimensionalshard")
        .EUt(24)
        .duration(10 * 20);

    event.remove({ id: "rftoolsbase:machine_frame" });
    event
        .shaped("2x rftoolsbase:machine_frame", ["WDW", "CHC", "WDW"], {
            W: GT_MACHINE_TIERS.LV.singleCable,
            D: "rftoolsbase:dimensionalshard",
            H: GT_MACHINE_TIERS.LV.machineHull,
            C: GT_MACHINE_TIERS.LV.circuitTag
        })
        .id("nijika:mods/rftools/machine_frame");

    // very provisional, WIP recipes here
    event.remove({ id: "rftoolscontrol:card_base" });
    event.recipes.gtceu
        .circuit_assembler("nijika:mods/rftools/card_base")
        .itemInputs(
            "gtceu:resin_printed_circuit_board",
            "1x #gtceu:lv_circuits",
            "1x rftools:dimensionalshard",
            "2x gtceu:red_alloy_single_wire"
        )
        .inputFluids(Fluid.of("gtceu:soldering_alloy").withAmount(72 * FluidAmounts.MB))
        .itemOutputs("2x rftoolscontrol:card_base")
        .EUt(GTValues.V[GTValues.LV])
        .duration(10 * 20);

    event.remove({ id: "rftoolscontrol:cpu_core_500" });
    event.shaped(
        "rftoolscontrol:cpu_core_500",
        ["RGR", "PCP", "RGR"],
        {
            R: "#forge:dusts/redstone",
            G: "#forge:nuggets/gold",
            P: "gtceu:polyethylene_plate",
            C: "rftoolscontrol:card_base"
        }
    ).id("nijika:mods/rftools/arm4tdmi");
};
