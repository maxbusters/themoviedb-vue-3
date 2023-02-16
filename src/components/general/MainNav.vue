<template>
  <b-navbar toggleable="lg" type="dark" variant="success">
    <b-container>
      <b-navbar-brand to="/" class="header__logo">
        <b-img :src="logo"></b-img>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse test"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="header__nav nav">
          <b-nav-item class="nav__el" to="/popular">Popular</b-nav-item>
          <b-nav-item class="nav__el" to="/toprated">Top Rated</b-nav-item>
          <b-nav-item class="nav__el" to="/upcoming">Upcoming</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto header__form form">
          <b-nav-form v-on:keydown.enter.prevent="searchStart">
            <b-form-input
              size="md"
              class="mr-sm-2"
              placeholder="Search"
              v-model="searchQuery"
              id="search-input"
            ></b-form-input>
            <b-button
              size="md"
              class="my-2 my-sm-0"
              :disabled="validate == false"
              @click="searchStart"
              >Search</b-button
            >
          </b-nav-form>
          <filter-sidebar />
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import FilterSidebar from "@/components/general/FilterSidebar.vue";
import config from "@/Config";
export default {
  components: {
    FilterSidebar,
  },

  data() {
    return {
      logo: config.LOGO,
      searchQuery: "",
      validate: false,
    };
  },
  beforeMount() {
    this.resetSearch();
  },
  methods: {
    searchStart() {
      this.$store.commit("SET_DATA", {
        name: "query",
        value: this.searchQuery,
      });
      this.$store.dispatch("GET_SEARCH_RESULTS_BY_PAGE", 1);
      this.$router.push("/search", () => {});
    },
    resetSearch() {
      this.searchQuery = "";
      this.$store.commit("SET_DATA", {
        name: "query",
        value: this.searchQuery,
      });
    },
  },
  watch: {
    searchQuery() {
      let reg = new RegExp("^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$");
      if (this.searchQuery.match(reg) != null) {
        this.validate = true;
      } else {
        this.validate = false;
      }
    },
    $route(to) {
      if (to.path !== "/search") {
        this.resetSearch();
      }
    },
  },
};
</script>

<style lang="scss">
.header {
  &__logo {
    img {
      height: 70px;
    }
  }

  .nav {
    &__el {
      font-family: "Raleway";
      font-weight: 500;
      font-size: 18px;
      letter-spacing: 0.2px;
      text-transform: uppercase;
    }

    &__el + &__el {
      margin-left: 10px;
    }

    &__el > .--active {
      color: white !important;
    }
  }

  .show {
    .form {
      margin: 20px 0px;
    }
    .nav {
      &__el + &__el {
        margin-left: 0;
      }
    }
    .filter-sidebar {
      margin-left: -8px;
      margin-top: 10px;
    }
  }
}
</style>
