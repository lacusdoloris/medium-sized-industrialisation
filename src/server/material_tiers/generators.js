import { GT_MACHINE_TIERS, Tier } from "../../shared/definition"

/**
 * Adjusts the tier data for GregTech generators.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const adjustGtGeneratorTiers = (event) => {
    for (let tierName of ["LV", "MV", "HV"]) {
        /** @type {Tier} */
        let tier = GT_MACHINE_TIERS[tierName];

        event.remove({id: `gtceu:shaped/diesel_generator_${tier.name}`});
        event.shaped(
            `gtceu:${tier.name}_combustion`,
            ["PCP", "MHM", "GWG"],
            {
                P: `gtceu:${tier.name}_electric_piston`,
                C: tier.circuitTag,
                M: `gtceu:${tier.name}_electric_motor`,
                H: tier.machineHull,
                G: tier.materials.plate.tagged("gears"),
                W: tier.singleCable
            }
        ).id(`nijika:auto/generators/${tier.name}_combustion`);

        event.remove({id: `gtceu:shaped/steam_turbine_${tier.name}`});
        event.shaped(
            `gtceu:${tier.name}_steam_turbine`,
            ["PCP", "RHR", "MWM"],
            {
                P: tier.materials.pipe.component("normal_fluid_pipe"),
                C: tier.circuitTag,
                R: tier.materials.rotor.tagged("rotors"),
                H: tier.machineHull,
                M: `gtceu:${tier.name}_electric_motor`,
                W: tier.singleCable,
            }
        ).id(`nijika:auto/generators/${tier.name}_steam`);

        event.remove({id: `gtceu:shaped/gas_turbine_${tier.name}`});
        event.shaped(
            `gtceu:${tier.name}_gas_turbine`,
            ["CRC", "RHR", "MWM"],
            {
                C: tier.circuitTag,
                R: tier.materials.rotor.tagged("rotors"),
                H: tier.machineHull,
                M: `gtceu:${tier.name}_electric_motor`,
                W: tier.singleCable,
            }
        ).id(`nijika:auto/generators/${tier.name}_gas`);
    }
}
