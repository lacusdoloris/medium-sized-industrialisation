// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { TIER_TO_HIGHER_TIER_MAP, Tier } from "../../shared/definition";

// As a side note, a lot of these simply re-create the recipes; this is to allow us to more
// easily replace materials in the future.
// This is a lot of tedious work.

// TODO: Consider replacing the "heating coils" with actual coils in some form?

/** @param {Tier} tier */
const standardReplacements = (tier, extra) => {
    let result = {
        C: tier.circuitTag,
        H: tier.machineHull,
        W: tier.singleCable,
        G: tier.materials.glass,
        R: tier.materials.rotor.tagged("rotors"),
        P: `gtceu:${tier.name}_electric_piston`,
        M: `gtceu:${tier.name}_electric_motor`,
        V: `gtceu:${tier.name}_conveyor_module`,
        E: `gtceu:${tier.name}_emitter`,
    };
    return Object.assign({}, result, extra);
};

/**
 * Adjusts machine recipes for a single tier.
 *
 * @param {Internal.RecipesEventJS} event
 * @param {Tier} tier
 */
export const adjustMachineRecipesForTier = (event, tier) => {
    // sigh. gotta do it the hard way.
    // ``shaped()`` doeesn't accept unused replacements, so we have to remove any that aren't
    // in the provided pattern.
    const lazyShaped = (id, pattern, replacements) => {
        // no ES6 splat operator, so we can't do this the easy way.

        let allChars = pattern.join("");
        let mergedReplacements = standardReplacements(tier, replacements);
        let actualReplacements = {};

        // quadratic way: iterate over replacements and only copy the ones in the pattern.
        // smart way, linear complexity: iterate over the pattern and copy over the ones we find.
        for (let char of allChars) {
            actualReplacements[char] = mergedReplacements[char];
        }

        return event.shaped(id, pattern, actualReplacements);
    };

    // GTCEu regular machines, in EMI (MV) order:
    //
    // Electric Furnace: Replace heating coil wire.
    event.remove({ id: `gtceu:shaped/${tier.name}_electric_furnace` });
    lazyShaped(`gtceu:${tier.name}_electric_furnace`, ["CZC", "ZHZ", "WZW"], {
        Z: tier.heatingWire,
    }).id(`nijika:auto/machines/${tier.name}/electric_furnace`);

    // Alloy Smelter: Replacing heating coil wire.
    event.remove({ id: `gtceu:shaped/${tier.name}_alloy_smelter` });
    lazyShaped(`gtceu:${tier.name}_alloy_smelter`, ["CZC", "ZHZ", "WZW"], {
        Z: tier.quadHeatingWire,
    }).id(`nijika:auto/machines/${tier.name}/alloy_smelter`);

    //
    // Arc Furnace: Replace tier plates.

    event.remove({ id: `gtceu:shaped/${tier.name}_arc_furnace` });
    lazyShaped(`gtceu:${tier.name}_arc_furnace`, ["WTW", "CHC", "PPP"], {
        W: tier.quadrupleCable,
        T: "#forge:dusts/graphite",
        P: tier.primaryPlate,
    }).id(`nijika:auto/machines/${tier.name}/arc_furnace`);

    // Assembler: Replace tier cables.
    event.remove({ id: `gtceu:shaped/${tier.name}_assembler` });
    lazyShaped(`gtceu:${tier.name}_assembler`, ["RCR", "VHV", "WCW"], {
        R: `gtceu:${tier.name}_robot_arm`,
    }).id(`nijika:auto/machines/${tier.name}/assembler`);

    // Autoclave: Replace tier plates.
    event.remove({ id: `gtceu:shaped/${tier.name}_autoclave` });
    lazyShaped(`gtceu:${tier.name}_autoclave`, ["PGP", "PHP", "CEC"], {
        P: tier.primaryPlate,
        E: `gtceu:${tier.name}_electric_pump`,
    }).id(`nijika:auto/machines/${tier.name}/autoclave`);

    // Bender: Replace the wrench.
    event.remove({ id: `gtceu:shaped/${tier.name}_bender` });
    lazyShaped(`gtceu:${tier.name}_bender`, ["PGP", "CHC", "MWM"], {
        G: tier.materials.gear.tagged("gears"),
    }).id(`nijika:auto/machines/${tier.name}/bender`);

    // Brewer: Replace Glass, Brewing "rods", cables.
    event.remove({ id: `gtceu:shaped/${tier.name}_brewery` });
    lazyShaped(`gtceu:${tier.name}_brewery`, ["GPG", "WHW", "CSC"], {
        P: `gtceu:${tier.name}_electric_pump`,
        S: tier.materials.heating.tagged("springs"),
    }).id(`nijika:auto/machines/${tier.name}/brewer`);

    // Canner: Replace Glass, cables.
    event.remove({ id: `gtceu:shaped/${tier.name}_canner` });
    lazyShaped(`gtceu:${tier.name}_canner`, ["WPW", "CHC", "GGG"], {
        P: `gtceu:${tier.name}_electric_pump`,
    }).id(`nijika:auto/machines/${tier.name}/canner`);

    // Centrifuge: Replace cables.
    event.remove({ id: `gtceu:shaped/${tier.name}_centrifuge` });
    lazyShaped(`gtceu:${tier.name}_centrifuge`, ["CMC", "WHW", "CMC"], {}).id(
        `nijika:auto/machines/${tier.name}/centrifuge`
    );

    // Chemical bath: Replace Glass, cable.
    event.remove({ id: `gtceu:shaped/${tier.name}_chemical_bath` });
    lazyShaped(`gtceu:${tier.name}_chemical_bath`, ["VGW", "PGV", "CHC"], {
        P: `gtceu:${tier.name}_electric_pump`,
    }).id(`nijika:auto/machines/${tier.name}/chemical_bath`);

    // Chemical reactor: Replace rotors, glass, cablees.
    event.remove({ id: `gtceu:shaped/${tier.name}_chemical_reactor` });
    lazyShaped(`gtceu:${tier.name}_chemical_reactor`, ["GRG", "WMW", "CHC"], {}).id(
        `nijika:auto/machines/${tier.name}/chemical_reactor`
    );

    // Compressor: Replace wires.
    event.remove({ id: `gtceu:shaped/${tier.name}_compressor` });
    lazyShaped(`gtceu:${tier.name}_compressor`, [" C ", "PHP", "WCW"], {}).id(
        `nijika:auto/machines/${tier.name}/compressor`
    );

    // Cutter: Replace wires, glass, and buzzsaw blade.
    event.remove({ id: `gtceu:shaped/${tier.name}_cutter` });
    lazyShaped(`gtceu:${tier.name}_cutter`, ["WCG", "VHB", "CWM"], {
        B: tier.materials.buzzsaw.component("buzz_saw_blade"),
    }).id(`nijika:auto/machines/${tier.name}/cutter`);

    // Distillery: Replace Glass, spring.
    event.remove({ id: `gtceu:shaped/${tier.name}_distillery` });
    lazyShaped(`gtceu:${tier.name}_distillery`, ["GSG", "CHC", "WPW"], {
        S: tier.materials.heating.tagged("springs"),
        P: `gtceu:${tier.name}_electric_pump`,
    }).id(`nijika:auto/machines/${tier.name}/distillery`);

    // Electrolyzer: Replace glass, wires.
    event.remove({ id: `gtceu:shaped/${tier.name}_electrolyzer` });
    lazyShaped(`gtceu:${tier.name}_electrolyzer`, ["ZGZ", "ZHZ", "CWC"], {
        Z: tier.materials.electricWire.component("single_wire"),
    }).id(`nijika:auto/machines/${tier.name}/electrolyzer`);

    // Electromagnetic separator: WIP
    let nonMagneticRod = tier.materials.magnetic.materialName.slice("magnetic_".length);
    event.remove({ id: `gtceu:shaped/${tier.name}_electromagnetic_separator` });
    lazyShaped(`gtceu:${tier.name}_electromagnetic_separator`, ["VW1", "WHZ", "CW1"], {
        Z: `#forge:rods/${nonMagneticRod}`,
        1: tier.materials.electricWire.component("double_wire"),
    }).id(`nijika:auto/machines/${tier.name}/electromagnetic_separator`);

    // Extractor: Replace glass.
    event.remove({ id: `gtceu:shaped/${tier.name}_extractor` });
    lazyShaped(`gtceu:${tier.name}_extractor`, ["GCG", "PHZ", "WCW"], {
        Z: `gtceu:${tier.name}_electric_pump`,
    }).id(`nijika:auto/machines/${tier.name}/extractor`);

    // Extruder: Replace Fluid Pipe with Piston to prevent recursion.
    event.remove({ id: `gtceu:shaped/${tier.name}_extruder` });
    lazyShaped(`gtceu:${tier.name}_extruder`, ["WWC", "PHP", "WWC"], {
        W: tier.quadHeatingWire,
    }).id(`nijika:auto/machines/${tier.name}/extruder`);

    // Fermenter: Replace glass, cables.
    event.remove({ id: `gtceu:shaped/${tier.name}_fermenter` });
    lazyShaped(`gtceu:${tier.name}_fermenter`, ["WPW", "GHG", "WCW"], {
        P: `gtceu:${tier.name}_electric_pump`,
    }).id(`nijika:auto/machines/${tier.name}/fermenter`);

    // Fluid Heater: Replace glass, wires.
    event.remove({ id: `gtceu:shaped/${tier.name}_fluid_heater` });
    lazyShaped(`gtceu:${tier.name}_fluid_heater`, ["ZGZ", "PHP", "WCW"], {
        Z: tier.quadHeatingWire,
    }).id(`nijika:auto/machines/${tier.name}/fluid_heater`);

    // Fluid Solidifer: Replace glass, cables.
    event.remove({ id: `gtceu:shaped/${tier.name}_fluid_solidifier` });
    lazyShaped(
        `gtceu:${tier.name}_fluid_solidifier`,
        ["ZGZ", "WHW", "CXC"],
        { Z: `gtceu:${tier.name}_electric_pump`, X: "#forge:chests/wooden" } // ?
    ).id(`nijika:auto/machines/${tier.name}/fluid_solidifier`);

    // Forge Hammer: Replace cables.
    event.remove({ id: `gtceu:shaped/${tier.name}_forge_hammer` });
    lazyShaped(`gtceu:${tier.name}_forge_hammer`, ["WPW", "CHC", "WAW"], {
        A: "#minecraft:anvil",
    }).id(`nijika:auto/machines/${tier.name}/forge_hammer`);

    // Forming Press: Replace cables.
    event.remove({ id: `gtceu:shaped/${tier.name}_forming_press` });
    lazyShaped(`gtceu:${tier.name}_forming_press`, ["WPW", "CHC", "WPW"], {}).id(
        `nijika:auto/machines/${tier.name}/forming_press`
    );

    // Lathe: Replace cables, grinder.
    event.remove({ id: `gtceu:shaped/${tier.name}_lathe` });
    lazyShaped(`gtceu:${tier.name}_lathe`, ["WCW", "MHZ", "CWP"], { Z: tier.materials.grinder }).id(
        `nijika:auto/machines/${tier.name}/lathe`
    );

    // Mixer: Replace glass, rotor.
    event.remove({ id: `gtceu:shaped/${tier.name}_mixer` });
    lazyShaped(`gtceu:${tier.name}_mixer`, ["GRG", "GMG", "CHC"], {}).id(
        `nijika:auto/machines/${tier.name}/mixer`
    );

    // Ore Washer: Replace glass, rotor, cables.
    event.remove({ id: `gtceu:shaped/${tier.name}_ore_washer` });
    lazyShaped(`gtceu:${tier.name}_ore_washer`, ["RGR", "CMC", "WHW"], {}).id(
        `nijika:auto/machines/${tier.name}/ore_washer`
    );

    // Packer: Replace wires
    event.remove({ id: `gtceu:shaped/${tier.name}_packer` });
    lazyShaped(`gtceu:${tier.name}_packer`, ["ZCZ", "RHV", "WCW"], {
        Z: "#forge:chests/wooden",
        R: `gtceu:${tier.name}_robot_arm`,
    }).id(`nijika:auto/machines/${tier.name}/packer`);

    // Polarizer: Straight up fix the recipe.
    event.remove({ id: `gtceu:shaped/${tier.name}_polarizer` });
    lazyShaped(`gtceu:${tier.name}_polarizer`, ["ZMZ", "WHW", "ZMZ"], {
        Z: tier.materials.electricWire.component("double_wire"),
        M: tier.magneticRod,
    }).id(`nijika:auto/machines/${tier.name}/polariser`);

    // Laser Engraver: Replace cables.
    event.remove({ id: `gtceu:shaped/${tier.name}_laser_engraver` });
    lazyShaped(`gtceu:${tier.name}_laser_engraver`, ["PEP", "CHC", "WCW"], {}).id(
        `nijika:auto/machines/${tier.name}/laser_engraver`
    );

    // Sifter: Replace cables.
    event.remove({ id: `gtceu:shaped/${tier.name}_sifter` });
    lazyShaped(`gtceu:${tier.name}_sifter`, ["WZW", "PHP", "CZC"], { Z: "gtceu:item_filter" }).id(
        `nijika:auto/machines/${tier.name}/sifter`
    );

    // Thermal centrifuge: Replace wires.
    event.remove({ id: `gtceu:shaped/${tier.name}_thermal_centrifuge` });
    lazyShaped(`gtceu:${tier.name}_thermal_centrifuge`, ["CMC", "ZHZ", "WMW"], {
        Z: tier.quadHeatingWire,
    }).id(`nijika:auto/machines/${tier.name}/thermal_centrifuge`);

    // Wiremill: Replace wires.
    event.remove({ id: `gtceu:shaped/${tier.name}_wiremill` });
    lazyShaped(`gtceu:${tier.name}_wiremill`, ["MWM", "CHC", "MWM"], {}).id(
        `nijika:auto/machines/${tier.name}/wiremill`
    );

    // Circuit Assembler: Replace cables.
    event.remove({ id: `gtceu:shaped/${tier.name}_circuit_assembler` });
    let nextTier = TIER_TO_HIGHER_TIER_MAP[tier.name];
    if (typeof nextTier !== "undefined") {
        lazyShaped(`gtceu:${tier.name}_circuit_assembler`, ["RCE", "VHV", "WCW"], {
            R: `gtceu:${tier.name}_robot_arm`,
            C: `#gtceu:circuits/${nextTier}`,
            E: `gtceu:${tier.name}_emitter`,
        }).id(`nijika:auto/machines/${tier.name}/circuit_assembler`);
    }

    // Macerator: Replace wires and grinding head.
    event.remove({ id: `gtceu:shaped/${tier.name}_macerator` });
    lazyShaped(`gtceu:${tier.name}_macerator`, ["PMG", "WWH", "CCW"], {
        G: tier.materials.grinder,
    }).id(`nijika:auto/machines/${tier.name}/macerator`);

    // Gas Collector: ... actually, completely unchanged!
    //
    // Rock Crusher: Wires, glass, grinding head.
    event.remove({ id: `gtceu:shaped/${tier.name}_rock_crusher` });
    lazyShaped(`gtceu:${tier.name}_rock_crusher`, ["PMZ", "WHW", "GGG"], {
        Z: tier.materials.grinder,
    }).id(`nijika:auto/machines/${tier.name}/rock_crusher`);

    // Diodes: Replace cables and tier plates.
    event.remove({ id: `gtceu:shaped/${tier.name}_diode` });
    event
        .shaped(`1x gtceu:${tier.name}_diode`, ["CDC", "DHD", "PDP"], {
            C: tier.quadrupleCable,
            D: "#gtceu:diodes", // TODO: fix this...
            P: tier.primaryPlate,
            H: tier.machineHull,
        })
        .id(`nijika:auto/machines/${tier.name}/diode`);
};

// Not implemented yet: Miners, fishers, converters, hatches.
