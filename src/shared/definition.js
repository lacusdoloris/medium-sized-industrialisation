/**
 * A single material used in a tier.
 */
export class Material {
    /**
     * @param {string} modId
     * @param {string} material_name
     */
    constructor(modId, material_name) {
        this.modId = modId;
        this.materialName = material_name;
    }

    /**
     * Gets this material as a tag of the specified type.
     */
    tagged(type) {
        return `#forge:${type}/${this.materialName}`;
    }

    /**
     * Gets this material as a component with the specified suffix.
     */
    component(suffix) {
        if (this.modId == "nijika") {
            return `gtceu:${this.materialName}_${suffix}`;
        }
        return `${this.modId}:${this.materialName}_${suffix}`;
    }

    get id() {
        if (this.modId == "nijika") {
            return `gtceu:${this.materialName}`;
        }
        return `${this.modId}:${this.materialName}`;
    }

    static gtceu(name) {
        return new Material("gtceu", name);
    }

    static nijika(name) {
        return new Material("nijika", name);
    }
}

// ugh, there's so many edge cases here.
// https://sourcegraph.com/github.com/GregTechCEu/GregTech-Modern/-/blob/src/main/java/com/gregtechceu/gtceu/data/recipe/CraftingComponent.java

/**
 * A single GregTech voltage tier.
 */
export class Tier {
    /**
     * @param {string} name The name of the tier, used for certain tags.
     * @param {object} tierMaterials A sub-object containing details of tier materials.
     * @param {Material} tierMaterials.plate The *primary* plate, i.e. the one used for casing.
     * @param {Material} tierMaterials.hullPlate The *secondary* plate, i.e. the one used for hulls.
     * @param {Material} tierMaterials.cable The primary cable material.
     * @param {Material} tierMaterials.electricWire The "electric wire" (?), used for the electrolyzer.
     * @param {Material} tierMaterials.motorWire The wire type used for the motor.
     * @param {Material} tierMaterials.magnetic The magnetic material used for this tier.
     * @param {string} tierMaterials.glass The raw tag or Identifier for the glass used for this tier.
     * @param {Material} tierMaterials.pipe The pipe material for this tier.
     * @param {Material} tierMaterials.heating The "heating coil" material for this tier.
     * @param {Material} tierMaterials.rotor The rotor used for certain machines.
     * @param {string} tierMaterials.grinder The item used for grinding components.
     * @param {Material} tierMaterials.emitterRod The rod type used for emitters and sensors.
     * @param {string} tierMaterials.emitterGem The gem item used used for emitters and sensors.
     * @param {Material} tierMaterials.gear The gear material used for certain components.
     *
     * @param {boolean} usesAssemblyLine If true, then this uses the assembly line rather than
     *                                   assemblers. Defaults to False.
     */
    constructor(name, tierMaterials, usesAssemblyLine) {
        this.name = name;
        this.materials = tierMaterials;

        if (typeof usesAssemblyLine === "undefined") {
            this.usesAssemblyLine = false;
        } else {
            this.usesAssemblyLine = true;
        }
    }

    // hard-coded properties
    // follows similar progression to the base mod.

    /**
     * If true, then this tier allows using regular rubber for components.
     */
    get acceptsRubber() {
        return this.name == "lv" || this.name == "mv";
    }

    /**
     * If true, then this tier allows using silicone rubber for components.
     */
    get acceptsSiliconeRubber() {
        return this.acceptsRubber || this.name == "hv" || this.name == "ev" || this.name == "iv";
    }

    get acceptableRubbers() {
        let acceptableRubbers = [
            "styrene_butadiene_rubber", // always acceptable
        ];

        if (this.acceptsSiliconeRubber) {
            acceptableRubbers.push("silicone_rubber");
        }
        if (this.acceptsRubber) {
            acceptableRubbers.push("rubber");
        }

        return acceptableRubbers;
    }

    // == Tier Name Helpers == //
    get machineHull() {
        return `gtceu:${this.name}_machine_hull`;
    }

    get machineCasing() {
        return `gtceu:${this.name}_machine_casing`;
    }

    get circuitTag() {
        return `#gtceu:circuits/${this.name}`;
    }

    // == Plates == //
    get primaryPlate() {
        return this.materials.plate.tagged("plates");
    }

    get hullExtraPlate() {
        return this.materials.hullPlate.tagged("plates");
    }

    // == Rods == //

    get primaryRod() {
        return this.materials.plate.tagged("rods");
    }

    get effectiveRodWithLVHardcode() {
        if (this.name == "lv") {
            return "#forge:rods/iron";
        } else {
            return this.primaryRod;
        }
    }

    get magneticRod() {
        return this.materials.magnetic.tagged("rods");
    }

    // === Cables & Wires == //

    get singleCable() {
        return this.materials.cable.component("single_cable");
    }

    get quadrupleCable() {
        return this.materials.cable.component("quadruple_cable");
    }

    get doubleMotorWire() {
        // motors use double wires...
        return this.materials.motorWire.component("double_wire");
    }

    get heatingWire() {
        return this.materials.heating.component("double_wire");
    }

    get quadHeatingWire() {
        return this.materials.heating.component("quadruple_wire");
    }
}

/**
 * The array of voltage tier materials.
 */
export const GT_MACHINE_TIERS = {
    LV: new Tier("lv", {
        plate: Material.gtceu("wrought_iron"),
        hullPlate: Material.gtceu("iron"),
        cable: Material.gtceu("tin"),
        electricWire: Material.gtceu("silver"),
        motorWire: Material.gtceu("copper"),
        magnetic: Material.gtceu("magnetic_iron"),
        glass: "#forge:glass",
        pipe: Material.gtceu("bronze"),
        heating: Material.gtceu("copper"),
        rotor: Material.gtceu("tin"),
        grinder: "#forge:gems/diamond",
        emitterRod: Material.gtceu("bronze"), // Changed from Brass
        emitterGem: "minecraft:quartz", // Changed from Quartzite
        gear: Material.gtceu("iron"),
    }),

    MV: new Tier("mv", {
        plate: Material.gtceu("steel"),
        hullPlate: Material.gtceu("wrought_iron"),
        cable: Material.gtceu("copper"),
        electricWire: Material.gtceu("zinc"),
        motorWire: Material.gtceu("cupronickel"),
        magnetic: Material.gtceu("magnetic_steel"),
        glass: "#forge:glass",
        pipe: Material.gtceu("steel"),
        heating: Material.gtceu("cupronickel"),
        rotor: Material.gtceu("steel"), // Changed from Bronze. Why does this one need a bronze rotor?
        grinder: "#forge:gems/diamond",
        emitterRod: Material.gtceu("electrum"),
        emitterGem: "gtceu:flawless_emerald_gem",
        gear: Material.gtceu("steel"),
    }),

    HV: new Tier("hv", {
        plate: Material.gtceu("aluminium"),
        hullPlate: Material.gtceu("polyethylene"),
        cable: Material.gtceu("gold"), // Note: The motor recipe has this (incorrectly) as Silver.
        electricWire: Material.gtceu("electrum"),
        motorWire: Material.gtceu("electrum"),
        magnetic: Material.gtceu("magnetic_steel"),
        glass: "gtceu:tempered_glass",
        pipe: Material.gtceu("steel"),
        heating: Material.gtceu("kanthal"),
        // Changed from steel, gives a use to the otherwise unused Chromium rotor.
        rotor: Material.gtceu("chromium"),
        grinder: "gtceu:diamond_grinding_head",
        emitterRod: Material.gtceu("chromium"),
        emitterGem: "minecraft:ender_eye",
        gear: Material.gtceu("vanadium_steel"),
    }),

    EV: new Tier("ev", {
        plate: Material.gtceu("stainless_steel"),
        hullPlate: Material.gtceu("polyethylene"),
        cable: Material.gtceu("aluminium"),
        electricWire: Material.gtceu("platinum"),
        motorWire: Material.gtceu("kanthal"),
        magnetic: Material.gtceu("magnetic_neodymium"),
        glass: "gtceu:tempered_glass",
        pipe: Material.gtceu("stainless_steel"),
        heating: Material.gtceu("nichrome"),
        rotor: Material.gtceu("stainless_steel"),
        grinder: "gtceu:diamond_grinding_head",
        emitterRod: Material.gtceu("platinum"),
        emitterGem: "gtceu:quantum_eye",
    }),

    IV: new Tier("iv", {
        plate: Material.gtceu("titanium"),
        hullPlate: Material.gtceu("polytetrafluoroethylene"),
        cable: Material.gtceu("platinum"),
        electricWire: Material.gtceu("osmium"), // lol, what?
        motorWire: Material.gtceu("graphene"),
        magnetic: Material.gtceu("magnetic_neodymium"),
        glass: "gtceu:laminated_glass",
        pipe: Material.gtceu("titanium"),
        heating: Material.gtceu("nichrome"), // changed from tungstensteel
        rotor: Material.gtceu("titanium"), // changed from tungstensteel
        grinder: "gtceu:diamond_grinding_head",
        emitterRod: Material.gtceu("iridium"),
        emitterGem: "gtceu:quantum_star",
    }),

    /*
    _tierFn("luv", "tungsten_steel", "polytetrafluoroethylene", "niobium_titanium"),
    _tierFn("zpm", "rhodium_plated_palladium", "polytetrafluoroethylene", "vanadium_gallium"),
    _tierFn("uv", "naquadah_alloy", "polybenzimidazole", "yttrium_barium_cuprate"),
    _tierFn("uhv", "darmstadium", "polybenzimidazole", "europium"),
    */
};

export const GT_WIRE_TYPES = [
    [1, "single"],
    [2, "double"],
    [4, "quadruple"],
    [8, "octal"],
    [16, "hex"],
];

// used for circuit assembleers
/**
 * A mapping of a tier to the next highest tier.
 */
export const TIER_TO_HIGHER_TIER_MAP = {
    lv: "mv",
    mv: "hv",
    hv: "ev",
    ev: "iv",
    iv: "luv",
    luv: "zpm",
    zpm: "uv",
    uv: "uhv",
};
