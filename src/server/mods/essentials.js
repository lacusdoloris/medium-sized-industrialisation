import { GT_MACHINE_TIERS } from "../../shared/definition";

/** @param {Internal.RecipesEventJS} event */
export const adjustEssentialsRecipes = (event) => {
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

    event.replaceInput({ mod: "essentials" }, "#forge:ingots/gold", "#forge:plates/corinthian_bronze");
}
