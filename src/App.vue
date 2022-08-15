import { query } from "express";
<template>
  <div id="app">
    <loader />
    <notification />
    <PosterBg :poster="poster" />
    <Header />
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
    <moviePagination
      :current-page="currentPage"
      :total="moviesLength"
      :per-page="moviesPerPage"
      @onChangePage="onChangePage"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "./components/Header.vue";
import MoviesList from "./components/MoviesList.vue";
import PosterBg from "./components/PosterBg.vue";
import loader from "./components/Loader.vue";
import moviePagination from "./components/moviePagination.vue";
import notification from "./components/Notification.vue";
export default {
  name: "App",
  computed: {
    ...mapGetters("movies", [
      "moviesList",
      "currentPage",
      "moviesPerPage",
      "moviesLength",
    ]),
  },
  data: () => ({
    poster: "",
  }),
  watch: {
    "$route.query": {
      handler: "onChangeQuery",
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions("movies", ["changeCurrentPage"]),
    onChangePoster(poster) {
      this.poster = poster;
    },
    onChangeQuery({ page = 1 } = {}) {
      this.changeCurrentPage(Number(page));
    },
    onChangePage(page) {
      this.$router.push({ query: { page } });
    },
  },
  components: {
    MoviesList,
    PosterBg,
    moviePagination,
    loader,
    Header,
    notification,
  },
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
