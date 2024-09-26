.. _server-installation:

Server Installation
====================

Bigger Industrialisation doesn't come in the typical copyright-violating "server pack"; you need
to install it yourself. You'll need a bit of command line knowledge to set things up, but it's
not that hard, I promise.

1. Download the appropriate `mrpack-installer`_ beta version for your platform. Every desktop PC is
   ``amd64``; make sure not to download the ``arm64`` version accidentally.

   Extract the ``mrpack-installer`` binary inside to the directory you will run your server from.

2. Download the server-only pack from the 
   `Modrinth <https://modrinth.com/modpack/bigger-industrialisation>`_ page. It can be found under
   the files on a specific version's page. Copy the ``mrpack`` file to your server directory.

3. In a command-line window, run the following:

.. code-block:: shell

    # For windows, this might be something like "C:\Users\MyUser\Documents\Bigger-Industrialisation".
    # Obviously, change it to your actual server directory.
    $ cd <path to your server directory>

    # For windows. Replace the server-only file with the file name of the actual file you 
    # downloaded.
    $ .\\mrpack-install <the server-only file>
    # For linux.
    $ chmod +x ./mrpack-install
    $ ./mrpack-install <the server-only file>

4. This will output the downloaded mods, configs, and tweaker scripts into a subdirectory ``mc``.

   Open that directory (in your command line or graphical file explorer) and run the NeoForge 
   installer to create a server jar. Select the MC directory in the installer, and ignore the 
   warning about files already existing.

5. Run the ``start.sh`` or ``start.bat`` files to boot your server.

.. _mrpack-installer: https://github.com/nothub/mrpack-install/releases/tag/v0.17.2-beta
