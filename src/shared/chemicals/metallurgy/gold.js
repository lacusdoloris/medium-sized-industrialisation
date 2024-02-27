import { createAqueousIntermediate, createChemicalIntermediate } from "../../materials/helpers";

export const addGoldMaterials = (event) => {
    createChemicalIntermediate(event, "sodium_dicyanoaurate", 0xf0f6f1);
};
