import { nijikaId } from "../../shared/utils";
import { createAcidicIntermediate, createDustIntermediate } from "../../shared/materials/helpers";
import { addIntegrationMaterials } from "./integrations";
import { addChromiumMaterials } from "../../shared/chemicals/metallurgy/chromium";
import { addGalliumArsenicMaterials } from "../../shared/chemicals/metallurgy/gallum_arsenic";
import { addAluminiumMaterials } from "../../shared/chemicals/metallurgy/aluminium";
import { addTantalumMaterials } from "../../shared/chemicals/metallurgy/tantalum";
import { addManganeseMaterials } from "../../shared/chemicals/metallurgy/manganese";
import { addVanadiumMaterials } from "../../shared/chemicals/metallurgy/vanadium";
import { addRareEarthMaterials } from "../../shared/chemicals/rare_earths";
import { addMagnesiumMaterials } from "../../shared/chemicals/metallurgy/magnesium";
import { addMolybdenumMaterials } from "../../shared/chemicals/metallurgy/molybdenum";
import { addGoldMaterials } from "../../shared/chemicals/metallurgy/gold";
import { addCyanideMaterials } from "../../shared/chemicals/metallurgy/cyanide";
import { addBrineMaterials } from "../../shared/chemicals/brine";
import { addTitaniumMaterials } from "../../shared/chemicals/metallurgy/titanium";
import { addCopperMaterials } from "../../shared/chemicals/metallurgy/copper";
import { addBaseOreMaterials } from "../../shared/base_ores";
import { addPolystyreneMaterials } from "../../shared/chemicals/organic/polystyrene";
import { addTungstenMaterials } from "../../shared/chemicals/metallurgy/tungsten";
import { addPhosphorusMaterials } from "../../shared/chemicals/phosphorus";

/**
 * Adds new custom materials.
 */
export const addCustomMaterials = (event) => {
    addIntegrationMaterials(event);
    addBaseOreMaterials(event);

    addAluminiumMaterials(event);
    addChromiumMaterials(event);
    addCopperMaterials(event);
    addCyanideMaterials(event);
    addGalliumArsenicMaterials(event);
    addGoldMaterials(event);

    addMagnesiumMaterials(event);
    addManganeseMaterials(event);
    addMolybdenumMaterials(event);
    addRareEarthMaterials(event);
    addTantalumMaterials(event);
    addTitaniumMaterials(event);
    addTungstenMaterials(event);
    addVanadiumMaterials(event);

    addPolystyreneMaterials(event);

    addBrineMaterials(event);

    addPhosphorusMaterials(event);

    // misc stuff.
    event.create(nijikaId("blood")).liquid().color(0xff0000);
    createAcidicIntermediate(event, "ammonium_hydroxide", 0xcdd6f7).components(
        "1x gtceu:ammonia",
        "1x gtceu:oxygen",
        "1x gtceu:hydrogen"
    );

    event
        .create(nijikaId("fluorite"))
        .gem()
        .ore()
        .color(0x0c9949)
        .iconSet(GTMaterialIconSet.DIAMOND)
        .components("1x gtceu:calcium", "2x gtceu:fluorine");

    createDustIntermediate(event, "iron_oxide", 0x5f412f).components(
        "2x gtceu:iron",
        "3x gtceu:oxygen"
    );

    createDustIntermediate(event, "slag", 0x474236).iconSet(GTMaterialIconSet.FLINT);
    createAcidicIntermediate(event, "slag_slurry", 0x373226);

    event
        .create(nijikaId("corinthian_bronze"))
        .color(0xa99023)
        .ingot()
        .dust()
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD)
        .iconSet(GTMaterialIconSet.SHINY)
        .rotorStats(13.0, 2.0, 196)
        .components("4x gtceu:copper", "1x gtceu:silver");

    // fine to create decompositions for this, actually.
    event
        .create(nijikaId("sodium_fluoride"))
        .dust()
        .color(0xfffdd6)
        .components("1x gtceu:sodium", "1x gtceu:fluorine");

    // == Niobium == //
    createDustIntermediate(event, "niobium_pentoxide", 0x260a0c).components(
        "2x gtceu:niobium",
        "5x gtceu:oxygen"
    );

    // == Tier Materials == //
    event
        .create(nijikaId("nitinol"))
        .color(0xa874e8)
        .ingot()
        .dust()
        .iconSet(GTMaterialIconSet.SHINY)
        .components("1x gtceu:titanium", "1x gtceu:nickel")
        .flags(
            GTMaterialFlags.GENERATE_FRAME,
            GTMaterialFlags.GENERATE_FOIL,
            GTMaterialFlags.GENERATE_PLATE,
            GTMaterialFlags.DISABLE_DECOMPOSITION,
            GTMaterialFlags.DISABLE_ALLOY_BLAST
        );
};
