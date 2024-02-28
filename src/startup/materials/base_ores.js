import { nijikaId } from "../../shared/utils";

/**
 * Adds the six "base ores".
 */
export const addBaseOreMaterials = (event) => {
    event
        .create(nijikaId("bocchinium"))
        .color(0xf7a0b5)
        .ore()
        .dust()
        .iconSet(GTMaterialIconSet.BRIGHT);

    event
        .create(nijikaId("nijikaite"))
        .color(0xf3e5a1)
        .ore()
        .dust()
        .iconSet(GTMaterialIconSet.BRIGHT);

    event.create(nijikaId("ryoite")).color(0x49679f).ore().dust().iconSet(GTMaterialIconSet.BRIGHT);

    event
        .create(nijikaId("kitakitaite"))
        .color(0xd2625a)
        .ore()
        .dust()
        .iconSet(GTMaterialIconSet.BRIGHT);

    event.create(nijikaId("kikurite")).color(0x995678).ore().dust().iconSet(GTMaterialIconSet.DULL);
};
