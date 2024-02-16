const TagKey = Java.loadClass("net.minecraft.tags.TagKey");
const GCyRTags = Java.loadClass("argent_matter.gcyr.data.recipe.GCyRTags");
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
    // i thought this was insanely buggy... but i forgot to return in the fucking
    // withLayerPattern (again, why it a FUCKING CALLBACK?)

    // Also, can't load GCyROres safely... so instead we just do this. Lol!

    const GCyRWorldGenLayers = Java.loadClass(
        "argent_matter.gcyr.common.worldgen.GCyRWorldGenLayers",
    );
    /** @type {typeof Internal.TagMatchTest} */
    const TagMatchTest = Java.loadClass(
        "net.minecraft.world.level.levelgen.structure.templatesystem.TagMatchTest",
    );

    let moonOreReplaceables = TagMatchTest(GCyRTags.MOON_ORE_REPLACEABLES);

    // fuck surface indicators btw. useless spam. use a prospector.

    // == Moon == //
    event.modify("gcyr:bauxite_vein_moon", (vein) => {
        vein.layeredVeinGenerator((gen) => {
            gen.withLayerPattern(() => {
                // swap out raw aluminium for hematite.
                return GTLayerPattern.builder(moonOreReplaceables)
                    .layer((l) => l.weight(2).mat(GTMaterials.Bauxite).size(1, 4))
                    .layer((l) => l.weight(1).mat(GTMaterials.Ilmenite).size(1, 2))
                    .layer((l) => l.weight(4).mat(GTMaterials.Hematite).size(2, 5))
                    .build();
            });
        });
    });

    event.add("nijika:lunar_molybdenum_vein", (vein) => {
        vein.clusterSize(30)
            .density(0.3)
            .weight(40)
            .layer(GCyRWorldGenLayers.MOON)
            .heightRangeTriangle(20, 60)
            ["biomes(net.minecraft.tags.TagKey)"](GCyRTags.IS_MOON)
            .layeredVeinGenerator((gen) => {
                gen.withLayerPattern(() => {
                    return GTLayerPattern.builder(moonOreReplaceables)
                        .layer((l) => l.weight(4).mat(GTMaterials.Molybdenite).size(1, 3))
                        .layer((l) => l.weight(2).mat(GTMaterials.Wulfenite).size(1, 2))
                        .layer((l) => l.weight(2).mat(GTMaterials.Powellite).size(1, 2))
                        .build();
                });
            });
    });
};
