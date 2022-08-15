<template>
  <div class="loader-wrap" v-if="isShowLoader">
    <b-spinner variant="light" label="Loading..."></b-spinner>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "loader-vue",
  computed: {
    ...mapGetters(["isShowLoader"]),
  },
};
</script>

<style lang="scss" scoped>
.loader-wrap {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
</style>
