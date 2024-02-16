Quest Development
-----------------

Quests are primarily edited in FTB Quests and automatically transformed into Heracles quests via 
Odysseus with the ``build_quests.sh`` script. This is ran automatically in CI.

This means if you install FTB Quests + FTB XMod Compat manually, it'll automatically pick up the
quests there. You should remove Heracles too, in that case.

Building & Setting Up
---------------------

BI uses a bundling setup for the KubeJS scripts.

1. ``yarn install`` to actually install all of the dev dependencies
2. ``yarn run build-dev`` builds the development (unminified) ``index.js`` files

Actual mod management is done via `Kamuidrome <https://github.com/Fuyukai/Kamuidrome>`_, so...

1. ``pipx install git+https://github.com/Fuyukai/Kamuidrome.git`` (I always use the bleeding edge
   version because it's my own project!)
2. Run ``kamuidrome install`` to download all of the mods into your local cache.
3. For development purposes, you can deploy it to a local Prism Instance with ``kamuidrome deploy``.

You can also use this for an easier server install; deploy into an installed NeoForge server 
with ``kamuidrome deploy -d /path/to/my/server``. If you're using Heracles, you need to run 
``./build_quests.sh`` too. 

Contributing
------------

Add your files in ``src/``, and then use ``yarn prettier src --write`` to autoformat. 
