// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { getStackForTagPrefix } from "./utils";

// ugh, there's so many edge cases here.
// https://sourcegraph.com/github.com/GregTechCEu/GregTech-Modern/-/blob/src/main/java/com/gregtechceu/gtceu/data/recipe/CraftingComponent.java

/**
 * A single GregTech voltage tier.
 */
export class Tier {
    /**
     * @param {string} name The name of the tier, used for certain tags.
     * @param {object} tierMaterials A sub-object containing details of tier materials.
     * @param {string} tierMaterials.plate The *primary* plate, i.e. the one used for casing.
     * @param {string} tierMaterials.hullPlate The *secondary* plate, i.e. the one used for hulls.
     * @param {string} tierMaterials.cable The primary cable material.
     * @param {string} tierMaterials.electricWire The "electric wire" (?), used for the electrolyzer.
     * @param {string} tierMaterials.motorWire The wire type used for the motor.
     * @param {string} tierMaterials.magnetic The magnetic material used for this tier.
     * @param {string} tierMaterials.glass The raw tag or Identifier for the glass used for this tier.
     * @param {string} tierMaterials.pipe The pipe material for this tier.
     * @param {string} tierMaterials.heating The "heating coil" material for this tier.
     * @param {string} tierMaterials.rotor The rotor used for certain machines.
     * @param {string} tierMaterials.grinder The item used for grinding components.
     * @param {string} tierMaterials.emitterRod The rod type used for emitters and sensors.
     * @param {string} tierMaterials.emitterGem The gem item used used for emitters and sensors.
     * @param {string} tierMaterials.gear The gear material used for certain components.
     * @param {string} tierMaterials.buzzsaw The buzzsaw blade material used for cutters.
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

    /**
     * A list of acceptable rubber materials for cable coverings.
     *
     * @returns {string[]}
     */
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
    /**
     * The machine hull ID for this tier.
     *
     * @returns {string}
     */
    get machineHull() {
        return `gtceu:${this.name}_machine_hull`;
    }

    /**
     * The machine casing ID for this tier.
     *
     * @returns {string}
     */
    get machineCasing() {
        return `gtceu:${this.name}_machine_casing`;
    }

    /**
     * The circuit tag for this tier, to be used in recipes.
     *
     * @returns {string}
     */
    get circuitTag() {
        return `#gtceu:circuits/${this.name}`;
    }

    // == Plates == //
    /**
     * The "primary" plate for this tier. Used to make machine casings and used for various
     * components and other machines.
     *
     * @return {Internal.ItemStack}
     */
    get primaryPlate() {
        return getStackForTagPrefix(TagPrefix.plate, this.materials.plate);
    }

    /**
     * The "extra" hull plate for this tier. Used to make machine hulls.
     *
     * @returns {Internal.ItemStack}
     */
    get hullExtraPlate() {
        return getStackForTagPrefix(TagPrefix.plate, this.materials.hullPlate);
    }

    // == Rods == //

    /**
     * The primary rod for this tier. Used to make things such as electric motors.
     *
     * @returns {Internal.ItemStack}
     */
    get primaryRod() {
        return getStackForTagPrefix(TagPrefix.rod, this.materials.plate);
    }

    /**
     * The primary rod, but with a hardcode for the LV tier that forces returning regular iron rods.
     *
     * @returns {Internal.ItemStack}
     */
    get effectiveRodWithLVHardcode() {
        if (this.name == "lv") {
            return getStackForTagPrefix(TagPrefix.rod, GTMaterials.Iron);
        } else {
            return this.primaryRod;
        }
    }

    /**
     * The magnetic rod, used to make various electronic components.
     *
     * @returns {Internal.ItemStack}
     */
    get magneticRod() {
        return getStackForTagPrefix(TagPrefix.rod, this.materials.magnetic);
    }

    // === Cables & Wires == //

    get singleCable() {
        return getStackForTagPrefix(TagPrefix.wireGtSingle, this.materials.cable);
    }

    get quadrupleCable() {
        return getStackForTagPrefix(TagPrefix.wireGtDouble, this.materials.cable);
    }

    get doubleMotorWire() {
        // motors use double wires...
        return getStackForTagPrefix(TagPrefix.wireGtDouble, this.materials.motorWire);
    }

    get heatingWire() {
        return getStackForTagPrefix(TagPrefix.wireGtDouble, this.materials.heating);
    }

    get quadHeatingWire() {
        return getStackForTagPrefix(TagPrefix.wireGtQuadruple, this.materials.heating);
    }

    /** @returns {Internal.ItemStack} */
    get gear() {
        if (typeof this.materials.gear !== "undefined") {
            return getStackForTagPrefix(TagPrefix.gear, this.materials.gear);
        }

        return getStackForTagPrefix(TagPrefix.gear, this.materials.plate);
    }

    get smallGear() {
        if (typeof this.materials.gear !== "undefined") {
            return getStackForTagPrefix(TagPrefix.gearSmall, this.materials.gear);
        }

        return getStackForTagPrefix(TagPrefix.gearSmall, this.materials.plate);
    }
}

/**
 * The array of voltage tier materials.
 */
export const GT_MACHINE_TIERS = {
    LV: new Tier("lv", {
        plate: "wrought_iron",
        hullPlate: "iron",
        cable: "tin",
        electricWire: "silver",
        motorWire: "copper",
        magnetic: "magnetic_iron",
        glass: "#forge:glass",
        pipe: "bronze",
        heating: "copper",
        rotor: "tin",
        grinder: "#forge:gems/diamond",
        emitterRod: "bronze", // Changed from Brass
        emitterGem: "minecraft:quartz", // Changed from Quartzite
        gear: "iron",
        buzzsaw: "bronze", // Changed from Cobalt Brass, wtf?
    }),

    MV: new Tier("mv", {
        plate: "steel",
        hullPlate: "wrought_iron",
        cable: "copper",
        electricWire: "zinc",
        motorWire: "cupronickel",
        magnetic: "magnetic_steel",
        glass: "#forge:glass",
        pipe: "steel",
        heating: "cupronickel",
        rotor: "steel", // Changed from Bronze. Why does this one need a bronze rotor?
        grinder: "#forge:gems/diamond",
        emitterRod: "electrum",
        emitterGem: "gtceu:flawless_emerald_gem",
        gear: "steel",
        buzzsaw: "vanadium_steel",
    }),

    HV: new Tier("hv", {
        plate: "aluminium",
        hullPlate: "polyethylene",
        cable: "gold", // Note: The motor recipe has this incorrectly as Silver.
        electricWire: "electrum",
        motorWire: "electrum",
        magnetic: "magnetic_steel",
        glass: "gtceu:tempered_glass",
        pipe: "vanadium_steel",
        heating: "kanthal",
        // Changed from steel, gives a use to the otherwise unused Chromium rotor.
        rotor: "chromium",
        grinder: "gtceu:diamond_grinding_head",
        emitterRod: "chromium",
        emitterGem: "minecraft:ender_eye",
        gear: "vanadium_steel",
        buzzsaw: "blue_steel",
    }),

    EV: new Tier("ev", {
        plate: "nitinol",
        hullPlate: "polyethylene",
        cable: "aluminium",
        electricWire: "aluminium",
        motorWire: "kanthal",
        magnetic: "magnetic_steel",
        glass: "gtceu:tempered_glass",
        pipe: "tungsten_carbide",
        heating: "nichrome",
        rotor: "az_91",
        grinder: "gtceu:diamond_grinding_head",
        emitterRod: "az_91",
        emitterGem: "gtceu:quantum_eye",
        gear: "az_91",
        buzzsaw: "ultimet",
    }),

    IV: new Tier("iv", {
        plate: "rhenium_superalloy",
        hullPlate: "polytetrafluoroethylene",
        cable: "platinum",
        electricWire: "osmium", // lol, what?
        motorWire: "graphene",
        magnetic: "magnetic_neodymium",
        glass: "gtceu:laminated_glass",
        pipe: "nitinol",
        heating: "nichrome", // changed from tungstensteel
        rotor: "tungsten_steel",
        grinder: "gtceu:diamond_grinding_head",
        emitterRod: "iridium",
        emitterGem: "gtceu:quantum_star",
        gear: "nitinol",
        buzzsaw: "tungsten_carbide",
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
