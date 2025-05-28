.. _dev-installation:

CI Version Installation
=======================

.. warning::

    These builds are **unstable** and contain buggy, broken, half-complete features that can ruin
    your factory, corrupt your save, and smite you with lightning. Don't use these unless you
    know what you're doing! And even then, don't!

.. warning::

    This method should not be used if you are making development changes to the modpack. See
    :ref:`dev-workspace` instead.

Every push of the modpack is built by CI into a downloadable ``mrpack`` that can be installed into
a local Prism Launcher instance. These are available on the 
`GitHub repository <https://github.com/lacusdoloris/medium-sized-industrialisation/actions>`__ actions page.

These versions may be desirable to test out new changes, updated mods, or bugfixes that haven't made
it to the maintenance branch yet.

1. Go to the actions page linked above and click on the commit you wish to download.

2. Scroll down to the artefacts section and download the appropriate ``mrpack`` file (the 
   non-suffixed one for clients, or the one suffixed with ``-server`` for server installations).

3. Create a new instance in Prism Launcher and select the ``Import`` tab on the left, then browse
   to the ``mrpack`` file you downloaded previously.

4. To update this instance, open the instance settings in Prism Launcher (right click -> Edit),
   select the ``Modrinth`` tab on the left, select ``Update from File``, and select an updated
   ``mrpack`` file.

.. note::

    The default instance name will be ``BI-<branch>-<commit hash>``. It's recommended to change this
    when creating the instance.

.. _branches: 

Branches
--------

MSI uses two mainline branches for development:

- The `Mizuki <https://www.sekaipedia.org/wiki/Akiyama_Mizuki>`__ branch is the main development
  branch that contains major content changes.

- The `Ena <https://www.sekaipedia.org/wiki/Shinonome_Ena>`__ branch is the support branch that
  contains fixes and minor content tweaks backported from the mainline branch. This branch is 
  forcibly reset to the mainline branch after every major release.
