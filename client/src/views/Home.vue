<template>
  <div id="home">
    <div class="container">
      <app-header></app-header>
      <app-navbar></app-navbar>
      <app-projects></app-projects>
      <app-about></app-about>
    </div>
    <div class="white-bg">
      <app-contact></app-contact>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import Projects from "@/components/Projects.vue";
import About from "@/components/About.vue";
import Contact from "@/components/Contact.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    "app-header": Header,
    "app-navbar": Navbar,
    "app-projects": Projects,
    "app-about": About,
    "app-contact": Contact,
    "app-footer": Footer
  }
};
</script>
