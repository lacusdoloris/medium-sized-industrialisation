Changelog
=========

Version 0.9: The Medium Sized Release
--------------------------------------

This is a release primarily focused around refining gameplay, as well as changing the worldgen
core mod.

Mod Changes
~~~~~~~~~~~

- BI is now built using Neoforge instead. This should have zero end user impact except for some 
  bugfixes and a different loading screen.

- **Headliner**: Big Globe has been removed. 

  The branch BI was using (3.x) is no longer supported, and 4.x is not compatible with 3.x worlds. 
  This means that updating would cause worlds to break *anyway*, and with 4.x introducing annoying
  changes to customising worldgen it was decided to migrate to a different worldgen mod.

- **Headliner**: Primary world generation is now provided by Ecospherical Expansion.

- GTCEu has been updated to 1.4. This has a handful of new recipe changes including a built-in iodine 
  chain.

  - The GTCEu Evaporation Tower is disabled in favour of our own Evaporation Pool. This is not going
    to change.

  - Formaldehyde keeps our own recipes, rather than the GTCEu one.

  - HCN keeps both recipes.

  - CaOH keeps our own recipe.
  
  - The new hazards feature is disabled entirely.

- Create: Cobblestone Generators has been added for (relatively) easy infinite cobblestone generation.

- Create: Diesel Engines has been added. 

  - The pumpjack now produces Heavy Oil instead of DE's Crude Oil.

  - The primitive distillation tower now produces Light Fuel and Heavy Fuel from Heavy Oil.

  - Light Fuel can be burnt inside the diesel engines. This makes pumpjacks nicely self-sufficient.

- Create: New Age has been slightly rebalanced; two max-size windmills will produce approximately
  one amp of MV power. 

- A number of previously provided by default mods have been removed to slim down the pack 
  footprint. The tweaker scripts for these mods will continue to exist and adding them to the pack
  continues to be officially supported.

  These mods are Integrated Dynamics (and friends), Modular Routers, Pretty Pipes, More Red, 
  RFTools, Map Atlases, Create: New Age and Scannable.

Recipe Changes
~~~~~~~~~~~~~~

- *Headliner*: Component recipes now give a higher output. This removes a significant amount of
  grind from the early game.

  Specifically, they give twice their output from the crafting table, and four times their output 
  from the assembler.

- *Headliner*: LV-EV circuit recipes now give double their output. This, likewise, removes a 
  significant amount of grind from the early game.

  Additionally, bolts in these recipes have been removed entirely. They added what was essentially
  pointless microcrafting due to nearly all of the bolts only being used in a single circuit recipe.

- Some LCR recipes have been downgraded to just the Chemical Reactor.

- Unified certain extraction mechanisms with a new Solvent Extraction Helper fluid.

- Some GregTech tools have been re-enabled.

  - Mining hammers can now be made like the old hammers, for a working 3x3 mining tool.

- Super Chests now correctly use our new material tier system.

- Super Tanks now have a simplified recipe that uses Super Chests.

- Readded recipes for void covers. There's no real point crusading against this with how trivial it
  is to void things in an unperformant way (drill on tank/drop into lava). 

- Ingot nuggets can now be made with a cutter.

- Recipes for plates have been removed from the forge hammers. These are always inefficient compared
  to the bending machine or the Create press, and so serve no purpose but to clog up the recipe 
  viewer.

- Wires from Create: Crafts & Additions are now craftable in an assembler. These work as basic RF
  carriers e.g. from New Age turbines.

- Tier 0 (earlygame) changes:

  - Added crushing wheel recipes for 1-to-1 ore processing. 

  - Changed the sequenced recipe for Magnetic Iron to use three loops of one deployer, rather than
    one loop of three deployers.

  - Rubber is now more consistent; mixing raw rubber and sulfur together in a regular heated basin
    will get rubber pulp rather than liquid rubber, which can be rolled and pressed to get rubber
    sheets.

    Liquid rubber can still be made via superheating from both raw rubber and regular rubber pulp.

  - Some of the Create orestones now produce multiple crushed ores, allowing for easier ore 
    automation throughout the early tiers.

- Tier 1 (LV) changes:

  - Earlygame power comes from steam turbines, like in base GTCEu, rather than New Age turbines.

  - Silicon wafers have been moved down from MV to LV. Consequently, diodes are now exclusively 
    crafted with wafers. Additionally, silicone boules now require twice the amount of gallium
    arsenide.

  - Firebricks must now be crafted in the EBF instead of being combined by hand and smelted.

    This reflects their change in position within the game, from the primitive blast furnace to the
    Bessemer Converter.

  - Hydrogen can now be made from a direct water gas shift recipe using refinery gas, without 
    needing to distill it.

- Tier 2 (MV) changes:

    - Vanadium steel is now made from a mixture of iron, ferrochrome, and ferrovanadium.

    - The distillation tower is now available in MV, rather than HV. This makes setting up oil 
      outposts more feasible in the early game.

- Tier 3 (HV) changes:

  - Phosphorus-doped silicon now requires twice the amount of gallium arsenide (one dust instead 
    of two small dusts).

  - Removed ore slag temporarily.

  - Removed combo sorting. This doesn't really work when you have quantum chests.

  - Adjusted some of the ore sorter ores.

  - HSLA steel now uses ferrovanadium instead of raw vanadium.

Machine Changes
~~~~~~~~~~~~~~~

- A Ion Exchanger multiblock has been added. This replaces certain chemical reactor/LCR organic 
  chemistry recipes that were previously introduced in 0.8.

- A new Rock Synthesiser multiblock has been added to allow for passive generation of the early game
  orestones.

- A new Ball Bearing Grinding Mill has been added to replace the LV/MV macerator.

- The Evaporation Pool is now 7x7 rather than 11. This also means you can fit a full FOUR in one
  chunk easily.

World Changes
~~~~~~~~~~~~~

- Worldgen is now provided by Ecospherical Expansion instead of Big Globe.

  - The vanilla worldgen engine is significantly slower; it's recommended you use a chunk 
    pre-generator and generate a large area in advance.

  - The Large Biomes preset is recommended to get a good world.

- Ore veins are now provided by GTCEu; they are now significantly bigger and come with mixed ores 
  rather than single ores.

  - Goethitite, pyrite, cinnabar, hematite, apatite, tricalcium phosphate, pyrochlore, and various 
    salts and lubricants are now available as ores in addition to all of the previous ores.

  - Surface ore indicators have been disabled. Use the prospector.

- New ores have been added:

    - Arsenopyrite is an ore of iron and arsenic. It can be found in copper and redstone veins.

- Fluid veins have been significantly buffed, having an average of 2.5x the amount of fluid per 
  vein. They also have much higher depleted output than before, to incentivise creating 
  place-and-forget outposts.

- New coal gas fluid veins have been added to the Nether. This provides an easily obtainable 
  infinite amount of coal gas/coal tar now that the charcoal -> coal gas/coal tar recipes have been
  removed.

Misc Features
~~~~~~~~~~~~~

- Added a new "Super Quests" chapter for certain achievements.

- Light Fuel can now be burnt in liquid blaze burners.

- Straws can now be made in the GTCEu lathe from sticks or bamboo.

Miscellaneous Bugfixes
~~~~~~~~~~~~~~~~~~~~~~

- Fixed usages of the old ``#forge:sticks/wood`` tag.

- Fixed broken rolling machine recipes being created for rods that don't have an ingot.
