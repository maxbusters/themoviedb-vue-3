<template>
  <div class="movies d-flex justify-content-center bg-dark">
    <b-container>
      <b-row class="main__title"
        ><h2 class="text-light">{{ title }}</h2></b-row
      >
      <movies-list @update-view="updateView"></movies-list>
    </b-container>
  </div>
</template>

<script>
import MoviesList from "@/components/movie/MoviesList.vue";

export default {
  components: {
    MoviesList,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateView(page) {
      this.$store.dispatch(this.$props.method, page);
    },
  },
};
</script>

<style></style>
