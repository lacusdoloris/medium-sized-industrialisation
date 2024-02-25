const PropertyKey = Java.loadClass(
    "com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey"
);

import { GT_MACHINE_TIERS } from "../../shared/definition";
import { getBlastProperty, getMaterial, getOreProperty } from "../../shared/utils";

const DISABLE_DECOMPOSITION = [
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
    // Why does this have a centrifuge decomposition, of all things?
    "gcyr:iron_oxide",
    // Required for slag byproduccts.
    "magnetite",
    "hematite",
    // Arsenic trioxide is flagged because it's only used as an intermediate for Arsenic
    // trichloride.
    "arsenic_trioxide",
];

/** A list of materials to actually add dusts & ingots to. */
const ADD_METALS = ["rhenium"];

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
        let gearMaterial = tier.materials.gear;
        if (typeof gearMaterial !== "undefined") {
            getMaterial(gearMaterial.id).addFlags(GTMaterialFlags.GENERATE_GEAR);
        }
    }

    // remove auto-generated decomposition recipes for all of these
    for (let matName of DISABLE_DECOMPOSITION) {
        getMaterial(matName).addFlags(GTMaterialFlags.DISABLE_DECOMPOSITION);
    }

    // The ``true`` here forces verification, which makes GTCEu add missing back-references (e.g.
    // for ingot -> dust maceration).
    for (let matName of ADD_METALS) {
        let mat = getMaterial(matName);
        mat.properties.ensureSet(PropertyKey.DUST, true);
        mat.properties.ensureSet(PropertyKey.INGOT, true);
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

    let magnetite = getMaterial("magnetite");
    {
        let oreProp = getOreProperty(magnetite);
        // likewise... actually appends. this is a much easier method for vanadium...
        oreProp.setOreByProducts(getMaterial("vanadium_pentoxide"));
    }

    let hematite = getMaterial("hematite");
    {
        let oreProp = getOreProperty(hematite);
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(
            getMaterial("iron"),
            getMaterial("magnesia"),
            getMaterial("calcium")
        );
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

    let molybdenite = getMaterial("molybdenite");
    {
        molybdenite.addFlags(GTMaterialFlags.DISABLE_DECOMPOSITION);
        let oreProp = getOreProperty(molybdenite);

        oreProp.setDirectSmeltResult(null);
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(getMaterial("chalcopyrite"), getMaterial("gcyr:fluorite"));
    }

    // have to do this here, because the material builder doesn't seem to have a way to override
    // it.
    getMaterial("ammonium_hydroxide").setFormula("[NH+4][OH-]");
    getMaterial("aluminium_hydroxide").setFormula("Al(OH)3");
    getMaterial("rare_earth_hydroxides").setFormula("(Ce...)(OH)3");
    getMaterial("rare_earth_mixture").setFormula("(Ce...)");
    getMaterial("rare_earth_chlorides").setFormula("(Ce...)Cl3");
    getMaterial("thorium_hydroxide").setFormula("Th(OH)4");
    getMaterial("magnesium_hydroxide").setFormula("Mg(OH)2");
    getMaterial("sodium_dicyanoaurate").setFormula("Na[Au(CN)2]");

    // Don't require the vacuum freezer (or the stupid washer) recipes for Kanthal.
    getBlastProperty("kanthal").setBlastTemperature(1700);

    // Allow TaC in EV.
    getBlastProperty("tantalum_carbide").setBlastTemperature(3600);

    // Used for clean machine casing.
    getMaterial("vanadium_steel").addFlags(GTMaterialFlags.GENERATE_FRAME);
};
