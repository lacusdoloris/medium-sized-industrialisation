.. _dev-workspace:

Setting up a Kamuidrome Instance
================================

If you want to contribute to BI, such as adding recipe tweaks, mod support, or quest changes,
you need to set up a special instance of the modpack for development work.


`Kamuidrome <https://github.com/Fuyukai/Kamuidrome>`__ is the tool used to manage mod dependencies,
export the pack into a Modrinth pack format zip, and connect to Prism Launcher. It requires Python
3.12 (or newer) to run.

.. warning::

    *Only* Prism Launcher is supported. Other MultiMC forks (or, indeed, MultiMC itself) are
    **not** supported. The Modrinth launcher is **not** supported. ATLauncher is **not** supported.

Installation
------------

.. highlight:: bash

Kamuidrome is a dev dependency of the local `PDM <https://pdm-project.org/en/latest/>`__ 
environment; the easiest way to get it is to use PDM to create a new virtual environment. PDM is
required for building both the docs and some helper scripts. You can install PDM like so::

    $ pip install --user -U pipx  # optional, but the easiest way to install it
    $ pipx install pdm 

Then, install the project with PDM::

    $ pdm install

This will create a new virtual environment containing the BI helper scripts and Kamuidrome installed
locally. From there, you can run ``kamuidrome`` using PDM like so::

    $ pdm run kamuidrome --help

Alternatively, you can create a new shell with PDM that lets you run bare ``kamuidrome`` commands::

    $ pdm run $SHELL
    (.venv) $ kamuidrome --help

Windows Usage
~~~~~~~~~~~~~

In order to use Kamuidrome on Windows, you additionally need to enable
`developer mode <https://learn.microsoft.com/en-us/windows/apps/get-started/enable-your-device-for-development>`__
in order to create the symbolic links required for deploying into a Prism Launcher instance.

Failing to do this will give you an OSError when Kamuidrome tries cleaning up your instance 
directory initially.

Usage
-----

The README page on the repository for Kamuidrome gives you an overview of all the commands, but to
get started quickly:

1. Create a new 1.20.1 instance in Prism Launcher with the latest version of NeoForge selected as
   the modloader.

2. Launch the game once to verify NeoForge is installed correctly and create the instance directory.

3. Run ``kamuidrome download`` to download all of the mods in the pack to the cache.

4. Run ``kamuidrome deploy -i <your instance name>`` to symlink the mods and directories to the
   specified Prism Launcher instance.

.. note::

    You only need to run a ``kamuidrome deploy`` when the installed set of mods changes, as the 
    entire ``config`` and ``kubejs`` directories are symbolically linked to your instance.

Local Pack
----------

Kamuidrome supports a ``localpack.toml`` file that contains some extra workspace specific settings,
such as the default instance name. Adding ``instance_name = "<my instance name>"`` to this file
will allow you to run a plain ``kamuidrome deploy`` without needing to specify an instance name.

The ``extra_symlinked_dirs`` field allows you to symlink local directories to the instance 
directory. It's a good idea to set this to at least ``[".vscode", "logs"]`` to link the ProbeJS
and game logging directories to your workspace.
