import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    skills: [
      "HTML5",
      "CSS3",
      "SCSS",
      "Bootstrap",
      "JavaScript",
      "Vue.js",
      "Node.js",
      "Express",
      "MySQL",
      "MongoDB",
      "Socket.IO",
    ],
    projects: [
      {
        id: 1,
        image: [
          "test.jpg",
          "projects/last-life/last-life.png",
          "projects/last-life/last-life-2.png",
          "projects/last-life/last-life-3.png",
          "projects/last-life/last-life-4.png",
          "projects/last-life/last-life-5.png",
        ],
        name: "Last Life",
        description: `
        <p>Il s'agit de mon tout premier projet personnel, développé au cours de ma formation de Développeur d'Applications Multimédia à l'école Doranco, puis présenté à ma soutenance de fin d'année. Voulant le rendre le plus complet possible, je l'ai construit autour du framework Symfony afin de me faciliter la gestion du routing, de l'authentification, de la communication avec la base de données ainsi que de la sécurité en général.</p>
        <br>
        <p>Le site se présente comme un blog de jeux vidéo traditionnel, au design volontairement simpliste et coloré, proposant des articles en rapport avec le média. Les visiteurs peuvent se créer un compte afin de commenter les articles, puis gérer leur profil comme bon leur semble. Ils peuvent également réinitialiser leur mot de passe s'ils l'oublient. Les comptes administrateurs possèdent un accès privilégié au back office d'où l'on peut gérer de manière totale les membres, les articles ainsi que les commentaires postés.</p>
        `,
        overview:
          "Un blog comportant des articles aussi bien sur l'actualité que sur des sujets divers en rapport avec le jeu vidéo",
        used_technologies: [
          "HTML5",
          "CSS3",
          "Bootstrap",
          "JavaScript",
          "Symfony",
          "MySQL",
        ],
        year_of_creation: 2019,
        demo: "https://last-life.bryanhenryon.fr/",
        code: "https://github.com/bryanhenryon/last-life",
      },
      {
        id: 2,
        image: [
          "test.jpg",
          "projects/les-pays-du-monde/les-pays-du-monde.png",
          "projects/les-pays-du-monde/les-pays-du-monde-2.png",
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
        code: "https://github.com/bryanhenryon/les-pays-du-monde",
      },
      {
        id: 3,
        image: [
          "test.jpg",
          "projects/elochat/elochat.png",
          "projects/elochat/elochat-2.png",
          "projects/elochat/elochat-3.png",
        ],
        name: "Elochat",
        description: `L'idée de développer une application de messagerie instantanée m'est venue après avoir découvert Socket.IO, une API WebSocket puissante et multiplateformes en Node.js. WebSocket est une technologie permettant une communication bidirectionnelle entre un client et un serveur, ce qui permet de recevoir les réponses de ce dernier sans avoir à recharger la page.`,
        overview:
          "Messagerie instantanée avec système d'authentification réalisée avec Node.js et Socket.IO",
        used_technologies: [
          "HTML5",
          "CSS3",
          "SCSS",
          "JavaScript",
          "Node.js",
          "Express",
          "MongoDB",
          "Moment.js",
          "Socket.IO",
        ],
        year_of_creation: 2020,
        demo: "https://elochat.herokuapp.com/",
        code: "https://github.com/bryanhenryon/elochat",
      },
      {
        id: 4,
        image: ["test.jpg", "projects/github-finder/github-finder.png"],
        name: "GitHub Finder",
        description: `<p>J'ai réalisé ce projet afin de m'entrainer à effectuer des requêtes HTTP asynchrones en JavaScript, autrement dit, des appels Ajax. Il s'agit de ma toute première tentative. Derrière le rideau, à chaque caractère entré dans la barre de recherche, une requête est envoyée au serveur de GitHub qui me renvoie les informations de l'utilisateur correspondant.</p>
          <br>
          <p>Cela m'a fait rencontrer une difficulté inattendue puisque GitHub limite le nombre de requêtes non-identifiées à 60 par heure, ce qui m'était largement insuffisant. J'ai donc dû parcourir la documentation afin de comprendre comment m'identifier et passer cette limite de 60 à 5000 requêtes par heure.</p>`,
        overview:
          "Application permettant de récupérer le profil et les informations de n'importe quel utilisateur GitHub via l'utilisation de l'API du site",
        used_technologies: ["HTML5", "CSS3", "JavaScript"],
        year_of_creation: 2020,
        demo: "https://github-finder.bryanhenryon.fr/",
        code: "https://github.com/bryanhenryon/github-finder",
      },
      {
        id: 5,
        name: "Ma To-do List",
        image: [
          "test.jpg",
          "projects/ma-to-do-list/ma-to-do-list.png",
          "projects/ma-to-do-list/ma-to-do-list-2.png",
        ],
        description:
          "<p>Une to-do list basique réalisée dans le but de pratiquer mes connaissances en JavaScript. L'utilisateur a la possibilité d'ajouter une tâche, de la cocher ou de la supprimer, de toutes les supprimer ou bien de les filtrer via le menu ou la barre de recherche. Les tâches sont enregistrées dans le local storage du navigateur afin de ne pas les perdre à la fermeture de celui-ci.</p>",
        overview:
          "To-do list avec CRUD quasi complet et sauvegarde dans le local storage",
        used_technologies: ["HTML5", "CSS3", "JavaScript"],
        year_of_creation: 2020,
        demo: "https://ma-to-do-list.bryanhenryon.fr/",
        code: "https://github.com/bryanhenryon/ma-to-do-list",
      },
      {
        id: 6,
        image: [
          "test.jpg",
          "projects/chasseur-de-monstres/chasseur-de-monstres.png",
          "projects/chasseur-de-monstres/chasseur-de-monstres-2.png",
          "projects/chasseur-de-monstres/chasseur-de-monstres-3.png",
          "projects/chasseur-de-monstres/chasseur-de-monstres-4.png",
        ],
        name: "Chasseur de Monstres",
        description: `<p>Portant un grand intérêt aux jeux vidéo depuis mon enfance, ce projet est né de ma volonté de développer un petit jeu en JavaScript. C'est également mon premier projet réalisé avec Vue.js, idéal pour concevoir les bases du framework.</p>
          <br>
          <p>Le joueur a la possibilité de nommer son personnage — qui sera nommé "Mystérieux Chevalier" par défaut — avant de commencer la partie. Une fois la partie lancée, l'interface de combat apparaît. Le joueur a la possibilité d'utiliser son attaque de base ou bien d'utiliser son attaque spéciale ou son soin qui sont tous deux à usage unique. A chaque action du joueur, le monstre frappe à son tour, tandis qu'un historique du combat se développe sous la barre d'action. Un nouveau monstre est généré à chaque combat, et les victoires ainsi que les morts du joueur sont enregistrées puis affichées dans le menu principal.</p>
          `,
        overview: "Petit jeu de rôle au tour par tour réalisé avec Vue.js",
        used_technologies: ["HTML5", "CSS3", "Foundation", "Vue.js"],
        year_of_creation: 2020,
        demo: "https://chasseur-de-monstres.bryanhenryon.fr/",
        code: "https://github.com/bryanhenryon/chasseur-de-monstres",
      },
    ],
    copyright: null,
    id: null,
    currentImage: 1,
  },
  getters: {
    getSkills: (state) => state.skills,
    getCopyright: (state) => (state.copyright = new Date().getFullYear()),
    getProjects: (state) => state.projects,
    getId: (state) => state.id,
    getCurrentImage: (state) => state.currentImage,
  },
  mutations: {
    setId: (state, payload) => (state.id = payload),
    previousImage: (state) => {
      if (state.currentImage <= 1)
        state.currentImage = state.projects[state.id - 1].image.length;
      state.currentImage--;
    },
    nextImage: (state) => {
      if (state.currentImage >= state.projects[state.id - 1].image.length - 1)
        state.currentImage = 0;
      state.currentImage++;
    },
    previousProject: (state) => {
      if (state.id <= 1) state.id = state.projects.length + 1;
      state.id--;
      state.currentImage = 1;
    },
    nextProject: (state) => {
      if (state.id >= state.projects.length) state.id = 0;
      state.id++;
      state.currentImage = 1;
    },
    backToHomepage: (state) => {
      state.currentImage = 1;
    },
  },
  actions: {
    setId: ({ commit }, payload) => commit("setId", payload),
    previousImage: ({ commit }) => commit("previousImage"),
    nextImage: ({ commit }) => commit("nextImage"),
    previousProject: ({ commit }) => commit("previousProject"),
    nextProject: ({ commit }) => commit("nextProject"),
    backToHomepage: ({ commit }) => commit("backToHomepage"),
  },
});
