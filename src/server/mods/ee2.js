import { ORESTONE_DEFINITIONS } from "../../shared/ores/orestones";

const EMC_REALLYLOW = 128;
const EMC_RESOURCE = 4096;
const EMC_LOW = 8192;
const EMC_MACHINE_ULV = 16384;
const EMC_MACHINE_LV = 65536;
const EMC_MACHINE_LOTS = EMC_MACHINE_LV * 4;

/** @param {Internal.RecipesEventJS} event */
export const adjustEe2Recipes = (event) => {
    event.remove({ id: "projecte:conversions/charcoal_to_coal" });
    event.remove({ id: "projecte:conversions/coal_to_charcoal" });
    event.remove({ id: "projecte:conversions/gold_ingot_to_diamond" });
    event.remove({ id: "projecte:conversions/diamond_to_gold_ingot" });
    event.remove({ id: "projecte:conversions/iron_ingot_to_gold_ingot" });
    event.remove({ id: "projecte:conversions/gold_ingot_to_iron_ingot" });
    event.remove({ id: "projecte:conversions/emerald_to_diamond" });
    event.remove({ id: "projecte:conversions/diamond_to_emerald" });
    event.remove({ id: "projecte:alchemical_coal" });

    // Underside philosopher's stone
    event
        .shaped("projecte:philosophers_stone", ["SGS", "GMG", "SGS"], {
            S: "#reactive:soul_sources",
            G: "#forge:dusts/glowstone",
            M: "minecraft:magma_block",
        })
        .id("nijika:mods/ee2/dark_stone");

    // basic way of acquiring andesite alloy
    event
        .shapeless("create:andesite_alloy", [
            "projecte:philosophers_stone",
            "minecraft:andesite",
            "minecraft:andesite",
            "minecraft:andesite",
            "minecraft:andesite",
        ])
        .id("nijika:mods/ee2/andesite_alloy");

    // basic way of acquiring wool
    event
        .shapeless("woolytrees:wooly_sapling", [
            "projecte:philosophers_stone",
            "#minecraft:saplings",
        ])
        .id("nijika:mods/ee2/wool_sapling");

    event
        .shaped("projecte:transmutation_table", ["ASA", "SPS", "ASA"], {
            A: "create:andesite_alloy",
            S: "#forge:stone",
            P: "projecte:philosophers_stone",
        })
        .id("nijika:mods/ee2/alt_transmutation_table");

    // mk1 collectors are cheap, mk2 requires wrought iron, mk 3 are unavailable
    event.remove({ id: "projecte:collector_mk1" });
    event
        .shaped("projecte:collector_mk1", ["SGS", "SMS", "SFS"], {
            S: "#forge:storage_blocks/glowstone",
            G: "#forge:glass",
            M: "minecraft:magma_block",
            F: "minecraft:furnace",
        })
        .id("nijika:mods/ee2/magma_collector");

    event.remove({ id: "projecte:collector_mk2" });
    event
        .shaped("projecte:collector_mk2", ["GSG", "G1G", "GCG"], {
            G: "#forge:storage_blocks/glowstone",
            S: "#forge:plates/wrought_iron",
            1: "projecte:collector_mk1",
            C: "#gtceu:circuits/lv",
        })
        .id("nijika:mods/ee2/lv_collector");

    event.remove({ id: "projecte:collector_mk3" });

    // relays are likewise cheap
    event.remove({ id: "projecte:relay_mk1" });
    event
        .shaped("projecte:relay_mk1", ["OGO", "OMO", "OPO"], {
            O: "#forge:obsidian",
            G: "#forge:glass",
            M: "minecraft:magma_block",
            P: "create:fluid_pipe",
        })
        .id("nijika:mods/ee2/magma_relay");

    event.remove({ id: "projecte:relay_mk2" });
    event
        .shaped("projecte:relay_mk2", ["OSO", "O1O", "OCO"], {
            O: "#forge:obsidian",
            S: "#forge:plates/wrought_iron",
            1: "projecte:relay_mk1",
            C: "#gtceu:circuits/lv",
        })
        .id("nijika:mods/ee2/lv_relay");

    // finally, the energy condenser
    event.remove({ id: "projecte:condenser_mk1" });
    event
        .shaped("projecte:condenser_mk1", ["SOS", "MCM", "SOS"], {
            S: "#reactive:soul_sources",
            C: "#forge:chests",
            O: "#forge:obsidian",
            M: "minecraft:magma_block",
        })
        .id("nijika:mods/ee2/condenser_mk1");

    let rockKeys = Object.keys(ORESTONE_DEFINITIONS);
    for (let [idx, el] of rockKeys.entries()) {
        let into = rockKeys[(idx + 1) % rockKeys.length];
        event
            .shapeless(`create:${into}`, ["projecte:philosophers_stone", `create:${el}`])
            .id(`nijika:mods/ee2/${el}_into_${into}`);
    }
};

/** @param {Internal.KubeJSProjectEPlugin$SetEMCEventJS} event */
export const adjustEmcValues = (event) => {
    event.setEMC("create:andesite_alloy", EMC_RESOURCE);
    event.setEMC("#forge:dusts/glowstone", EMC_REALLYLOW);
    event.setEMC("minecraft:torch", EMC_REALLYLOW);
    event.setEMC("minecraft:chest", EMC_LOW);

    event.setEMC("minecraft:diamond_pickaxe", EMC_MACHINE_LOTS);
    event.setEMC("minecraft:diamond_axe", EMC_MACHINE_LOTS);
    event.setEMC("minecraft:diamond_shovel", EMC_MACHINE_LOTS);

    // Specific create machinery gets an EMC value,
    event.setEMC("create:cogwheel", EMC_LOW);
    event.setEMC("create:gearbox", EMC_LOW);
    event.setEMC("create:hand_crank", EMC_LOW);
    event.setEMC("create:clutch", EMC_LOW);
    event.setEMC("create:super_glue", EMC_LOW);
    event.setEMC("create:mechanical_pump", EMC_LOW);
    event.setEMC("create:basin", EMC_LOW);
    event.setEMC("create:depot", EMC_LOW);
    event.setEMC("create:sail_frame", EMC_LOW);
    event.setEMC("create:mechanical_bearing", EMC_MACHINE_LV);
    event.setEMC("create:rope_pulley", EMC_MACHINE_ULV);
    event.setEMC("create:blaze_burner", EMC_MACHINE_LV);
    event.setEMC("create:water_wheel", EMC_MACHINE_ULV);

    event.setEMC("create:millstone", EMC_MACHINE_ULV);
    event.setEMC("create:crushing_wheel", EMC_MACHINE_ULV);
    event.setEMC("create:mechanical_saw", EMC_MACHINE_ULV);
    event.setEMC("create:deployer", EMC_MACHINE_ULV);
    event.setEMC("create:portage_storage_interface", EMC_MACHINE_ULV);
    event.setEMC("create:redstone_contact", EMC_MACHINE_ULV);
    event.setEMC("create:mechanical_press", EMC_MACHINE_ULV);
    event.setEMC("create:mechanical_harvester", EMC_MACHINE_ULV);
    event.setEMC("create:mechanical_plough", EMC_MACHINE_ULV);
    event.setEMC("create:mechanical_roller", EMC_MACHINE_ULV);
    event.setEMC("create:mechanical_mixer", EMC_MACHINE_ULV);

    event.setEMC("create:track_station", EMC_MACHINE_ULV);
    event.setEMC("create:track_signal", EMC_LOW);
    event.setEMC("create:track_observer", EMC_LOW);
    event.setEMC("create:controls", EMC_MACHINE_LV);

    event.setEMC("create:rotation_speed_controller", EMC_MACHINE_LOTS);
    event.setEMC("create:encased_chain_drive", EMC_MACHINE_LV);
};
