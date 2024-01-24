import { GT_MACHINE_TIERS, Tier } from "./definition"

/**
 * Rewrites machine hulls and casing to move their materials up an additional tier.
 * 
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
export const applyHullcasingTiers = (event, tier) => {
    event.remove({id: `gtceu:shaped/casing_${tier.name}`});
    event.remove({id: `gtceu:assembler/casing_${tier.name}`});
    event.remove({id: `gtceu:shaped/${tier.name}_machine_hull`});
    event.remove({id: `gtceu:arc_furnace/arc_${tier.name}_machine_casing`});

    event.shaped(
        `1x gtceu:${tier.name}_machine_casing`,
        ["PPP", "P P", "PPP"],
        {P: tier.primaryPlate}
    ).id(`gtceu:shaped/casing_${tier.name}`);

    event.recipes.gtceu.assembler(`gtceu:assembler/casing_${tier.name}`)
        .itemInputs(`8x ${tier.primaryPlate}`)
        .itemOutputs(tier.machineCasing)
        .circuit(8)
        .EUt(16)
        .duration(50);

    event.shaped(
        `1x gtceu:${tier.name}_machine_hull`,
        ["SPS", "CHC"],
        {
            S: tier.hullExtraPlate,
            P: tier.primaryPlate,
            C: tier.singleCable,
            H: `gtceu:${tier.name}_machine_casing`
        }
    ).id(`gtceu:shaped/${tier.name}_machine_hull`);
};


/**
 * Adds a single motor recipe for the provided tier.
 * 
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
export const rewriteMotorRecipes = (event, tier) => {
    event.remove({id: `gtceu:shaped/electric_motor_${tier.name}`});
    
    if (!tier.usesAssemblyLine) {
        event.shaped(
            `1x gtceu:${tier.name}_electric_motor`,
            ["CWR", "WMW", "RWC"],
            {
                C: tier.singleCable,
                W: tier.doubleMotorWire,
                M: tier.magneticRod,
                R: tier.effectiveRodWithLVHardcode
            }
        ).id(`nijika:auto/${tier.name}/shaped/motor`);

        event.remove({id: `gtceu:assembler/electric_motor_${tier.name}`});

        event.recipes.gtceu.assembler(`nijika:auto/${tier.name}/assembler/motor`)
            .itemInputs(
                `2x ${tier.singleCable}`,
                `4x ${tier.doubleMotorWire}`,
                `2x ${tier.effectiveRodWithLVHardcode}`,
                `${tier.magneticRod}`
            )
            .itemOutputs(
                `1x gtceu:${tier.name}_electric_motor`
            )
            .EUt(30)
            .duration(100);
    }
};

/**
 * Rewrites the piston recipe for the provided tier.
 * 
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
export const rewritePistonRecipes = (event, tier) => {
    event.remove({id: `gtceu:shaped/electric_piston_${tier.name}`});

    if (!tier.usesAssemblyLine) {
        event.shaped(
            `1x gtceu:${tier.name}_electric_piston`,
            ["PPP", "CRR", "CMG"],
            {
                P: tier.primaryPlate,
                C: tier.singleCable,
                R: tier.effectiveRodWithLVHardcode,
                M: `gtceu:${tier.name}_electric_motor`,
                G: tier.materials.plate.tagged("small_gears"),
            }
        ).id(`nijika:auto/${tier.name}/shaped/piston`);

        event.remove({id: `gtceu:assembler/electric_piston_${tier.name}`})
        event.recipes.gtceu.assembler(`nijika:auto/${tier.name}/assembler/piston`)
            .itemInputs(
                `3x ${tier.primaryPlate}`,
                `2x ${tier.singleCable}`,
                `2x ${tier.effectiveRodWithLVHardcode}`,
                `gtceu:${tier.name}_electric_motor`,
                tier.materials.plate.tagged("small_gears"),
            )
            .itemOutputs(
                `1x gtceu:${tier.name}_electric_piston`
            )
            .EUt(30)
            .duration(100);
    }
};

// i'm not entirely sure why i wrote this one.
// nevertheless!
/**
 * Rewrites the conveyor recipe for the provided tier.
 * 
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
export const rewriteConveyorRecipes = (event, tier) => {
    for (let rubber of tier.acceptableRubbers) {
        event.remove({id: `gtceu:shaped/conveyor_module_${tier.name}_${rubber}`});
        if (!tier.usesAssemblyLine) {
            event.shaped(
                `gtceu:${tier.name}_conveyor_module`,
                ["RRR", "MCM", "RRR"],
                {
                    R: `#forge:plates/${rubber}`,
                    M: `gtceu:${tier.name}_electric_motor`,
                    C: tier.singleCable,
                }
            ).id(`nijika:auto/${tier.name}/shaped/conveyor/${rubber}`);

            event.remove({id: `gtceu:assembler/conveyor_module_${tier.name}_${rubber}`});
            event.recipes.gtceu.assembler(`nijika:auto/${tier.name}/assembler/conveyor/${rubber}`)
                .itemInputs(
                    tier.singleCable,
                    `2x gtceu:${tier.name}_electric_motor`,
                )
                .inputFluids(Fluid.of(`gtceu:${rubber}`).withAmount(844))
                .itemOutputs(
                    `1x gtceu:${tier.name}_conveyor_module`
                )
                .EUt(30)
                .duration(100);
        }
    }
}

/**
 * Rewrites the electric pump recipe for the provided tier.
 * 
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
const rewritePumpRecipes = (event, tier) => {
    // these only have assembler recipes, because fuck manual tool recipes
    for (let rubber of tier.acceptableRubbers) {
        if (!tier.usesAssemblyLine) {
            event.remove({id: `gtceu:shaped/electric_pump_${tier.name}_${rubber}`});
            event.remove({id: `gtceu:assembler/electric_pump_${tier.name}_${rubber}`});
            
            // note: this seems to use the rotor material progression, so it's been changed to use
            // that for screws too.
            event.recipes.gtceu.assembler(`nijika:auto/components/${tier.name}/pump/${rubber}`)
                .itemInputs(
                    tier.singleCable,
                    tier.materials.pipe.component("normal_fluid_pipe"),
                    tier.materials.rotor.component("screw"),
                    tier.materials.rotor.component("rotor"),
                    `2x gtceu:${rubber}_ring`,
                    `gtceu:${tier.name}_electric_motor`
                )
                .itemOutputs(`gtceu:${tier.name}_electric_pump`)
                .EUt(30)
                .duration(100);
        }
    }
}

/**
 * Rewrites the robot arm recipe for the provided tier.
 * 
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
const rewriteRobotArmRecipes = (event, tier) => {
    event.remove({id: `gtceu:shaped/robot_arm_${tier.name}`});
    if (!tier.usesAssemblyLine) {
        event.remove({id: `gtceu:assembler/robot_arm_${tier.name}`});

        event.shaped(
            `gtceu:${tier.name}_robot_arm`,
            ["WWW", "MRM", "PCR"],
            {
                W: tier.singleCable,
                M: `gtceu:${tier.name}_electric_motor`,
                R: tier.primaryRod,
                P: `gtceu:${tier.name}_electric_piston`,
                C: tier.circuitTag
            }
        ).id(`nijika:auto/components/${tier.name}/shaped/robot_arm`);

        event.recipes.gtceu.assembler(`nijika:auto/components/${tier.name}/assemble/robot_arm`)
            .itemInputs(
                `3x ${tier.singleCable}`,
                `2x gtceu:${tier.name}_electric_motor`,
                `2x ${tier.primaryRod}`,
                `gtceu:${tier.name}_electric_piston`,
                tier.circuitTag,
            )
            .itemOutputs(`gtceu:${tier.name}_robot_arm`)
            .EUt(30)
            .duration(100);
    }
}

/**
 * Rewrites the material tiers for all tier-based components.
 */
export const rewriteComponentTieredRecipes = (event) => {
    // LV has extra duplicated recipes we need to delete.
    event.remove({id: "gtceu:shaped/electric_motor_lv_iron"});
    event.remove({id: "gtceu:shaped/electric_motor_lv_steel"});
    event.remove({id: "gtceu:assembler/electric_motor_lv_steel"});
    event.remove({id: "gtceu:assembler/electric_motor_lv_iron"});

    for (let tier of GT_MACHINE_TIERS) {
        applyHullcasingTiers(event, tier);

        rewriteMotorRecipes(event, tier);
        rewritePistonRecipes(event, tier);
        rewriteConveyorRecipes(event, tier);
        rewritePumpRecipes(event, tier);
        rewriteRobotArmRecipes(event, tier);
    }
}
