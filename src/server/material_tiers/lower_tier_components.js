// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { GT_MACHINE_TIERS, Tier } from "../../shared/definition";

/**
 * Rewrites machine hulls and casing to move their materials up an additional tier.
 *
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
export const applyHullcasingTiers = (event, tier) => {
    event.remove({ id: `gtceu:shaped/casing_${tier.name}` });
    event.remove({ id: `gtceu:assembler/casing_${tier.name}` });
    event.remove({ id: `gtceu:shaped/${tier.name}_machine_hull` });
    event.remove({ id: `gtceu:arc_furnace/arc_${tier.name}_machine_casing` });

    event
        .shaped(`1x gtceu:${tier.name}_machine_casing`, ["PPP", "P P", "PPP"], {
            P: tier.primaryPlate,
        })
        .id(`gtceu:shaped/casing_${tier.name}`);

    event.recipes.gtceu
        .assembler(`gtceu:assembler/casing_${tier.name}`)
        .itemInputs(`8x ${tier.primaryPlate}`)
        .itemOutputs(tier.machineCasing)
        .circuit(8)
        .EUt(16)
        .duration(50);

    event
        .shaped(`2x gtceu:${tier.name}_machine_hull`, ["SPS", "CHC"], {
            S: tier.hullExtraPlate,
            P: tier.primaryPlate,
            C: tier.singleCable,
            H: `gtceu:${tier.name}_machine_casing`,
        })
        .id(`gtceu:shaped/${tier.name}_machine_hull`);
};

/**
 * Adds a single motor recipe for the provided tier.
 *
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
export const rewriteMotorRecipes = (event, tier) => {
    event.remove({ id: `gtceu:shaped/electric_motor_${tier.name}` });
    event
        .shaped(`2x gtceu:${tier.name}_electric_motor`, ["CWR", "WMW", "RWC"], {
            C: tier.singleCable,
            W: tier.doubleMotorWire,
            M: tier.magneticRod,
            R: tier.effectiveRodWithLVHardcode,
        })
        .id(`nijika:auto/${tier.name}/motor/shaped`);

    event.remove({ id: `gtceu:assembler/electric_motor_${tier.name}` });

    event.recipes.gtceu
        .assembler(`nijika:auto/${tier.name}/motor/assembler`)
        .itemInputs(
            `2x ${tier.singleCable}`,
            `4x ${tier.doubleMotorWire}`,
            `2x ${tier.effectiveRodWithLVHardcode}`,
            `${tier.magneticRod}`
        )
        .itemOutputs(`4x gtceu:${tier.name}_electric_motor`)
        .EUt(30)
        .duration(100);
};

/**
 * Rewrites the piston recipe for the provided tier.
 *
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
export const rewritePistonRecipes = (event, tier) => {
    let gear =
        typeof tier.materials.gear === "undefined" ? tier.materials.plate : tier.materials.gear;

    event.remove({ id: `gtceu:shaped/electric_piston_${tier.name}` });
    event
        .shaped(`2x gtceu:${tier.name}_electric_piston`, ["PPP", "CRR", "CMG"], {
            P: tier.primaryPlate,
            C: tier.singleCable,
            R: tier.effectiveRodWithLVHardcode,
            M: `gtceu:${tier.name}_electric_motor`,
            G: gear.tagged("small_gears"),
        })
        .id(`nijika:auto/${tier.name}/piston/shaped`);

    event.remove({ id: `gtceu:assembler/electric_piston_${tier.name}` });
    event.recipes.gtceu
        .assembler(`nijika:auto/${tier.name}/piston/assembler`)
        .itemInputs(
            `3x ${tier.primaryPlate}`,
            `2x ${tier.singleCable}`,
            `2x ${tier.effectiveRodWithLVHardcode}`,
            `gtceu:${tier.name}_electric_motor`,
            gear.tagged("small_gears")
        )
        .itemOutputs(`4x gtceu:${tier.name}_electric_piston`)
        .EUt(30)
        .duration(100);
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
        event.remove({ id: `gtceu:shaped/conveyor_module_${tier.name}_${rubber}` });
        event
            .shaped(`2x gtceu:${tier.name}_conveyor_module`, ["RRR", "MCM", "RRR"], {
                R: `#forge:plates/${rubber}`,
                M: `gtceu:${tier.name}_electric_motor`,
                C: tier.singleCable,
            })
            .id(`nijika:auto/${tier.name}/conveyor/${rubber}/shaped`);

        event.remove({ id: `gtceu:assembler/conveyor_module_${tier.name}_${rubber}` });
        event.recipes.gtceu
            .assembler(`nijika:auto/${tier.name}/conveyor/${rubber}/assembler`)
            .itemInputs(tier.singleCable, `2x gtceu:${tier.name}_electric_motor`)
            .inputFluids(Fluid.of(`gtceu:${rubber}`).withAmount(844))
            .itemOutputs(`4x gtceu:${tier.name}_conveyor_module`)
            .EUt(30)
            .duration(100);
    }
};

/**
 * Rewrites the electric pump recipe for the provided tier.
 *
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
const rewritePumpRecipes = (event, tier) => {
    // these only have assembler recipes, because fuck manual tool recipes
    for (let rubber of tier.acceptableRubbers) {
        // note: this seems to use the rotor material progression, so it's been changed to use
        // that for screws too.
        event.recipes.gtceu
            .assembler(`nijika:auto/components/${tier.name}/pump/${rubber}`)
            .itemInputs(
                tier.singleCable,
                tier.materials.pipe.component("normal_fluid_pipe"),
                tier.materials.rotor.component("screw"),
                tier.materials.rotor.component("rotor"),
                `2x gtceu:${rubber}_ring`,
                `gtceu:${tier.name}_electric_motor`
            )
            .itemOutputs(`4x gtceu:${tier.name}_electric_pump`)
            .EUt(30)
            .duration(100);
    }
};

/**
 * Rewrites the robot arm recipe for the provided tier.
 *
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
const rewriteRobotArmRecipes = (event, tier) => {
    event.remove({ id: `gtceu:shaped/robot_arm_${tier.name}` });
    event.remove({ id: `gtceu:assembler/robot_arm_${tier.name}` });

    event
        .shaped(`2x gtceu:${tier.name}_robot_arm`, ["WWW", "MRM", "PCR"], {
            W: tier.singleCable,
            M: `gtceu:${tier.name}_electric_motor`,
            R: tier.primaryRod,
            P: `gtceu:${tier.name}_electric_piston`,
            C: tier.circuitTag,
        })
        .id(`nijika:auto/components/${tier.name}/robot_arm/shaped`);

    event.recipes.gtceu
        .assembler(`nijika:auto/components/${tier.name}/robot_arm/assembler`)
        .itemInputs(
            `3x ${tier.singleCable}`,
            `2x gtceu:${tier.name}_electric_motor`,
            `2x ${tier.primaryRod}`,
            `gtceu:${tier.name}_electric_piston`,
            tier.circuitTag
        )
        .itemOutputs(`4x gtceu:${tier.name}_robot_arm`)
        .EUt(30)
        .duration(100);
};

/**
 * Rewrites the voltage coil recipes for the provided tier.
 *
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
const rewriteVoltageCoilRecipes = (event, tier) => {
    event.remove({ id: `gtceu:assembler/voltage_coil_${tier.name}` });

    event.recipes.gtceu
        .assembler(`nijika:auto/components/${tier.name}/voltage_coil`)
        .itemInputs(tier.magneticRod, `16x ${tier.materials.motorWire.tagged("fine_wires")}`)
        .itemOutputs(`2x gtceu:${tier.name}_voltage_coil`)
        .circuit(1)
        .duration(10 * 20)
        // notably, the coil durations *are* based on tier.
        .EUt(GTValues.VA[GTValues[tier.name.toUpperCase()]]);
};

/**
 * Rewrites the sensor and emitter recipes for the provided tier.
 *
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
const rewriteSensorEmitterRecipes = (event, tier) => {
    event.remove({ id: `gtceu:shaped/sensor_${tier.name}` });
    event.remove({ id: `gtceu:assembler/sensor_${tier.name}` });

    event
        .shaped(`2x gtceu:${tier.name}_sensor`, ["P G", "PR ", "CPP"], {
            P: tier.primaryPlate,
            G: tier.materials.emitterGem,
            R: tier.materials.emitterRod.tagged("rods"),
            C: tier.circuitTag,
        })
        .id(`nijika:auto/components/${tier.name}/sensor/shaped`);

    event.recipes.gtceu
        .assembler(`nijika:auto/components/${tier.name}/sensor/assembler`)
        .itemInputs(
            tier.materials.emitterRod.tagged("rods"),
            `4x ${tier.primaryPlate}`,
            tier.circuitTag,
            tier.materials.emitterGem
        )
        .itemOutputs(`4x gtceu:${tier.name}_sensor`)
        .EUt(GTValues.VA[GTValues.LV])
        .duration(5 * 20);

    event.remove({ id: `gtceu:shaped/emitter_${tier.name}` });
    event.remove({ id: `gtceu:assember/emitter_${tier.name}` });

    event
        .shaped(`2x gtceu:${tier.name}_emitter`, ["WRC", "RGR", "CRW"], {
            W: tier.singleCable,
            R: tier.materials.emitterRod.tagged("rods"),
            C: tier.circuitTag,
            G: tier.materials.emitterGem,
        })
        .id(`nijika:auto/components/${tier.name}/emitter/shaped`);

    event.recipes.gtceu
        .assembler(`nijika:auto/components/${tier.name}/emitter/assembler`)
        .itemInputs(
            `4x ${tier.materials.emitterRod.tagged("rods")}`,
            `2x ${tier.singleCable}`,
            `2x ${tier.circuitTag}`,
            tier.materials.emitterGem
        )
        .itemOutputs(`4x gtceu:${tier.name}_emitter`)
        .EUt(GTValues.VA[GTValues.LV])
        .duration(5 * 20)
        .circuit(1);
};

/**
 * Rewrites the material tiers for all tier-based components.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const rewriteLowerTierComponentRecipes = (event) => {
    // LV has extra duplicated recipes we need to delete.
    event.remove({ id: "gtceu:shaped/electric_motor_lv_iron" });
    event.remove({ id: "gtceu:shaped/electric_motor_lv_steel" });
    event.remove({ id: "gtceu:assembler/electric_motor_lv_steel" });
    event.remove({ id: "gtceu:assembler/electric_motor_lv_iron" });

    // electric pumps use *any* rubber ring, so don't allow that.
    event.remove({ output: /gtceu:.*_electric_pump/, type: "gtceu:assembler" });

    for (let tier of Object.values(GT_MACHINE_TIERS)) {
        applyHullcasingTiers(event, tier);
        rewriteVoltageCoilRecipes(event, tier);

        if (tier.usesAssemblyLine) continue;

        rewriteMotorRecipes(event, tier);
        rewritePistonRecipes(event, tier);
        rewriteConveyorRecipes(event, tier);
        rewritePumpRecipes(event, tier);
        rewriteRobotArmRecipes(event, tier);
        rewriteSensorEmitterRecipes(event, tier);
    }
};
