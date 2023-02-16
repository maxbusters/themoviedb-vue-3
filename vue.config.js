const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/the_movie_db/" : "/",
});
