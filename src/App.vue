<template>
  <div class="app-container">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
  mounted() {
    this.loadPokemon();
  },
  methods: {
    loadPokemon() {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
        .then((response) => response.json())
        .then((data) => this.$store.commit("setPokemonList", data.results));
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app-container {
  align-items: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  min-width: 75%;
}
</style>
