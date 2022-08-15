<template>
  <div class="movie-pagination d-flex justify-content-center">
    <b-pagination
      v-model="currentPageModel"
      :total-rows="total"
      :per-page="perPage"
      aria-controls="my-table"
      prev-text="prev"
      next-text="next"
    ></b-pagination>
  </div>
</template>
<script>
export default {
  name: "moviePagination",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    currentPageModel: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.$emit("onChangePage", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.movie-pagination {
  margin-top: 30px;
  margin-top: auto;
}

// >>> - css доступ к scoped стилям компоненты
// /deep/ - css доступ к scoped стилям компоненты
.movie-pagination :deep(.pagination .page-item .page-link) {
  background-color: transparent;
  font-size: 12px;
  color: #fff;
  box-shadow: none;
}

.movie-pagination :deep(.pagination .page-item.active .page-link) {
  border-color: #fff;
  background-color: #fff;
  color: #000;
}

.movie-pagination :deep(.pagination .page-item.disabled .page-link) {
  color: gray;
}
</style>
