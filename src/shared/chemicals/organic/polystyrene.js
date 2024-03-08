import { nijikaId } from "../../utils";

export const addPolystyreneMaterials = (event) => {
    event
        .create(nijikaId("polystyrene"))
        .polymer(1)
        .color(0xcfd4a7)
        .iconSet(GTMaterialIconSet.ROUGH)
        .flags(GTMaterialFlags.GENERATE_ROUND);
};

/**
 * Adds recipes relating to the production of Polystyrene and Polystyrene products.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const addPolysytreneRecipes = (event) => {
    event.remove({ id: "gtceu:chemical_reactor/styrene_from_benzene" });
    event.remove({ id: "gtceu:large_chemical_reactor/styrene_from_benzene" });
    event.remove({ id: "gtceu:chemical_reactor/styrene_from_ethylbenzene" });
    event.remove({ id: "gtceu:large_chemical_reactor/styrene_from_ethylbenzene" });

    // Catalytic synthesis of Ethylbenzene from Bezene and Ethylene.
    // C6H6 + C2H4 = C6H5C2H5
    event.recipes.gtceu
        .large_chemical_reactor("nijika:chemicals/polystyrene/ethylbenzene")
        .notConsumable("17x gtceu:aluminium_chloride_dust")
        .inputFluids(
            Fluid.of("gtceu:ethylene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:benzene").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(Fluid.of("gtceu:ethylbenzene").withAmount(1 * FluidAmounts.BUCKET))
        .EUt(GTValues.VHA[GTValues.EV]) // so that you need to use coal tar first
        .duration(3 * 20);

    // Synthesis of sytrene from ethylbenzene and steam.
    // C6H5C2H5 = C8H8 + H2
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/polystyrene/styrene")
        .inputFluids(
            Fluid.of("gtceu:steam").withAmount(12 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:ethylbenzene").withAmount(1 * FluidAmounts.BUCKET)
        )
        .outputFluids(
            Fluid.of("gtceu:styrene").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:hydrogen").withAmount(2 * FluidAmounts.BUCKET)
        )
        .EUt(GTValues.VH[GTValues.MV])
        .duration(5 * 20);

    // Polymerization of styrene into polystyrene.
    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/polystyrene/polymerisation_air")
        .inputFluids(
            Fluid.of("gtceu:air").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:styrene").withAmount(144 * FluidAmounts.MB)
        )
        .outputFluids(Fluid.of("gtceu:polystyrene").withAmount(144 * FluidAmounts.MB))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(8 * 20);

    event.recipes.gtceu
        .chemical_reactor("nijika:chemicals/polystyrene/polymerisation_o2")
        .inputFluids(
            Fluid.of("gtceu:oxygen").withAmount(1 * FluidAmounts.BUCKET),
            Fluid.of("gtceu:styrene").withAmount(144 * FluidAmounts.MB)
        )
        .outputFluids(Fluid.of("gtceu:polystyrene").withAmount(216 * FluidAmounts.MB))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(8 * 20);
};
