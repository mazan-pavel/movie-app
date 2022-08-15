<template>
  <div class="poster-page-bg" :style="styleBgImage"></div>
</template>
<script>
export default {
  name: "PosterBg",
  computed: {
    posterBg() {
      return this.poster
        ? `url(${this.poster})`
        : `linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100% )`;
    },
    styleBgImage() {
      return { "background-image": `${this.posterBg}` };
    },
  },
  props: {
    poster: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.poster-page-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  background-size: cover;
  background-position: center;
  transition: all 0.2s ease;
}
.poster-page-bg::before {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  content: "";
  background-image: linear-gradient(
    45deg,
    rgb(0, 3, 38) 0%,
    rgb(82, 15, 117) 100%
  );
  opacity: 0.7;
}
</style>
