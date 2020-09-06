<template>
  <div id="header">
    <h1>Bryan Henryon</h1>
    <h2>Développeur fullstack JavaScript</h2>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

#header {
  text-align: center;
  line-height: 1.5;

  h1 {
    color: #3c3562;
    letter-spacing: 0.15rem;
  }

  h2 {
    font-weight: normal;
    font-family: $secondaryFont;
    font-size: 1.17em;
  }
}

@media (min-width: 800px) {
  #header {
    h1 {
      font-size: 4em;
    }

    h2 {
      font-size: 2em;
    }
  }
}
</style>
