.. Bigger Industrialisation documentation master file, created by
   sphinx-quickstart on Thu Aug  8 15:57:14 2024.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Bigger Industrialisation
========================

This is the documentation for Bigger Industrialisation, a Minecraft 1.20.1 modpack 
focused around industrial chemistry using `GregTech CEu Modern`_.

You should read the :ref:`user-installation` section before playing the pack for important
information!

Philosophy
----------

Bigger Industrialisation is about building a large factory to create ever-advancing alloys and 
circuitry. If you've ever played Factorio; or even better, a Factorio overhaul mod like
Bobs & Angel's Mods; it's a lot like that, only 3D and more in depth.

Notable features:

- An accelerated earlygame compared to most GregTech packs
- Mandatory peaceful mode - minimal survival, minimal noise, only industry.
- Semi-realistic chemical chains with lots of steps, intermediates and byproducts,
- A bunch of custom multiblocks! Who doesn't love multiblocks!
- Minimal but interesting world generation powered by `Ecospherical Expansion`_
- A terse questbook that guides you through progression, but doesn't hold your hand.
- Designed for both newcomers to GregTech and Nomifactory fans.
- Doesn't include a single proprietary mod.

End-User Documentation
======================

This is the documentation you want if you're a player of the pack.

.. toctree::
   :maxdepth: 2
   :caption: Setting up

   changelog.rst
   user/regular-installation.rst
   user/dev-installation.rst

.. toctree::
   :maxdepth: 2
   :caption: User Guides

   user/guides/energy-production.rst
   user/guides/covers.rst
   user/guides/basic-elements.rst
   user/guides/ore-automation.rst
   user/guides/oil-processing.rst

.. toctree::
   :maxdepth: 2
   :caption: Progression Guides

Multiblock Guides
=================

This is documentation for the various multiblock machines used in Bigger Industrialisation, either
custom ones or the ones built-in to GTCEu.

.. toctree::
   :maxdepth: 1
   :caption: Multiblock Guides

   user/multiblocks/modular-multiblocks.rst
   user/multiblocks/fluid-drilling-rig.rst
   user/multiblocks/cracker.rst
   user/multiblocks/distillation.rst

Developer Documentation
=======================

.. toctree::
   :maxdepth: 2
   :caption: Developer Documentation

   dev/kamuidrome.rst
   dev/bundler.rst


.. _GregTech CEu Modern: https://modrinth.com/mod/gregtechceu-modern
.. _Ecospherical Expansion: https://modrinth.com/mod/ecospherical-expansion
