

/** @param {Internal.GTRegistryEventJS<string, com.gregtechceu.gtceu.api.data.chemical.material.Material>} event */
export const customiseMaterials = (event) => {

    // add foil flag here, for fluxed magnets
    GTRegistries.MATERIALS.get("magnetic_neodymium")
        .addFlags(GTMaterialFlags.GENERATE_FOIL);
}

GTCEuStartupEvents.registry("gtceu:material", (event) => {
    customiseMaterials(event);
})
