// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//
/* eslint-disable no-unexpected-multiline */

const GTCEuAPI = Java.loadClass("com.gregtechceu.gtceu.api.GTCEuAPI");
const TagKey = Java.loadClass("net.minecraft.tags.TagKey");
const BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");

export const GasTier = Java.loadClass(
    "com.gregtechceu.gtceu.api.data.chemical.material.properties.BlastProperty$GasTier"
);
export const PropertyKey = Java.loadClass(
    "com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey"
);

let chemicalHelper$get =
    ChemicalHelper[
        "get(com.gregtechceu.gtceu.api.data.tag.TagPrefix,com.gregtechceu.gtceu.api.data.chemical.material.Material)"
    ];

/** Creates a new ``nijika:${id}`` Identifier. */
export const nijikaId = (id) => new ResourceLocation("nijika", id);

// https://sourcegraph.com/github.com/GregTechCEu/GregTech-Modern/-/blob/src/main/java/com/gregtechceu/gtceu/api/data/chemical/material/IMaterialRegistryManager.java?L12:18-12:42
/**
 * Iterates over all registered materials.
 *
 * @param {materialCallback} fn Called for every instance in the materials registry.
 */
export const iterateOverAllMaterials = (fn) => {
    let mats = GTCEuAPI.materialManager.getRegisteredMaterials();
    mats.forEach(fn);
};

/**
 * @callback materialCallback
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material
 */

/**
 * Gets a single registered material.
 *
 * @param {string} name The name of the material to get.
 * @returns {com.gregtechceu.gtceu.api.data.chemical.material.Material}
 */
export const getMaterial = (name) => {
    let mat = GTCEuAPI.materialManager.getMaterial(name);
    if (mat === null) {
        throw new Error("No such material: " + name);
    }
    return mat;
};

/**
 * Gets the ItemStack associated with this material for the provided TagPrefix.
 *
 * @param {TagPrefix} prefix The tag prefix to use.
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material The material to use.
 */
export const getStackForTagPrefix = (prefix, material) => {
    // fails with a method resolution error unless we use the ``[]`` form.
    return chemicalHelper$get(prefix, material);
};

/** @return {com.gregtechceu.gtceu.api.data.chemical.material.Material} */
const definitelyMaterial = (mat) => {
    let realMat = mat; // don't trust rhino!
    if (typeof realMat === "string") {
        realMat = getMaterial(realMat);
    }
    return realMat;
};

/**
 * Gets the ore property for the provided material.
 *
 * @param {(string|com.gregtechceu.gtceu.api.data.chemical.material.Material)} The material to lookup.
 * @return {Internal.OreProperty}
 */
export const getOreProperty = (material) => {
    return definitelyMaterial(material).getProperty(PropertyKey.ORE);
};

/**
 * Gets the blast property for the provided material.
 *
 * @param {(string|com.gregtechceu.gtceu.api.data.chemical.material.Material)} The material to lookup.
 * @return {Internal.BlastProperty}
 */
export const getBlastProperty = (material) => {
    return definitelyMaterial(material).getProperty(PropertyKey.BLAST);
};

/**
 * Gets the tool property for the provided material.
 *
 * @param {(string|com.gregtechceu.gtceu.api.data.chemical.material.Material)} The material to lookup.
 * @return {ToolProperty}
 */
export const getToolProperty = (material) => {
    return definitelyMaterial(material).getProperty(PropertyKey.TOOL);
};

/**
 * Adds a new rock breaker recipe.
 *
 * @param {Internal.RecipesEventJS} event
 * @param {string} rockType The ID of the rock block to use.
 * @param {number} energy The EUt value for this recipe.
 */
export const addRockBreakingRecipe = (event, rockType, energy) => {
    let rockId = new ResourceLocation(rockType);

    event.recipes.gtceu
        .rock_breaker(`nijika:misc/${rockId.path}_rock_breaker`)
        .notConsumable(rockType)
        .itemOutputs(rockType)
        .duration(16)
        .EUt(energy)
        ["addData(java.lang.String,java.lang.String)"]("fluidA", "minecraft:lava")
        ["addData(java.lang.String,java.lang.String)"]("fluidB", "minecraft:water");
};

/**
 * Creates a new block TagKey.
 *
 * @param {string} namespace The namespace this tag is in.
 * @param {string} name The name of the TagKey to use.
 */
export const createBlockTag = (namespace, name) => {
    return TagKey.create(BuiltInRegistries.BLOCK.key(), new ResourceLocation(namespace, name));
};
