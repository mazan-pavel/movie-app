<template>
  <div></div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "notification-component",
  computed: { ...mapGetters(["messagePool"]) },
  watch: {
    messagePool: "showNotifications",
  },
  methods: {
    showNotifications({ variant, msg, title }) {
      this.$bvToast.toast(msg, {
        title,
        variant,
        solid: true,
      });
    },
  },
};
</script>
