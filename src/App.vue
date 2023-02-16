<template>
  <div id="app" class="position-relative">
    <header class="header">
      <main-nav />
    </header>
    <loading
      :active="loading"
      :can-cancel="false"
      :is-full-page="true"
      :loader="'dots'"
      :opacity="1"
      :lock-scroll="true"
      :color="'#1bff4f'"
      :height="200"
      :width="200"
      :background-color="'gray'"
    />
    <main>
      <h1 v-if="isMain" class="main-title">THE MOVIE DATA BASE</h1>
      <router-view v-show="!loading" />
    </main>
    <footer class="footer">
      <main-footer></main-footer>
    </footer>
  </div>
</template>

<script>
import MainNav from "./components/general/MainNav.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import MainFooter from "./components/general/MainFooter.vue";

export default {
  name: "App",
  components: {
    Loading,
    MainNav,
    MainFooter,
  },
  computed: {
    loading() {
      return this.$store.getters.LOADING;
    },
    isMain() {
      if (this.$route.path === "/") {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    $route() {
      window.scrollTo(0, 0);
    },
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,100&display=swap");
.main-title {
  text-align: center;
}

.main {
  &__title {
    font-family: "Roboto", sans-serif;
    text-align: left;
    margin: 30px 50px;
    padding-left: 20px;

    h2 {
      font-weight: 300;
      font-size: 35px;
      text-transform: uppercase;
    }

    @media screen and (max-width: 1200px) {
      padding-left: 70px;
    }

    @media screen and (max-width: 990px) {
      padding-left: 90px;
    }

    @media screen and (max-width: 780px) {
      padding: 0;
      justify-content: center;
    }
  }
}
</style>
