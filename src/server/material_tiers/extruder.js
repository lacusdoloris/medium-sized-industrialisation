
// https://sourcegraph.com/github.com/GregTechCEu/GregTech-Modern@e9a5704a58dd5735b2f445c31f440775760b2312/-/blob/src/main/java/com/gregtechceu/gtceu/data/recipe/generated/PartsRecipeHandler.java
// gears: material mass * 5
// small gears: material mass alone
// rotors: material mass * 4
// pipes: material mass * material countt

// TODO: Consider keeping the tier multiplier for above-2800K items only.

const PropertyKey = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey");
const PIPE_TYPES = [
    ["tiny", 1, 2], 
    ["small", 1, 1],
    ["normal", 3, 1],
    ["large", 6, 1],
    ["huge", 12, 1],
]

/**
 * Moves down all relevant extruder recipes to LV.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const fixExtruderRecipeTier = (event) => {
    /**
     * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material
     */
    const generatePipes = (material, type) => {
        for (let [size_name, in_count, out_count] of PIPE_TYPES) {
            // item pipes don't have a tiny size.
            if (type == "item" && size_name == "tiny") {
                continue;
            }

            event.recipes.gtceu.extruder(`nijika:auto/pipes/${material.name}/${type}/${size_name}`)
                .itemInputs(Item.of(`#forge:ingots/${material.name}`).withCount(in_count))
                .notConsumable(`gtceu:${size_name}_pipe_extruder_mold`)
                .itemOutputs(Item.of(`gtceu:${material.name}_${size_name}_${type}_pipe`))
                .EUt(32)
                .duration(material.mass * in_count);
        }
    }

    GTRegistries.MATERIALS.forEach((material) => {
        if (material.hasProperty(PropertyKey.WOOD)) return;

        if (material.hasFlag(GTMaterialFlags.GENERATE_GEAR)) {
            event.recipes.gtceu.extruder(`nijika:auto/gears/regular/${material.name}`)
                .itemInputs(`4x #forge:ingots/${material.name}`)
                .notConsumable(GTItems.SHAPE_EXTRUDER_GEAR.get())
                .itemOutputs(`gtceu:${material.name}_gear`)
                .EUt(32)
                .duration(material.mass * 5);
        }

        if (material.hasFlag(GTMaterialFlags.GENERATE_SMALL_GEAR)) {            
            event.recipes.gtceu.extruder(`nijika:auto/gears/small/${material.name}`)
                .itemInputs(`#forge:ingots/${material.name}`)
                .notConsumable(GTItems.SHAPE_EXTRUDER_GEAR_SMALL.get())
                .itemOutputs(`gtceu:small_${material.name}_gear`)
                .EUt(32)
                .duration(material.mass);
        }

        if (material.hasFlag(GTMaterialFlags.GENERATE_RING)) {
            event.recipes.gtceu.extruder(`nijika:auto/rings/${material.name}`)
                .itemInputs(`#forge:ingots/${material.name}`)
                .notConsumable(GTItems.SHAPE_EXTRUDER_RING.get())
                .itemOutputs(`gtceu:${material.name}_ring`)
                .EUt(32)
                .duration(material.mass);
        }

        if (material.hasFlag(GTMaterialFlags.GENERATE_ROTOR)) {
            event.recipes.gtceu.extruder(`nijika:auto/rotors/${material.name}`)
                .itemInputs(`4x #forge:ingots/${material.name}`)
                .notConsumable(GTItems.SHAPE_EXTRUDER_ROTOR.get())
                .itemOutputs(`gtceu:${material.name}_rotor`)
                .EUt(32)
                .duration(material.mass);
        }

        if (material.hasProperty(PropertyKey.FLUID_PIPE)) {
            // don't really care about the specifics
            generatePipes(material, "fluid");
        } else if (material.hasProperty(PropertyKey.ITEM_PIPE)) {
            generatePipes(material, "item");
        }
    });
}
