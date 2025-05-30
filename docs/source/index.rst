.. Bigger Industrialisation documentation master file, created by
   sphinx-quickstart on Thu Aug  8 15:57:14 2024.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Medium Sized Industrialisation
==============================

`Get the pack on Modrinth! <https://modrinth.com/modpack/bigger-industrialisation>`_

This is the documentation for Medium Sized Industrialisation, a Minecraft 1.20.1 modpack 
focused around industrial chemistry using `GregTech CEu Modern`_. The current content extends up to
the end of the Extreme Voltage tier, with content planned for up to the end of the ZPM tier (but
no further).

You should read the :ref:`user-installation` section before playing the pack for important
information!

Philosophy
----------

MSI is about building a large factory with deep chemical chains, alloys, and circuit fabrication,
in order to build a portal back to your home dimension.

Notable features:

- A massively accelerated earlygame compared to most GregTech pack- Mandatory peaceful mode; you're working in a barren world.
- Semi-realistic chemical chains with lots of steps, intermediates and byproducts,
- A bunch of custom multiblocks! Who doesn't love multiblocks!
- Minimal but interesting world generation powered by `Ecospherical Expansion`_
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
   user/server-installation.rst
   user/dev-installation.rst

.. toctree::
   :maxdepth: 2
   :caption: User Guides

   user/guides/energy-production.rst
   user/guides/covers.rst
   user/guides/basic-elements.rst
   user/guides/ore-automation.rst
   user/guides/oil-processing.rst
   user/guides/plastic-production.rst

Multiblock Guides
=================

This is documentation for the various multiblock machines used in MSI, either custom ones or the 
ones built-in to GTCEu.

.. toctree::
   :maxdepth: 1
   :caption: Multiblock Guides

   user/multiblocks/modular-multiblocks.rst
   user/multiblocks/fluid-drilling-rig.rst
   user/multiblocks/cracker.rst
   user/multiblocks/distillation.rst
   user/multiblocks/haber-bosch-chamber.rst
   user/multiblocks/large-boiler.rst

Developer Documentation
=======================

.. toctree::
   :maxdepth: 2
   :caption: Developer Documentation

   dev/kamuidrome.rst
   dev/bundler.rst


.. _GregTech CEu Modern: https://modrinth.com/mod/gregtechceu-modern
.. _Ecospherical Expansion: https://modrinth.com/mod/ecospherical-expansion
