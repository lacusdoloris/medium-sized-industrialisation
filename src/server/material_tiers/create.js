const PropertyKey = Java.loadClass(
    "com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey"
);

import { iterateOverAllMaterials } from "../../shared/utils";
import { GT_WIRE_TYPES } from "../../shared/definition";

// don't want to make it obviously superior to the bending machine, so this only supports a
// short list.
/**
 * A list of specific plates that should get a pressing recipe.
 */
const SPECIFIC_PLATES = [
    "magnetic_iron",
    "rubber",
    "wrought_iron",
    "bronze",
    "silver",
    "tin",
    "corinthian_bronze",
];

/**
 * Adds automatic Create-based recipes for LV/MV tier materials.
 *
 * @param {Internal.RecipesEventJS} event
 */
const addCreateLvMvMaterialRecipes = (event) => {
    /** @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material */
    const addWireRecipes = (material, addRod) => {
        // let the record show that I got really fucking confused by this and wondered why
        // i couldn't find any wiremill recipes for the wires, only to realise I needed to swap
        // pages on EMI.

        if (material.hasFlag(GTMaterialFlags.GENERATE_FINE_WIRE)) {
            event.recipes.createaddition
                .rolling(
                    `2x gtceu:fine_${material.name}_wire`,
                    `1x gtceu:${material.name}_single_wire`
                )
                .id(`nijika:auto/wires/${material.name}_fine_wire`);
        }

        // rolling machine recipes for wires from rods
        if (addRod) {
            event.recipes.createaddition
                .rolling(`1x gtceu:${material.name}_single_wire`, `1x #forge:rods/${material.name}`)
                .id(`nijika:auto/wires/${material.name}`);
        }

        /** @type {Internal.WireProperties} */
        let wireProps = material.getProperty(PropertyKey.WIRE);

        // MV and lower wires get a spout filling recipe ONLY
        if (wireProps.voltage <= GTValues.V[GTValues.MV] && !wireProps.isSuperconductor()) {
            let counter = 0;
            for (let [multiplier, type] of GT_WIRE_TYPES) {
                event.recipes.create
                    .filling(`1x gtceu:${material.name}_${type}_cable`, [
                        `1x gtceu:${material.name}_${type}_wire`,
                        Fluid.of("gtceu:rubber").withAmount(144 * FluidAmounts.MB * multiplier),
                    ])
                    .id(`nijika:auto/cables/${material.name}_${type}`);

                // make sure there's no rubber plate recipe anymore
                event.remove({ id: `gtceu:shapeless/${material.name}_cable_${++counter}` });
            }
        }
    };

    iterateOverAllMaterials((material) => {
        let id = material.name;
        let modId = material.modid == "nijika" ? "gtceu" : material.modid;
        let hasWire = material.hasProperty(PropertyKey.WIRE);
        let hasRod = material.hasFlag(GTMaterialFlags.GENERATE_ROD);

        if (material.hasFlag(GTMaterialFlags.GENERATE_FOIL)) {
            if (!Item.exists(`${modId}:${id}_foil`)) {
                console.warn("missing foil for " + modId + ":" + id + "???");
            } else {
                event.recipes.createaddition.rolling(
                    `2x ${modId}:${id}_foil`,
                    `#forge:plates/${id}`
                );
            }
            3;
        }

        // auto-generate millstone + crushing wheel recipes for mortar recipes.
        if (material.hasFlag(GTMaterialFlags.MORTAR_GRINDABLE)) {
            let recipeId = `nijika:auto/dust/${id}`;
            if (material.hasProperty(PropertyKey.INGOT)) {
                event.recipes.create
                    .milling(`1x ${modId}:${id}_dust`, `#forge:ingots/${id}`)
                    .id(recipeId);
            } else if (material.hasProperty(PropertyKey.GEM)) {
                event.recipes.create
                    .milling(`1x ${modId}:${id}_dust`, `#forge:gems/${id}`)
                    .id(recipeId);
            }
        }

        if (hasRod) {
            // yeeah, idk either. thanks gtceu.
            if (Item.exists(`${modId}:${id}_rod`)) {
                event.recipes.createaddition
                    .rolling(`1x ${modId}:${id}_rod`, `1x #forge:ingots/${id}`)
                    .id(`nijika:auto/rods/${id}`);
            } else if (id !== "wood") {
                console.log("what the fuck, gtceu? missing a rod for " + id);
            }
        }

        if (hasWire) {
            addWireRecipes(material, hasRod);
        }
    });
};

/**
 * Adds pressing recipes for the plates that are otherwise missing it.
 *
 * @param {Internal.RecipesEventJS} event
 */
const addPressingRecipes = (event) => {
    for (let plate of SPECIFIC_PLATES) {
        event.recipes.create
            .pressing(`1x gtceu:${plate}_plate`, `1x #forge:ingots/${plate}`)
            .id(`nijika:common/pressing/${plate}`);
    }
};

/**
 * Adds early-game Create recipes.
 */
export const addCreateRecipes = (event) => {
    addCreateLvMvMaterialRecipes(event);
    addPressingRecipes(event);
};
