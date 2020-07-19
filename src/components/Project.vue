<template>
  <div id="project">
    <app-navbar></app-navbar>
    <h3 id="project-name">
      projet : {{ getProjects[getId - 1].name.toLowerCase() }}
    </h3>
    <div class="card">
      <div id="project-image">
        <img
          @click="showModal()"
          :src="'/img/' + getProjects[getId - 1].image[getCurrentImage]"
          :alt="getProjects[getId - 1].name"
        />
      </div>
      <div id="project-image-pagination">
        <button @click="prev()">
          <i class="fas fa-chevron-left"></i>
        </button>
        <span>
          {{ getCurrentImage }} /
          {{ getProjects[getId - 1].image.length - 1 }}
        </span>
        <button @click="next()">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div class="card-action">
        <ul>
          <li>
            <a
              :href="getProjects[getId - 1].demo"
              target="_blank"
              rel="noopener"
              >demo</a
            >
          </li>
          <li>
            <a
              :href="getProjects[getId - 1].code"
              target="_blank"
              rel="noopener"
              >code</a
            >
          </li>
        </ul>
      </div>
      <div id="about-project">
        <h4>A propos du projet</h4>
        <div id="description" v-html="getProjects[getId - 1].description"></div>
      </div>

      <div id="technologies">
        <h4>Technologies</h4>
        <ul>
          <li
            v-for="(technology, index) of getProjects[getId - 1]
              .used_technologies"
            :key="index"
          >
            {{ technology }}
          </li>
        </ul>
      </div>

      <div id="year">
        <h4>Année</h4>
        <p>{{ getProjects[getId - 1].year_of_creation }}</p>
      </div>
    </div>
    <div @click="closeModal($event)" class="modal">
      <div class="full-img">
        <img :src="'/img/' + getProjects[getId - 1].image[getCurrentImage]" />
        <div class="modal-pagination">
          <button @click="prev()">
            <i class="fas fa-chevron-left"></i>
          </button>
          <span>
            {{ getCurrentImage }} /
            {{ getProjects[getId - 1].image.length - 1 }}
          </span>
          <button @click="next()">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavbarProject from "@/components/NavbarProject.vue";

export default {
  components: {
    "app-navbar": NavbarProject
  },
  computed: {
    ...mapGetters(["getProjects", "getId", "getCurrentImage"])
  },
  methods: {
    prev() {
      this.$store.dispatch("previousImage");
    },
    next() {
      this.$store.dispatch("nextImage");
    },

    showModal() {
      const modal = document.querySelector(".modal");
      const fullImg = document.querySelector(".full-img");
      modal.classList.add("open");
      fullImg.classList.add("open");
    },

    closeModal($event) {
      const modal = document.querySelector(".modal");
      const fullImg = document.querySelector(".full-img");
      if ($event.target.classList.contains("modal")) {
        modal.classList.remove("open");
        fullImg.classList.remove("open");
      }
    }
  },
  created() {
    this.$store.dispatch("setId", this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

#project {
  max-width: 1024px;
  margin: auto;

  .card {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    background: #fff;
  }

  h3 {
    letter-spacing: 0.15em;
    margin-bottom: 5px;
  }

  #about-project,
  #technologies,
  #year {
    padding: 20px 20px;

    h4 {
      font-size: 1.2em;
      letter-spacing: 0.1em;
      margin-bottom: 5px;
    }

    p {
      font-family: $secondaryFont;
    }

    #description {
      font-family: $secondaryFont;
      line-height: 1.5;
    }
  }

  #technologies ul {
    display: flex;
    flex-wrap: wrap;

    li {
      margin-right: 5px;
      font-family: $secondaryFont;
    }

    li:after {
      content: ",";
    }

    li:last-child:after {
      content: "";
    }
  }

  #project-image-pagination {
    text-align: center;
    margin-top: 10px;
    font-size: 1.1em;

    button {
      background: none;
      outline: none;
      border: none;
      padding: 10px;
      cursor: pointer;
    }

    button:hover {
      color: #79ad80;
    }
  }

  .card-action {
    font-family: $secondaryFont;
    margin: 40px 0 20px 0;

    ul {
      display: flex;
      justify-content: center;

      li {
        border-bottom: 2px solid #35623c;
        padding-bottom: 3px;
        margin: 0 30px;

        a:hover {
          color: black;
        }
      }

      li:hover {
        border-color: #79ad80;
      }
    }
  }
  #project-image {
    img {
      width: 100%;
      cursor: pointer;
    }
  }

  .modal {
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s ease-out;

    .full-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.5);
      transition: all 0.5s ease-out;
      width: 95%;

      img {
        width: 100%;
      }
    }

    .full-img.open {
      transform: translate(-50%, -50%) scale(1);
    }

    .modal-pagination {
      color: white;
      padding: 0;
      margin: 10px 0 0 0;
      text-align: right;
      font-size: 1.5em;

      span {
        padding: 0 10px;
      }

      button {
        color: white;
        background: none;
        outline: none;
        border: none;
        padding: 10px;
        cursor: pointer;

        button:hover {
          color: #79ad80;
        }
      }
    }
  }

  .modal.open {
    opacity: 1;
    pointer-events: all;
  }
}

@media (min-width: 800px) {
  #projet {
    #project-image-pagination {
      text-align: right;
      padding: 10px;
      font-size: 1.35em;
      margin-right: 20px;

      span {
        padding: 0 10px;
      }
    }
  }
}

@media (min-width: 1200px) {
  h3 {
    font-size: 1.4em;
  }
  #projet {
    .modal {
      .full-img {
        width: 70%;
      }
    }
  }
}
</style>
