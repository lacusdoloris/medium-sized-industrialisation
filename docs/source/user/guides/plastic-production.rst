.. _guide-plastic-producttion:

Plastic Production
==================

Plastics are hard, ductile materials that in the real world have a significant number of usages,
from packaging to toys to piping.

In your factory, plastics will be primarily used for electronic components, machinery, multiblock
machine casings, and cabling. Bigger Industrialisation has multiple types of plastic, each one with
its own set of usages. 

All plastics are *polymers*; they are the result of a chemical known as a monomer undergoing 
`polymerisation <https://en.wikipedia.org/wiki/Polymerization>`_. For the sake of simplicity,
this document will discuss the manufacture of the initial monomers leading to the polymers as well
as how to polymerise them into the resulting plastics.

.. _plastic-production-polyethylene:

Polyethylene
------------

Polyethylene is the polymer version of ethylene (or ethene), the simplest (and shortest) of the 
alkenes, and will be the first plastic you will manufacture in bulk. Polyethylene is normally 
polymerised using metal catalysts (such as titanium(III) chloride, or chromium oxide); due to its
position early on in progression, this is ignored in favour of simple exothermic polymerisation 
using air or oxygen at first. 

There are two main ways of getting ethylene; the first is from biological processes via ethanol or 
glycerol and the second is from oil refining.

Bioethylene
~~~~~~~~~~~

Ethylene can be obtained in abundant quantities via reacting ethanol with sulfuric acid in a 
dehydration reaction like so:

.. math::

    \ce{C2H5OH \Rightarrow C2H4 + H2O}

This uses Sulfuric Acid as a catalyst for the reaction. Ethanol is made from the distillation of
biomass which has multiple possible methods of production, in order of efficiency:

1. Most crops can be directly brewed into biomass, as well as saplings and mushrooms.

2. Bio Chaff can be directly distilled into biomass; Bio Chaff is made from macerating plant balls,
   which are made from either compressing crops, centrifuging dirt/grass, or centrifuging rubber
   logs.

3. Bio Chaff can be converted into biomass inside a Pyrolyse Oven. This is only recommended after
   acquiring Ferrochroluminium coils due to the speed penalty of Cupronickel coils.

If you have the Snad mod installed, a sugar cane farm will provide a significant amount of biomass
very cheaply and quickly. Alternatively, in the HV tier, Ethylene can be made from Glycerol which
is a byproduct of biodiesel production when using seed or fish oils.

The main disadvantage of this method is that it is extremely slow. A single bucket of ethylene takes
60 seconds to produce from Ethanol with no overclocks requiring a large number of Chemical Reactors
as an up-front investment. 

Oil Cracking
~~~~~~~~~~~~

.. figure:: screenshots/ethylene-production.avif

    An ethylene production facility that utilises singleblock distilleries.

The otther method for obtaining ethylene is from :ref:`oil processing <oil-petrocarbons>`. All
steam-cracked oil refining intermediates produce some ethylene, but the best direct source of 
ethylene is from *severely steam-cracked naphtha* at 500mB per input bucket. This is the easiest
source of ethylene if you're using singleblock distilleries.

On the other hand, if you use a full distillation setup and crack all of the byproducts, the 
best intermediate available is *lightly hydro-cracked naphtha* giving 1562.5mB of ethylene per
input bucket.

.. collapse:: Oil intermediates table

    +------------+--------------+------------------------+-------------------+------------------+----------------+----------------+---------------+--------------+
    | Fuel Type  | Cracking     | Direct Ethylene output | But(e/a)ne output | Butadiene Output | Propane output | Propene output | Ethane output | Total output |
    +============+==============+========================+===================+==================+================+================+===============+==============+
    | Naphtha    | Severe steam | 500                    | 75                | 81.25            | 15             | 300            | 16.25         | 987.5mB      |
    +------------+--------------+------------------------+-------------------+------------------+----------------+----------------+---------------+--------------+
    | Naphtha    | Light steam  | 200                    | 120               | 243.75           | 15             | 200            | 8.75          | 787.5mB      |
    +------------+--------------+------------------------+-------------------+------------------+----------------+----------------+---------------+--------------+
    | Naphtha    | Severe hydro | N/A                    | 187.5             | N/A              | 125.0.         | N/A            | 375.0         | 687.5mB      |
    +------------+--------------+------------------------+-------------------+------------------+----------------+----------------+---------------+--------------+
    | Naphtha    | Light hydro  | N/A                    | 1200.0            | N/A              | 300.0          | N/A            | 62.5          | 1562.5mB     |
    +------------+--------------+------------------------+-------------------+------------------+----------------+----------------+---------------+--------------+
    | Light Fuel | Severe steam | 250                    | 97.5              | 81.25            | 50             | 250            | 12.5          | 741.25mB     |
    +------------+--------------+------------------------+-------------------+------------------+----------------+----------------+---------------+--------------+
    | Light Fuel | Light steam  | 112.50                 | 112.5             | 97.5             | 20             | 150            | 2.5           | 432.5mB      |
    +------------+--------------+------------------------+-------------------+------------------+----------------+----------------+---------------+--------------+
    | Light Fuel | Severe hydro | N/A                    | 187.5             | N/A              | 125.0          | N/A            | 375           | 687.5mB      |
    +------------+--------------+------------------------+-------------------+------------------+----------------+----------------+---------------+--------------+
    | Light Fuel | Light hydro  | N/A                    | 225               | N/A              | 200            | N/A            | 31.25         | 456.25mB     |
    +------------+--------------+------------------------+-------------------+------------------+----------------+----------------+---------------+--------------+
    | Heavy Fuel | Severe steam | 150                    | 120               | 81.25            | 10.0           | 100            | 3.75          | 465.0mB      |
    +------------+--------------+------------------------+-------------------+------------------+----------------+----------------+---------------+--------------+
    | Heavy Fuel | Light steam  | 50                     | 37.5              | 24.375           | 3.0            | 30.0           | 1.25          | 146.125mB    |
    +------------+--------------+------------------------+-------------------+------------------+----------------+----------------+---------------+--------------+
    | Heavy Fuel | Severe hydro | N/A                    | 450.0             | N/A              | 300            | N/A            | 43.75         | 793.75mB     |
    +------------+--------------+------------------------+-------------------+------------------+----------------+----------------+---------------+--------------+
    | Heavy Fuel | Light hydro  | N/A                    | 150.0             | N/A              | 100            | N/A            | 18.75         | 268.75mB     |
    +------------+--------------+------------------------+-------------------+------------------+----------------+----------------+---------------+--------------+

.. _plastic-production-pvc:

Poly(vinyl chloride)
--------------------

Poly(vinyl chloride) - more commonly known as PVC - is a plastic mostly used in the real world for 
construction including pipings, doors, and sidings. In Bigger Industrialisation it is used for
the insulation of higher-tier cables, as an alternative for basic circuit boards, and as an early
set of fast item pipes. 

As the name suggests, poly(vinyl chloride) is the polymerised form of the vinyl chloride mononer,
and the only usage of vinyl chloride. Vinyl chloride is made from ethylene via 1,2-Dichloroethane:

.. math::

    \ce{C2H4 + 2 Cl ->[\ce{FeCl3}] ClCH2CH2Cl}  
    \\
    \\
    \ce{ClCH2CH2Cl ->[\ce{H2O}] CH2CHCl + HCl}

From there, the vinyl chloride is mechnically polymerised using air or oxygen to get the polymer.
See the previous section for how to acquire ethylene, and see :ref:`el-chlorine` for how to get
the chlorine.

.. _plastic-production-ptfe:

Poly(tetrafluoroethylene)
-------------------------

Poly(tetrafluoroethylene) - more commonly known as PTFE or Teflon - is an inert plastic primarily
used as a casing material, both for singleblock machine casings and for multiblocks. It is
the polymerised form of the tetrafluoroethylene radical.

There are two ways of making tetrafluoroethylene. The first is via chloroform:

.. math::

    \xce{CH4 + 3 Cl2 \Rightarrow CHCl3 + 3 HCl}
    \\
    \\
    \xce{2 CHCl3 + 4 HF \Rightarrow C2F4 + 6 HCl}

This method can be done in singeblock chemical reactors as soon as you have a source of fluorine.
Alternatively, as soon as EV energy hatches are available, this can be done as a single-step 
process in the Large Chemical Reactor:

.. math::

    \xce{4 HF + 2 CH4 + 6 Cl2 \Rightarrow C2F4 + 12 HCl}

Regardless of which method you use for tetrafluoroethylene, it is polymerised using a small
amount of sodium persulfate, up to 0.3% for the bulk recipe made inside the Large Chemical Reactor.
