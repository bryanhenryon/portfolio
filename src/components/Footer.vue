<template>
  <footer>
    &copy; {{ getCopyright }} Bryan Henryon &mdash;
    <a
      href="https://www.bryanhenryon.fr"
      target="_blank"
      rel="noopener"
    >www.bryan.henryon.fr</a>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getCopyright"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

footer {
  text-align: center;
  font-family: $secondaryFont;
  padding: 25px 5px;
}

@media (min-width: 1024px) {
  footer {
    margin-top: 50px;
  }
}
</style>