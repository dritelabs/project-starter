// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@vueuse/nuxt"],
  // colorMode: {
  //   preference: "light", // default theme
  //   dataValue: "light", // activate data-theme in <html> tag
  //   classSuffix: "",
  // },
  build: {
    transpile: [
      "@fortawesome/vue-fontawesome",
      "@fortawesome/fontawesome-svg-core",
    ],
  },
  typescript: {
    shim: false,
  },
});
