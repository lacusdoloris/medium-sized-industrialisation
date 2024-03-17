import { addOrganoaluminiumMaterials, addOrganoaluminiumRecipes } from "./aluminium";
import { addAmineMaterials, addAmineRecipes } from "./amines";
import { addChloroethaneMaterials, addChloroethaneRecipes } from "./chloroethane";
import { addZieglerProcessMaterials, addZieglerProcessRecipes } from "./fatty_alcohols";
import { addMIBKMaterials, addMIBKProcess } from "./mibk";
import { addPolystyreneMaterials, addPolysytreneRecipes } from "./polystyrene";

export const addOrganicChemMaterials = (event) => {
    addChloroethaneMaterials(event);
    addMIBKMaterials(event);
    addPolystyreneMaterials(event);
    addOrganoaluminiumMaterials(event);
    addZieglerProcessMaterials(event);
    addAmineMaterials(event);
};

/**
 * Adds the recipes for the organic chemistry chains.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addOrganicChemRecipes = (event) => {
    addChloroethaneRecipes(event);
    addMIBKProcess(event);
    addPolysytreneRecipes(event);
    addOrganoaluminiumRecipes(event);
    addZieglerProcessRecipes(event);
    addAmineRecipes(event);

    event.remove({ id: "gtceu:chemical_reactor/cyclohexane" });
    event.remove({ id: "gtceu:large_chemical_reactor/cyclohexane" });

    // C6H6 + 3 H2 = C6H12
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/cyclohexane_hydrogenation")
        .itemInputs("1x nijika:nickel_catalyst")
        .inputFluids(
            Fluid.of("gtceu:benzene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(6 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:cyclohexane").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20 * 20);
};
