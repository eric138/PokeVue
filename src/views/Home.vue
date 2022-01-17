<template>
  <div class="container">
    <div v-if="selectedPokemon">
      <p>{{ selectedPokemon.name }}</p>
    </div>
    <div v-else>
      <NoPokemon />
    </div>
  </div>
</template>

<script>
import NoPokemon from "../components/NoPokemon.vue";

export default {
  name: "Home",
  data() {
    return {
      showPokemon: false,
    };
  },
  mounted() {
    console.log("mounted");
  },
  computed: {
    selectedPokemon() {
      return this.$store.state.selectedPokemon.name
        ? this.$store.state.selectedPokemon
        : null;
    },
  },
  components: {
    NoPokemon,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
