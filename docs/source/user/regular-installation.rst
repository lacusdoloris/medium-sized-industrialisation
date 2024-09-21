.. _user-installation:

User Installation & Getting Started
===================================

Bigger Industrialisation is published exclusively on Modrinth; stable releases can be downloaded
from there from within your launcher. You should read this entire page before running the instance
for the first time.

.. warning::

    The *only* supported Minecraft launcher is Prism Launcher. Not a fork of it, not the Modrinth
    launcher, ***only*** Prism Launcher. Ignore this at your own peril.

Installation
-------------

This is the instructions for the stable releases. If you're brave, stupid, or both, see the
:ref:`dev-installation` section for unstable, bleeding edge releases.

1. Create a new instance in Prism Launcher.
2. Select Modrinth on the left sidebar.
3. Type "Bigger Industrialisation" into the search bar.
4. Select your desired version in the drop-down bar (usually the latest) and press OK to install
   the pack.

Server Installation
~~~~~~~~~~~~~~~~~~~

Server-only ``mrpack`` files are uploaded to Modrinth and built by CI for developer builds. You can 
use a tool such as `mrpack-install <https://github.com/nothub/mrpack-install>`_ to then create
a server setup from it.

Java Settings
-------------

Bigger Industrialisation runs better with newer versions of Java. It's recommended to use Java 21
(and may be mandatory in the future) to run the modpack. You can download the appropriate OpenJDK
release `from Azul <https://www.azul.com/downloads/?package=jdk#download-openjdk>`__ (or any
other compatible OpenJDK vendor), or use your distribution packages for Linux users.

.. warning::

    Do not use GraalVM. Support will not be given to GraalVM users.

JVM Arguments
~~~~~~~~~~~~~

.. danger::

    Do not blindly copy and paste JVM arguments you found online into this section. 90% of the time
    they are bad arguments and will actively slow your game down significantly. Most of the 
    documentation about JVM arguments and Java online with relation to Minecraft are misinformation
    and should be completely ignored.

    Bigger Industrialisation will produce a nag screen at launch if it detects bad JVM arguments.
    
    **If you continue to use them, you will not be given any support.**

Prism Launcher has a special section for adding your JVM arguments. The *only* recommended arguments
to add here are the ones that enable the Generational ZGC and large pages::

    -XX:+AlwaysPreTouch -XX:+UseLargePages -XX:+UseZGC -XX:+ZGenerational

Memory
~~~~~~

With ZGC and the included optimisation mods, Bigger Industrialisation requires around ~6GiB of 
memory at a minimum. You can set your maximum memory allocation to as much as you need; the 
Z Garbage Collector works well under high-memory conditions.

.. note::

    There is a significant amount of misinformation about large heaps online, including incorrect 
    statements such as "the game gets slower after 8GiB as the game has to work harder". 
    Ignore it. You can allocate as much as you want provided you leave space for other applications. 

    The real world is powered by Java applications with significantly larger heaps than 8GiB,
    after all.

Additional Mods
---------------

Bigger Industrialisation is 100% playable in its default state, but the main modpack is 
(relatively) minimalist. Some mods are common in most modpacks, but are not included in 
Bigger Industrialisation; you may wish to install these first:

- A minimap mod. BI has less focus on exploring, so this is not as necessary as in most packs.

- A veinminer. Bluntly, the best veinminer mod (FTB Ultimine) is both proprietary and not available
  on Modrinth.
  
- Additional world generation mods. The only worldgen mod included is Ecospherical Expansion for the
  base overworld layout. If you wish to change up the overworld, you need to install these yourself.

World Pre-Generation
--------------------

The vanilla world generation engine is sadly very slow; world generation speeds can dip down to as
low as under a chunk per second, making exploring anything extremely painful. The best way around
this is to load the game, pre-generate a large area, and leave it running for a few hours.

BI includes `Chunky <https://modrinth.com/plugin/chunky>`_, an easy to use chunk pre-generator. 
A 1500x1500 area will get you a good selection of orestone vents, ore chunks, and fluid chunks.
