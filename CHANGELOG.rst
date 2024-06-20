Changelog
=========

Version 0.9: The Medium Sized Release
--------------------------------------

Mod Changes
~~~~~~~~~~~

- BI is now built using Neoforge instead. This should have zero end user impact except for some 
  bugfixes and a different loading screen.

- **Headliner**: Big Globe has been removed. 

  The branch BI was using (3.x) is no longer supported, and 4.x is not compatible with 3.x worlds. 
  This means that updating would cause worlds to break *anyway*, and with 4.x introducing annoying
  changes to customising worldgen it was decided to migrate to a different worldgen mod.

- **Headliner**: Primary world generation is now provided by Ecospherical Expansion.

- Updated to GTCEu 1.3.0. This has a handful of new recipe changes including a built-in iodine 
  chain.

  - The GTCEu Evaporation Tower is disabled in favour of our own Evaporation Pool. This is not going
    to change.

  - Formaldehyde keeps our own recipes, rather than the GTCEu one.

  - HCN keeps both recipes.

  - CaOH keeps our own recipe.
  
  - The new hazards feature is disabled entirely.

Recipe Changes
~~~~~~~~~~~~~~

- Some LCR recipes have been downgraded to just the Chemical Reactor.

- Unified certain extraction mechanisms with a new Solvent Extraction Helper fluid.

- Tier 0 (earlygame) changes:

  - Added crushing wheel recipes for 1-to-1 ore processing. This is also mandatory for redstone now
    that redstone veins are GTCEu-provided.

  - Changed the sequenced recipe for Magnetic Iron to use three loops of one deployer, rather than
    one loop of three deployers.

Machine Changes
~~~~~~~~~~~~~~~

- Added a new Ion Exchanger multiblock. This replaces certain chemical reactor/LCR organic chemistry
  recipes that were previously introduced in 0.8.

World Changes
~~~~~~~~~~~~~

- Worldgen is now provided by Ecospherical Expansion instead of Big Globe.

  - The vanilla worldgen engine is significantly slower; it's recommended you use a chunk 
    pre-generator and generate a large area in advance.

  - The Large Biomes preset is recommended to get a good world. The EE built-in presets are not 
    supported.

- Ore veins are provided by GTCEu; they are now significantly bigger and come with mixed ores rather
  than single ores.

  - Goethitite, pyrite, cinnabar, hematite, apatite, tricalcium phosphate, pyrochlore, and various 
    salts and lubricants are now available as ores in addition to all of the previous ores.

  - Surface ore indicators have been disabled. Use the prospector.
