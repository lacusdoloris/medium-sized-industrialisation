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
        {P: tier.primary_plate}
    ).id(`gtceu:shaped/casing_${tier.name}`);

    event.recipes.gtceu.assembler(`gtceu:assembler/casing_${tier.name}`)
        .itemInputs(`8x ${tier.primary_plate}`)
        .itemOutputs(`1x gtceu:${tier.name}_machine_casing`)
        .circuit(8)
        .EUt(16)
        .duration(50);

    event.shaped(
        `1x gtceu:${tier.name}_machine_hull`,
        ["SPS", "CHC"],
        {
            S: tier.secondary_plate,
            P: tier.primary_plate,
            C: tier.single_cable,
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
export const addMotorRecipe = (event, tier) => {
    event.remove({id: `gtceu:shaped/electric_motor_${tier.name}`});
    
    if (!tier.uses_assembly_line) {
        event.shaped(
            `1x gtceu:${tier.name}_electric_motor`,
            ["CWR", "WMW", "RWC"],
            {
                C: tier.single_cable,
                W: tier.motor_wire,
                M: tier.magnetic_rod,
                R: tier.effective_rod_for_lv
            }
        ).id(`nijika:auto/${tier.name}/shaped/motor`);

        event.remove({id: `gtceu:assembler/electric_motor_${tier.name}`});

        event.recipes.gtceu.assembler(`nijika:auto/${tier.name}/assembler/motor`)
            .itemInputs(
                `2x ${tier.single_cable}`,
                `4x ${tier.motor_wire}`,
                `2x ${tier.effective_rod_for_lv}`,
                `${tier.magnetic_rod}`
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
export const addPistonRecipe = (event, tier) => {
    event.remove({id: `gtceu:shaped/electric_piston_${tier.name}`});

    if (!tier.uses_assembly_line) {
        event.shaped(
            `1x gtceu:${tier.name}_electric_piston`,
            ["PPP", "CRR", "CMG"],
            {
                P: tier.primary_plate,
                C: tier.single_cable,
                R: tier.effective_rod_for_lv,
                M: `gtceu:${tier.name}_electric_motor`,
                G: `#forge:small_gears/${tier.primary_material.materialName}`
            }
        ).id(`nijika:auto/${tier.name}/shaped/piston`);

        event.remove({id: `gtceu:assembler/electric_piston_${tier.name}`})
        event.recipes.gtceu.assembler(`nijika:auto/${tier.name}/assembler/piston`)
            .itemInputs(
                `3x ${tier.primary_plate}`,
                `2x ${tier.single_cable}`,
                `2x ${tier.effective_rod_for_lv}`,
                `gtceu:${tier.name}_electric_motor`,
                `#forge:small_gears/${tier.primary_material.materialName}`
            )
            .itemOutputs(
                `1x gtceu:${tier.name}_electric_piston`
            )
            .EUt(30)
            .duration(100);
    }
};

// i'm not entirely sure why i wrote these.
// nevertheless!
/**
 * Rewrites the conveyor recipe for the provided tier.
 * 
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
export const addConveyorRecipe = (event, tier) => {
    let acceptable_rubbers = [
        "styrene_butadiene_rubber"  // always acceptable
    ];

    if (tier.accepts_silicone_rubber) {
        acceptable_rubbers.push("silicone_rubber");
    }
    if (tier.accepts_rubber) {
        acceptable_rubbers.push("rubber");
    }

    for (let rubber of acceptable_rubbers) {
        event.remove({id: `gtceu:shaped/conveyor_module_${tier.name}_${rubber}`});
        if (!tier.uses_assembly_line) {
            event.shaped(
                `gtceu:${tier.name}_conveyor_module`,
                ["RRR", "MCM", "RRR"],
                {
                    R: `#forge:plates/${rubber}`,
                    M: `gtceu:${tier.name}_electric_motor`,
                    C: tier.single_cable,
                }
            ).id(`nijika:auto/${tier.name}/shaped/conveyor/${rubber}`);

            event.remove({id: `gtceu:assembler/conveyor_module_${tier.name}_${rubber}`});
            event.recipes.gtceu.assembler(`nijika:auto/${tier.name}/assembler/conveyor/${rubber}`)
                .itemInputs(
                    tier.single_cable,
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

        addMotorRecipe(event, tier);
        addPistonRecipe(event, tier);
        addConveyorRecipe(event, tier);
    }
}
