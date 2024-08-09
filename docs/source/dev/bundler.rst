.. _bundler:

Javascript Setup
================

BI uses a mod called KubeJS to apply recipe & material customisation, new custom items, and 
as a datapack/asset loader. As the name suggests, these tweaks are written in JavaScript; BI has
an extensive amount of JavaScript code to implement all of the recipe changes.

Unlike most modpacks that use KubeJS, BI uses a bundler setup to compile multiple separate 
JavaScript files into a single one, which is then ingested into KubeJS. This has the advantage of
being able to reuse functions across files without needing to awkwardly smash them into a 
``global`` object, as well as being able to use certain modern JavaScript features that the 
interpreter KubeJS uses doesn't support.

Building The Bundle
-------------------

.. highlight:: bash

BI uses `pnpm <https://pnpm.io/>`__ for managing the dependencies of the JavaScript code and setup.
If you have a recent version of Node.JS installed, you can use 
`corepack <https://nodejs.org/api/corepack.html>`__ to automatically install pnpm for you::

    $ corepack enable
    $ pnpm --version

Run the installation command to install all of the dependencies::

    $ pnpm install

There are two defined commands to actually bundle all of the tweaker files:

- ``build-dev`` builds an unminified and non-tree shaken build. The outputted files are 
  significantly larger (the startup scripts includes most of the server scripts) but the resulting
  file is semi-readable and errors will appear in the right place in the traceback.

  This is used for development builds when individual commits are built from CI. 

- ``build-prod`` builds a minified and tree shaken build. The outputted files are significantly
  smaller as they remove all unused code.

  This is used when tags are built from CI.

Autocomplete
------------

BI includes ProbeJS which can generate TypeScript stub files for autocomplete in editors such as
Visual Studio Code. To get autocomplete, do the following:

1. Add your ``.vscode`` folder to the extra linked files in your ``localpack.toml``.
2. Run your development instance and enter a world.
3. Run the ``/probejs dump`` command in-game.

Formatting and Linting
----------------------

A combination of ESlint and Prettier are used for linting and formatting respectively. Lints can
be done with ``pnpm eslint --fix``, and formatting can be done with ``pnpm prettier src --write``.
