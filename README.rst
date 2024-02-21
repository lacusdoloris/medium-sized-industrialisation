Bigger Industrialisation
========================

This is a Minecraft modpack based around `Big Globe`_ and `GregTech CEu Modern`_. The current
skeleton of content is implemented up to the end of High Voltage.

`Join the server <https://discord.gg/WMtGKUsBPa>`__ for questions/support/etc. Please report
bugs in the issue tab, not in the linked server!

Notable features:

- No awful earlygame
- Mandatory peaceful mode
- No AE2!
- 2048 block high world!
- `Custom multiblocks <https://i.imgur.com/siIkrHJ.png>`__!
- 100% open source mods!
- `Deep, custom chemical chains! <https://i.imgur.com/1fQBZyq.png>`__!

User Installation Guide
-----------------------

Bigger Industrialisation is not yet published on Modrinth. When it is, you will be able to download
it from directly within your launcher automatically.

You can get the latest tagged release from `the releases page <https://github.com/Fuyukai/bigger-industrialisation/releases>`__
and the latest development builds `from here <https://nightly.link/Fuyukai/bigger-industrialisation/workflows/ci/mizuki>`__.
Import the zip into your launcher and all of the required mods will be downloaded.

Server Installation Guide
~~~~~~~~~~~~~~~~~~~~~~~~~

You'll need to install (Neo)Forge (47.1.3 for legacy forge) yourself, but you can use `this <https://github.com/nothub/mrpack-install>`__
tool to install the server-only ``mrpack`` file. (Remove EMI loot from the mods directory.)

Make sure to set the world type to ``bigglobe\:bigglobe`` in your ``server.properties``.

Important Info
~~~~~~~~~~~~~~

Please read *all* of these points!

1. Big Globe is a *very* heavy mod. You should do all of the following:
 - Switch to Java 21.
 - Use ZGC with ``-XX:+UseZGC -XX:+ZGenerational`` for vastly improved worldgen performance.
 - Allocate at least 8GiB (``-Xmx8192m``). I recommend allocating 10000MiB for good performance,
   but you should allocate as much as your system can handle (ignore misinformation online about
   the 8GiB limit and the 32GiB limit). Big Globe worldgen in the overworld is realtime, but the
   Nether and End are more complicated and take more time/memory.

2. The world generation is stable in the overworld; i.e., it's very unlikely for new worldgen
   features to be added that would need recreating the world.

   This is *not* true for the Nether or the End. Don't build anything there you wish to keep as they
   may require being deleted and recreated in the future.

3. The modpack comes with `Heracles <https://modrinth.com/mod/heracles>`__ for quests by default,
   but ships with both Heracles and `FTB Quests <https://www.curseforge.com/minecraft/mc-mods/ftb-quests-forge>`__
   quest files. You can pick which one of the two quest viewers you want to use.


Advanced Users \& Developers
----------------------------

Please see the ``DEVDOCS.rst`` file in the repository root for more information.


Included Mods
-------------

This pack includes a small number of mods directly in the pack, rather than being fetched by 
Kamuidrome, for various reasons. These are:

- `We No Speak Umbrellarino <https://modrinth.com/mod/wenospeakumbrellarino>`_, because the
  1.20 ported version (made by yours truly) isn't uploaded to Modrinth. MIT licensed.
- `Tool Belt <https://www.curseforge.com/minecraft/mc-mods/tool-belt>`_, which isn't available on
  Modrinth. BSD 3-Clause.
- A newer version of `GregTech CEu Modern` is bundled as it contains important fixes that aren't
  yet included on the Modrinth version.

.. _Big Globe: https://modrinth.com/mod/big-globe
.. _GregTech CEu Modern: https://modrinth.com/mod/gregtechceu-modern
