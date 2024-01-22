// TODO: With custom materials now belonging to their own mod in 1.1.0, this needs to be
//       overhauled.

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

    static gtceu(name) {
        return new Material("gtceu", name);
    }

    static nijika(name) {
        return new Material("nijika", name);
    }
}

/**
 * A single GregTech voltage tier.
 */
export class Tier {
    /**
      * @param {string} name The name of the tier, used for certain tags.
      * @param {Material} plate_primary The *primary* plate, i.e. the one used for casing.
      * @param {Material} plate_secondary The *secondary* plate, i.e. the one used for hulls.
      * @param {Material} cable The primary cable material.
      * @param {boolean} uses_assembly_line If true, then this uses the assembly line rather than 
      *                                     assemblers. Defaults to False.
      * 
      * 
      * @param {Material} motor_wire The wire used within motors.
      * @param {Material} magnetic The magnetic material used for motors and coils.
      * @param {string} glass The glass used for various machine recipes. 
     */
    constructor(
        name,
        plate_primary,
        plate_secondary,
        cable,
        motor_wire,
        magnetic,
        glass,
        uses_assembly_line,
    ) {
        this.name = name;
        this.primary_material = plate_primary;
        this.secondary_material = plate_secondary;
        this.cable_material = cable;

        this.motor_wire_material = motor_wire;
        this.magnetic_material = magnetic;

        if (typeof uses_assembly_line === "undefined") {
            this.uses_assembly_line = false;
        } else {
            this.uses_assembly_line = true;
        }
    }

    // hard-coded properties
    // follows similar progression to the base mod.

    /**
     * If true, then this tier allows using regular rubber for components. 
     */
    get accepts_rubber() {
        return this.name == "lv" || this.name == "mv";
    }

    /**
     * If true, then this tier allows using silicone rubber for components.
     */
    get accepts_silicone_rubber() {
        return this.accepts_rubber || this.name == "hv" || this.name == "ev" || this.name == "iv";
    }

    // == Plates == //
    get primary_plate() {
        return `#forge:plates/${this.primary_material.materialName}`
    }

    get secondary_plate() {
        return `#forge:plates/${this.secondary_material.materialName}`;
    }

    // == Rods == //

    get primary_rod() {
        return `#forge:rods/${this.primary_material.materialName}`
    }

    get secondary_rod() {
        return `#forge:rods/${this.secondary_material.materialName}`
    }

    get effective_rod_for_lv() {
        if (this.name == "lv") {
            return this.secondary_rod;
        } else {
            return this.primary_rod;
        }
    }

    get magnetic_rod() {
        return `#forge:rods/${this.magnetic_material.materialName}`;
    }

    // === Cables & Wires == //

    get single_cable() {
        return `${this.cable_material.modId}:${this.cable_material.materialName}_single_cable`;
    }

    get quadruple_cable() {
        return `${this.cable_material.modId}:${this.cable_material.materialName}_quadruple_cable`
    }

    get motor_wire() {
        // motors use double wires... 
        return `${this.motor_wire_material.modId}:${this.motor_wire_material.materialName}_double_wire`;
    }
}


// TODO (less urgent): replace asseembler recipes too
/**
 * The array of voltage tier materials.
 * 
 * @type {Tier[]}
 */
export const GT_MACHINE_TIERS = [
    new Tier(
        "lv", Material.gtceu("wrought_iron"), Material.gtceu("iron"), Material.gtceu("tin"), 
        Material.gtceu("copper"), Material.gtceu("magnetic_iron"), "#forge:glass"
    ),
    new Tier(
        "mv", Material.gtceu("steel"), Material.gtceu("wrought_iron"), Material.gtceu("copper"),
        Material.gtceu("cupronickel"), Material.gtceu("magnetic_steel"), "#forge:glass"
    ),
    new Tier(
        "hv", Material.gtceu("aluminium"), Material.gtceu("polyethylene"), Material.gtceu("gold"),
        Material.gtceu("electrum"), Material.gtceu("magnetic_steel"), "gtceu:tempered_glass"
    ),
    new Tier(
        "ev", Material.gtceu("stainless_steel"), Material.gtceu("polyethylene"), Material.gtceu("aluminium"),
        Material.gtceu("kanthal"), Material.gtceu("magnetic_neodymium")
    ),
    new Tier(
        "iv", Material.gtceu("titanium"), Material.gtceu("polytetrafluoroethylene"), Material.gtceu("platinum"),
        Material.gtceu("graphene"), Material.gtceu("magnetic_neodymium"),
    ),
    
    /*
    _tierFn("luv", "tungsten_steel", "polytetrafluoroethylene", "niobium_titanium"),
    _tierFn("zpm", "rhodium_plated_palladium", "polytetrafluoroethylene", "vanadium_gallium"),
    _tierFn("uv", "naquadah_alloy", "polybenzimidazole", "yttrium_barium_cuprate"),
    _tierFn("uhv", "darmstadium", "polybenzimidazole", "europium"),
    */
];

export const GT_WIRE_TYPES = [
    [1, "single"], 
    [2, "double"], 
    [4, "quadruple"], 
    [8, "octal"], 
    [16, "hex"],
];
