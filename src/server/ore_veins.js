const TagKey = Java.loadClass("net.minecraft.tags.TagKey");
const Registries = Java.loadClass("net.minecraft.core.registries.Registries");

// TODO: Fix vanilla ore veins for vanilla world type.
/**
 * Removes the ore veins for the vanilla dimensions.
 *
 * @param {Internal.GTOreVeinEventJS} event
 */
export const removeVanillaDimensionOreVeins = (event) => {
    // le sigh.
    // can't use event.removeAll (for whatever fucking reason) and im not figuring out why
    // rhino is shitting itself.
    // so just directly iterate over the registry instead. lol!

    let toRemove = [];
    GTRegistries.ORE_VEINS.entries().forEach((it) => {
        for (let dimension of it.value.dimensionFilter()) {
            if (dimension.namespace == "minecraft") {
                toRemove.push(it.key);
            }
        }
    });

    toRemove.forEach((key) => event.remove(key));
};

/**
 * Deals with GTCEu ore veins.
 *
 * @param {Internal.GTOreVeinEventJS} event
 */
export const addFreshOreVeinsEvent = (event) => {

};
