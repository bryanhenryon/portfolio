<template>
  <section id="about">
    <h3>à propos de moi</h3>
    <div id="about-card">
      <div id="about-img">
        <img src="/img/moi.jpg" alt="Bryan Henryon" />
      </div>
      <div id="about-description">
        <p>Bonjour 👋, je suis Bryan.</p>
        <p>Je suis un développeur web situé en Seine-Saint-Denis, dans la banlieue de Paris. Je suis principalement orienté frontend car j'aime développer des sites ergonomiques, réactifs et proprement designés. J'adore apprendre de nouvelles technologies et varier mes projets. J'élargis actuellement mes connaissances en JavaScript via l'apprentissage de Vue.js.</p>
        <p>
          Je possède également des compétences côté backend, en PHP et SQL &mdash; que j'ai acquises durant ma formation à l'école
          <a
            href="https://www.doranco.fr/"
            style="color:#79ad80;"
            target="_blank"
            rel="noopener"
          >Doranco</a>, où j'ai décroché mon diplôme de Développeur d'Applications Multimédia &mdash; , qui me permettent de savoir sécuriser une application web ainsi que communiquer avec sa base de données.
        </p>
        <div id="about-skills">
          <h4>Connaissances techniques</h4>
          <ul>
            <li v-for="(skill,index) of skills" :key="index">{{ skill }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        "HTML5",
        "CSS3",
        "SCSS",
        "Bootstrap",
        "JavaScript",
        "Vue.js",
        "PHP",
        "MySQL",
        "Symfony"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
#about {
  margin-top: 50px;

  h3 {
    letter-spacing: 0.15em;
    margin-bottom: 5px;
  }
}

#about-card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  background: #fff;

  #about-img {
    img {
      width: 100%;
      border-radius: 10px 10px 0px 0px;
    }
  }

  #about-description {
    padding: 20px;
    font-family: $secondaryFont;

    p {
      margin-bottom: 20px;
      line-height: 1.5;
    }

    #about-skills {
      h4 {
        font-family: $primaryFont;
        letter-spacing: 0.05em;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: 3px;
        line-height: 1.5;

        li {
          margin-right: 5px;
        }

        li:after {
          content: ",";
        }

        li:last-child:after {
          content: "";
        }
      }
    }
  }
}

@media (min-width: 560px) {
  #about-card {
    display: block;

    #about-img {
      width: 23%;
      min-width: 175px;
      img {
        border-radius: 10px 0 0 0;
        padding: 0px 10px 0 0;
        float: left;
      }
    }
  }
}

@media (min-width: 1200px) {
  h3 {
    font-size: 1.4em;
  }
}
</style>