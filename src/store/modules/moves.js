import axios from '../../plugins/axios'
import IDs from '@/store/mock/imdb_top250'
import mutations from '../mutations';

const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE, TOGGLE_SEARCH } = mutations;

function serializeResponse(movies) {
    return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc}, {});
}

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
    isSearch: false,
  },
  getters: {
    slicedIDs:
      ({ top250IDs }) =>
      (from, to) =>
        top250IDs.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    moviesList: ({ movies }) => movies,
    moviesLength: ({ top250IDs }) => top250IDs.length,
    isSearch: ({ isSearch }) => isSearch,
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [REMOVE_MOVIE](state, index) {
      state.top250IDs.splice(index, 1);
    },
    [TOGGLE_SEARCH](state, bool) {
      state.isSearch = bool;
    }
  },
  actions: {
    async fetchMovies({ getters, commit, dispatch }) {
      try {
        dispatch("toggleLoader", true, { root: true });
        const { currentPage, moviesPerPage, slicedIDs } = getters;
        const from = currentPage * moviesPerPage - moviesPerPage;
        const to = currentPage * moviesPerPage;
        const moviesToFeatch = slicedIDs(from, to);
        const request = moviesToFeatch.map((id) => axios.get(`/?i=${id}`));
        const response = await Promise.all(request);
        const movies = serializeResponse(response);
        commit(MOVIES, movies);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    removeMovie({ commit, dispatch, state }, id) {
      const index = state.top250IDs.findIndex((el) => el === id);
      if (index !== -1) {
        commit(REMOVE_MOVIE, index);
        dispatch("fetchMovies");
      }
    },
    changeCurrentPage({ commit, dispatch }, page) {
      commit(CURRENT_PAGE, page);
      dispatch("fetchMovies");
    },
    async searchMovie({ commit, dispatch }, query) {
      try {
        dispatch("toggleLoader", true, { root: true });
        const response = await axios.get(`/?s=${query}`);
        if (response.Error) {
          throw Error(response.Error);
        }
        const movies = serializeResponse(response.Search);
        commit(MOVIES, movies);
      } catch (error) {
        dispatch("showNotify", { msg: error.message, title: 'Error', variant:'danger'},{root:true});
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    toggleSearchState({commit}, bool) {
      commit("TOGGLE_SEARCH", bool);
    }
  },
};

export default moviesStore;