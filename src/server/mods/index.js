import { GT_MACHINE_TIERS } from "../../shared/definition";
import { adjustCreateRecipes } from "./create";
import { adjustIntegratedDynamicsRecipes } from "./integrated_dynamics";
import { adjustLittleLogisticsRecipes } from "./littlelogistics";
import { adjustMysticalAgricultureRecipes } from "./mysticalagriculture";
import { adjustCreateNewAgeRecipes } from "./new_age";
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
    adjustMysticalAgricultureRecipes(event);
    adjustRfToolsRecipes(event);

    // not optional due to worldgen.
    adjustIntegratedDynamicsRecipes(event);

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
                G: "minecraft:gold_nugget",
            })
            .id("toolbelt:pouch");
    }

    event.remove({ id: "essentials:auto_crafter" });
    event
        .shaped("essentials:auto_crafter", ["PLP", "THT", "PCP"], {
            P: "#forge:plates/iron",
            T: "#forge:workbench",
            L: "#forge:gems/lapis",
            H: GT_MACHINE_TIERS.LV.machineHull,
            C: GT_MACHINE_TIERS.LV.circuitTag,
        })
        .id("nijika:mods/essentials/auto_crafter");

    // why doesn't this work!
    event.replaceInput(
        { type: "morered:soldering" },
        "morered:red_alloy_ingot",
        "gtceu:red_alloy_ingot"
    );
};
