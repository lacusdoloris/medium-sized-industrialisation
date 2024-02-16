import { adjustCreateRecipes } from "./create";
import { adjustIntegratedDynamicsRecipes } from "./integrated_dynamics";
import { adjustLittleLogisticsRecipes } from "./littlelogistics";
import { adjustMysticalAgricultureRecipes } from "./mysticalagriculture";
import { adjustCreateNewAgeRecipes } from "./new_age";
import { adjustPrettyPipesRecipes } from "./prettypipes";
import { adjustModularRouterRecipes } from "./routers";

/**
 * Processes recipes for included mods.
 */
export const doModRecipes = (event) => {
    adjustCreateRecipes(event);
    adjustCreateNewAgeRecipes(event);
    adjustMysticalAgricultureRecipes(event);
    
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
};
