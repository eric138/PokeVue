<template>
  <div class="container">
    <p>{{ selectedPokemon.name }}</p>
    <p>{{ selectedPokemon.abilities[0].ability.name }}</p>
    <p>{{ selectedPokemon.abilities[1].ability.name }}</p>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    selectedPokemon() {
      return this.$store.state.selectedPokemon;
    },
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
