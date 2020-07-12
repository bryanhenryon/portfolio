<template>
  <section id="contact">
    <div class="container">
      <h3>contact</h3>
      <div id="contact-grid">
        <form @submit.prevent="submitForm">
          <p v-if="formStatus === 'submitted'" class="success">
            Merci de votre message ! Je vous répondrai dans les meilleurs
            délais.
          </p>

          <div v-if="errors || (empty && formStatus === 'clicked')" class="errors">
            <p v-if="!$v.form.name.required">Veuillez renseigner ce champ</p>
          </div>
          <input type="text" placeholder="Nom" v-model.lazy="$v.form.name.$model" />

          <div v-if="errors || (empty && formStatus === 'clicked')" class="errors">
            <p v-if="!$v.form.email.required">Veuillez renseigner ce champ</p>
            <p v-if="!$v.form.email.email">L'e-mail indiqué est invalide</p>
          </div>
          <input type="text" placeholder="Email" v-model.lazy="$v.form.email.$model" />

          <div v-if="errors || (empty && formStatus === 'clicked')" class="errors">
            <p v-if="!$v.form.message.required">Veuillez renseigner ce champ</p>
          </div>
          <textarea cols="30" rows="10" placeholder="Message" v-model.lazy="$v.form.message.$model"></textarea>
          <input type="submit" value="Envoyer" />
        </form>
        <div id="links">
          <div id="email">
            <i class="far fa-envelope fa-2x"></i>
            <a
              href="mailto: b.henryon@outlook.fr"
              target="_blank"
              rel="noopener"
            >b.henryon@outlook.fr</a>
          </div>
          <div id="github">
            <i class="fab fa-github fa-2x"></i>
            <a
              href="https://github.com/bryanhenryon"
              target="_blank"
              rel="noopener"
            >github.com/bryanhenryon</a>
          </div>
          <div id="linkedin">
            <i class="fab fa-linkedin-in fa-2x"></i>
            <a
              href=" https://www.linkedin.com/in/bryanhenryon"
              target="_blank"
              rel="noopener"
            >linkedin.com/in/bryanhenryon</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  data() {
    return {
      formStatus: null,
      errors: false,
      empty: true,
      form: {
        name: "",
        email: "",
        message: ""
      }
    };
  },
  methods: {
    submitForm() {
      this.empty = !this.$v.form.$dirty;
      this.errors = this.$v.form.$anyError;
      this.formStatus = "clicked";
      if (this.errors === false && this.empty === false) {
        // OK
        this.formStatus = "submitted";
        setTimeout(() => {
          this.formStatus = null;
        }, 5000);
        var params = new URLSearchParams();
        params.append("name", this.form.name);
        params.append("email", this.form.email);
        params.append("message", this.form.message);
        axios
          .post("https://api.bryanhenryon.fr/sendEmail.php", params)
          .catch(error => {
            console.log(error);
          });
        (this.form.name = ""), (this.form.email = ""), (this.form.message = "");
      }
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      name: {
        required
      },
      message: {
        required
      }
    }
  },
  validationGroup: ["form.email"]
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

#contact {
  margin-top: 20px;

  h3 {
    letter-spacing: 0.15em;
    margin-bottom: 5px;
    margin-top: 30px;
  }

  input {
    display: block;
  }

  .errors {
    color: red;
    font-family: $secondaryFont;
    font-size: 0.9em;
    margin-left: 5px;
    margin-top: 10px;
  }

  .success {
    color: green;
    background: #88d39267;
    text-align: center;
    padding: 15px 10px;
    margin: 10px 0;
    font-family: $secondaryFont;
  }

  input,
  textarea {
    padding: 10px;
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    font-family: $secondaryFont;
    outline: none;
    resize: vertical;
  }

  input:focus,
  textarea:focus {
    border-style: dashed;
    border-color: #79ad80;
  }

  input[type="submit"] {
    background: #efeeed;
    border: none;
    transition: 0.3s;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background: #9dcea4;
  }

  i {
    color: rgb(121, 113, 113);
  }

  #contact-grid {
    display: grid;
    grid-template-columns: 1fr;

    #links {
      align-self: center;
      margin-top: 50px;

      #email,
      #github,
      #linkedin {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;

        a {
          margin-left: 10px;
          font-size: 1em;
          font-family: $secondaryFont;
          text-decoration: underline;
        }
      }
    }
  }
}

@media (min-width: 560px) {
  #contact {
    margin-top: 50px;

    .container {
      width: 75%;
    }
    #contact-grid {
      #links {
        #email,
        #github,
        #linkedin {
          margin-bottom: 50px;

          a {
            font-size: 1.1em;
          }
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  #contact {
    .container {
      width: 90%;
    }
    #contact-grid {
      grid-template-columns: 1fr 1fr;

      #links {
        align-self: center;
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
