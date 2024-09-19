.. _elec-generation:

Electricity Generation
======================

There's several options for power generation throughout the game; some are more viable than others,
so this is a guide of what to use and when.

.. note::

    All of the fuels described here have their stats described within EMI, by using the "Recipe"
    hotkey on the combustion or gas generators. 

.. note::

    All fuels generate a *fixed amount* of EU, no matter what the tier (ignoring multiblock 
    generators and their efficiency upgrades). Higher tier generators will consume 4x more fuel
    than the previous tier in order to meet their output standards. For example, an LV generator
    will consume one millibucket every half a second of light fuel, an MV generator will consume
    four millibuckets, and a HV generator will consume sixteen millibuckets.

.. _gen-steam-power:

Steam Power
-----------

Steam will inevitably be your first power source during the LV tier, and maybe the early parts of 
the MV tier. Steam is a very thin gas in-game so it's difficult to scale it for large scale power
production; make sure to use the largest GregTech pipes available (Potin or Polyethylene are good
options) so that your steam turbines can fill properly.

There's a few ways of producing steam:

- The single-block High Pressure Solid Boiler produces a pitiful amount of steam in exchange for
  barely using any fuel. These should only really be used to bootstrap the manufacturing of better
  power sources, or for when you really don't want to waste any EU for gas water shifts.

- The single-block High Pressure Liquid Boiler produces a slightly less pitiful amount of steam
  but is harder to fuel, as it will only accept Lava, Heavy Fuel, or Creosote.

- The Solar Boilers produce even *less* steam, but they work for free, forever. These are really
  not useful outside of bootstrapping, but the recipes are there if you need them.

- Finally, there are the Large Boilers. There are four tiers of these but the ones you'll likely be
  using are the Large Bronze Boiler and maybe the Large Steel Boiler. These generate a *lot* of
  steam - when fully hooked up, 400EU/t worth for the Bronze, and 1000EU/t worth for the Steel -
  at the cost of guzzling fuel like monsters.

  The best fuel for these by far is lava as you can get an infinite amount for free with Create's
  hose pulley. The Nether will almost certainly have infinite lava lakes and the pumped lava can
  be fetched through a portal using trains; if you combine some deep underground lava lakes they 
  will be considered infinite by the Hose Pulley too.

In the HV tier you can build large steam turbines which can be significantly more efficient than
singleblock steam turbines with the right rotors.

.. _fossil-fuel-power:

Fossil Fuel Power
-----------------

Just like in real life, you will likely be using fuels derived from oil and gas for the majority of
the game. Fossil fuel liquids are dense, produce a lot of power per unit, and are easy to obtain;
from MV and onwards, you use fluid drilling rigs in fluid chunks and distill the results. With the
buffs to fluid veins, it's easy to run entire bases off of a handful of outposts.

There's a few options as to which liquid fuel you use that varies throughout the tiers:

- You can just burn oil straight out of the ground, but it is hideously inefficient. This goes for
  most combustion or gas engine fuels; they technically are burnable, but it is rarely if ever worth
  doing. 

- LPG can be centrifuged from Refinery Gas alongside Methane as a byproduct; as methane is your 
  best shot for hydrogen production (see :ref:`element-hydrogen`) you will be needing a lot of it anyway.

  One bucket of LPG burns for 320k EU, and one bucket of methane burns for 112k EU, for a total of 
  432k EU per bucket of refinery gas (minus processing costs).
  
- Light Fuel and Heavy Fuel can be mixed together in a 5:1 ratio to make regular diesel, which burns
  for a nice 480k EU per bucket. Coincidentally, this is the exact ratio that distilling raw oil
  will get you. This does require going through the entire aluminium, chromium, and vanadium 
  refining chains in order to build a distillation tower.

- Cetane Boosted Diesel is available in HV by mixing a small amount of tetranitromethane and diesel 
  together, which produces a full 720k EU per bucket. You can get by for a very long time with just
  this as your fuel.

- Gasoline burns for a mighty 1.6 million EU per bucket, but has a complex chain of refining 
  requirements to produce. But the real star of the show is *High Octane Gasoline* - produced
  produced from gasoline, octane, and ETBE - which outputs a whopping 3.2 million EU per bucket.

  A single LCR producing High Octane Gasoline can produce enough fuel to power nearly 40 LuV 
  machines, or 160 IV machines - and that's ignoring efficiency from multiblock turbines.

Biofuel
-------

Biofuels are a fully renewable alternative to fossil fuels. With liquid veins being buffed these
are less appealing, but they aree still a somewhat viable alternative; the base materials for 
biofuels can be harvested using entirely mechanical means, whereas fossil fuels all require 
drilling wells. 

- *Biodiesel* is made from organic oil and ethanol/methanol. You can use fish from the fishery for
  fish oil or seeds from growable plants for seed oil. Ethanol can be made by fermenting biomass.
  The sodium hydroxide used to catalyse the reaction can be acquired from your evaporation pools.

  Biodiesel producees slightly less than regular diesel, at 256k EU per bucket, but it can be made
  into cetane-boosted diesel just like regular diesel can at the cost of slightly more 
  tetranitromethane. 

- Benzene is obtained by distilling wood tar, which comes from charcoal made in the pyrolyse oven
  or by using an extractor on charcoal. In HV, you can mix it with nitration mixer to get 
  nitrobenzene which produces 1.28 million EU per bucket.

Mechanical Power
----------------

The best way to get energy out of SU is to use it to make a tree farm, and then make a charcoal
burning setup with a fan. Despite that, for small outposts, it may be worth building a windmill and
converting it to RF with a Create: New Age turbine. Just remember that it is *always* worse to use
a mechanical diesel engine and convert it to EU with a turbine than it is to just use a combustion
generator and an electric motor.

Nuclear Fission
---------------

Not currently implemented. Check back later.

Nuclear Fusion
--------------

This is *technically* available, but it is currently past the content cutoff, so is not supported
or balanced in any way.

Alchemical Power
----------------

Not currently implemented. Check back later.
  
 