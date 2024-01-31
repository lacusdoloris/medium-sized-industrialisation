const GTCEuAPI = Java.loadClass("com.gregtechceu.gtceu.api.GTCEuAPI");

let chemicalHelper$get = ChemicalHelper["get(com.gregtechceu.gtceu.api.data.tag.TagPrefix,com.gregtechceu.gtceu.api.data.chemical.material.Material)"];

// https://sourcegraph.com/github.com/GregTechCEu/GregTech-Modern/-/blob/src/main/java/com/gregtechceu/gtceu/api/data/chemical/material/IMaterialRegistryManager.java?L12:18-12:42
/**
 * Iterates over all registered materials.
 * 
 * @param {materialCallback} fn Called for every instance in the materials registry.
 */
export const iterateOverAllMaterials = (fn) => {
    let mats = GTCEuAPI.materialManager.getRegisteredMaterials();
    mats.forEach(fn);
}

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
}

/**
 * Gets the ItemStack associated with this material for the provided TagPrefix.
 * 
 * @param {TagPrefix} prefix The tag prefix to use.
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material The material to use.
 */
export const getStackForTagPrefix = (prefix, material) => {
    // fails with a method resolution error unless we use the ``[]`` form.
    return chemicalHelper$get(prefix, material);
}

/** @return {com.gregtechceu.gtceu.api.data.chemical.material.Material} */
const definitelyMaterial = (mat) => {
    let realMat = mat;  // don't trust rhino!
    if (typeof realMat === "string") {
        realMat = getMaterial(realMat);
    }
    return realMat;
}

/**
 * Gets the ore property for the provided material.
 * 
 * @param {(string|com.gregtechceu.gtceu.api.data.chemical.material.Material)} The material to lookup.
 * @return {Internal.OreProperty}
 */
export const getOreProperty = (material) => {
    return definitelyMaterial(material).getProperty(PropertyKey.ORE);
}

/**
 * Gets the blast property for the provided material.
 * 
 * @param {(string|com.gregtechceu.gtceu.api.data.chemical.material.Material)} The material to lookup.
 * @return {Internal.BlastProperty}
 */
export const getBlastProperty = (material) => {
    return definitelyMaterial(material).getProperty(PropertyKey.BLAST);
}
