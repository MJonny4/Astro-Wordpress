// .prettierrc.mjs
/** @type {import('prettier').Config} */

export default {
    plugins: ["prettier-plugin-astro"],
    overrides: [
        {
            files: ["*.astro", "*.mjs", "*.js"],
            options: {
                parser: "astro",
            },
        },
    ],
    semi: false,
    trailingComma: "es5",
    singleQuote: true,
    tabWidth: 4,
    useTabs: false,
    printWidth: 80,
    endOfLine: "lf",
};
