<template>
  <header class="header">
    <b-navbar type="dark" class="navbar" variant="dark">
      <b-container>
        <BNavbarBrand href="#">MovieDB</BNavbarBrand>
        <b-nav-form>
          <b-form-input
            class="mr-sm-2 search-input"
            placeholder="Search"
            v-model="searchValue"
            debounce="500"
          ></b-form-input>
        </b-nav-form>
      </b-container>
    </b-navbar>
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "navbar-header",
  data: () => ({
    searchValue: "",
    searchValueChange(value) {
      if (value) {
        this.searchMovie(value);
        this.toggleSearchState(true);
      } else {
        this.fetchMovies();
        this.toggleSearchState(false);
      }
    },
  }),
  watch: {
    searchValue: "searchValueChange",
  },
  methods: {
    ...mapActions("movies", [
      "searchMovie",
      "fetchMovies",
      "toggleSearchState",
    ]),
  },
};
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 30px;
}
.navbar {
  background-color: rgba(0, 0, 0, 0.7) !important;
}
.search-input {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.6);
  &:focus {
    box-shadow: none;
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
