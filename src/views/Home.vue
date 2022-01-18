<template>
  <div class="home">
    <div v-if="selectedPokemon">
      <Pokemon />
    </div>
    <div v-else>
      <NoPokemon />
    </div>
  </div>
</template>

<script>
import NoPokemon from "../components/NoPokemon.vue";
import Pokemon from "../components/Pokemon.vue";

export default {
  name: "Home",
  computed: {
    selectedPokemon() {
      return this.$store.state.selectedPokemon.name
        ? this.$store.state.selectedPokemon
        : null;
    },
  },
  components: {
    NoPokemon,
    Pokemon,
  },
};
</script>

<style scoped>
.home {
  margin-top: 24px;
  align-content: center;
  align-items: center;
  min-height: 300px;
  width: 80%;
  background-color: white;
  border-color: black;
  border-radius: 8px;
  border-style: solid;
  justify-content: space-between;
  overflow-y: scroll;
  box-shadow: 0 5px 10px rgb(0 0 0 / 0.5);
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 24px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 24px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}
</style>
