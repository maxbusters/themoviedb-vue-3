<template>
  <div class="movies-list">
    <div v-if="this.count > 0">
      <b-row class="d-flex flex-wrap justify-content-center">
        <movie-card
          class="m-3"
          style="width: 250px"
          v-for="(movie, inx) in movies"
          :key="inx"
          :movie="movie"
        ></movie-card>
      </b-row>
      <b-row align-h="center" v-show="this.count >= 20">
        <b-pagination
          v-model="currentPage"
          :total-rows="count"
          :per-page="20"
          :limit="10"
        ></b-pagination>
      </b-row>
    </div>
    <div v-else>
      <b-container>
        <h2 class="main__not-found">There are not results</h2>
      </b-container>
    </div>
  </div>
</template>

<script>
import MovieCard from "@/components/movie/MovieCard.vue";
export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  mounted() {
    this.currentPage = 1;
    this.updateView(this.currentPage);
  },
  watch: {
    currentPage(next) {
      this.updateView(next);
      window.scrollTo(0, 0);
    },
    $route() {
      this.currentPage = 1;
      this.updateView(this.currentPage);
    },
  },
  methods: {
    updateView(page) {
      this.$emit("update-view", page);
    },
  },
  computed: {
    movies() {
      return this.$store.getters.MOVIES;
    },
    count() {
      if (this.$store.getters.COUNT > 4000) {
        return 4000;
      } else {
        return this.$store.getters.COUNT;
      }
    },
  },
};
</script>

<style lang="scss">
.main__not-found {
  color: white;
}
.movies {
  min-height: 875px;
}
.pagination {
  .page-link {
    color: var(--green);
    background-color: #343a40;
    border: none;
    border-top: 1px solid var(--green);
    border-bottom: 1px solid var(--green);
  }

  .disabled {
    .page-link {
      color: white !important;
      background-color: #343a40 !important;
      border: none;
      border-top: 1px solid var(--green);
      border-bottom: 1px solid var(--green);
    }
  }

  .page-item.active {
    .page-link {
      background-color: var(--green);
      border-color: var(--green);
    }
  }
}
</style>
