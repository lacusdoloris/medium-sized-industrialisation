.. _user-installation:

Client Installation & Getting Started
=====================================

Medium Sized Industrialisation is published exclusively on 
`Modrinth <https://modrinth.com/modpack/bigger-industrialisation>`_; stable releases can be 
downloaded from there from within your launcher. You should read this entire page before running 
the instance for the first time.

.. warning::

    The *only* supported Minecraft launcher is Prism Launcher. Not a fork of it, not the Modrinth
    launcher, ***only*** Prism Launcher. Ignore this at your own peril.

Installation
-------------

This is the instructions for the stable releases. If you're brave, stupid, or both, see the
:ref:`dev-installation` section for unstable, bleeding edge releases.

1. Create a new instance in Prism Launcher.
2. Select Modrinth on the left sidebar.
3. Type "Medium Sized Industrialisation" into the search bar.
4. Select your desired version in the drop-down bar (usually the latest) and press OK to install
   the pack.

Java Settings
-------------

MSI runs better with newer versions of Java. It's recommended to use Java 21
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

    MSI will produce a nag screen at launch if it detects bad JVM arguments.
    
    **If you continue to use them, you will not be given any support.**

Prism Launcher has a special section for adding your JVM arguments. The *only* recommended arguments
to add here are the ones that enable the Generational ZGC and large pages::

    -XX:+AlwaysPreTouch -XX:+UseLargePages -XX:+UseZGC -XX:+ZGenerational

Memory
~~~~~~

With ZGC and the included optimisation mods, MSI requires around ~6GiB of memory at minimum. 
You can set your maximum memory allocation to as much as you need; the Z Garbage Collector 
works well under high-memory conditions.

.. note::

    There is a significant amount of misinformation about large heaps online, including incorrect 
    statements such as "the game gets slower after 8GiB as the GC has to work harder". 
    Ignore it. You can allocate as much as you want provided you leave space for other applications. 

    The real world is powered by Java applications with significantly larger heaps than 8GiB.

Additional Mods
---------------

MSI is 100% playable in its default state, but the main modpack is 
(relatively) minimalist. Some mods are common in most modpacks, but are not included in 
MSI; you may wish to install these first:

- A minimap mod. MSI has less focus on exploring, so this is not as necessary as in most packs.

- A veinminer. Bluntly, the best veinminer mod (FTB Ultimine) is both proprietary and not available
  on Modrinth.
  
- Additional world generation mods. The only worldgen mod included is Ecospherical Expansion for the
  base overworld layout. If you wish to change up the overworld, you need to install these yourself.

- MSI ships with Heracles as the default questing mod, but comes with files for FTB Quests if you
  wish to switch to that.
