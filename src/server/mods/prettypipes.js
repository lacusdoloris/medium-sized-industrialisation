// Copyright (c) 2024-2025 Loris Lacuna
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Adjusts all recipes for the Pretty Pipes mod.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustPrettyPipesRecipes = (event) => {
    // pipes even *look* like they're covered in rubber.
    event.remove({ id: "prettypipes:pipe" });
    event
        .shaped("12x prettypipes:pipe", ["RRR", "GGG", "RRR"], {
            R: "#nijika:rubber_plates",
            G: "#forge:glass",
        })
        .id("nijika:mods/prettypipes/pipe");

    // terminal recipes now directly requires circuits and sensors/emitters, rather than high
    // modules.
    event.remove({ id: "prettypipes:item_terminal" });
    event
        .shaped("prettypipes:item_terminal", ["FEF", "1P2", "FEF"], {
            F: "#forge:foils/silver",
            1: "minecraft:piston",
            2: "minecraft:sticky_piston",
            P: "#forge:chests",
            E: "#forge:gems/emerald",
        })
        .id("nijika:mods/prettypipes/item_terminal");

    event.remove({ id: "prettypipes:crafting_terminal" });
    event
        .shaped("prettypipes:crafting_terminal", ["CTC", "CIC", "SRE"], {
            C: "#gtceu:circuits/lv",
            T: "#forge:workbench",
            I: "prettypipes:item_terminal",
            R: "gtceu:red_alloy_single_cable",
            S: "gtceu:lv_sensor",
            E: "gtceu:lv_emitter",
        })
        .id("nijika:mods/prettypipes/crafting_terminal");

    event.remove({ id: "prettypipes:pressurizer" });
    event
        .shaped("prettypipes:pressurizer", ["PMP", "MCM", "PMP"], {
            P: "gtceu:lv_electric_piston",
            M: "prettypipes:high_speed_module",
            C: "#gtceu:circuits/lv",
        })
        .id("nijika:mods/prettypipes/pressuriser");

    // "low", "medium", and "high" refer to slotts it seems.
    // remove these first to avoid doing a useless replacement.
    event.remove({
        id: /prettypipes:(?:low|medium|high)_(?:extraction|retrieval|crafting)_module/,
    });
    event.replaceInput(
        { id: /prettypipes:(?:low|medium|high)_.*_module/ },
        "#forge:dusts/redstone",
        "gtceu:red_alloy_single_cable"
    );
    event.replaceInput({ mod: "prettypipes" }, "#forge:ingots/iron", "#forge:plates/iron");
    event.replaceInput({ mod: "prettypipes" }, "#forge:ingots/gold", "#forge:plates/silver");

    // extraction and retrieval modules have identical recipes, differing only in using emitters
    // or sensors.
    event
        .shapeless("prettypipes:low_retrieval_module", [
            "prettypipes:blank_module",
            "gtceu:lv_sensor",
        ])
        .id("nijika:mods/prettypipes/low_retrieval_module");

    event
        .shaped("prettypipes:medium_retrieval_module", ["RRR", "SMS", " S "], {
            R: "gtceu:red_alloy_single_cable",
            S: "#forge:foils/silver",
            M: "prettypipes:low_retrieval_module",
        })
        .id("nijika:mods/prettypipes/medium_retrieval_module");

    event
        .shaped("prettypipes:high_retrieval_module", ["VVV", "EME", "VVV"], {
            V: "#forge:foils/vanadium_steel",
            E: "gtceu:mv_sensor",
            M: "prettypipes:medium_retrieval_module",
        })
        .id("nijika:mods/prettypipes/high_retrieval_module");

    event
        .shapeless("prettypipes:low_extraction_module", [
            "prettypipes:blank_module",
            "gtceu:lv_emitter",
        ])
        .id("nijika:mods/prettypipes/low_extraction_module");

    event
        .shaped("prettypipes:medium_extraction_module", ["RRR", "SMS", " S "], {
            R: "gtceu:red_alloy_single_cable",
            S: "#forge:foils/silver",
            M: "prettypipes:low_extraction_module",
        })
        .id("nijika:mods/prettypipes/medium_extraction_module");

    event
        .shaped("prettypipes:high_extraction_module", ["VVV", "EME", "VVV"], {
            V: "#forge:foils/vanadium_steel",
            E: "gtceu:mv_emitter",
            M: "prettypipes:medium_extraction_module",
        })
        .id("nijika:mods/prettypipes/high_extraction_module");

    // most modules are ok from a cursory look, but crafting modules should use circuits.
    event
        .shaped("prettypipes:low_crafting_module", [" T ", "CMC", " R "], {
            R: "gtceu:red_alloy_single_cable",
            T: "#forge:workbench",
            C: "#gtceu:circuits/lv",
            M: "prettypipes:blank_module",
        })
        .id("nijika:mods/prettypipes/low_crafting_module");

    event
        .shaped("prettypipes:medium_crafting_module", ["RCR", "SMS", " S "], {
            C: "#forge:workbench",
            R: "gtceu:red_alloy_single_cable",
            S: "#forge:foils/silver",
            M: "prettypipes:low_crafting_module",
        })
        .id("nijika:mods/prettypipes/medium_crafting_module");

    event
        .shaped("prettypipes:high_crafting_module", ["R1R", "VMV", "CVC"], {
            1: "#forge:workbench",
            R: "gtceu:red_alloy_single_cable",
            V: "#forge:foils/vanadium_steel",
            M: "prettypipes:medium_crafting_module",
            C: "#gtceu:circuits/mv",
        })
        .id("nijika:mods/prettypipes/high_crafting_module");

    // arrows rely on mob drops, which aree disabled by default.
    event.replaceInput(
        { id: "prettypipes:round_robin_sorting_modifier" },
        "minecraft:arrow",
        "minecraft:clock"
    );
};
