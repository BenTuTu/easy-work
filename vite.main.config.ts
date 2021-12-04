import path from "path";

export default {
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "src/main.ts"),
      external: [/node_modules/, "path", "electron", "fs"],
      output: {
        entryFileNames: "main.js",
        format: "cjs",
      },
    },
    outDir: "buildMain",
  },
};
