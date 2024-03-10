import { GT_MACHINE_TIERS } from "../../shared/definition";
import { adjustCreateRecipes } from "./create";
import { adjustEssentialsRecipes } from "./essentials";
import { adjustIntegratedDynamicsRecipes } from "./integrated_dynamics";
import { adjustLittleLogisticsRecipes } from "./littlelogistics";
import { adjustCreateNewAgeRecipes } from "./new_age";
import { adjustCreateOreExcavationRecipes } from "./oreexcavation";
import { adjustPackItUpRecipes } from "./packitup";
import { adjustPrettyPipesRecipes } from "./prettypipes";
import { adjustRfToolsRecipes } from "./rftools";
import { adjustModularRouterRecipes } from "./routers";

/**
 * Processes recipes for included mods.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const doModRecipes = (event) => {
    adjustCreateRecipes(event);
    adjustCreateNewAgeRecipes(event);
    adjustRfToolsRecipes(event);

    // not optional due to worldgen.
    adjustIntegratedDynamicsRecipes(event);
    adjustCreateOreExcavationRecipes(event);

    if (Platform.isLoaded("littlelogistics")) {
        adjustLittleLogisticsRecipes(event);
    }

    if (Platform.isLoaded("modularrouters")) {
        adjustModularRouterRecipes(event);
    }

    if (Platform.isLoaded("prettypipes")) {
        adjustPrettyPipesRecipes(event);
    }

    if (Platform.isLoaded("pack_it_up")) {
        adjustPackItUpRecipes(event);
    }

    if (Platform.isLoaded("toolbelt")) {
        event
            .shaped("toolbelt:belt", ["SKS", "K K", "KFK"], {
                S: "minecraft:string",
                K: "minecraft:dried_kelp",
                F: "#forge:foils/tin",
            })
            .id("toolbelt:belt");

        event
            .shaped("toolbelt:pouch", ["SGS", "K K", "SKS"], {
                S: "minecraft:string",
                K: "minecraft:dried_kelp",
                G: "#forge:nuggets/corinthian_bronze",
            })
            .id("toolbelt:pouch");
    }

    if (Platform.isLoaded("essentials")) {
        adjustEssentialsRecipes(event);
    }

    event.remove({output: "createaddition:electric_motor"});

    event
        .shaped("reinfchest:gold_chest", ["III", "ICI", "III"], {
            I: "#forge:ingots/corinthian_bronze",
            C: "reinfchest:iron_chest",
        })
        .id("reinfchest:gold_chest");

    // why doesn't this work!
    event.replaceInput(
        { type: "morered:soldering" },
        "morered:red_alloy_ingot",
        "gtceu:red_alloy_ingot"
    );
};
