import { getMaterial } from "../shared/utils";

const PropertyKey = Java.loadClass(
    "com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey"
);

// Material.Builder isn't exposed to kjs. lol!
// so no fancy autocomplete here. sorry.
// a lot of these colours are entirely random.

export const addMaterials = (event) => {
    const chemicalIntermediate = (id, colour) => {
        return event
            .create(new ResourceLocation("nijika", id))
            .dust()
            .fluid()
            .color(colour)
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);
    };

    event.create(new ResourceLocation("nijika:blood")).liquid().color(0xff0000);

    event
        .create(new ResourceLocation("nijika:ammonium_hydroxide"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .color(0xcdd6f7)
        .components("1x gtceu:ammonia", "1x gtceu:oxygen", "1x gtceu:hydrogen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    // == ID Integration == //
    event
        .create(new ResourceLocation("nijika:beryllium_hydride"))
        .dust()
        .color(0x2b4f61)
        .components("1x gtceu:beryllium", "2x gtceu:hydrogen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    // no disable decomposition flag here, as this is how it's actually processed in the real
    // worldd.
    event
        .create(new ResourceLocation("nijika:beryllium_chloride"))
        .dust()
        .color(0x3b3f51)
        .components("1x gtceu:beryllium", "2x gtceu:chlorine");

    // == RFTools Integration == //
    event
        .create(new ResourceLocation("nijika:dimensional_shard"))
        .dust()
        .color(0x61b2b0)
        .secondaryColor(0xbfeded);

    // == Slag == //
    event
        .create(new ResourceLocation("nijika:slag"))
        .dust()
        .color(0x474236)
        .iconSet(GTMaterialIconSet.FLINT)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event
        .create(new ResourceLocation("nijika:slag_slurry"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .color(0x373226)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    // == Arsenic Processing == //
    event
        .create(new ResourceLocation("nijika:orpiment"))
        .gem()
        .ore()
        .color(0xa99300)
        .iconSet(GTMaterialIconSet.EMERALD)
        .components("2x gtceu:arsenic", "3x gtceu:sulfur")
        .addOreByproducts("gtceu:sulfur", "gtceu:antimony", "gtceu:barite")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    chemicalIntermediate("arsenic_trichloride", 0xfffec8).components(
        "1x gtceu:arsenic",
        "3x gtceu:chlorine"
    );

    // == Bauxite Processing == //
    chemicalIntermediate("aluminium_hydroxide", 0xbcd8e8).components(
        "1x gtceu:aluminium",
        "3x gtceu:oxygen",
        "3x gtceu:hydrogen"
    );

    event
        .create(new ResourceLocation("nijika:sodium_aluminate"))
        .liquid(new GTFluidBuilder().temperature(2100))
        .color(0x505b6b)
        .components("1x gtceu:sodium", "1x gtceu:aluminium", "2x gtceu:oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    chemicalIntermediate("alumina", 0xa1c2c1).components("2x gtceu:aluminium", "3x gtceu:oxygen");

    event
        .create(new ResourceLocation("nijika:red_mud"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .dust()
        .color(0xff0000)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event
        .create(new ResourceLocation("nijika:red_mud_slurry"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .color(0xaf3300)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    // == Chromium == //
    chemicalIntermediate("sodium_dichromate", 0xe37b2b).components(
        "2x gtceu:sodium",
        "2x gtceu:chromium",
        "7x gtceu:oxygen"
    );

    chemicalIntermediate("sodium_chromate", 0xf4d015).components(
        "2x gtceu:sodium",
        "gtceu:chromium",
        "4x gtceu:oxygen"
    );

    chemicalIntermediate("chromium_iii_oxide", 0x9cbc7b).components(
        "2x gtceu:chromium",
        "3x gtceu:oxygen"
    );

    event
        .create(new ResourceLocation("nijika:ferrochrome"))
        .ingot()
        .dust()
        .color(0x446476)
        .components("gtceu:iron", "gtceu:chromium")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.NO_WORKING)
        .iconSet(GTMaterialIconSet.SHINY);

    // == Manganese == //
    event
        .create(new ResourceLocation("nijika:ferromanganese"))
        .ingot()
        .dust()
        .color(0xe01923)
        .components("1x gtceu:manganese", "2x gtceu:iron")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.NO_WORKING)
        .iconSet(GTMaterialIconSet.SHINY);

    // no disable decomposition flag here.
    event
        .create(new ResourceLocation("nijika:manganese_oxide"))
        .dust()
        .color(0x535353)
        .components("1x gtceu:manganese", "1x gtceu:oxygen")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING);

    // == Tantalite == //

    event
        .create(new ResourceLocation("nijika:tantalite_slurry"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .color(0x9ff1f5)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    chemicalIntermediate("tantalum_pentoxide", 0x0a0c26).components(
        "2x gtceu:tantalum",
        "5x gtceu:oxygen"
    );

    // fine to create decompositions for this, actually.
    event
        .create(new ResourceLocation("nijika:sodium_fluoride"))
        .dust()
        .color(0xfffdd6)
        .components("1x gtceu:sodium", "1x gtceu:fluorine");

    event
        .create(new ResourceLocation("nijika:tantalum_slag"))
        .dust() // would prefer this to be a gem, but that generates sifter recipes.
        .color(0x171b45)
        .iconSet(GTMaterialIconSet.FLINT)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event
        .create(new ResourceLocation("nijika:tantalum_slag_slurry"))
        .liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
        .color(0x9c949c)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    event
        .create(new ResourceLocation("nijika:tantalite_residue"))
        .dust()
        .color(0x9c949c)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

    // == Niobium == //
    chemicalIntermediate("niobium_pentoxide", 0x260a0c).components(
        "2x gtceu:niobium",
        "5x gtceu:oxygen"
    );

    // == Vanadium == //
    chemicalIntermediate("vanadium_pentoxide", 0xd5bf6b).components(
        "2x gtceu:vanadium",
        "5x gtceu:oxygen"
    );

    // == Rare Earths == //
    // formula is set elsewhere
    event
        .create(new ResourceLocation("nijika:calcium_hydride"))
        .dust()
        .color(0xf7e3e1)
        .components("1x gtceu:calcium", "2x gtceu:hydrogen");

    chemicalIntermediate("rare_earth_hydroxides", 0x1845ff);
    chemicalIntermediate("rare_earth_mixture", 0x18453f);
    chemicalIntermediate("rare_earth_chlorides", 0x447a12);

    // TODO: custom decomposition?
    event
        .create(new ResourceLocation("nijika:trisodium_phosphate"))
        .dust()
        .color(0xff47a1)
        .components("3x gtceu:sodium", "1x gtceu:phosphorus", "3x gtceu:oxygen");

    chemicalIntermediate("lanthanum_iii_oxide", 0x53a1c7).components(
        "2x gtceu:lanthanum",
        "3x gtceu:oxygen"
    );

    chemicalIntermediate("neodymium_iii_oxide", 0x18fc4e).components(
        "2x gtceu:neodymium",
        "3x gtceu:oxygen"
    );

    chemicalIntermediate("samarium_iii_oxide", 0xf37a7a).components(
        "2x gtceu:samarium",
        "3x gtceu:oxygen"
    );

    chemicalIntermediate("yttrium_iii_oxide", 0x4561a8).components(
        "2x gtceu:yttrium",
        "3x gtceu:oxygen"
    );

    chemicalIntermediate("cerium_iv_oxide", 0x62b9d7).components(
        "1x gtceu:cerium",
        "2x gtceu:oxygen"
    );

    chemicalIntermediate("thorium_hydroxide", 0x232323).components(
        "1x gtceu:thorium",
        "4x gtceu:oxygen",
        "4x gtceu:hydrogen"
    );

    event
        .create(new ResourceLocation("nijika:lanthanum_nickel_alloy"))
        .ingot()
        .dust()
        .color(0x53a18f)
        .flags(GTMaterialFlags.GENERATE_FOIL, GTMaterialFlags.DISABLE_DECOMPOSITION)
        .blastTemp(1400)
        .components("1x gtceu:lanthanum", "5x gtceu:nickel");

    // == Magnesium Processing == //
    chemicalIntermediate("magnesium_hydroxide", 0xff12ff).components(
        "1x gtceu:magnesium",
        "2x gtceu:oxygen",
        "2x gtceu:hydrogen"
    );

    event.create(new ResourceLocation("nijika:calcium_silicate"))
        .color(0xafcfaf).dust()
        .components("2x gtceu:calcium", "1x gtceu:silicon", "4x gtceu:oxygen");

    event
        .create(new ResourceLocation("nijika:az_91"))
        .ingot()
        .dust()
        .blastTemp(3100)
        .flags(
            GTMaterialFlags.GENERATE_GEAR,
            GTMaterialFlags.GENERATE_FOIL,
            GTMaterialFlags.GENERATE_PLATE,
            GTMaterialFlags.GENERATE_ROTOR,
            GTMaterialFlags.GENERATE_FRAME
        )
        .color(0x1278ee);
};
