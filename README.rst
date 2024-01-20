Bigger Industrialisation
========================

This is a GregTech + Big Globe modpack for Minecraft 1.20.

Building & Setting Up
---------------------

BI uses a bundling setup for the KubeJS scripts.

1. ``yarn install`` to actually install all of the dev dependencies
2. ``yarn run build-dev`` builds the development (unminified) ``index.js`` files

Actual mod management is done via ``Kamuidrome <https://github.com/Fuyukai/Kamuidrome>``_, so...

1. ``pipx install git+https://github.com/Fuyukai/Kamuidrome.git`` (I always use the bleeding edge
   version because it's my own project!)
2. Run ``kamuidrome install`` to download all of the mods into your local cache.
3. For development purposes, you can deploy it to a local Prism Instance with ``kamuidrome deploy``.

Quest Development
-----------------

Quests are primarily edited in FTB Quests and automatically transformed into Heracles quests via 
Odysseus with the ``build_quests.sh`` script. This is ran automatically in CI.

Included Mods
-------------

This pack includes a small number of mods directly in the pack, rather than being fetched by 
Kamuidrome, for various reasons. These are:

- `Lilligant <https://github.com/fuyukai/lilligant>`_, made by me as a quick dumping ground for 
  various modpack mixins.
- `We No Speak Umbrellarino <https://modrinth.com/mod/wenospeakumbrellarino>`_, because the
  1.20 ported version (made by yours truly) isn't uploaded to Modrinth. MIT licensed.
- `ProbeJS <https://www.curseforge.com/minecraft/mc-mods/probejs/files/all?page=1&pageSize=20>`_,
  which isn't available on Modrinth. Used for dev stuff and schemas. LGPL 3.0 (on the CF page).
- `Tool Belt <https://www.curseforge.com/minecraft/mc-mods/tool-belt>`_, which isn't available on
  Modrinth. BSD 3-Clause.

(For the latter three mods, if you upload to Modrinth please let me know and I will instantly swap
it out to a Modrinth download. I don't want to take your ad money!)
