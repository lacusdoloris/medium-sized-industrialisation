
// HV!

/** @param {Internal.RecipesEventJS} event */
export const doTier03Content = (event) => {
    // for whattever reason, CEu has this at EV.
    // so let's move it down to HV.
    event.remove({id: "gtceu:shaped/distillation_tower"});

    event.shaped(
        "gtceu:distillation_tower",
        ["CFC", "PHP", "CFC"],
        {
            C: "#gtceu:circuits/hv", 
            F: "gtceu:vanadium_steel_large_fluid_pipe",
            P: "gtceu:hv_electric_pump",
            H: "gtceu:hv_machine_hull"
        }
    ).id("nijika:tier03/distillation_tower_fixed");
}
