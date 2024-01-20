export class Tier {
    /**
     * A single GregTech voltage tier.
     * 
     * @param {string} name The name of the tier, used for certain tags.
     * @param {string} plate_primary The *primary* plate, i.e. the one used for casing.
     * @param {string} plate_secondary The *secondary* plate, i.e. the one used for hulls.
     * @param {string} cable The primary cable material.
     * @param {boolean} uses_assembly_line If true, then this uses the assembly line rather than 
     *                                     assemblers. Defaults to False.
     * 
     * @param {string} motor_wire The wire used within motors.
     * @param {string} magnetic The magnetic material used for motors and coils.
     */

    constructor(
        name,
        plate_primary,
        plate_secondary,
        cable,
        motor_wire,
        magnetic,
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
        return `#forge:plates/${this.primary_material}`
    }

    get secondary_plate() {
        return `#forge:plates/${this.secondary_material}`;
    }

    // == Rods == //

    get primary_rod() {
        return `#forge:rods/${this.primary_material}`
    }

    get secondary_rod() {
        return `#forge:rods/${this.secondary_material}`
    }

    get effective_rod_for_lv() {
        if (this.name == "lv") {
            return this.secondary_rod;
        } else {
            return this.primary_rod;
        }
    }

    get magnetic_rod() {
        return `#forge:rods/${this.magnetic_material}`;
    }

    // === Cables & Wires == //

    get single_cable() {
        return `gtceu:${this.cable_material}_single_cable`;
    }

    get motor_wire() {
        // motors use double wires... 
        return `gtceu:${this.motor_wire_material}_double_wire`;
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
        "lv", "wrought_iron", "iron", "tin", 
        "copper", "magnetic_iron"
    ),
    new Tier(
        "mv", "steel", "wrought_iron", "copper",
        "cupronickel", "magnetic_steel"
    ),
    new Tier(
        "hv", "aluminium", "polyethylene", "gold",
        "electrum", "magnetic_steel",
    ),
    new Tier(
        "ev", "stainless_steel", "polyethylene", "aluminium",
        "kanthal", "magnetic_neodymium"
    ),
    new Tier(
        "iv", "titanium", "polytetrafluoroethylene", "platinum",
        "graphene", "magnetic_neodymium",
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
