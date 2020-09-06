<template>
  <div id="projects">
    <h3>projets</h3>
    <div id="projects-grid">
      <div class="card" v-for="project in getProjects" :key="project.id">
        <div class="card-img">
          <router-link :to="'/projet/' + project.id">
            <img
              @click="scrollToTop"
              :src="'img/' + project.image[1]"
              :alt="project.name"
            />
          </router-link>
        </div>
        <div class="card-text">
          <div class="card-title">
            <h4>
              <router-link
                @click.native="scrollToTop"
                :to="'/projet/' + project.id"
                >{{ project.name }}</router-link
              >
            </h4>
          </div>
          <div class="card-description">
            <p>{{ project.overview }}</p>
          </div>
          <div class="card-action">
            <ul>
              <li>
                <a :href="project.demo" target="_blank" rel="noopener">demo</a>
              </li>
              <li>
                <a :href="project.code" target="_blank" rel="noopener">code</a>
              </li>
              <li>
                <router-link
                  @click.native="scrollToTop"
                  :to="'/projet/' + project.id"
                  >details</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getProjects"])
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

#projects-pagination {
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

#projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

h3 {
  letter-spacing: 0.15em;
  margin-bottom: 5px;
}

.card {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  background: #fff;

  .card-text {
    padding: 15px 15px 15px 15px;
  }

  h4 {
    font-family: $primaryFont;
    font-size: 1.2em;
    letter-spacing: 0.1em;
  }

  .card-img img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 3px 3px 0 0;
  }

  .card-title,
  .card-description,
  .card-action {
    font-family: $secondaryFont;
  }
  .card-description div {
    line-height: 1.5;
    display: inline;
  }

  .card-description a {
    letter-spacing: 0.2em;
  }

  .card-action {
    margin: 40px 0 20px 0;
  }

  .card-action ul {
    display: flex;
    justify-content: space-evenly;

    li {
      border-bottom: 2px solid #35623c;
      padding-bottom: 3px;

      a:hover {
        color: black;
      }
    }

    li:hover {
      border-color: #79ad80;
    }
  }
}

@media (min-width: 800px) {
  #projects-grid {
    grid-template-columns: 1fr 1fr;
  }

  #projects-pagination {
    text-align: right;
    padding: 10px;
    font-size: 1.35em;

    span {
      padding: 0 20px;
    }
  }
}

@media (min-width: 1200px) {
  #projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  h3 {
    font-size: 1.4em;
  }
}
</style>
