import Vue from "vue";
import VueRouter from "vue-router";
import Page from "@/views/PageView.vue";
import Movie from "@/views/MovieView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/popular",
    name: "Popular",
    alias: "/",
    component: Page,
    props: { title: "Popular movies", method: "GET_POPULAR_BY_PAGE" },
  },
  {
    path: "/toprated",
    name: "TopRated",
    component: Page,
    props: { title: "Top Rated movies", method: "GET_TOP_RATED_BY_PAGE" },
  },
  {
    path: "/upcoming",
    name: "Upcoming",
    component: Page,
    props: { title: "Upcoming movies", method: "GET_UPCOMING_BY_PAGE" },
  },
  {
    path: "/movies/:id",
    name: "Movie",
    component: Movie,
  },
  {
    path: "/filter",
    name: "FilterResult",
    component: Page,
    props: { title: "Filter result", method: "GET_FILTERED_MOVIES_BY_PAGE" },
  },
  {
    path: "/search",
    name: "SearchResult",
    component: Page,
    props: { title: "Search result", method: "GET_SEARCH_RESULTS_BY_PAGE" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "--active",
});

export default router;
