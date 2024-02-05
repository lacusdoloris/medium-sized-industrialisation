import { adjustLittleLogisticsRecipes } from "./littlelogistics";
import { adjustMysticalAgricultureRecipes } from "./mysticalagriculture";
import { adjustCreateNewAgeRecipes } from "./new_age"
import { adjustModularRouterRecipes } from "./routers";

export const doModRecipes = (event) => {
    adjustCreateNewAgeRecipes(event);
    adjustLittleLogisticsRecipes(event);
    adjustModularRouterRecipes(event);

    adjustMysticalAgricultureRecipes(event);
}
