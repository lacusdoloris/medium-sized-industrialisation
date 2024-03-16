import { nijikaId } from "../shared/utils";

/**
 * Adds the catalyst items to the game.
 *
 * @param {Registry.Item} event
 */
export const addCatalystItems = (event) => {
    event.create(nijikaId("empty_catalyst"));
    event.create(nijikaId("nickel_catalyst"));
    event.create(nijikaId("iodine_catalyst"));
};
