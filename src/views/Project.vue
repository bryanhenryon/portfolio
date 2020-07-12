<template>
  <div id="projet">
    <div class="container">
      <app-header></app-header>
      <app-project></app-project>
    </div>
    <div class="white-bg">
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Project from "@/components/Project.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    "app-header": Header,
    "app-project": Project,
    "app-footer": Footer
  }
};
</script>
