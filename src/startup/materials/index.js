import { nijikaId } from "../../shared/utils";
import {
    createAcidicIntermediate,
    createAqueousIntermediate,
    createDustIntermediate,
} from "../../shared/materials/helpers";
import { addIntegrationMaterials } from "./integrations";
import { addChromiumMaterials } from "../../shared/chemicals/chromium";
import { addGalliumArsenicMaterials } from "../../shared/chemicals/gallum_arsenic";
import { addAluminiumMaterials } from "../../shared/chemicals/aluminium";
import { addTantalumMaterials } from "../../shared/chemicals/tantalum";
import { addManganeseMaterials } from "../../shared/chemicals/manganese";
import { addVanadiumMaterials } from "../../shared/chemicals/vanadium";
import { addRareEarthMaterials } from "../../shared/chemicals/rare_earths";
import { addMagnesiumMaterials } from "../../shared/chemicals/magnesium";
import { addMolybdenumMaterials } from "../../shared/chemicals/molybdenum";
import { addGoldMaterials } from "../../shared/chemicals/gold";
import { addCyanideMaterials } from "../../shared/chemicals/cyanide";

/**
 * Adds new custom materials.
 */
export const addCustomMaterials = (event) => {
    addIntegrationMaterials(event);

    addAluminiumMaterials(event);
    addChromiumMaterials(event);
    addCyanideMaterials(event);
    addGalliumArsenicMaterials(event);
    addGoldMaterials(event);

    addMagnesiumMaterials(event);
    addManganeseMaterials(event);
    addMolybdenumMaterials(event);
    addRareEarthMaterials(event);
    addTantalumMaterials(event);
    addVanadiumMaterials(event);

    // misc stuff.
    event.create(nijikaId("blood")).liquid().color(0xff0000);
    createAcidicIntermediate(event, "ammonium_hydroxide", 0xcdd6f7).components(
        "1x gtceu:ammonia",
        "1x gtceu:oxygen",
        "1x gtceu:hydrogen"
    );

    createDustIntermediate(event, "slag", 0x474236).iconSet(GTMaterialIconSet.FLINT);
    createAcidicIntermediate(event, "slag_slurry", 0x373226);

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
};
