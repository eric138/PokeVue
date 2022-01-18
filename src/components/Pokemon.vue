<template>
  <div class="pokemon">{{ selectedPokemon }}</div>
</template>

<script>
export default {
  name: "Pokemon",
  computed: {
    selectedPokemon() {
      return this.$store.state.selectedPokemon;
    },
  },
};
</script>

<style scoped>
.pokemon {
  display: flex;
  padding: 4px;
  width: 90%;
  text-align: center;
}
</style>
