import typescript from "rollup-plugin-typescript2";
import cleaner from "rollup-plugin-cleaner";
import pkg from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    cleaner({
      targets: ["./dist/"],
    }),
    typescript({
      check: false,
      objectHashIgnoreUnknownHack: true,
      tsconfigOverride: {
        exclude: ["**/*.stories.tsx"],
      },
    }),
  ],
  external: ["react", "react-dom"],
};
