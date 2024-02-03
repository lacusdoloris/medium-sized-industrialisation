import { adjustLittleLogisticsRecipes } from "./littlelogistics";
import { adjustCreateNewAgeRecipes } from "./new_age"
import { adjustModularRouterRecipes } from "./routers";

export const doModRecipes = (event) => {
    adjustCreateNewAgeRecipes(event);
    adjustLittleLogisticsRecipes(event);
    adjustModularRouterRecipes(event);
}
