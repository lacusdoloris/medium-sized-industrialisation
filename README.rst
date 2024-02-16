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

There's no good ``mrpack`` installer, so your best bet is to install it on a client and then copy
the ``kubejs``, ``config``, ``mods``, and ``defaultconfigs`` directory to an installed Forge server
directory.

You should do this *before* you generate the world, obviously. This will be updated soon when I 
write a proper ``mrpack`` CLI installer.

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

- `Lilligant <https://github.com/fuyukai/lilligant>`_, made by me as a quick dumping ground for 
  various modpack mixins. (As of the time of writing, Modrinth has yet to let it out of the
  moderation queue).
- `We No Speak Umbrellarino <https://modrinth.com/mod/wenospeakumbrellarino>`_, because the
  1.20 ported version (made by yours truly) isn't uploaded to Modrinth. MIT licensed.
- `ProbeJS <https://www.curseforge.com/minecraft/mc-mods/probejs/files/all?page=1&pageSize=20>`_,
  which isn't available on Modrinth. Used for dev stuff and schemas. LGPL 3.0 (on the CF page).
- `Tool Belt <https://www.curseforge.com/minecraft/mc-mods/tool-belt>`_, which isn't available on
  Modrinth. BSD 3-Clause.

(For the latter three mods, if you upload to Modrinth please let me know and I will instantly swap
it out to a Modrinth download. I don't want to take your ad money!)
