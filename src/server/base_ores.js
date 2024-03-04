const VEINS = {
    "bocchinium": {
        seed: 809651466,
        intoOres: [],
    },
    "nijikaite": {
        seed: 1929496478,
        intoOres: []
    },
    "ryoite": {
        seed: 155659298,
        intoOres: []
    },
    "kitakitaite": {
        seed: 649130079,
        intoOres: [],
    },
    "kikurite": {
        seed: 1321746503,
        intoOres: [],
    },
}


/**
 * Creates and adjusts the recipes for the base ores.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const adjustBaseOresRecipes = (event) => {
    event.remove({type: "createoreexcavation:vein"});
    event.remove({type: "createoreexcavation:drilling"});
    event.remove({type: "createoreexcavation:extracting"});


    for (let [name, veinData] of Object.entries(VEINS)) {
        event.recipes.createoreexcavation.vein(
            Component.translatable(`vein.nijika.${name}`),
            `gtceu:raw_${name}`
        ).biomeWhitelist("bigglobe:overworld").placement(2048, 512, veinData.seed)
            .id(`nijika:veins/overworld/${name}`);

        event.recipes.createoreexcavation.drilling(
            `gtceu:raw_${name}`,
            `nijika:veins/overworld/${name}`,
            640
        ).fluid(Fluid.of("gtceu:drilling_fluid").withAmount(165 * FluidAmounts.MILLIBUCKET)).id(`nijika:drilling/overworld/${name}`);
    }
}
