import type { Config } from "prettier";

export default {
    printWidth: 100,
    tabWidth: 4,
    singleQuote: true,
    arrowParens: "avoid",

    // MARK: Defaults
    // useTabs: false,
    // semi: true,
    // singleQuote: false,
    // trailingComma: "all",
    // proseWrap: "preserve",

    plugins: [
        "@prettier/plugin-oxc",
        "prettier-plugin-pkg",
        "prettier-plugin-sh",
        "prettier-plugin-tailwindcss",
        "prettier-plugin-toml",
    ],

    attributeSort: "ASC",
    attributeGroups: [
        "$ANGULAR_STRUCTURAL_DIRECTIVE",
        "$ANGULAR_ELEMENT_REF",
        "$CODE_GUIDE",
        "^formControlName$",
        "^icon$",
        "^label$",
        "^placeholder$",
        "^routerLink$",
        "^[a-z]",
        "$ANGULAR",
    ],

    overrides: [
        {
            files: "**/*.jsonc",
            options: {
                trailingComma: "none",
            },
        },
        {
            files: "**/.vscode/*.json",
            options: {
                trailingComma: "all",
            },
        },
    ],
} satisfies Config;
