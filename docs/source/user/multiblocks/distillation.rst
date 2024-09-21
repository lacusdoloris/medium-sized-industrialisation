.. _multiblock-distillation:

Distillation Tower
==================

.. figure:: screenshots/distillation.avif

    A four-high distillation tower.

+---------------+---------------+---------------+------------------+
| Hatch Type    | Minimum Count | Maximum Count | Placement        |
+===============+===============+===============+==================+
| Energy Input  | 1             | 2             | Bottom layer     |
+---------------+---------------+---------------+------------------+
| Energy Output | N/A           | N/A           | N/A              |
+---------------+---------------+---------------+------------------+
| Fluid Input   | 1             | 1             | Bottom layer     |
+---------------+---------------+---------------+------------------+
| Fluid Output  | 1             | Unlimited     | Above controller |
+---------------+---------------+---------------+------------------+
| Item Input    | N/A           | N/A           | N/A              |
+---------------+---------------+---------------+------------------+
| Item Output   | 0             | 1             | Bottom layer     |
+---------------+---------------+---------------+------------------+

The Distillation Tower is a multiblock version of singleblock distilleries that produces all of the
outputs of a distillation recipe, rather than just one. 

Behaviour
---------

The Distillation Tower takes in fluid through a single input hatch on its lowest layer, and 
produces fluids on each different layer of the tower. Distillation Towers have the unique ability
to be *different sizes*; you can have a distillation tower that is up to thirteen blocks tall. Every
layer of the tower should have an output hatch in the column directly above the controller block.

A tower *must* be the same height as the recipe it is going to process. For example, distilling
oil - which has four outputs - means the tower must be five blocks tall, with four output hatches.
Each output hatch will output a unique fluid, sorted from bottom to top. This order can be seen in
your recipe viewer; the top left fluid will always be produced in the bottom-most hatch, and the
bottom right-most fluid will always be produced in the top-most hatch.

Some recipes also produce an item for output; a single item hatch must be placed on the bottom layer
of the tower or the recipe will not be processed.

Sharing Pattern
---------------

.. figure:: screenshots/distillation-shared.avif    

    Two distillation towers sharing a wall, connected to an ME interface. Fluid void covers have
    been placed on the unconnected output hatches.

Distillation towers can be tiled together horizontally due to their low hatch requirements on
the lower layers. Item output buses and fluid input hatches should alternate on the bottom layer
next to the controller to satisfy the maximum input part requirements for forming the multiblock.

.. warning::

    Tiled distillation towers cannot be overclocked using 2A energy hatches, as there isn't 
    enough space to give every tower an extra unique energy hatch. 
