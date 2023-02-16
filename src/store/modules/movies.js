import api from "../../api";

const state = {
  filter: {
    year: new Date(), //year
    genres: [], //with_genres
    rating: 10, //vote_averange.lte
  },
  query: "",
  movies: [],
  popular: [],
  topRated: [],
  movie: {},
  genres: [],
  recommendation: [],
  pages: 0,
  count: 0,
  load: true,
};

const getters = {
  MOVIES: (state) => {
    return state.movies;
  },
  MOVIE: (state) => {
    return state.movie;
  },
  PAGES: (state) => {
    return state.pages;
  },
  COUNT: (state) => {
    return state.count;
  },
  LOADING: (state) => {
    return state.load;
  },
  GENRES: (state) => {
    return state.genres;
  },
  RECOMMENDATIONS: (state) => {
    return state.recommendation;
  },
  FILTER: (state) => {
    return state.filter;
  },
};

const mutations = {
  SET_MOVIES(state, payload) {
    state.movies = payload;
  },
  SET_RECOMMENDATIONS(state, payload) {
    state.recommendation = payload;
  },
  SET_DATA(state, payload) {
    state[payload.name] = payload.value;
  },
};

const actions = {
  GET_POPULAR_BY_PAGE({ commit }, page) {
    commit("SET_DATA", { name: "load", value: true });
    api.getPopularByPage(page).then((resp) => {
      commit("SET_MOVIES", resp.data.results);
      commit("SET_DATA", { name: "count", value: resp.data.total_results });
    });
    window.setTimeout(() => {
      commit("SET_DATA", { name: "load", value: false });
    }, 1000);
  },
  GET_TOP_RATED_BY_PAGE({ commit }, page) {
    commit("SET_DATA", { name: "load", value: true });
    api.getTopRatedByPage(page).then((resp) => {
      commit("SET_MOVIES", resp.data.results);
      commit("SET_DATA", { name: "count", value: resp.data.total_results });
    });
    window.setTimeout(() => {
      commit("SET_DATA", { name: "load", value: false });
    }, 1000);
  },
  GET_UPCOMING_BY_PAGE({ commit }, page) {
    commit("SET_DATA", { name: "load", value: true });
    api.getUpcomingByPage(page).then((resp) => {
      commit("SET_MOVIES", resp.data.results);
      commit("SET_DATA", { name: "count", value: resp.data.total_results });
    });
    window.setTimeout(() => {
      commit("SET_DATA", { name: "load", value: false });
    }, 1000);
  },
  GET_ALL_GENRES({ commit }) {
    api.getAllGenres().then((resp) => {
      commit("SET_DATA", { name: "genres", value: resp.data.genres });
    });
  },
  GET_MOVIE_BY_ID({ commit }, id) {
    commit("SET_DATA", { name: "load", value: true });
    api.getMovieById(id).then((resp) => {
      commit("SET_DATA", { name: "movie", value: resp.data });
    });
    window.setTimeout(() => {
      commit("SET_DATA", { name: "load", value: false });
    }, 1000);
  },
  GET_RECOMMENDATIONS_BY_ID({ commit }, id) {
    api.getRecommendationsById(id).then((resp) => {
      commit("SET_RECOMMENDATIONS", resp.data.results);
    });
  },
  GET_FILTERED_MOVIES_BY_PAGE({ commit }, page) {
    commit("SET_DATA", { name: "load", value: true });
    api.getFilteredMoviesByPage(page, state.filter).then((resp) => {
      commit("SET_MOVIES", resp.data.results);
      commit("SET_DATA", { name: "count", value: resp.data.total_results });
    });
    window.setTimeout(() => {
      commit("SET_DATA", { name: "load", value: false });
    }, 1000);
  },
  GET_SEARCH_RESULTS_BY_PAGE({ commit }, page) {
    commit("SET_DATA", { name: "load", value: true });
    if (state.query) {
      api.getSearchResultsByPage(page, state.query).then((resp) => {
        console.log(resp);
        commit("SET_MOVIES", resp.data.results);
        commit("SET_DATA", { name: "count", value: resp.data.total_results });
      });
    } else {
      api.getPopularByPage(page).then((resp) => {
        commit("SET_MOVIES", resp.data.results);
        commit("SET_DATA", { name: "count", value: resp.data.total_results });
      });
    }

    window.setTimeout(() => {
      commit("SET_DATA", { name: "load", value: false });
    }, 1000);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
