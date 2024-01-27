import { getMaterial } from "../shared/utils";

const PropertyKey = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey");

// Material.Builder isn't exposed to kjs. lol!
// so no fancy autocomplete here. sorry.

export const addMaterials = (event) => {
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

}
