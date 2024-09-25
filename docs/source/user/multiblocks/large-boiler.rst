.. _multiblock-large-boiler:

Large Boilers
=============

.. figure:: screenshots/large-boilers.avif

    The four tiers of Large Boilers.

+---------------+---------------+---------------+-----------------------+
| Hatch Type    | Minimum Count | Maximum Count | Placement             |
+===============+===============+===============+=======================+
| Energy Input  | N/A           | N/A           | N/A                   |
+---------------+---------------+---------------+-----------------------+
| Energy Output | N/A           | N/A           | N/A                   |
+---------------+---------------+---------------+-----------------------+
| Fluid Input   | 1             | Unlimited     | Bottom layer          |
+---------------+---------------+---------------+-----------------------+
| Fluid Output  | 1             | Unlimited     | Second layer or above |
+---------------+---------------+---------------+-----------------------+
| Item Input    | 0             | Unlimited     | Bottom layer          |
+---------------+---------------+---------------+-----------------------+
| Item Output   | N/A           | N/A           | N/A                   |
+---------------+---------------+---------------+-----------------------+
| Muffler       | 1             | 1             | Bottom layer          |
+---------------+---------------+---------------+-----------------------+


The Large Boilers are a set of tiered machines that produce steam from water and burnable fuels.
The Large Boilers are alternatives to the single-block boilers that produce significantly more 
steam, but at a much higher fuel burn rate.

Behaviour
---------

When provided with water (usually from an infinite water cover), and a burnable solid or liquid
fuel, the boiler will begin to heat up. It will get hotter the longer it is active, reaching
a peak heat that is shown in the tooltip for the controller and the controller's GUI. The amount
of steam produced depends on the temperature of the boiler; the amount produced at the maximum 
temperature can be seen on the tooltip of the controller block.

Large Boilers can be throttled in their GUI. When a Large Boiler is throttled, it will produce
significantly less steam, but it will also consume fuel significantly slower. Large Boilers can
be throttled down to a minimum of 25% output.

.. note::

    This throttling isn't perfect; a throttled Large Boiler will always produce slightly less
    than the throttle percentage of the unthrottled output.

    For example, a Large Bronze Boiler at 100% produces 800mB/t of steam, but only produces 192mB/t
    at 25%.

Large Boilers will void any excess steam generated if there is no room in their output hatches.
To avoid this, place multiple hatches down with appropriately large fluid pipes to extract the
steam, or throttle the boiler down.

.. danger::

    Large Boilers should always have enough water available. If they are heated up without water, 
    they will explode!

Sharing Pattern
---------------

.. figure:: screenshots/large-boilers-shared.avif

    Two Large Bronze Boilers sharing a wall.

Large Boilers can be tiled infinitely due to having no maximum requirement on input or output 
hatches. 
