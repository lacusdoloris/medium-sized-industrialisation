// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { rewriteLowerTierComponentRecipes } from "./lower_tier_components";
import { addCreateRecipes } from "./create";
import { adjustExtruderBasePlateRecipe, fixExtruderRecipeTier } from "./extruder";
import { MODPACK_SETTINGS } from "../../settings";
import { adjustMachineRecipesForTier } from "./machines";
import { GT_MACHINE_TIERS, GT_WIRE_TYPES } from "../../shared/definition";
import { fixLensRecipes } from "./lenses";
import { adjustGtGeneratorTiers } from "./generators";
import { adjustMultiblockComponentsForTier } from "./multiblock";
import { getStackForTagPrefix, getToolProperty, iterateOverAllMaterials } from "../../shared/utils";
import { BASE_ORES } from "../../shared/ores/bocchi";
import { adjustCircuitRecipes } from "./circuits";

const PropertyKey = Java.loadClass(
    "com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey"
);

/**
 * Adds automatic recipes for all applicable materials.
 *
 * @param {Internal.RecipesEventJS} event
 */
const addAutomaticMaterialRecipes = (event) => {
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
            // additionally, single wires get a deployer covering recipe
            event.recipes.create
                .deploying(`1x gtceu:${material.name}_single_cable`, [
                    "1x gtceu:rubber_plate",
                    `1x gtceu:${material.name}_single_wire`,
                ])
                .id(`nijika:auto/cables/${material.name}_deploying`);

            for (let [multiplier, type] of GT_WIRE_TYPES) {
                event.recipes.create
                    .filling(`1x gtceu:${material.name}_${type}_cable`, [
                        `1x gtceu:${material.name}_${type}_wire`,
                        Fluid.of("gtceu:rubber").withAmount(144 * FluidAmounts.MB * multiplier),
                    ])
                    .id(`nijika:auto/cables/${material.name}_${type}`);

                // make sure there's no rubber plate recipe anymore

                event.remove({ id: `gtceu:shapeless/${material.name}_cable_${multiplier}` });
            }
        }
    };

    iterateOverAllMaterials((material) => {
        let id = material.name;
        let modId = material.modid == "nijika" ? "gtceu" : material.modid;
        let hasWire = material.hasProperty(PropertyKey.WIRE);
        let hasIngot = material.hasProperty(PropertyKey.INGOT);
        let hasRod = material.hasFlag(GTMaterialFlags.GENERATE_ROD);

        if (material.hasFlag(GTMaterialFlags.GENERATE_FOIL)) {
            if (!Item.exists(`${modId}:${id}_foil`)) {
                console.warn("missing foil for " + modId + ":" + id + "???");
            } else {
                event.recipes.createaddition
                    .rolling(`2x ${modId}:${id}_foil`, `#forge:plates/${id}`)
                    .id(`nijika:auto/foil/${id}`);
            }
        }

        // auto-generate millstone + crushing wheel recipes for mortar recipes.
        if (material.hasFlag(GTMaterialFlags.MORTAR_GRINDABLE) && id !== "coal") {
            let recipeId = `nijika:auto/dust/${id}`;
            if (hasIngot) {
                event.recipes.create
                    .milling(`1x ${modId}:${id}_dust`, `#forge:ingots/${id}`)
                    .id(recipeId);
            } else if (material.hasProperty(PropertyKey.GEM)) {
                event.recipes.create
                    .milling(`1x ${modId}:${id}_dust`, `#forge:gems/${id}`)
                    .id(recipeId);
            }
        }

        // automatic ore recipes:
        // either 1) remove all ore processing as we'll do it ourselves
        // or 2) add create crushing wheel recipes here.
        if (material.hasProperty(PropertyKey.ORE)) {
            if (material.hasFlag(GTMaterialFlags.NO_ORE_PROCESSING_TAB)) {
                event.remove({ input: `#forge:crushed_ores/${material.getName()}` });
            } else {
                event.recipes.create
                    .crushing(`1x ${modId}:crushed_${id}_ore`, `1x #forge:raw_materials/${id}`)
                    .id(`nijika:auto/create/ore/${id}_raw_to_crushed`);
                event.recipes.create
                    .crushing(`1x ${modId}:impure_${id}_dust`, `1x ${modId}:crushed_${id}_ore`)
                    .id(`nijika:auto/create/ore/${id}_crushed_to_impure`);

                // weird if statement lets us combine everything into one chain rather than a nested
                // if.
                if (typeof BASE_ORES[id] !== "undefined") {
                    // pass
                } else if (id === "redstone") {
                    event.recipes.create
                        .splashing("1x minecraft:redstone", `1x ${modId}:impure_${id}_dust`)
                        .id(`nijika:auto/create/ore/${id}_impure_to_dust`);
                } else {
                    event.recipes.create
                        .splashing(`1x ${modId}:${id}_dust`, `1x ${modId}:impure_${id}_dust`)
                        .id(`nijika:auto/create/ore/${id}_impure_to_dust`);
                }
            }
        }

        if (hasIngot) {
            event.recipes.gtceu
                .cutter(`nijika:auto/nuggets/${id}`)
                .itemInputs(`1x #forge:ingots/${id}`)
                .inputFluids(Fluid.of("minecraft:water").withAmount(10 * FluidAmounts.MB))
                .itemOutputs(getStackForTagPrefix(TagPrefix.nugget, material).withCount(9))
                .EUt(GTValues.VHA[GTValues.ULV])
                .duration(2 * 20);

            event.recipes.gtceu
                .compressor(`nijika:auto/compressor/${id}/nugget_to_ingot`)
                .itemInputs(`9x #forge:nuggets/${id}`)
                .itemOutputs(getStackForTagPrefix(TagPrefix.ingot, material))
                .EUt(2)
                .duration(10);

            event.recipes.gtceu
                .compressor(`nijika:auto/compressor/${id}/ingot_to_block`)
                .itemInputs(`9x #forge:ingots/${id}`)
                .itemOutputs(getStackForTagPrefix(TagPrefix.block, material))
                .EUt(2)
                .duration(10);

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
        }

        // auto-generate mining hammer recipes
        if (material.hasProperty(PropertyKey.TOOL) && MODPACK_SETTINGS.deleteToolRecipes) {
            let toolProp = getToolProperty(material);
            if (toolProp.hasType(GTToolType.MINING_HAMMER)) {
                let what = hasIngot ? `#forge:ingots/${id}` : `#forge:plates/${id}`;

                event
                    .shaped(`${modId}:${id}_mining_hammer`, ["WW ", "WWS", "WW "], {
                        W: what,
                        S: "#forge:rods/wood",
                    })
                    .id(`nijika:auto/tools/mining_hammer/${id}`);
            }
        }

        if (hasWire) {
            addWireRecipes(material, hasRod);
        }
    });
};

/**
 * Adjusts recipes relating to the deep storage units (super/quantum chests and tanks).
 *
 * This has to be manually adjusted to match the appropriate crate tier.
 *
 * @param {Internal.RecipesEventJS} event
 */
const adjustSuperChestRecipes = (event) => {
    event.remove({ output: /gtceu:.v_super_chest/ });

    event
        .shaped("gtceu:lv_super_chest", ["CPC", "PKP", "CPC"], {
            P: GT_MACHINE_TIERS.LV.primaryPlate,
            C: GT_MACHINE_TIERS.LV.circuitTag,
            K: "gtceu:bronze_crate",
        })
        .id("nijika:super_chests/lv");

    // lol at how completely wrongly coloured these aree
    event
        .shaped("gtceu:mv_super_chest", ["CPC", "PKP", "CPC"], {
            P: GT_MACHINE_TIERS.MV.primaryPlate,
            C: GT_MACHINE_TIERS.MV.circuitTag,
            K: "gtceu:steel_crate",
        })
        .id("nijika:super_chests/mv");

    event
        .shaped("gtceu:hv_super_chest", ["CPC", "PKP", "CFC"], {
            P: GT_MACHINE_TIERS.HV.primaryPlate,
            C: GT_MACHINE_TIERS.HV.circuitTag,
            K: "gtceu:aluminium_crate",
            F: "gtceu:lv_field_generator",
        })
        .id("nijika:super_chests/hv");

    event
        .shaped("gtceu:ev_super_chest", ["CPC", "PKP", "CFC"], {
            P: GT_MACHINE_TIERS.EV.primaryPlate,
            C: GT_MACHINE_TIERS.EV.circuitTag,
            K: "gtceu:titanium_crate", // TODO: nitinol
            F: "gtceu:mv_field_generator",
        })
        .id("nijika:super_chests/ev");

    event.remove({ output: /gtceu:.v_super_tank/ });

    let counter = 1 * FluidAmounts.BUCKET;
    for (let tier of ["lv", "mv", "hv", "ev"]) {
        event.recipes.gtceu
            .assembler(`nijika:super_tanks/${tier}`)
            .itemInputs(`1x gtceu:${tier}_super_chest`)
            .inputFluids(Fluid.of("gtceu:creosote").withAmount(counter))
            .itemOutputs(`1x gtceu:${tier}_super_tank`)
            .EUt(GTValues.VA[GTValues.LV])
            .duration(5 * 20);

        counter *= 2;
    }
};

/**
 * Adjusts recipes relating to the material system and BI's adjusted tiers.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustMaterialTierRecipes = (event) => {
    if (!MODPACK_SETTINGS.applyTierAdjustments) return;

    // remove the existing extruder recipes for the categories we'ree going to change...
    event.remove({
        type: "gtceu:extruder",
        input: /gtceu:(?:small_)?(?:gear|rotor|bolt)_(?:extruder|casting)_mold/,
    });

    event.remove({
        type: "gtceu:extruder",
        input: /gtceu:(?:tiny|small|normal|large|huge)_pipe_extruder_mold/,
    });

    // ... and also remove the completely useless ones that just clog up EMI.
    event.remove({
        type: "gtceu:extruder",
        input: /gtceu:(?:long_)?(?:rod|block|wire|plate|ingot|ring)_extruder_mold/,
    });

    // remove the fucking FIFTEEN SECOND compressor recipe which I'm sure is only there
    // to punish you for wrought iron. this will be replaced with a nice ten tick one
    event.remove({ type: "gtceu:compressor", input: "#forge:nuggets" });
    event.remove({ type: "gtceu:compressor", input: "#forge:ingots" });

    addAutomaticMaterialRecipes(event);
    addCreateRecipes(event);
    rewriteLowerTierComponentRecipes(event);
    fixExtruderRecipeTier(event);
    adjustExtruderBasePlateRecipe(event);
    fixLensRecipes(event);
    adjustGtGeneratorTiers(event);
    adjustSuperChestRecipes(event);
    adjustCircuitRecipes(event);

    for (let tier of Object.values(GT_MACHINE_TIERS)) {
        adjustMachineRecipesForTier(event, tier);
        adjustMultiblockComponentsForTier(event, tier);
    }
};
