/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
        trailingComma: "es5",
        tabWidth: 4,
        useTabs: true,
        semi: false,
        singleQuote: true,
        jsxSingleQuote: true,
        printWidth: 200,
      },
    },
  ],
};
