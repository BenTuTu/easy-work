import { resolve } from "path";
// import vue from "@vitejs/plugin-vue";
console.log(resolve(__dirname, 'src/renderer/components'));

export default {
  base: "./",
  publicDir: "renderPublic",
  // plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'main': resolve(__dirname, 'src/main'),
      'renderer': resolve(__dirname, 'src/renderer'),
      'components': resolve(__dirname, 'src/renderer/components')
    }
  },
  build: {
    assetsDir: "./",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        // vue: resolve(__dirname, "template/index.html"),
      },
      output: {
        format: "cjs",
        manualChunks: {
          react: ["react"],
          "react-dom": ["react-dom"],
          "react-route-dom": ["react-router-dom"],
        },
      },
    },
    outDir: "buildRender",
  },
};
