Bigger Industrialisation
========================

This is a Minecraft modpack based around `Big Globe`_ and `GregTech CEu Modern`_. The current
skeleton of content is implemented up to the beginning of the Insane Voltage tier. Please read
this whole README.

`Join the server <https://discord.gg/WMtGKUsBPa>`__ for questions/support/etc. Please report
bugs in the issue tab, not in the linked server!

Philosophy
----------

Bigger Industrialisation is about strip-mining the world, and building a large factory to create
ever-advancing alloys and circuitry. If you've ever played Factorio; or even better, a Factorio
overhaul mod like Bobs & Angel's Mods; it's a lot like that, only 3D and more in depth.

Notable features:

- An accelerated earlygame compared to most GregTech packs
- Mandatory peaceful mode - minimal survival, minimal noise, only industry.
- Semi-realistic chemical chains with lots of steps, intermediates, byproducts, and research gone into them
- A 2048-block tall world powered by `Big Globe`_!
- A bunch of custom multiblocks! Who doesn't love multiblocks!
- A terse questbook that guides you through progression, but doesn't hold your hand.
- Designed for both newcomers to GregTech and Nomifactory fans.
- Doesn't include a single proprietary mod.

A Note on Realism
~~~~~~~~~~~~~~~~~

The chemical chains in this pack are *inspired* by real-world processes, but are not truly 
*realistic*. A lot of things have been abstracted away, such as substance dilution or the tricky
parts of industrial vs labratory methods.

In addition, most of the chemistry is heavily simplified until the HV tier, in order to accelerate
you into the actually fun part of an automation pack instead of getting RSI working over a crafting
table. There's no holds barred from late HV onwards. If you've ever gotten to Blue Science in 
Factorio, it's like that.

A Note on Completion
~~~~~~~~~~~~~~~~~~~~

The current content is complete up to the very beginning of the Insane Voltage tier. Content after
that may be incoherent, dissonant, or straight-up unplayable. 

A Note on AE2
~~~~~~~~~~~~~

Unlike a lot of packs, Applied Energistics 2 is not included by default. BI comes with full recipe
integration for AE2 and Mega Cells (moving them up to LV and EV, respectively) if you choose to
install it.

User Installation Guide
-----------------------

Bigger Industrialisation is published on `Modrinth`_. You can download both the client and 
server-only packs there, or install it through your launcher.

You can get the latest tagged release from `the releases page <https://github.com/Fuyukai/bigger-industrialisation/releases>`__
and the latest development builds `from here <https://nightly.link/Fuyukai/bigger-industrialisation/workflows/ci/mizuki>`__.
Import the zip into your launcher and all of the required mods will be downloaded.

Server Installation Guide
~~~~~~~~~~~~~~~~~~~~~~~~~

You'll need to install (Neo)Forge (47.1.3 for legacy forge) yourself, but you can use 
`this <https://github.com/nothub/mrpack-install>`__ tool to install the server-only ``mrpack`` 
file.

Make sure to set the world type to ``bigglobe\:bigglobe`` in your ``server.properties``.

Important Info
~~~~~~~~~~~~~~

Please read *all* of these points!

1. You need a brain to play this pack; if you don't have one, then a notebook and a good writing
   pen. 

   The questbook is deliberately very terse and doesn't cover everything. Learn to use EMI. Learn to
   take notes. I already spent most of my time on this pack knee-deep in Ullman's Encyclopedia; I
   don't want to write lots of extra quests. You don't want to pipette fluids.

1. Big Globe is a *very* heavy mod. You should do all of the following:

   - Switch to Java 21.
   - Use ZGC with ``-XX:+UseZGC -XX:+ZGenerational`` for vastly improved worldgen performance.
   - Allocate at least 8GiB (``-Xmx8192m``). I recommend allocating 10000MiB for good performance,
     but you should allocate as much as your system can handle (ignore misinformation online about
     the 8GiB limit and the 32GiB limit). 
     
2. Big Globe worldgen is incredibly fast in the overworld, but the Nether and End are more 
   complicated and take more time/memory. Avoid generating too many chunks there.

3. The world generation is stable in the overworld; i.e., it's very unlikely for new worldgen
   features to be added that would need recreating the world.

   This is *not* true for the Nether or the End. Don't build anything there you wish to keep as they
   may require being deleted and recreated in the future.

4. The modpack comes with `Heracles <https://modrinth.com/mod/heracles>`__ for quests by default,
   but ships with both Heracles and `FTB Quests <https://www.curseforge.com/minecraft/mc-mods/ftb-quests-forge>`__
   quest files. You can pick which one of the two quest viewers you want to use.


Advanced Users \& Developers
----------------------------

Please see the ``DEVDOCS.rst`` file in the repository root for more information.

Branches
~~~~~~~~

BI is developed in two primary branches:

- The `Mizuki <https://www.sekaipedia.org/wiki/Akiyama_Mizuki>`_ branch is the latest development
  version.

- The `Ena <https://www.sekaipedia.org/wiki/Shinonome_Ena>`_ branch is cherrypicked commits from
  the development branch that don't affect progression, and only contains fixes. This is
  forcibly rebased to the latest tag.

Included Mods
-------------

This pack includes a small number of mods directly in the pack, rather than being fetched by 
Kamuidrome, for various reasons. These are:

- `We No Speak Umbrellarino <https://modrinth.com/mod/wenospeakumbrellarino>`_, because the
  1.20 ported version (made by yours truly) isn't uploaded to Modrinth. MIT licensed.
- `Tool Belt <https://www.curseforge.com/minecraft/mc-mods/tool-belt>`_, which isn't available on
  Modrinth. BSD 3-Clause.

Credits
-------

Special shoutouts to these people:

- Mel (who got hit by a car) for explaining some tricky chemistry concepts and listened to me 
  monologue about my progress
- Gretchy and Lewi who mostly just smiled and nodded when I went on a tangent about squaric acid
  or some shit like that
- Lime for exposing some pretty game-breaking bugs in the early game
- The big globe dev guy for helping me with worldgen scripts and listening to my insane worldgen
  suggestions


.. _Big Globe: https://modrinth.com/mod/big-globe
.. _Modrinth: https://modrinth.com/modpack/bigger-industrialisation
