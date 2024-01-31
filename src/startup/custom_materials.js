import { getMaterial } from "../shared/utils";

const PropertyKey = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey");

// Material.Builder isn't exposed to kjs. lol!
// so no fancy autocomplete here. sorry.

export const addMaterials = (event) => {
    // == Arsenic Processing == //
    event.create(new ResourceLocation("nijika:orpiment"))
        .gem().ore()
        .color(0xA99300)
        .iconSet(GTMaterialIconSet.EMERALD)
        .components("2x gtceu:arsenic", "3x gtceu:sulfur")
        .addOreByproducts("gtceu:sulfur", "gtceu:antimony", "gtceu:barite")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event.create(new ResourceLocation("nijika:arsenic_trichloride"))
        .fluid()
        .color(0xfffec8)
        .components("1x gtceu:arsenic", "3x gtceu:chlorine")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    // == Bauxite Processing == //
    event.create(new ResourceLocation("nijika:aluminium_hydroxide"))
        .fluid().dust()
        .color(0xbcd8e8)
        .components("1x gtceu:aluminium", "3x gtceu:oxygen", "3x gtceu:hydrogen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event.create(new ResourceLocation("nijika:sodium_aluminate"))
        .liquid(new GTFluidBuilder().temperature(2100))
        .color(0x505b6b)
        .components("1x gtceu:sodium", "1x gtceu:aluminium", "2x gtceu:oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event.create(new ResourceLocation("nijika:alumina"))
        .dust()
        .color(0xa1c2c1)
        .components("2x gtceu:aluminium", "3x gtceu:oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event.create(new ResourceLocation("nijika:red_mud"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .dust()
        .color(0xFF0000)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event.create(new ResourceLocation("nijika:red_mud_slurry"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .color(0xAF3300)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
}
