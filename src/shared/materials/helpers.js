import { nijikaId } from "../utils";

/**
 * Creates a new dust intermediate.
 */
export const createDustIntermediate = (event, id, colour, allowDecomposition) => {
    let builder = event.create(nijikaId(id)).dust().color(colour);

    if (typeof allowDecomposition === "boolean" && !allowDecomposition) {
        builder = builder.flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
    }
    return builder;
};

/**
 * Creates a new aqueous intermediate.
 */
export const createAqueousIntermediate = (event, id, colour) => {
    return event
        .create(nijikaId(id))
        .liquid()
        .color(colour)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
};

/**
 * Creates a new acidic intermediate (an aqueous intermediate with the acidic flag).
 */
export const createAcidicIntermediate = (event, id, colour) => {
    return event
        .create(nijikaId(id))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .color(colour)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
};

/**
 * Creates a chemical (dust + aqueous) intermediate.
 */
export const createChemicalIntermediate = (event, id, colour) => {
    return event
        .create(nijikaId(id))
        .dust()
        .fluid()
        .color(colour)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
};
