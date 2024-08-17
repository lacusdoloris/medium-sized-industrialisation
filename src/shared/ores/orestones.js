// Copyright (c) 2024 Lura Skye
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

export const ORESTONE_DEFINITIONS = {
    crimsite: {
        ore70Percent: "redstone",
        ore40Percent: null,
        nugget: "minecraft:redstone",
    },
    ochrum: {
        ore70Percent: "hematite",
        ore40Percent: null,
        nugget: "minecraft:iron_nugget",
    },
    veridium: {
        ore70Percent: "tetrahedrite",
        ore40Percent: "chromite",
        nugget: "gtceu:copper_nugget",
    },
    asurine: {
        ore70Percent: "cassiterite",
        ore40Percent: "sphalerite",
        nugget: "gtceu:tin_nugget",
    },
    scoria: {
        ore70Percent: "bauxite",
        ore40Percent: "silver",
        nugget: "gtceu:silver_nugget",
    },
    scorchia: {
        ore70Percent: "galena",
        ore40Percent: "arsenopyrite",
        nugget: "gtceu:silver_nugget",
    },
};

/**
 * Adjusts the ore rock recipes from Create.
 *
 * @param {Internal.RecipesEventJS} event
 */
export const adjustOrestoneCrushingRecipes = (event) => {
    event.remove({ output: "#create:crushed_raw_materials" });
    event.remove({ input: "#create:crushed_raw_materials" });

    for (let [name, definition] of Object.entries(ORESTONE_DEFINITIONS)) {
        let rockId = `create:${name}`;
        let createOutputs = [
            Item.of(`gtceu:crushed_${definition.ore70Percent}_ore`).withChance(0.7),
        ];

        if (definition.ore40Percent !== null) {
            createOutputs.push(
                Item.of(`gtceu:crushed_${definition.ore40Percent}_ore`).withChance(0.4)
            );
        }

        if (definition.nugget !== null) {
            createOutputs.push(Item.of(definition.nugget).withChance(0.6));
        }

        event.recipes.create
            .milling(createOutputs, rockId)
            .id(`nijika:ores/orestones/${name}_crushing`);

        let builder = event.recipes.gtceu
            .rock_synthesis(`nijika:${name}`)
            .notConsumable(rockId)
            .inputFluids(Fluid.of("minecraft:lava").withAmount(300 * FluidAmounts.BUCKET))
            .EUt(GTValues.VA[GTValues.MV])
            .duration(144 * 20);

        // apply 64x output four times as either gtceu or EMI doesn't like 288 output.
        for (let i = 0; i < 4; i++) {
            builder = builder.itemOutputs(`64x ${rockId}`);
        }
        // then add the remaining 32 (64 * 4.5);
        builder = builder.itemOutputs(`32x ${rockId}`);
    }

    event.recipes.create
        .crushing(
            [
                Item.of("gtceu:crushed_nether_quartz_ore").withChance(0.25),
                Item.of("minecraft:quartz").withChance(0.25),
            ],
            "minecraft:diorite"
        )
        .id("create:crushing/diorite");

    event.recipes.create
        .crushing(
            [
                Item.of("minecraft:flint").withChance(0.25),
                Item.of("minecraft:iron_nugget").withChance(0.1),
                Item.of("gtceu:copper_nugget").withChance(0.1),
                Item.of("gtceu:tin_nugget").withChance(0.1),
                Item.of("gtceu:lead_nugget").withChance(0.1),
                Item.of("gtceu:silver_nugget").withChance(0.1),
            ],
            "minecraft:tuff"
        )
        .id("create:crushing/tuff");
};
