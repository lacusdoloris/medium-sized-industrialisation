import { redoGlassProcessing } from "./glass";
import { addMobFarmRelatedRecipes } from "./mob_farming";
import { rewriteRailwayRecipes } from "./railways";
import { addSlagProcessingRecipes } from "./slag_processing";

/**
 * Dumping ground for recipes that don't fit cleanly into other categories.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustVariousMiscRecipes = (event) => {
    event.remove({ id: "gtceu:shaped/sticky_piston_resin" });
    event.remove({ id: "minecraft:sticky_piston" });

    if (Platform.isLoaded("embers")) {
        // fundamentally the same as our recipe, but worse
        event.remove({ id: "embers:sticky_piston_adhesive" });
    }

    event
        .shaped("minecraft:sticky_piston", ["S", "P"], {
            S: "#nijika:glues",
            P: "minecraft:piston",
        })
        .id("nijika:misc/sticky_piston");

    event.remove({ id: "create:crafting/kinetics/sticky_mechanical_piston" });
    event
        .shaped("create:mechanical_piston", ["G", "P"], {
            G: "#nijika:glues",
            P: "creatte:mechanical_piston",
        })
        .id("nijika:misc/sticky_also_piston");

    event.remove({ id: "create:crafting/kinetics/super_glue" });
    event
        .shaped("create:super_glue", ["GP", "NG"], {
            G: "#nijika:glues",
            P: "#forge:plates/iron",
            N: "#forge:nuggets/iron",
        })
        .id("nijika:misc/super_glue");

    event.remove({ id: "gtceu:assembler/name_tag" });
    event.recipes.gtceu
        .assembler("nijika:misc/name_tag")
        .itemInputs("1x minecraft:paper", "1x #forge:string")
        .inputFluids(Fluid.of("gtceu:glue").withAmount(100 * FluidAmounts.MILLIBUCKET))
        .itemOutputs("minecraft:name_tag")
        .EUt(4)
        .duration(20);

    // make item filters a bit easier to get.
    event.remove({ id: "gtceu:shaped/item_filter" });
    event.remove({ id: "gtceu:arc_furnace/arc_item_filter" });
    event.remove({ id: "gtceu:macerator/macerate_item_filter" });

    event
        .shaped("1x gtceu:item_filter", [" F ", "FPF", " F "], {
            F: "#forge:foils/zinc",
            P: "#forge:plates/iron",
        })
        .id("nijika:misc/easier_gt_item_filter");

    // doesn't supplant the original. enjoy making glue.
    event
        .shapeless("1x gtceu:item_tag_filter", ["gtceu:item_filter", "minecraft:name_tag"])
        .id("nijika:misc/easier_gt_item_tag_filter");

    event.remove({ output: "gtceu:fluid_filter" });
    event
        .shapeless("1x gtceu:fluid_filter", ["gtceu:item_filter", "minecraft:bucket"])
        .id("nijika:misc/easier_gt_fluid_filter");

    event
        .shapeless("1x gtceu:fluid_tag_filter", ["gtceu:fluid_filter", "minecraft:name_tag"])
        .id("nijika:misc/easier_gt_fluid_tag_filter");

    event
        .shaped("minecraft:red_wool", ["VV", "VV"], { V: "minecraft:weeping_vines" })
        .id("nijika:misc/red_wool_from_vines");

    event
        .shapeless("woolytrees:wooly_sapling", ["#minecraft:saplings", "#minecraft:wool"])
        .id("nijika:misc/wooly_sapling");

    event.remove({ id: "cheese:cheese" });
    event.remove({ id: "cheese:cheese_and_crackers" });
    event.remove({ id: "cheese:grilled_cheese" });

    event.recipes.gtceu
        .fermenter("nijika:misc/grommit")
        .inputFluids(Fluid.of("minecraft:milk").withAmount(250 * FluidAmounts.MB))
        .itemOutputs("cheese:cheese")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(20);

    event.recipes.gtceu
        .chemical_bath("nijika:misc/moon_cheese")
        .inputFluids(Fluid.of("gtceu:rocket_fuel").withAmount(1 * FluidAmounts.B))
        .itemInputs("cheese:cheese")
        .itemOutputs("cheese:cheese_and_crackers")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(5);

    event.recipes.gtceu
        .electric_blast_furnace("nijika:misc/end_cheese")
        .itemInputs("2x cheese:cheese", "1x minecraft:bread", "1x #forge:dusts/ender_pearl")
        .itemOutputs("cheese:grilled_cheese")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20)
        .blastFurnaceTemp(453.15);

    // easier books and maps
    event
        .shaped("4x minecraft:map", ["PPP", "PCP", "PPP"], {
            P: "#forge:plates/paper",
            C: "minecraft:compass",
        })
        .id("minecraft:map");

    event.recipes.create
        .compacting("1x minecraft:book", "4x #forge:plates/paper")
        .id("minecraft:book");

    event
        .shaped("minecraft:clock", [" I ", "IRI", " I "], {
            I: "#forge:ingots/corinthian_bronze",
            R: "#forge:dusts/redstone",
        })
        .id("minecraft:clock");

    event
        .shaped("minecraft:light_weighted_pressure_plate", ["II"], {
            I: "#forge:ingots/corinthian_bronze",
        })
        .id("minecraft:light_weighted_pressure_plate");

    rewriteRailwayRecipes(event);
    redoGlassProcessing(event);
    addSlagProcessingRecipes(event);
    addMobFarmRelatedRecipes(event);
};
