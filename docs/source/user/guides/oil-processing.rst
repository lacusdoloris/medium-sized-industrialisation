.. _oil-petrocarbons:

Oil Processing & Petrocarbons
=============================

.. admonition:: Tier

    This document is relevant for MV tier content and beyond.

As you enter the MV tier and beyond, you will need to use *plastics* for your components. Machine
hulls require polyethylene or poly(tetrafluoroethylene), circuits require polyethylene or epoxy, 
and other components will require exotic or particular use plastics such as poly(vinyl butyral). 
As hydrocarbon chemicals, these plastics are usually made from oil in some form. Oil by itself is
not very useful and requires *distillation* to split it into its three consistuent parts.

Oil is found in *bedrock fluid vents*, which are only accessible with GTCEu Fluid Drilling Rigs.
See :ref:`multiblock-drilling-rig` for more information on how Fluid Drilling Rigs work.

But I Don't Want To!
--------------------

The easiest way to deal with oil processing is to simply not. Nearly everything you get from
refining oil can be gotten elsewhere, albeit in tiny amounts or in otherwise very inconvenient
methods.

.. collapse:: Alternative ways of getting hydrocarbon resources

    +-----------+--------------------------------+----------------+
    | Chemical  | Usage                          | Get it from... |
    +===========+================================+================+
    | Toluene   | Explosives, mid-game chemistry | Wood tar       |
    +-----------+--------------------------------+----------------+
    | Benzene   | Chemical precursor             | Wood tar       |
    +-----------+--------------------------------+----------------+
    | Butene    | High-octane gasoline           | N/A            |
    +-----------+--------------------------------+----------------+
    | Butadiene | Rubber, mid-game chemistry     | N/A            |
    +-----------+--------------------------------+----------------+
    | Propane   | Shawinigan process             | Acetone        |
    +-----------+--------------------------------+----------------+
    | Propene   | Chemical precursor             | Propane        |
    +-----------+--------------------------------+----------------+
    | Ethane    | Fuel, cracking                 | Acetic Acid    |
    +-----------+--------------------------------+----------------+
    | Ethylene  | Plastic                        | Ethanol        |
    +-----------+--------------------------------+----------------+
    | Methane   | Hydrogen, rubber               | Rubber wood    |
    +-----------+--------------------------------+----------------+

Choosing an Oil Type
--------------------

There are four types of oil:

- Raw Oil: 100MB distills into 10mB of Heavy Fuel, 10mB of Light Fuel, and 150mB of Naphtha.
- Light Oil: 100MB distills into 6.667mB of Heavy Fuel, 13.334mB of Light Fuel, and 20mB of Naphtha.
- Heavy Oil: 100MB distills into 250mB of Heavy Fuel, 45mB of Light Fuel, and 15mB of Naphtha.
- Oil: 100MB distills into 30mB of Heavy Fuel, 100mB of Light Fuel, and 40mB of Naphtha.

.. note::

    The reality is more complicated; Light Oil requires 150mB of input for distillation, and 
    regular Oil only requires 50mB of input. Heavy Oil also requires HV distillation towers or
    MV distilleries to make, making it harder to overclock.

.. note::

    All types of oil also produce sulfuric gas, but that has been omitted here due to actually
    drilling for natural gas being a much more productive mechanism of obtaining refinery gas.

Distillation
------------

Once you have your desired oil, you need to distill it into the four products of oil. There's two
ways of doing this:

- Singleblock distilleries are incredibly fast, but only produce *one* possible result from the
  input oil, discarding all of the other products. 

- Multiblock distilleries are slow and require a lot of vanadium-steel, but produce *all* of the
  possible products of a recipe. See :ref:`multiblock-distillation` for more information.

Desulfurisation
~~~~~~~~~~~~~~~

Distilling oil doesn't get you raw Light Fuel/Heavy Fuel/Naphtha, but versions of them that are 
mixed with sulfur impurities. Pumping hydrogen through them will get you the desulfurised versions,
as well as a small amount of hydrogen sulfide as a byproduct.

This works as a closed reaction; the H2S can be electrolysed back into hydrogen and sulfur and 
the hydrogen can be reused, providing sulfur as a byproduct. 

Cracking The Products
---------------------

Before you can actually distill the oil products into useful hydrocarbons, you need to *crack* them;
this breaks up the long-chain hydrocarbons that are found in oil and oil products into smaller chain
hydrocarbons that are more useful for industrial purposes. Like distillation, cracking can be done
using two different machines:

- Regular chemical reactors can do cracking, but they only produce *half* of the regular output
  of the recipe. For example, 1B of Heavy Fuel + 1B of Steam in a chemical reactor produces 500mB
  of Cracked Heavy Fuel.

- The :ref:`multiblock-cracker` is a HV tier multiblock that produces the full outputs for every
  cracker recipe.

.. note::

    The cracker uses more energy per output fuel unit than singeblock chemical reactors and
    operates in the same time frame as chemical reactors, but with the ability to upgrade the coils
    for less energy usage, the cracker becomes the preferred way of cracking hydrocarbons later
    in progression.

After the oil intermediates have been cracked, they can then be distilled into more useful 
hydrocarbons for industrial usage.

Cracking Types
~~~~~~~~~~~~~~

For oil products, there are four possible ways to crack the intermediates: hydro or steam cracking,
and lightly or severely cracking. Hydro-cracking produces lots of methane, ethane, and butane,
whereas steam cracking produces a large amount of other hydrocarbons such as propene and ethylene.
Similarly, severely cracking the intermediates will have them distill to lots of shorter chain
hydrocarbons such as ethylene, and lightly cracking will have them distill to more longer chain
hydrocarbons such as toluene.

It's All Too Much For Me
------------------------

.. figure:: screenshots/oil-outpost.avif

    A spaghettilicious oil refining outpost.

A lot of this can be overwhelming, as there's a lot of choices to make (which oil do you distill?
which intermediate should you distill? should you crack with steam or hydrogen?).

- If you're using diesel for power, you can ignore nearly all of this. Distill any of the oils using
  single block distilleries and mix them together to get diesel; scale them up as your energy needs
  rise.

- The best intermediate for material purposes (i.e. ethylene) is Naphtha, and the best oil for that
  is Raw Oil at 150mb per bucket of input. Severely Steam Cracked Naphtha gets you 500mB per input
  as a base and another 300mB from steam cracking propene. Lightly Steam Cracked Naphtha is the best
  for Butadiene which is required for midgame rubbers.

- Steam Cracking Light or Heavy fuel is a waste of time. If you must, hydro-crack them to get 
  extra Naphtha.

As a general rule, any inefficiences you introduce in your oil refineries can be brute forced away
with more fluid drills and distilleries.
