.. _progression-tier0:

Progression - Pre-Electricity
=============================

Thank you for installing Bigger Industrialisation! This is the first *progression guide* - a series
of documents that guide you through the rough progression of every single tier of Bigger 
Industrialisation. 

Each guide focuses on a specific *voltage tier*; from Low Voltage all the way up to 
Ultrahigh Voltage. These guides are not intended as an absolute exhaustive checklist, but as a list
of everything you need to or should do in order to progress in the game. Think of this as an 
alternative to the traditional questtbook in an expert progression pack; you'll need your own brain
and the ability to look things up in the recipe viewer to beat it.

These guides are written assuming familiarity with the principles of modded Minecraft with tech 
mods, such as how to automate things and how to pipe things around. You do not need to have played
a GregTech pack before starting this, and these guides are written for both newcomers to the world
of GTCEu and oldtimers. 

.. note::

    Even if you've played a GregTech pack before, Bigger Industrialisation diverges from the
    standard progression significantly in some places, so you should read these guides anyway.

Pre-Base
--------

- The first thing to do is to pre-generate a large area for your world. This is not optional; 
  on my PC (admittedly, only a Ryzen 5 2600) I get around 1.5 chunks per second generated. This is
  not good for exploring!

  The Chunky mod is included; a good starting point is a 1000x1000 area, which will take around
  an hour to generate. 

  If you're interested in why it's so slow, it's mostly due to GTCEu ore vein generation. Removing
  all of them will get a respectable 12 chunks per second generated.

- Once that's done, you can actually play the game. Check out the quest book (you may need to bind
  a key) and open the starter quest to get some useful starting items.

- Find a spot for your permanent base. There's no mobs or hunger so you can take your time here.
  You want a spot with the following:

  - An *ore vent*. You'll want to get :ref:`ore automation <ore-automation>` up as soon as you 
    possibly can, and you don't want to have to travel far to set up your first rock synthesiser.

  - Either a source of underground lava, or a linked nether portal with a significant amount of 
    lava. If you can find an infinite underground lava lake (1000 blocks) directly underneath
    you, you can use an elevator to lift it up and avoid needing trains until MV.

  - It's good to have either Natural Gas or Raw Oil available near your base spot too. Switch the
    prospector to fluid prospecting with Shift+Right Click to search for oil veins.

Pre-Machinery
-------------

.. figure:: screenshots/pre-machinery.avif

    An example workstation of all the Create machines required.

- After finding a spot to settle, place down your wooly and wooden saplings. After the wool
  trees have grown, you can make more by crafting a regular sapling with some wool. 

- Whilst your trees grow, your focus should be on ore gathering for a bit. Unlike in
  the vanilla game, ores come in large *mixed* veins, with several hundred ores available per vein,
  but with only one or two veins per chunk at maximum.

  With few exceptions, most ores come as raw minerals rather than the uncombined metals of the
  vanilla game or most mods. To get iron, you want **Hematite**, **Goethetite**, **Magnetite**, or
  **(Arseno)pyrite**; to get copper you want **Chalcopyrite**; to get tin you want **Cassiterite**;
  and for nickel you want **Pentlandite** or **Garnierite**.

  You will also want to get **Sulfur** from the Nether. 

- The first machine you want to make is a Mechanical Press, which can press iron ingots into
  iron plates, and copper ingots into copper plates. You can power it with a hand crank or 
  water wheel until you can build a windmill.

- Cutting down the rubber trees will drop sticky resin as well as regular rubber wood; this 
  sticky resin works as a component for Create's super glue. Combined with your iron plate from
  before, you can build a windmill bearing and attach wool to it with the super glue to create
  a windmill. This provides more than enough power for the early game.

  If you want to make your "machines" faster, you can use a series of large cogwheels connecting
  to smaller cogwheels.

- With a power source available, you can make a basic belt-fed oven using an encased fan blowing
  through lava. Check the ponder pages for the Funnel, Encased Fan, and Belts for a more complete
  guide. This works for free and will save you a lot of fuel.

- You can also build all of the Create machinery required for early game circuit production: the
  Rolling Machine (used to turn ingots into wires), the Deployer (used for cables and circuit 
  boards), the Mechanical Saw (used for cutting wood into boards), the Mixer (used for making 
  rubber and early-game alloys), and the Millstone (used for grinding things into dusts).

  It's entirely up to you how much you want to automate this; you can get away with putting 
  everything into your machines manually, or you can have belts and funnels automatically forward
  things between the machines.

Pre-Electricity
---------------

.. figure:: screenshots/create-infinite-water.avif

    A pump attached to a 3x1x1 water pool provides an easy way for infinite water in the early game.

The overarching goal here is to build *circuits*, which can be used to make electric machinery.

- Every tier has a set of *tier materials*, which can be viewed in your recipe viewer. The most
  important material for the LV tier (your next tier) is Wrought Iron, which is made by smelting
  regular Iron ingots again.

  Wrought Iron and Iron are *not* exchangeable. Only smelt what you need to smelt into Wrought Iron.

- You can make your first alloys using the mixer and a blaze burner. Blaze burners can be made in
  this pack from combining an empty burner frame with blaze powder, which itself can be made from
  mixing carbon and sulfur together. Use some coal or charcoal (or any other burnable fuel) on the
  blaze burner to heat it up.

  Mixing tin and copper in a heated basin will get bronze, and mixing copper and redstone will get
  red alloy. The former is used as an alternative to brass in most Create recipes that previously
  needed it as well as for boilers. The latter is used for wires in circuits.

- Pressing Sticky Resin in the mechanical press will produce Raw Natural Rubber Pulp; mixing it with
  sulfur dust will get you Natural Rubber Pulp which can be rolled into Rubber Bars. Finally, the
  Rubber Bars can be pressed again to get Rubber Sheets.

  These Rubber Sheets can be applied to wires in the deployer to make cables, which are required
  for machines and circuits.

- At this point, you should strongly consider making a 
  `rotational tree farm <https://antifandom.com/create/wiki/Tutorials/Tree_Automation>`_ that
  uses rubber trees. For now the logs can be burnt for charcoal or pressed to get more sticky resin,
  and the resin itself is required for circuit components.

- Stripboards are the first raw circuit board you can make, and are made by first coating a 
  wood plank (made from wood *planks* in a mechanical saw) in sticky resin, and then either crafting
  it with eight copper wires (four ingots), or using a Deployer with three copper wires (one and 
  a half ingots).

- With your circuit boards available, you can move onto crafting your first circuit. These require
  resistors (made with copper wire, paper, and sticky resin), vacuum tubes (made with glass and 
  copper wire), a wrought iron plate, and some additional red alloy cables. 

- With circuits complete, you can start progressing to your first machines. An LV Machine Hull is
  made from an LV Machine Casing, iron plates, and two tin wires; every machine needs a Machine Hull
  of the appropriate tier. The first two machines you will want to make are an extruder (for gears)
  and a turbine (to power it).

- The Steam Turbine requires two LV motors, which are made using *magnetic iron*. Crafting an iron
  ingot alongside redstone will get you a magnetic iron ingot, which can then be rolled into a
  magnetic iron rod for usage in the motor.

  Motors also require double wires; for now, you can 2x Copper Wires by crafting two 1x Copper Wire
  together.

- The Extruder additionally requires *pistons*, which requires Small Iron Gears. You can make two
  of those with a sequenced assembly recipe (apply a rod four times to an iron plate) to make
  two electric pistons. 

- From there, you need boilers to produce the steam for your machines. Skip the low pressure boilers
  and go directly to making a High Pressure Solid Boiler, which is fueled by solid fuels such as
  coal or charcoal. 

  Connect your boilers to your steam turbine, and connect your steam turbine to your extruder.
  You are now in the LV Voltage Tier.
  
