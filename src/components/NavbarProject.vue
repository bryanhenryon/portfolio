<template>
  <div id="navbar">
    <ul id="navbar-ul">
      <li @click="prev()">
        <h3>
          <router-link :to="`/projet/${id}`">projet prec.</router-link>
        </h3>
      </li>
      <li>
        <i class="fas fa-plus"></i>
      </li>
      <li>
        <h3>
          <router-link to="/" @click.native="scrollToTop">accueil</router-link>
        </h3>
      </li>
      <li>
        <i class="fas fa-plus"></i>
      </li>
      <li @click="next()">
        <h3>
          <router-link :to="`/projet/${id}`">projet suiv.</router-link>
        </h3>
      </li>
    </ul>
  </div>
</template>

<script>
import { EventBus } from "@/main.js";
export default {
  data() {
    return {
      id: this.$route.params.id,
      currentImage2: this.currentImage
    };
  },
  props: ["projects", "currentImage"],
  methods: {
    prev() {
      if (this.id <= 1) {
        this.id = this.projects.length + 1;
      }
      this.id--;
      this.currentImage2 = 1;
      EventBus.$emit("currentProject", this.id);
      EventBus.$emit("currentImage", this.currentImage2);
    },

    next() {
      if (this.id >= this.projects.length) {
        this.id = 0;
      }
      this.id++;
      this.currentImage2 = 1;
      EventBus.$emit("currentProject", this.id);
      EventBus.$emit("currentImage", this.currentImage2);
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