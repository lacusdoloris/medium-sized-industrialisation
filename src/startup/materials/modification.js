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
    // Required for slag byproduccts.
    "magnetite",
    "hematite",
    // Arsenic trioxide is flagged because it's only used as an intermediate for Arsenic
    // trichloride.
    "arsenic_trioxide",
    "hsla_steel",
    // Various misc materials.
    "barite",
];

/** A list of materials to actually add dusts & ingots to. */
const ADD_METALS = ["rhenium"];

/** A list of materials to add aqueous properties to. */
const ADD_AQUEOUS = ["sodium_hydroxide", "calcium_hydroxide"];

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
        oreProp.getOreByProducts().clear();
        oreProp.setOreByProducts(getMaterial("magnesia"), getMaterial("vanadium_pentoxide"));
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
        oreProp.setOreByProducts(getMaterial("chalcopyrite"), getMaterial("fluorite"));
    }

    let zinc = getMaterial("zinc");
    {
        zinc.properties.setProperty(
            PropertyKey.WIRE,
            new WireProperties(GTValues.V[GTValues.MV], 3, 1)
        );
    }

    let gold = getMaterial("gold");
    {
        let oreProp = getOreProperty(gold);
        oreProp.getOreByProducts().clear();
        oreProp.setWashedIn(null);
        oreProp.setDirectSmeltResult(null);
    }

    let mosi = getMaterial("molybdenum_disilicide");
    {
        mosi.properties.setProperty(
            PropertyKey.WIRE,
            new WireProperties(GTValues.V[GTValues.EV], 2, 8)
        );
    }

    let redstone = getMaterial("redstone");
    {
        redstone.setComponents(
            new MaterialStack(getMaterial("silicon"), 1),
            new MaterialStack(getMaterial("pyrite"), 5),
            new MaterialStack(getMaterial("cinnabar"), 1)
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

    let palladium = getMaterial("palladium");
    palladium.setMaterialARGB(0xe4340c);
    palladium.setMaterialSecondaryARGB(0xf45c34);

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

    // more useful formulas for organic chemicals.
    getMaterial("styrene").setFormula("C6H5CH=CH2");
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
    getMaterial("ethylene_dichloride").setFormula("ClCH2CH2Cl");
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
