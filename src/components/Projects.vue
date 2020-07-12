<template>
  <div id="projects">
    <h3>projets</h3>
    <div id="projects-grid">
      <div class="card" v-for="project in projects" :key="project.id">
        <div class="card-img">
          <router-link :to="'/projet/' + project.id">
            <img @click="scrollToTop" :src="'img/' + project.image[1]" :alt="project.name" />
          </router-link>
        </div>
        <div class="card-text">
          <div class="card-title">
            <h4>
              <router-link
                @click.native="scrollToTop"
                :to="'/projet/' + project.id"
              >{{ project.name }}</router-link>
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
                <router-link @click.native="scrollToTop" :to="'/projet/' + project.id">details</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/main.js";
export default {
  data() {
    return {
      projects: [
        {
          id: 1,
          image: [
            "test.jpg",
            "last-life.png",
            "last-life-2.png",
            "last-life-3.png",
            "last-life-4.png",
            "last-life-5.png"
          ],
          name: "Last Life",
          description: `
          <p>Il s'agit de mon tout premier projet personnel, développé au cours de ma formation de Développeur d'Applications Multimédia à l'école Doranco, puis présenté à ma soutenance de fin d'année. Voulant le rendre le plus complet possible, je l'ai construit autour du framework Symfony afin de me faciliter la gestion du routing, de l'authentification, de la communication avec la base de données ainsi que de la sécurité en général.</p>
          <br>
          <p>Le site se présente comme un blog de jeux vidéo traditionnel, au design volontairement simpliste et coloré, proposant des articles en rapport avec le média. Les visiteurs peuvent se créer un compte afin de commenter les articles, puis gérer leur profil comme bon leur semble. Ils peuvent également réinitialiser leur mot de passe s'ils l'oublient. Les comptes administrateurs possèdent un accès privilégié au backend d'où l'on peut gérer de manière totale les membres, les articles ainsi que les commentaires postés.</p>
          `,
          overview:
            "Un blog comportant des articles aussi bien sur l'actualité que sur des sujets divers en rapport avec le jeu vidéo",
          used_technologies: [
            "HTML5",
            "CSS3",
            "Bootstrap",
            "JavaScript",
            "Symfony",
            "MySQL"
          ],
          year_of_creation: 2019,
          demo: "https://last-life.bryanhenryon.fr/",
          code: "https://github.com/bryanhenryon/last-life"
        },
        {
          id: 2,
          image: [
            "test.jpg",
            "les-pays-du-monde.png",
            "les-pays-du-monde-2.png"
          ],
          name: "Les Pays du Monde",
          description: `<p>J'ai réalisé cette application lorsque je me suis intéressé à JavaScript en profondeur, et plus particulièrement aux requêtes HTTP asynchrones. Je voulais pratiquer, alors j'ai tout bonnement cherché sur Google une liste des API REST les plus populaires afin de construire un projet intéressant autour d'une d'entre elles, puis j'ai trouvé REST Countries.</p>
            <br>
            <p>L'application présente une liste de tous les pays du monde sous forme de carte puis affiche une modale des informations détaillées du pays une fois la carte de celui-ci cliquée. L'utilisateur peut également filtrer les pays par région ou rechercher un pays spécifique via la barre de recherche.</p>`,
          overview:
            "Application listant tous les pays du monde ainsi que leurs informations détaillées via l'utilisation de l'API REST Countries",
          used_technologies: ["HTML5", "CSS3", "JavaScript"],
          year_of_creation: 2020,
          demo: "https://les-pays-du-monde.bryanhenryon.fr/",
          code: "https://github.com/bryanhenryon/les-pays-du-monde"
        },
        {
          id: 3,
          image: ["test.jpg", "github-finder.png"],
          name: "GitHub Finder",
          description: `<p>J'ai réalisé ce projet afin de m'entrainer à effectuer des requêtes HTTP asynchrones en JavaScript, autrement dit, des appels Ajax. Il s'agit de ma toute première tentative. Derrière le rideau, à chaque caractère entré dans la barre de recherche, une requête est envoyée au serveur de GitHub qui me renvoie les informations de l'utilisateur correspondant.</p>
            <br>
            <p>Cela m'a fait rencontrer une difficulté inattendue puisque GitHub limite le nombre de requêtes non-identifiées à 60 par heure, ce qui m'était largement insuffisant. J'ai donc dû parcourir la documentation afin de comprendre comment m'identifier et passer cette limite de 60 à 5000 requêtes par heure.</p>`,
          overview:
            "Application permettant de récupérer le profil et les informations de n'importe quel utilisateur GitHub via l'utilisation de l'API du site",
          used_technologies: ["HTML5", "CSS3", "JavaScript"],
          year_of_creation: 2020,
          demo: "https://github-finder.bryanhenryon.fr/",
          code: "https://github.com/bryanhenryon/github-finder"
        },
        {
          id: 4,
          name: "Ma To-do List",
          image: ["test.jpg", "ma-to-do-list.png", "ma-to-do-list-2.png"],
          description:
            "<p>Une to-do list basique réalisée dans le but de pratiquer mes connaissances en JavaScript. L'utilisateur a la possibilité d'ajouter une tâche, de la cocher ou de la supprimer, de toutes les supprimer ou bien de les filtrer via le menu ou la barre de recherche. Les tâches sont enregistrées dans le local storage du navigateur afin de ne pas les perdre à la fermeture de celui-ci.</p>",
          overview:
            "To-do list avec CRUD quasi complet et sauvegarde dans le local storage",
          used_technologies: ["HTML5", "CSS3", "JavaScript"],
          year_of_creation: 2020,
          demo: "https://ma-to-do-list.bryanhenryon.fr/",
          code: "https://github.com/bryanhenryon/ma-to-do-list"
        },
        {
          id: 5,
          image: [
            "test.jpg",
            "chasseur-de-monstres.png",
            "chasseur-de-monstres-2.png",
            "chasseur-de-monstres-3.png",
            "chasseur-de-monstres-4.png"
          ],
          name: "Chasseur de Monstres",
          description: `<p>Portant un grand intérêt aux jeux vidéo depuis mon enfance, ce projet est né de ma volonté de développer un petit jeu en JavaScript. C'est également mon premier projet réalisé avec Vue.js, idéal pour concevoir les bases du framework.</p>
            <br>
            <p>Le joueur a la possibilité de nommer son personnage — qui sera nommé "Mystérieux Chevalier" par défaut — avant de commencer la partie. Une fois la partie lancée, l'interface de combat apparaît. Le joueur a la possibilité d'utiliser son attaque de base ou bien d'utiliser son attaque spéciale ou son soin qui sont tous deux à usage unique. A chaque action du joueur, le monstre frappe à son tour, tandis qu'un historique du combat se développe sous la barre d'action. Un nouveau monstre est généré à chaque combat, et les victoires ainsi que les morts du joueur sont enregistrées afin d'être affichées dans le menu principal.</p>
            `,
          overview: "Petit jeu de rôle au tour par tour réalisé avec Vue.js",
          used_technologies: ["HTML5", "CSS3", "Foundation", "Vue.js"],
          year_of_creation: 2020,
          demo: "https://chasseur-de-monstres.bryanhenryon.fr/",
          code: "https://github.com/bryanhenryon/chasseur-de-monstres"
        },
        {
          id: 6,
          image: [
            "test.jpg",
            "portfolio.png",
            "portfolio-2.png",
            "portfolio-3.png",
            "portfolio-4.png"
          ],
          name: "Mon Portfolio",
          description: `Il s'agît de mon dernier projet en date, développé afin de centraliser mes travaux et les rendre accessibles publiquement.`,
          overview:
            "Le projet sur lequel vous vous trouvez actuellement, réalisé avec Vue.js",
          used_technologies: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Vue.js",
            "vue-loader",
            "vue-router",
            "vue-validate",
            "Axios"
          ],
          year_of_creation: 2020,
          demo: "https://www.bryanhenryon.fr",
          code: "https://github.com/bryanhenryon/portfolio"
        }
      ]
    };
  },
  mounted() {
    EventBus.$emit("projects", this.projects);
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
