This is a small collection of miscellaneous fixes and tweaks I've made that might be useful for
other packdevs that doesn't require joining a fucking D*scord guild to find out. (Fuck you, KJS 
devs.)

1. KubeJS spams errors.

   This is due to a janky interaction with Silent Gear. It's fixed either on a ``/reload``, 
   or with ``allowAsyncStreams=false`` in the ``kubejs/config/common.properties``.

   See https://github.com/SilentChaos512/Silent-Gear/issues/617 for more information. 

2. KubeJS has broken JS support.

   The actual featureset KubeJS supports (or, the fork of Rhino it uses, supports) is unspecified;
   it's somewhere around ES6. Unfortunately, older ES5 features are fucking broken, like ``var``
   scoping! (And, apparently, this was done deliberately!)

   This means that you can't use Babel to get nice transpiling for newer features because it really
   likes to emit ``var``; doubly so due to the JS world for some reason moving to browser version
   configurations rather than letting you choose what to transpile. ``firefox > 90`` seems to be
   the sweet spot where you get certain useful transpilations (like classes).

   I don't really remember how I set this up. See ``package.json`` and ``babel.config.json`` for
   more information.

3. Some Fabric mods have special Sodium compat but can't pick it up under Sinytra.

   The Forge version of Sodium is now Embeddium... but this has a version number of 0.2, whereas
   Sodium is 0.5.x at the time of writing, and some mods check for this.

   The solution is to forward ``rubidium`` (which is a stub provided by Embeddium) instead of
   ``embedddium`` to Fabric mods in the ``connector_global_mod_aliases``. The Rubidium stub has
   a version number of 0.7, which usually satisfies mods. (e.g. Big Globe requires this.)

4. Don't reload too quickly in succession. 

   Causes a concurrent modification exception from EMI's search baking. Oops!
