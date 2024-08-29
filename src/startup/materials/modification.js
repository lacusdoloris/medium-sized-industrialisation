// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

const WireProperties = Java.loadClass(
    "com.gregtechceu.gtceu.api.data.chemical.material.properties.WireProperties"
);
const FluidProperty = Java.loadClass(
    "com.gregtechceu.gtceu.api.data.chemical.material.properties.FluidProperty"
);
const FluidStorageKeys = Java.loadClass("com.gregtechceu.gtceu.api.fluids.store.FluidStorageKeys");
const MaterialStack = Java.loadClass(
    "com.gregtechceu.gtceu.api.data.chemical.material.stack.MaterialStack"
);

import { GT_MACHINE_TIERS } from "../../shared/definition";
import { PropertyKey, getBlastProperty, getMaterial, getOreProperty } from "../../shared/utils";

/** A list of materials to disable decomposition recipe generation for. */
const DISABLE_DECOMPOSITION = [
    // Sulfur containing materials. These are roasted instead.
    "stibnite",
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
    // Alloys and such that you can't just separate.
    "hsla_steel",
    "vanadium_steel",
    // Various misc materials.
    "barite",
];

/** A list of materials to disable alloy blast furnace recipe generation for. */
const DISABLE_ALLOY_BLAST_FURNACE = ["hsla_steel"];

/** A list of materials to actually add dusts & ingots to. */
const ADD_METALS = ["rhenium"];

/** A list of materials to add rounds to. */
const ADD_ROUNDS = ["iron", "steel"];

/** A list of materials to add aqueous properties to. */
const ADD_AQUEOUS = ["sodium_hydroxide", "calcium_hydroxide"];

/**
 * A list of materials that have entirely custom processing chains.
 *
 * These materials will have their ore processing tab removed, as well as having no material tier
 * recipes generated for them.
 */
const REMOVE_ORE_TAB = ["gold", "scheelite"];

/**
 * Mega-function for customising materials.
 */
export const customiseMaterials = () => {
    // add foil flag here, for fluxed magnets
    getMaterial("magnetic_iron").addFlags(GTMaterialFlags.GENERATE_FOIL);
    getMaterial("magnetic_steel").addFlags(GTMaterialFlags.GENERATE_FOIL);
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
            getMaterial(gearMaterial.id).addFlags(
                GTMaterialFlags.GENERATE_GEAR,
                GTMaterialFlags.GENERATE_SMALL_GEAR
            );
        }

        getMaterial(tier.materials.rotor.id).addFlags(
            GTMaterialFlags.GENERATE_BOLT_SCREW,
            GTMaterialFlags.GENERATE_ROTOR
        );
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

    for (let matName of ADD_AQUEOUS) {
        let mat = getMaterial(matName);
        if (!mat.hasProperty(PropertyKey.FLUID)) {
            let prop = new FluidProperty();
            prop.getStorage().enqueueRegistration(FluidStorageKeys.LIQUID, new GTFluidBuilder());
            mat.properties.setProperty(PropertyKey.FLUID, prop);
        }
    }

    for (let matName of ADD_ROUNDS) {
        let mat = getMaterial(matName);
        if (!mat.hasFlag(GTMaterialFlags.GENERATE_ROUND)) {
            mat.addFlags(GTMaterialFlags.GENERATE_ROUND);
        }
    }

    for (let matName of REMOVE_ORE_TAB) {
        let mat = getMaterial(matName);
        if (getOreProperty(mat) === null) {
            console.warn(`Expected an ore property for material '${matName}'`);
        } else {
            mat.addFlags(GTMaterialFlags.NO_ORE_PROCESSING_TAB);
            mat.addFlags(GTMaterialFlags.NO_ORE_SMELTING);
        }
    }

    for (let matName of DISABLE_ALLOY_BLAST_FURNACE) {
        let mat = getMaterial(matName);
        mat.addFlags(GTMaterialFlags.DISABLE_ALLOY_BLAST);
    }

    // remove chromium dust as a byproduct of chromite
    let chromite = GTMaterials.Chromite;
    {
        /** @type {Internal.OreProperty} */
        let oreProp = getOreProperty(chromite);
        // setOreByProducts acttually *appends*, not sets!
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(GTMaterials.Iron, GTMaterials.Magnesia, chromite);

        // we have our own processing chain
        chromite.addFlags(GTMaterialFlags.DISABLE_DECOMPOSITION);
    }

    let magnetite = GTMaterials.Magnetite;
    {
        let oreProp = getOreProperty(magnetite);
        // likewise... actually appends. this is a much easier method for vanadium...
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(GTMaterials.Magnesia, getMaterial("vanadium_pentoxide"));
        oreProp.setOreByProducts(getMaterial("vanadium_pentoxide"));
    }

    let hematite = GTMaterials.Hematite;
    {
        let oreProp = getOreProperty(hematite);
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(
            GTMaterials.Iron,
            GTMaterials.Magnesia,
            GTMaterials.Calcium // TODO: Salt?
        );
    }

    // remove direct smelting of pentlandite
    let pentlandite = GTMaterials.Pentlandite;
    {
        let oreProp = getOreProperty(pentlandite);
        // this is a nullable property, so we can just directly set it.
        oreProp.setDirectSmeltResult(null);
    }

    // remove all byproducts of bauxite, as we have our own custom bayer process for it.
    let bauxite = GTMaterials.Bauxite;
    {
        bauxite.addFlags(GTMaterialFlags.DISABLE_DECOMPOSITION);
        getOreProperty(bauxite).getOreByProducts().clear();
    }

    // replace aluminium with chromite as a byproduct of emerald refining.
    let emerald = GTMaterials.Emerald;
    {
        let oreProp = getOreProperty(emerald);
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(GTMaterials.Beryllium, GTMaterials.Chromite);
    }

    // pyrolusite now produces tantalite and hematite as byproducts.
    let pyrolusite = GTMaterials.Pyrolusite;
    {
        pyrolusite.addFlags(GTMaterialFlags.DISABLE_DECOMPOSITION);

        let oreProp = getOreProperty(pyrolusite);
        oreProp.setDirectSmeltResult(null);
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(GTMaterials.Hematite, GTMaterials.Tantalite);
    }

    let tantalite = GTMaterials.Tantalite;
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

    let monazite = GTMaterials.Monazite;
    {
        monazite.addFlags(GTMaterialFlags.DISABLE_DECOMPOSITION);
        monazite.setFormula("(Ce...)(PO4)");

        let oreProp = getOreProperty(monazite);
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(GTMaterials.Phosphate, getMaterial("thorium_hydroxide"));
        oreProp.getSeparatedInto().clear();
    }

    let molybdenite = GTMaterials.Molybdenite;
    {
        molybdenite.addFlags(
            GTMaterialFlags.DISABLE_DECOMPOSITION,
            GTMaterialFlags.NO_ORE_PROCESSING_TAB
        );
        let oreProp = getOreProperty(molybdenite);

        oreProp.setDirectSmeltResult(null);
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(GTMaterials.Chalcopyrite, getMaterial("fluorite"));
    }

    let zinc = getMaterial("zinc");
    {
        zinc.properties.setProperty(
            PropertyKey.WIRE,
            new WireProperties(GTValues.V[GTValues.MV], 3, 1)
        );
    }

    GTMaterials.Gold.addFlags(GTMaterialFlags.NO_ORE_PROCESSING_TAB);
    {
        let oreProp = getOreProperty(GTMaterials.Gold);
        oreProp.getOreByProducts().clear();
        oreProp.setWashedIn(null);
        oreProp.setDirectSmeltResult(null);
    }

    let mosi = GTMaterials.MolybdenumDisilicide;
    {
        mosi.properties.setProperty(
            PropertyKey.WIRE,
            new WireProperties(GTValues.V[GTValues.EV], 2, 8)
        );
    }

    let redstone = GTMaterials.Redstone;
    {
        redstone.setComponents(
            new MaterialStack(GTMaterials.Silicon, 1),
            new MaterialStack(GTMaterials.Pyrite, 5),
            new MaterialStack(GTMaterials.Cinnabar, 1)
        );

        let oreProp = getOreProperty(redstone);
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts("cinnabar", "glowstone");
    }

    let tricalcumPhosphate = getMaterial("tricalcium_phosphate");
    {
        let oreProp = getOreProperty(tricalcumPhosphate);
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts("apatite", "rock_salt", "phosphate");
    }

    let sphalerite = GTMaterials.Sphalerite;
    {
        let oreProp = getOreProperty(sphalerite);
        oreProp.setDirectSmeltResult(null);
    }

    let arsenoPyrite = getMaterial("arsenopyrite");
    {
        let oreProp = getOreProperty(arsenoPyrite);
        oreProp.setDirectSmeltResult(GTMaterials.Iron);
    }

    let palladium = GTMaterials.Palladium;
    palladium.setMaterialARGB(0xe4340c);
    palladium.setMaterialSecondaryARGB(0xf45c34);

    let silver = GTMaterials.Silver;
    {
        let oreProp = getOreProperty(silver);
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(
            GTMaterials.Gold,
            GTMaterials.Sulfur,
            GTMaterials.Sulfur,
            GTMaterials.Gold
        );
    }

    // have to do this here, because the material builder doesn't seem to have a way to override
    // it.
    getMaterial("ammonium_hydroxide").setFormula("[NH4+][OH-]");
    getMaterial("aluminium_hydroxide").setFormula("Al(OH)3");
    getMaterial("rare_earth_hydroxides").setFormula("(Ce...)(OH)3");
    getMaterial("rare_earth_mixture").setFormula("(Ce...)");
    getMaterial("rare_earth_chlorides").setFormula("(Ce...)Cl3");
    getMaterial("thorium_hydroxide").setFormula("Th(OH)4");
    getMaterial("magnesium_hydroxide").setFormula("Mg(OH)2");
    getMaterial("sodium_dicyanoaurate").setFormula("Na[Au(CN)2]");
    getMaterial("calcium_hydroxide").setFormula("Ca(OH)2");
    getMaterial("potassium_hydroxide").setFormula("K(OH)2");
    getMaterial("hydrogen_heptafluorotantalite").setFormula("H2[TaF7]");
    getMaterial("potassium_heptafluorotantalite").setFormula("K[TaF7]");
    getMaterial("ammonium_fluoride").setFormula("NH4F");
    getMaterial("barium_hydroxide").setFormula("Ba(OH)2");
    getMaterial("gold_hydroxide").setFormula("Au(OH)3");
    getMaterial("ammonium_sulfate").setFormula("(NH4)2SO4");
    getMaterial("ammonium_bisulfate").setFormula("(NH4)HSO4");
    getMaterial("ammonium_persulfate").setFormula("(NH4)2S2O8");
    getMaterial("ammonium_perrhenate").setFormula("NH4ReO4");
    getMaterial("ammonium_paratungstate").setFormula("(NH4)10(H2W12O42)");
    getMaterial("ammonium_hexachloroiridate").setFormula("(NH4)2[IrCl6]");
    getMaterial("ammonium_hexachloroplatinate").setFormula("(NH4)2[PtCl6]");
    getMaterial("ammonium_hexachloropalladate").setFormula("(NH4)2[PdCl6]");
    getMaterial("ammonium_hexachlororhodate").setFormula("(NH4)2[RhCl6]");
    getMaterial("potassium_hexachlororuthenate").setFormula("K2[RuCl6]");
    getMaterial("rhodium_trichloride_trihydrate").setFormula("RhCl3.(H20)3");
    getMaterial("manganese_nitrate").setFormula("Mn(NO3)2");
    getMaterial("ammonium_squarate").setFormula("(NH4)2C4O4");
    getMaterial("nether_star").setFormula("Mn(C4O4)");

    // more useful formulas for organic chemicals.
    getMaterial("styrene").setFormula("C6H5CH=CH2");
    getMaterial("dimethylamine").setFormula("NH(CH3)2");
    getMaterial("trimethylamine").setFormula("N(CH3)3");
    getMaterial("polystyrene_sulfonate").setFormula("(CH2CHC6H4SO3H)");
    getMaterial("sodium_polystyrene_sulfonate").setFormula("(CH2CHC6H4SO3Na)");
    getMaterial("one_butanol").setFormula("C4H9OH");
    getMaterial("tributyl_phosphate").setFormula("PO(OC4H9)3");
    getMaterial("trimethylamine").setFormula("N(CH3)3");
    getMaterial("diacetone_alcohol").setFormula("CH3C(O)CH2C(OH)(CH3)2");
    getMaterial("mesityl_oxide").setFormula("CH3C(O)CH=C(CH3)2");
    getMaterial("methyl_isobutyl_ketone").setFormula("(CH3)2CHCH2C(O)CH3");
    getMaterial("chloroethane").setFormula("CH3CH2Cl");
    getMaterial("dichloroethane").setFormula("ClCH2CH2Cl");
    getMaterial("vinyl_chloride").setFormula("CH2CHCl");
    getMaterial("triethylaluminium").setFormula("Al2(C2H5)6");
    getMaterial("ethylaluminium_sesquichloride").setFormula("(C2H5)3Al2Cl3");
    getMaterial("octanol").setFormula("CH3(CH2)7OH");
    getMaterial("trioctylamine").setFormula("(C8H17)3N");
    getMaterial("formaldehyde").setFormula("CH2O");
    getMaterial("triphenylphosphine").setFormula("PPh3");
    getMaterial("triphenylphosphine_oxide").setFormula("OPPh3");
    getMaterial("triphenylphosphine_chloride").setFormula("PPh3Cl2");
    getMaterial("wilkinson_catalyst_raw").setFormula("RhCl(PPh3)3");
    getMaterial("trimethylolpropane").setFormula("CH3CH2C(CH2OH)3");
    getMaterial("polyvinyl_alcohol").setFormula("(C2H3(OH))");
    getMaterial("dehpa").setFormula("(C8H17O)2PO2H");
    getMaterial("hexachlorobutadiene").setFormula("Cl2CC(Cl)C(Cl)CCl2");
    getMaterial("morpholine").setFormula("O(CH2CH2)2NH");
    getMaterial("diethanolamine").setFormula("HN(C2H5OH)2");
    getMaterial("ethylene_oxide").setFormula("C2H4O");
    getMaterial("tmbd").setFormula("C16H24Cl3N3O3");
    getMaterial("mcb").setFormula("C8H8Cl3NO2");
    getMaterial("morpholine_hydrochloride").setFormula("C4H10ClNO");
    getMaterial("squaric_acid").setFormula("C4O2(OH)2");

    // alloys shouldn't have formulas!
    // false means it's sent straight to the property, without trying to decapitalise it
    // (which would crash).
    getMaterial("hsla_steel").setFormula(null, false);
    getMaterial("az_91").setFormula(null, false);

    // Don't require the vacuum freezer (or the stupid washer) recipes for Kanthal.
    getBlastProperty("kanthal").setBlastTemperature(1700);

    // Allow TaC in EV.
    getBlastProperty("tantalum_carbide").setBlastTemperature(3600);

    // Used for clean machine casing.
    getMaterial("vanadium_steel").addFlags(GTMaterialFlags.GENERATE_FRAME);
};
