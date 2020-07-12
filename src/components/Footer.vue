<template>
  <footer>
    &copy; {{ copyright }} Bryan Henryon &mdash;
    <a
      href="https://www.bryanhenryon.fr"
      target="_blank"
      rel="noopener"
    >www.bryan.henryon.fr</a>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      copyright: new Date().getFullYear()
    };
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