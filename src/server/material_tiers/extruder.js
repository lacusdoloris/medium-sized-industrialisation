
// https://sourcegraph.com/github.com/GregTechCEu/GregTech-Modern@e9a5704a58dd5735b2f445c31f440775760b2312/-/blob/src/main/java/com/gregtechceu/gtceu/data/recipe/generated/PartsRecipeHandler.java
// gears: material mass * 5
// small gears: material mass alone
// rotors: material mass * 4

// TODO: Consider keeping the tier multiplier for above-2800K items only.

/**
 * Moves down all relevant extruder recipes to LV.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const fixExtruderRecipeTier = (event) => {
    GTRegistries.MATERIALS.forEach((material) => {
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
                .itemOutputs(`gtceu:${material.name}_small_gear`)
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
    });
}
