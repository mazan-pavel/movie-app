<template>
  <div class="movie-item mb-3">
    <div class="movie-item-poster" :style="posterBg"></div>
    <div class="movie-items-wrap">
      <div class="move-item-info">
        <h3 class="movie-title">{{ movie.Title }}</h3>
        <span class="movie-year">{{ movie.Year }}</span>
      </div>
      <div class="movie-item-controls row no-gutters">
        <div class="col pr-2">
          <BButton
            size="md"
            style="width: 100%"
            block
            variant="outline-light"
            @click="emitInfoEvent"
            >Info</BButton
          >
        </div>
        <div class="col pl-2">
          <BButton
            size="md"
            style="width: 100%"
            block
            variant="outline-light"
            @click="emitRemoveEvent"
            >Remove</BButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoveItem",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitRemoveEvent() {
      this.$emit("removeItem", {
        id: this.movie.imdbID,
        title: this.movie.Title,
      });
    },
    emitInfoEvent() {
      this.$emit('showInfoModal',this.movie.imdbID)
    },
  },
  computed: {
    posterBg() {
      return {
        "background-image": `url(${this.movie.Poster})`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.movie-item {
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease;
  height: 400px;
}
.movie-item:hover {
  box-shadow: 0px 5px 30px rgba($color: #000000, $alpha: 0.7);
  transform: scale(1.02);
}
.movie-item-poster {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
}
.movie-items-wrap {
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  justify-content: space-between;
  height: 100%;
  opacity: 0;
  transition: all 0.2s ease;
}

.movie-item:hover .movie-items-wrap {
  opacity: 1;
  background-color: rgba($color: #000000, $alpha: 0.7);
}
.movie-title {
  font-size: 20px;
  color: #fff;
}
.movie-year {
  font-size: 14px;
  color: #fff;
}
</style>
