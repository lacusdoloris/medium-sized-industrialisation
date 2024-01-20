/**
 * @typedef {Object} CableTier
 * @property {string} name
 * @property {string} plate_primary
 * @property {string} plate_secondary
 * @property {string} cable
 */

/**
 * @returns {CableTier}
 */
const _tierFn = (name, plate_primary, plate_secondary, cable) => {
    return {
        name: name,
        plate_primary: plate_primary,
        plate_secondary: plate_secondary,
        cable: cable,
    }
}


// TODO (less urgent): replace asseembler recipes too
export const GT_MACHINE_TIERS = [
    _tierFn("lv", "wrought_iron", "iron", "tin"),
    _tierFn("mv", "steel", "wrought_iron", "copper"),
    _tierFn("hv", "aluminium", "polyethylene", "gold"),
    _tierFn("ev", "stainless_steel", "polyethylene", "aluminium"),
    _tierFn("iv", "titanium", "polytetrafluoroethylene", "platinum"),
    _tierFn("luv", "tungsten_steel", "polytetrafluoroethylene", "niobium_titanium"),
    _tierFn("zpm", "rhodium_plated_palladium", "polytetrafluoroethylene", "vanadium_gallium"),
    _tierFn("uv", "naquadah_alloy", "polybenzimidazole", "yttrium_barium_cuprate"),
    _tierFn("uhv", "darmstadium", "polybenzimidazole", "europium"),
]

const GT_WIRE_TYPES = [
    [1, "single"], 
    [2, "double"], 
    [4, "quadruple"], 
    [8, "octal"], 
    [16, "hex"],
]

// don't want to make it obviously superior to the bending machine, so this only supports a 
// short list.
/** 
 * A list of specific plates that should get a pressing recipe. 
 */
const SPECIFIC_PLATES = [
    "magnetic_iron",
    "rubber",
    "wrought_iron",
]

/**
 * Rewrites machine hulls and casing to move their materials up an additional tier.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const applyHullcasingTiers = (event) => {
    for (let tier of GT_MACHINE_TIERS) {
        event.remove({id: `gtceu:shaped/casing_${tier.name}`});
        event.remove({id: `gtceu:assembler/casing_${tier.name}`});
        event.remove({id: `gtceu:shaped/${tier.name}_machine_hull`});
        event.remove({id: `gtceu:arc_furnace/arc_${tier.name}_machine_casing`});

        event.shaped(
            `1x gtceu:${tier.name}_machine_casing`,
            ["PPP", "P P", "PPP"],
            {P: `#forge:plates/${tier.plate_primary}`}
        ).id(`gtceu:shaped/casing_${tier.name}`);

        event.recipes.gtceu.assembler(`gtceu:assembler/casing_${tier.name}`)
            .itemInputs(`8x #forge:plates/${tier.plate_primary}`)
            .itemOutputs(`1x gtceu:${tier.name}_machine_casing`)
            .circuit(8)
            .EUt(16)
            .duration(50);

        event.shaped(
            `1x gtceu:${tier.name}_machine_hull`,
            ["SPS", "CHC"],
            {
                S: `#forge:plates/${tier.plate_secondary}`,
                P: `#forge:plates/${tier.plate_primary}`,
                C: `gtceu:${tier.cable}_single_cable`,
                H: `gtceu:${tier.name}_machine_casing`
            }
        ).id(`gtceu:shaped/${tier.name}_machine_hull`);
    }
}

/**
 * Adds automatic Create-based recipes for LV/MV tier materials.
 *  
 * @param {Internal.RecipesEventJS} event
 */
export const addCreateLvMvMaterialRecipes = (event, addRod) => {
    /** @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material */
    const addWireRecipes = (material, addRod) => {
        // let the record show that I got really fucking confused by this and wondered why
        // i couldn't find any wiremill recipes for the wires, only to realise I needed to swap
        // pages on EMI.
        
        if (material.hasFlag(GTMaterialFlags.GENERATE_FINE_WIRE)) {
            event.recipes.createaddition.rolling(
                `2x gtceu:${material.name}_fine_wire`,
                `1x gtceu:${material.name}_single_wire`
            ).id(`nijika:auto/wires/${material.name}_fine_wire`)
        }

        // rolling machine recipes for wires from rods
        if (addRod) {
            event.recipes.createaddition.rolling(
                `1x gtceu:${material.name}_single_wire`,
                `1x #forge:rods/${material.name}`
            ).id(`nijika:auto/wires/${material.name}`)
        }

        /** @type {Internal.WireProperties} */
        let wireProps = material.getProperty(PropertyKey.WIRE);

        // MV and lower wires get a spout filling recipe ONLY
        if (wireProps.voltage <= GTValues.V[GTValues.MV] && !wireProps.isSuperconductor()) {
            let counter = 0;
            for (let [multiplier, type] of GT_WIRE_TYPES) {
                event.recipes.create.filling(
                    `1x gtceu:${material.name}_${type}_cable`,
                    [
                        `1x gtceu:${material.name}_${type}_wire`,
                        Fluid.of("gtceu:rubber").withAmount(144 * FluidAmounts.MB * multiplier)
                    ]
                ).id(`nijika:auto/cables/${material.name}_${type}`);

                // make sure there's no rubber plate recipe anymore
                event.remove({id: `gtceu:shapeless/${material.name}_cable_${++counter}`});
            }
        }
    }

    GTRegistries.MATERIALS.forEach((material) => {
        let id = material.name;
        let hasWire = material.hasProperty(PropertyKey.WIRE);
        let hasRod = material.hasFlag(GTMaterialFlags.GENERATE_ROD);
        let hasPlate = material.hasFlag(GTMaterialFlags.GENERATE_PLATE);

        if (material.hasFlag(GTMaterialFlags.GENERATE_FOIL)) {
            event.recipes.create.pressing(
                `2x gtceu:${id}_foil`,
                `#forge:plates/${id}`
            );
        }

        // auto-generate millstone + crushing wheel recipes for mortar recipes.
        if (material.hasFlag(GTMaterialFlags.MORTAR_GRINDABLE)) {
            let recipeId = `nijika:auto/dust/${id}`;
            if (material.hasProperty(PropertyKey.INGOT)) {
                event.recipes.create.milling(
                    `1x gtceu:${id}_dust`,
                    `#forge:ingots/${id}`
                ).id(recipeId);
            } else if (material.hasProperty(PropertyKey.GEM)) {
                event.recipes.create.milling(
                    `1x gtceu:${id}_dust`,
                    `#forge:gems/${id}`
                ).id(recipeId);
            }
        }

        if (hasRod) {
            // yeeah, idk either. thanks gtceu.
            if (Item.exists(`gtceu:${id}_rod`)) {
                event.recipes.createaddition.rolling(
                    `1x gtceu:${id}_rod`,
                    `1x #forge:ingots/${id}`
                ).id(`nijika:auto/rods/${id}`);
            } else if (id !== "wood") {
                console.log("what the fuck, gtceu? missing a rod for " + id);
            }
        }

        if (hasWire) {
            addWireRecipes(material, hasRod);
        }
    });
}

/**
 * Adds pressing recipes for the plates that are otherwise missing it.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const addPressingRecipes = (event) => {
    for (let plate of SPECIFIC_PLATES) {
        event.recipes.create.pressing(
            `1x gtceu:${plate}_plate`,
            `1x #forge:ingots/${plate}`
        ).id(`nijika:common/pressing/${plate}`);
    }
}
