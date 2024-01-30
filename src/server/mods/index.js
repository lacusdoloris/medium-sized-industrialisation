import { adjustLittleLogisticsRecipes } from "./littlelogistics";
import { adjustCreateNewAgeRecipes } from "./new_age"

export const doModRecipes = (event) => {
    adjustCreateNewAgeRecipes(event);
    adjustLittleLogisticsRecipes(event);
}
