<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Copse&family=Montserrat&display=swap");
@import "@/assets/_reset.scss";
@import "@/assets/_variables.scss";

body {
  background-color: $backgroundColor;
  font-size: 0.9em;
  font-family: $primaryFont;
}

::-moz-selection {
  background: #79ad8067;
}
::selection {
  background: #79ad8067;
}

.container {
  max-width: 1400px;
  width: 100%;
  padding: 30px 10px 30px 10px;
  margin: auto;
}

.white-bg {
  background: #fff;
}

@media (min-width: 560px) {
  .container {
    width: 90%;
  }
}
</style>