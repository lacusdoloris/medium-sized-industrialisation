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
    return GTCEuAPI.materialManager.getMaterial(name);
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
