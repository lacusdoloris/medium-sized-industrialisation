require("./_sailor_warning");

export const MODPACK_SETTINGS = {
    /**
     * If True, then most tier-related GT recipes will be removed and replaced with our own.
     * 
     * Breaks the entire pack when set to false. This is entirely for seeing the original recipes
     * in game!
     */
    applyTierAdjustments: true,

    /**
     * If True, then hand-tool recipes will be removed.
     * 
     * Disable to enable the "back path".
     */
    deleteToolRecipes: true,
}
