import axios from "axios";
import config from "./Config";

axios.defaults.baseURL = config.API_URL;

export default {
  getPopularByPage(page = 1) {
    return axios.get(`movie/popular?api_key=${config.API_KEY}&page=${page}`);
  },
  getTopRatedByPage(page = 1) {
    return axios.get(`movie/top_rated?api_key=${config.API_KEY}&page=${page}`);
  },
  getUpcomingByPage(page = 1) {
    return axios.get(`movie/upcoming?api_key=${config.API_KEY}&page=${page}`);
  },
  getAllGenres() {
    return axios.get(`genre/movie/list?api_key=${config.API_KEY}`);
  },
  getMovieById(id) {
    return axios.get(`/movie/${id}?api_key=${config.API_KEY}`);
  },
  getRecommendationsById(id) {
    return axios.get(`/movie/${id}/recommendations?api_key=${config.API_KEY}`);
  },
  getSearchResultsByPage(page = 1, query) {
    return axios.get(
      `/search/movie?api_key=${config.API_KEY}&page=${page}&query=${query}`
    );
  },
  getFilteredMoviesByPage(page = 1, filter) {
    let query = `/discover/movie?api_key=${config.API_KEY}&page=${page}`;
    let year = parseInt(filter.year.getFullYear());

    if (!isNaN(year)) {
      query += `&year=${year}&release_date.gte=${year}-01-01`;
      if (!filter.sortBy) {
        query += `&sort_by=popularity.desc`;
      }
    }

    if (!isNaN(filter.rating)) {
      query += `&vote_average.lte=${filter.rating}`;
    }

    if (filter.genres.length) {
      query += `&with_genres=`;
      filter.genres.forEach((genre, inx) => {
        console.log("genre", genre, "index", inx);
        query += genre.id;
        if (inx !== filter.genres.length - 1) {
          query += `,`;
        }
      });
    }

    if (filter.sortBy) {
      query += `&sort_by=${filter.sortBy}`;
    }

    return axios.get(query);
  },
};
