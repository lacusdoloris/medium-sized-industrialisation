import { getMaterial } from "../shared/utils";

const PropertyKey = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey");

// Material.Builder isn't exposed to kjs. lol!
// so no fancy autocomplete here. sorry.

export const addMaterials = (event) => {
    const chemicalIntermediate = (id, colour) => {
        return event.create(new ResourceLocation("nijika", id))
            .dust().fluid().color(colour)
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
    }

    // == Slag == //
    event.create(new ResourceLocation("nijika:slag"))
        .dust()
        .color(0x474236)
        .iconSet(GTMaterialIconSet.FLINT)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event.create(new ResourceLocation("nijika:slag_slurry"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .color(0x373226)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    // == Arsenic Processing == //
    event.create(new ResourceLocation("nijika:orpiment"))
        .gem().ore()
        .color(0xA99300)
        .iconSet(GTMaterialIconSet.EMERALD)
        .components("2x gtceu:arsenic", "3x gtceu:sulfur")
        .addOreByproducts("gtceu:sulfur", "gtceu:antimony", "gtceu:barite")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    chemicalIntermediate("arsenic_trichloride", 0xfffec8)
        .components("1x gtceu:arsenic", "3x gtceu:chlorine");

    // == Bauxite Processing == //
    chemicalIntermediate("aluminium_hydroxide", 0xbcd8e8)
        .components("1x gtceu:aluminium", "3x gtceu:oxygen", "3x gtceu:hydrogen");

    event.create(new ResourceLocation("nijika:sodium_aluminate"))
        .liquid(new GTFluidBuilder().temperature(2100))
        .color(0x505b6b)
        .components("1x gtceu:sodium", "1x gtceu:aluminium", "2x gtceu:oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    chemicalIntermediate("alumina", 0xa1c2c1).components("2x gtceu:aluminium", "3x gtceu:oxygen")

    event.create(new ResourceLocation("nijika:red_mud"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .dust()
        .color(0xFF0000)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event.create(new ResourceLocation("nijika:red_mud_slurry"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .color(0xAF3300)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    // == Chromium == //
    chemicalIntermediate("sodium_dichromate", 0xe37b2b)
        .components("2x gtceu:sodium", "2x gtceu:chromium", "7x gtceu:oxygen");

    chemicalIntermediate("sodium_chromate", 0xf4d015)
        .components("2x gtceu:sodium", "gtceu:chromium", "4x gtceu:oxygen");

    chemicalIntermediate("chromium_iii_oxide", 0x9cbc7b)
        .components("2x gtceu:chromium", "3x gtceu:oxygen")

    event.create(new ResourceLocation("nijika:ferrochrome"))
        .ingot().dust()
        .color(0x446476)
        .components("gtceu:iron", "gtceu:chromium")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.NO_WORKING)
        .iconSet(GTMaterialIconSet.SHINY);

    // == Manganese == //
    event.create(new ResourceLocation("nijika:ferromanganese"))
        .ingot().dust()
        .color(0xe01923)
        .components("1x gtceu:manganese", "2x gtceu:iron")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.NO_WORKING)
        .iconSet(GTMaterialIconSet.SHINY);

    // no disable decomposition flag here.
    event.create(new ResourceLocation("nijika:manganese_oxide"))
        .dust()
        .color(0x535353)
        .components("1x gtceu:manganese", "1x gtceu:oxygen")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING);
    
    // == Tantalite == //

    event.create(new ResourceLocation("nijika:tantalite_slurry"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .color(0x9ff1f5)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    chemicalIntermediate("tantalum_pentoxide", 0x0a0c26)
        .components("2x gtceu:tantalum", "5x gtceu:oxygen");

    // fine to create decompositions for this, actually.
    event.create(new ResourceLocation("nijika:sodium_fluoride"))
        .dust()
        .color(0xfffdd6)
        .components("1x gtceu:sodium", "1x gtceu:fluorine");

    event.create(new ResourceLocation("nijika:tantalum_slag"))
        .dust()  // would prefer this to be a gem, but that generates sifter recipes.
        .color(0x171b45)
        .iconSet(GTMaterialIconSet.FLINT)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event.create(new ResourceLocation("nijika:tantalum_slag_slurry"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .color(0x9c949c)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event.create(new ResourceLocation("nijika:tantalite_residue"))
        .dust()
        .color(0x9c949c)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    // == Niobium == //
    chemicalIntermediate("niobium_pentoxide", 0x260a0c)
        .components("2x gtceu:niobium", "5x gtceu:oxygen");

    // == Vanadium == //
    chemicalIntermediate("vanadium_pentoxide", 0xd5bf6b)
        .components("2x gtceu:vanadium", "5x gtceu:oxygen");
}
