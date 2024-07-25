module.exports = {
    env: {
        browser: true,
        es2021: true,
        amd: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:import/recommended"
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],

    ignorePatterns: ["/*", "!/src"],

    parserOptions: {
        ecmaVersion: 7,
        sourceType: "module",
        ecmaFeatures: {
            impliedStrict: true,
        },
    },

    plugins: ["jsdoc", "import"],

    rules: {
        "jsdoc/no-undefined-types": 2,
        "no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
            },
        ],
    },

    globals: {
        ServerEvents: "readonly",
        GTCEuStartupEvents: "readonly",
        Java: "readonly",
        Ingredient: "readonly",
        Item: "readonly",
        Fluid: "readonly",
        GTMaterialIconSet: "readonly",
        GTElements: "readonly",
        GTMaterialFlags: "readonly",
        ItemEvents: "readonly",
        FluidAmounts: "readonly",
        StartupEvents: "readonly",
        GTMaterials: "readonly",
        GTValues: "readonly",
        PropertyKey: "readonly",
        GTRegistries: "readonly",
        Platform: "readonly",
        FactoryBlockPattern: "readonly",
        Predicates: "readonly",
        RotationState: "readonly",
        GTBlocks: "readonly",
        GTItems: "readonly",
        GuiTextures: "readonly",
        GTRecipeModifiers: "readonly",
        OverclockingLogic: "readonly",
        PartAbility: "readonly",
        FillDirection: "readonly",
        GTSoundEntries: "readonly",
        ResourceLocation: "readonly",
        GTFluidBuilder: "readonly",
        GTFluidAttributes: "readonly",
        GTCEuServerEvents: "readonly",
        GTLayerPattern: "readonly",
        Component: "readonly",
        GTRecipeTypes: "readonly",
        ChemicalHelper: "readonly",
        TagPrefix: "readonly",
        Internal: "readonly",
        com: "readonly",
        Registry: "readonly",
        WorldgenEvents: "readonly",
        GTWorldGenLayers: "readonly",
        GTOres: "readonly",
        ToolProperty: "readonly",
        GTToolType: "readonly",
        Utils: "readonly",
    },
};
