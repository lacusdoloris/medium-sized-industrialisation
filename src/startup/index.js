// Please don't add anything here. Instead, add it to the ``index.js`` files in the various
// subfolders. Thank you!

import { MODPACK_SETTINGS } from "../settings";
import { GT_MACHINE_TIERS } from "../shared/definition";
import {
    getBlastProperty,
    getMaterial,
    getOreProperty,
    iterateOverAllMaterials,
} from "../shared/utils";
import { addMaterials } from "./custom_materials";
import { addAllMachineTypes, addAllRecipeTypes } from "./machines";

/** @param {Internal.GTRegistryEventJS<string, com.gregtechceu.gtceu.api.data.chemical.material.Material>} event */
export const customiseMaterials = () => {
    // add foil flag here, for fluxed magnets
    getMaterial("magnetic_neodymium").addFlags(GTMaterialFlags.GENERATE_FOIL);

    // used for LV pistons
    getMaterial("wrought_iron").addFlags(GTMaterialFlags.GENERATE_SMALL_GEAR);

    // used for nickel-cadmium batteries
    getMaterial("nickel").addFlags(GTMaterialFlags.GENERATE_FOIL);

    // make sure that all the materials we need for various tier based recipes have the appropriate
    // flags.
    for (let tier of Object.values(GT_MACHINE_TIERS)) {
        getMaterial(tier.materials.motorWire.id).addFlags(GTMaterialFlags.GENERATE_FINE_WIRE);
    }

    // add the disable_decomposition flag to remove auto-generated decomposition recipes
    const disableDecompositionMaterials = [
        // Sulfur containing materials. These are roasted instead.
        "stibnite",
        "sphalerite",
        "pyrite",
        "pentlandite",
        "tetrahedrite",
        "cobaltite",
        "galena",
        "chalcopyrite",
        "realgar",
        // Required for slag byproduccts.
        "magnetite",
        "hematite",
        // Arsenic trioxide is flagged because it's only used as an intermediate for Arsenic
        // trichloride.
        "arsenic_trioxide",
    ];

    for (let matName of disableDecompositionMaterials) {
        getMaterial(matName).addFlags(GTMaterialFlags.DISABLE_DECOMPOSITION);
    }

    // remove chromium dust as a byproduct of chromite
    let chromite = getMaterial("chromite");
    {
        /** @type {Internal.OreProperty} */
        let oreProp = getOreProperty(chromite);
        // setOreByProducts acttually *appends*, not sets!
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(getMaterial("iron"), getMaterial("magnesium"), chromite);

        // we have our own processing chain
        chromite.addFlags(GTMaterialFlags.DISABLE_DECOMPOSITION);
    }

    // remove direct smelting of pentlandite
    let pentlandite = getMaterial("pentlandite");
    {
        let oreProp = getOreProperty(pentlandite);
        // this is a nullable property, so we can just directly set it.
        oreProp.setDirectSmeltResult(null);
    }

    // remove all byproducts of bauxite, as we have our own custom bayer process for it.
    let bauxite = getMaterial("bauxite");
    {
        bauxite.addFlags(GTMaterialFlags.DISABLE_DECOMPOSITION);
        getOreProperty(bauxite).getOreByProducts().clear();
    }

    // replace aluminium with chromite as a byproduct of emerald refining.
    let emerald = getMaterial("emerald");
    {
        let oreProp = getOreProperty(emerald);
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(getMaterial("beryllium"), getMaterial("chromite"));
    }

    // pyrolusite now produces tantalite and hematite as byproducts.
    let pyrolusite = getMaterial("pyrolusite");
    {
        pyrolusite.addFlags(GTMaterialFlags.DISABLE_DECOMPOSITION);

        let oreProp = getOreProperty(pyrolusite);
        oreProp.setDirectSmeltResult(null);
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(getMaterial("hematite"), getMaterial("tantalite"));
    }

    let tantalite = getMaterial("tantalite");
    {
        tantalite.addFlags(GTMaterialFlags.DISABLE_DECOMPOSITION);
        tantalite.setFormula("(Fe,Mn)Ta2O6");

        let oreProp = getOreProperty(tantalite);
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(
            getMaterial("manganese_oxide"),
            getMaterial("niobium_pentoxide"),
            getMaterial("tantalum_pentoxide")
        );
    }

    let monazite = getMaterial("monazite");
    {
        monazite.addFlags(GTMaterialFlags.DISABLE_DECOMPOSITION);
        monazite.setFormula("(Ce...)(PO4)");

        let oreProp = getOreProperty("monazite");
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts("phosphate", "thorium_hydroxide");
        oreProp.getSeparatedInto().clear();
    }

    // have to do this here, because the material builder doesn't seem to have a way to override
    // it.
    getMaterial("ammonium_hydroxide").setFormula("[NH+4][OH-]");
    getMaterial("aluminium_hydroxide").setFormula("Al(OH)3");
    getMaterial("rare_earth_hydroxides").setFormula("(Ce...)(OH)3");
    getMaterial("rare_earth_mixture").setFormula("(Ce...)");
    getMaterial("rare_earth_chlorides").setFormula("(Ce...)Cl3");
    getMaterial("thorium_hydroxide", "Th(OH)4");

    // Don't require the vacuum freezer (or the stupid washer) recipes for Kanthal.
    getBlastProperty("kanthal").setBlastTemperature(1700);

    // Allow TaC in EV.
    getBlastProperty("tantalum_carbide").setBlastTemperature(3600);

    // Used for clean machine casing.
    getMaterial("vanadium_steel").addFlags(GTMaterialFlags.GENERATE_FRAME);
};

/**
 * @param {Internal.GTRegistryEventJS<string, com.gregtechceu.gtceu.api.data.chemical.material.Material>} event
 */
GTCEuStartupEvents.registry("gtceu:material", addMaterials);

GTCEuStartupEvents.materialModification((_) => {
    // event has... no properties. ok
    customiseMaterials();
});

GTCEuStartupEvents.registry("gtceu:machine", addAllMachineTypes);
GTCEuStartupEvents.registry("gtceu:recipe_type", addAllRecipeTypes);
