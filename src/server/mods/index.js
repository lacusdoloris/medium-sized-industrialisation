import { adjustLittleLogisticsRecipes } from "./littlelogistics";
import { adjustMysticalAgricultureRecipes } from "./mysticalagriculture";
import { adjustCreateNewAgeRecipes } from "./new_age"
import { adjustPrettyPipesRecipes } from "./prettypipes";
import { adjustModularRouterRecipes } from "./routers";

export const doModRecipes = (event) => {
    adjustCreateNewAgeRecipes(event);
    adjustLittleLogisticsRecipes(event);
    adjustModularRouterRecipes(event);
    adjustPrettyPipesRecipes(event);

    adjustMysticalAgricultureRecipes(event);
}
