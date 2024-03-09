import { nijikaId } from "./utils";

const BASE_ORES = {
    bocchinium: {
        colour: 0xf7a0b5,
        iconSet: GTMaterialIconSet.BRIGHT,
        seed: 809651466,
        intoOres: ["magnetite", "ilmenite"],
    },

    nijikaite: {
        seed: 1929496478,
        colour: 0xf3e5a1,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["wulfenite", "scheelite"],
    },

    ryoite: {
        seed: 155659298,
        colour: 0x49679f,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["pyrolusite", "gold"],
    },

    kitakitaite: {
        seed: 649130079,
        colour: 0xd2625a,
        iconSet: GTMaterialIconSet.BRIGHT,
        intoOres: ["chalcopyrite", "sphalerite"],
    },

    kikurite: {
        seed: 1321746503,
        colour: 0x995678,
        iconSet: GTMaterialIconSet.DULL,
        intoOres: ["cassiterite", "galena"],
    },

    yoyokite: {
        seed: 1191360869,
        colour: 0x5a3c2d,
        iconSet: GTMaterialIconSet.DULL,
        intoOres: ["bauxite", "chromite"],
    },
};

/**
 * Adds the base ore materials.
 */
export const addBaseOreMaterials = (event) => {
    for (let [name, data] of Object.entries(BASE_ORES)) {
        event.create(nijikaId(name)).color(data.colour).ore().dust().iconSet(data.iconSet);
    }
};

const goldify = (what) => {
    if (what == "gold") {
        return "minecraft:raw_gold";
    } else {
        return `gtceu:raw_${what}`;
    }
};

/**
 * Creates and adjusts the recipes for the base ores.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addBaseOreRecipes = (event) => {
    event.remove({ type: "createoreexcavation:vein" });
    event.remove({ type: "createoreexcavation:drilling" });
    event.remove({ type: "createoreexcavation:extracting" });

    for (let [name, oreData] of Object.entries(BASE_ORES)) {
        event.recipes.createoreexcavation
            .vein(Component.translatable(`vein.nijika.${name}`), `gtceu:raw_${name}`)
            .biomeWhitelist("bigglobe:overworld")
            .placement(128, 32, oreData.seed)
            .id(`nijika:veins/overworld/${name}`);

        event.recipes.createoreexcavation
            .drilling(`gtceu:raw_${name}`, `nijika:veins/overworld/${name}`, 200)
            .fluid(Fluid.of("gtceu:drilling_fluid").withAmount(165 * FluidAmounts.MILLIBUCKET))
            .id(`nijika:drilling/overworld/${name}`);

        // Similar to Angel's Refining.
        //
        // Crushed ore sorting: ore 1 + 2 + slag
        // Refined ore (chunks): ore 1 + 2 + 3 + slag
        // Impure ore (crystals): ore 1 + 2 + 3 + 4 + slag
        // Pure ore (... yeah): all 7 ores, no slag

        event.remove({ input: `gtceu:crushed_${name}_ore` });
        event.recipes.gtceu
            .ore_sorting(`nijika:base_ores/${name}/sorting_tier_1`)
            .itemInputs(`4x gtceu:crushed_${name}_ore`)
            .itemOutputs(
                `2x ${goldify(oreData.intoOres[0])}`,
                `1x ${goldify(oreData.intoOres[1])}`,
                "1x gtceu:slag_dust"
            )
            .duration(5 * 20)
            .EUt(GTValues.VA[GTValues.HV])
            .circuit(1);
    }
};
