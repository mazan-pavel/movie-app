<template>
  <BContainer>
    <h3 class="list-title">{{ listTitle }}</h3>
    <BRow>
      <template v-if="isHaveList">
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MoveItem
            :movie="movie"
            @showInfoModal="onShowMovieInfo"
            @mouseover.native="onHoverMovie(movie.Poster)"
            @removeItem="onRemoveItem"
          />
        </BCol>
      </template>
      <template v-else>
        <div>Empty list</div>
      </template>
    </BRow>
    <BModal
      id="movie-info"
      body-class="movie-info-body"
      size="xl"
      hide-footer
      hide-header
    >
      <MovieInfoModalContent
        :movie="selectedMovie"
        @closeModal="onCloseModal"
      />
    </BModal>
  </BContainer>
</template>

<script>
import MoveItem from "../components/MovieItem.vue";
import MovieInfoModalContent from "./MovieInfoModalContent.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MoviesList",
  props: {
    list: {
      type: Object,
      dafault: () => {},
    },
  },
  data: () => ({
    selectedMovieId: "",
  }),
  components: {
    MoveItem,
    MovieInfoModalContent,
  },
  computed: {
    ...mapGetters("movies", ["isSearch"]),
    listTitle() {
      return this.isSearch ? `Search movies` : "MovieDB";
    },
    isHaveList() {
      return Boolean(Object.entries(this.list).length);
    },
    selectedMovie() {
      return this.selectedMovieId ? this.list[this.selectedMovieId] : null;
    },
  },
  methods: {
    ...mapActions("movies", ["removeMovie"]),
    ...mapActions(["showNotify"]),
    onShowMovieInfo(id) {
      this.selectedMovieId = id;
      this.$bvModal.show("movie-info");
    },
    onHoverMovie(poster) {
      this.$emit("changePoster", poster);
    },
    onCloseModal() {
      this.selectedMovieId = null;
      this.$bvModal.hide("movie-info");
    },
    async onRemoveItem({ id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        `Are you sure delete ${title}?`
      );
      if (isConfirmed) {
        this.removeMovie(id);
        this.showNotify({
          variant: "success",
          msg: "Movie deleted succsess",
          title: "Succsess",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}
</style>

<style>
.movie-info-body {
  padding: 0 !important;
}
</style>
