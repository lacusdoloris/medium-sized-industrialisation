// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { getMaterial } from "../utils";

/**
 * Fixes up some of the ore veins for the vanilla dimensions.
 *
 * @param {Internal.GTOreVeinEventJS} event
 */
export const fixupBuiltinOreVeins = (event) => {
    // remove end veins, as the end is entirely untouched
    event.removeAll((name, vein) => vein.layer() == GTWorldGenLayers.ENDSTONE);

    // remove the fucking indicators
    event.modifyAll((_name, vein) => {
        vein.indicatorGenerators().clear();
    });

    // specific veins that we have no use for and never will
    event.remove("gtceu:garnet_tin_vein");
    event.remove("gtceu:garnet_vein");
    event.remove("gtceu:mineral_sand_vein");
    event.remove("gtceu:mica_vein");
    event.remove("gtceu:olivine_vein");
    event.remove("gtceu:sapphire_vein");
    event.remove("gtceu:redstone_vein"); // the *nether* vein
    event.remove("gtceu:banded_iron_vein");
    event.remove("gtceu:topaz_vein");
    event.remove("gtceu:certus_quartz");
    event.remove("gtceu:molybdenum_vein");

    // remove extra ores from certain veins
    // cassiterite: remove regular tin, replace it with fluorite and molybdenite
    event.modify("gtceu:cassiterite_vein", (vein) => {
        vein.veinedVeinGenerator((generator) =>
            generator
                .oreBlock(GTMaterials.Cassiterite, 4)
                .oreBlock(getMaterial("fluorite"), 2)
                .rareBlock(GTMaterials.Molybdenite, 1)
                .rareBlockChance(0.25)
                .veininessThreshold(0.01)
                .maxRichnessThreshold(0.175)
                .minRichness(0.7)
                .maxRichness(1.0)
                .edgeRoundoffBegin(3)
                .maxEdgeRoundoff(0.1)
        );
    });

    // galena: replace lead with stibnite
    event.modify("gtceu:galena_vein", (vein) => {
        vein.layeredVeinGenerator((g) => {
            g.withLayerPattern(() =>
                GTLayerPattern.builder(GTOres.OVERWORLD_RULES)
                    .layer((l) => l.weight(3).mat(GTMaterials.Galena).size(2, 4))
                    .layer((l) => l.weight(2).mat(GTMaterials.Silver).size(1, 1))
                    .layer((l) => l.weight(1).mat(GTMaterials.Stibnite).size(1, 1))
                    .build()
            );
        });
    });

    // magnetite: vanadium magnetite -> hematite
    event.modify("gtceu:magnetite_vein_ow", (vein) => {
        vein.layeredVeinGenerator((generator) =>
            generator.withLayerPattern(() =>
                GTLayerPattern.builder(GTOres.OVERWORLD_RULES)
                    .layer((l) => l.weight(3).mat(GTMaterials.Magnetite).size(2, 4))
                    .layer((l) => l.weight(2).mat(GTMaterials.Hematite).size(1, 1))
                    .layer((l) => l.weight(1).mat(GTMaterials.Gold).size(1, 1))
                    .build()
            )
        );
    });

    // nickel: remove... raw nickel
    event.modify("gtceu:nickel_vein", (vein) => {
        vein.layeredVeinGenerator((generator) =>
            generator.withLayerPattern(() =>
                GTLayerPattern.builder(GTOres.OVERWORLD_RULES)
                    .layer((l) => l.weight(3).mat(GTMaterials.Garnierite).size(2, 4))
                    .layer((l) => l.weight(2).mat(GTMaterials.Cobaltite).size(1, 1))
                    .layer((l) => l.weight(1).mat(GTMaterials.Pentlandite).size(1, 1))
                    .build()
            )
        );
    });

    // deepslate copper: replace raw iron with arsenopyrite
    event.modify("gtceu:copper_vein", (vein) => {
        vein.veinedVeinGenerator((generator) =>
            generator
                .oreBlock(GTMaterials.Chalcopyrite, 5)
                .oreBlock(getMaterial("arsenopyrite"), 2)
                .oreBlock(GTMaterials.Copper, 2)
                .veininessThreshold(0.01)
                .maxRichnessThreshold(0.175)
                .minRichness(0.7)
                .maxRichness(1.0)
                .edgeRoundoffBegin(3)
                .maxEdgeRoundoff(0.1)
        );
    });

    // redstone: remove ruby, replace with arsenopyrite
    event.modify("gtceu:redstone_vein_ow", (vein) => {
        vein.layeredVeinGenerator((generator) =>
            generator.withLayerPattern(() =>
                GTLayerPattern.builder(GTOres.OVERWORLD_RULES)
                    .layer((l) => l.weight(3).mat(GTMaterials.Redstone).size(2, 4))
                    .layer((l) => l.weight(2).mat(getMaterial("arsenopyrite")).size(1, 1))
                    .layer((l) => l.weight(1).mat(GTMaterials.Cinnabar).size(1, 1))
                    .build()
            )
        );
    });

    // iron: remove yellow limonite, replace with bauxite
    //       remove malachite, replace with ilmenite
    event.modify("gtceu:iron_vein", (vein) => {
        vein.veinedVeinGenerator((generator) =>
            generator
                .oreBlock(GTMaterials.Goethite, 5)
                .oreBlock(GTMaterials.Bauxite, 2)
                .oreBlock(GTMaterials.Ilmenite, 2)
                .rareBlock(GTMaterials.Hematite, 1)
                .veininessThreshold(0.01)
                .maxRichnessThreshold(0.175)
                .minRichness(0.7)
                .maxRichness(1.0)
                .edgeRoundoffBegin(3)
                .maxEdgeRoundoff(0.1)
        );
    });

    // copper-tin: remove zeolite, replace with orpiment
    event.modify("gtceu:copper_tin_vein", (vein) => {
        vein.veinedVeinGenerator((generator) =>
            generator
                .oreBlock(GTMaterials.Chalcopyrite, 5)
                .oreBlock(GTMaterials.Cassiterite, 2)
                .rareBlock(GTMaterials.Realgar, 1)
                .rareBlock(getMaterial("orpiment"), 1)
                .rareBlockChance(0.05)
                .veininessThreshold(0.01)
                .maxRichnessThreshold(0.175)
                .minRichness(0.7)
                .maxRichness(1.0)
                .edgeRoundoffBegin(3)
                .maxEdgeRoundoff(0.1)
        );
    });
};

/**
 * Adds new GT ore veins.
 *
 * @param {Internal.GTOreVeinEventJS} event
 */
export const addFreshOreVeinsEvent = (_event) => {};
