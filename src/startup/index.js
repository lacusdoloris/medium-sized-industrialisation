

/** @param {Internal.GTRegistryEventJS<string, com.gregtechceu.gtceu.api.data.chemical.material.Material>} event */
export const customiseMaterials = (event) => {

    // add foil flag here, for fluxed magnets
    GTRegistries.MATERIALS.get("magnetic_neodymium")
        .addFlags(GTMaterialFlags.GENERATE_FOIL);

    // used for LV pistons
    GTRegistries.MATERIALS.get("wrought_iron")
        .addFlags(GTMaterialFlags.GENERATE_SMALL_GEAR);
}

GTCEuStartupEvents.registry("gtceu:material", (event) => {
    customiseMaterials(event);
})
