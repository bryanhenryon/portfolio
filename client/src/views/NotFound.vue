<template>
  <div id="not-found">
    <div>
      <h1>Erreur 404</h1>
      <p>Cette page n'existe pas 😥</p>
      <div id="return">
        <router-link to="/">Revenir au site</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#not-found {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 3em;
    text-align: center;
  }

  p {
    font-size: 1.3em;
    text-align: center;
  }

  #return {
    margin-top: 50px;
    text-align: center;

    a {
      font-size: 1.3em;
      border-bottom: 2px solid black;
    }

    a:hover {
      border-bottom: 2px solid #79ad80;
    }
  }
}
</style>
