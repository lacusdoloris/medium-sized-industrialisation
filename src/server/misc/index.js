import { addCreateRockProcessingRecipes } from "./create_materials";
import { redoGlassProcessing } from "./glass";
import { rewriteRailwayRecipes } from "./railways"
import { addSlagProcessingRecipes } from "./slag_processing";

/** 
 * Dumping ground for recipes that don't fit cleanly into other categories.
 * 
 * @param {Internal.RecipesEventJS} event
 */
export const adjustVariousMiscRecipes = (event) => {
    event.remove({id: "gtceu:shaped/sticky_piston_resin"});
    event.remove({id: "minecraft:sticky_piston"});
    
    if (Platform.isLoaded("embers")) {
        // fundamentally the same as our recipe, but worse
        event.remove({id: "embers:sticky_piston_adhesive"});
    }

    event.shaped(
        "minecraft:sticky_piston",
        ["S", "P"],
        {S: "#nijika:glues", P: "minecraft:piston"}
    ).id("nijika:misc/sticky_piston");

    event.remove({id: "create:crafting/kinetics/sticky_mechanical_piston"});
    event.shaped(
        "create:mechanical_piston", 
        ["G", "P"], 
        {G: "#nijika:glues", P: "creatte:mechanical_piston"}
    ).id("nijika:misc/sticky_also_piston");

    event.remove({id: "create:crafting/kinetics/super_glue"});
    event.shaped(
        "create:super_glue",
        ["GP", "NG"],
        {G: "#nijika:glues", P: "#forge:plates/iron", N: "#forge:nuggets/iron"}
    ).id("nijika:misc/super_glue");

    event.remove({id: "gtceu:assembler/name_tag"});
    event.recipes.gtceu.assembler("nijika:misc/name_tag")
        .itemInputs("1x #forge:paper", "1x #forge:string")
        .inputFluids(Fluid.of("gtceu:glue").withAmount(100 * FluidAmounts.MILLIBUCKET))
        .itemOutputs("minecraft:name_tag")
        .EUt(4)
        .duration(20);

    // make item filters a bit easier to get.
    event.remove({id: "gtceu:shaped/item_filter"});
    event.remove({id: "gtceu:arc_furnace/arc_item_filter"});
    event.remove({id: "gtceu:macerator/macerate_item_filter"});
    
    event.shaped(
        "1x gtceu:item_filter",
        [" F ", "FPF", " F "],
        {F: "#forge:foils/zinc", P: "#forge:plates/iron"}
    ).id("nijika:misc/easier_gt_item_filter");

    // doesn't supplant the original. enjoy making glue.
    event.shapeless(
        "1x gtceu:item_tag_filter",
        ["gtceu:item_filter", "minecraft:name_tag"]
    ).id("nijika:misc/easier_gt_item_tag_filter");

    event.remove({output: "gtceu:fluid_filter"});
    event.shapeless(
        "1x gtceu:fluid_filter",
        ["gtceu:item_filter", "minecraft:bucket"]
    ).id("nijika:misc/easier_gt_fluid_filter");

    event.shapeless(
        "1x gtceu:fluid_tag_filter",
        ["gtceu:fluid_filter", "minecraft:name_tag"]
    ).id("nijika:misc/easier_gt_fluid_tag_filter");

    event.shaped(
        "minecraft:red_wool",
        ["VV", "VV"], {V: "minecraft:weeping_vines"}
    ).id("nijika:misc/red_wool_from_vines");

    event.shapeless(
        "woolytrees:wooly_sapling",
        ["#minecraft:saplings", "#minecraft:wool"]
    ).id("nijika:misc/wooly_sapling");

    rewriteRailwayRecipes(event);
    redoGlassProcessing(event);
    addCreateRockProcessingRecipes(event);
    addSlagProcessingRecipes(event);
}
