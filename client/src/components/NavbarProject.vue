<template>
  <div id="navbar">
    <ul id="navbar-ul">
      <li @click="prev()">
        <h3>
          <router-link :to="`/projet/${getId}`">projet prec.</router-link>
        </h3>
      </li>
      <li>
        <i class="fas fa-plus"></i>
      </li>
      <li @click="backToHomepage()">
        <h3>
          <router-link to="/" @click.native="scrollToTop">accueil</router-link>
        </h3>
      </li>
      <li>
        <i class="fas fa-plus"></i>
      </li>
      <li @click="next()">
        <h3>
          <router-link :to="`/projet/${getId}`">projet suiv.</router-link>
        </h3>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getProjects", "getId", "getCurrentImage"])
  },
  methods: {
    prev() {
      this.$store.dispatch("previousProject");
    },

    next() {
      this.$store.dispatch("nextProject");
    },
    backToHomepage() {
      this.$store.dispatch("backToHomepage");
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  },
  mounted: (window.onscroll = function() {
    let ul = document.getElementById("navbar-ul");
    let sticky = document.getElementById("navbar-ul").offsetTop;

    if (window.pageYOffset >= sticky) {
      ul.classList.add("sticky");
    } else {
      ul.classList.remove("sticky");
    }
  }),

  updated: (window.onscroll = function() {
    let ul = document.getElementById("navbar-ul");

    if (window.pageYOffset >= 128) {
      ul.classList.add("sticky");
    } else {
      ul.classList.remove("sticky");
    }
  })
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

#navbar {
  text-align: center;
  max-width: 700px;
  margin: 30px auto;
}

.sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: $backgroundColor;
  opacity: 0.9;
  padding: 10px;
  width: 100%;
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;

  li {
    padding: 10px;
    font-size: 0.9em;
  }

  a {
    transition: 0.2s;
    letter-spacing: 0.15em;
    cursor: pointer;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  }
}

@media (min-width: 800px) {
  #navbar {
    margin: 50px auto;

    li {
      padding: 10px 20px;
      font-size: 1em;

      a {
        letter-spacing: 0.4em;
      }
    }
  }
}
</style>
