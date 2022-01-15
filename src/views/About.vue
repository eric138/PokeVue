<template>
  <div class="about">
    <h1>{{ pokemonSearch }}</h1>
  </div>
</template>

<script>
export default {
  name: "about",
  computed: {
    pokemonSearch() {
      return this.$store.state.pokemonSearch;
    },
  },
};
</script>
