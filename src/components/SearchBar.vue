<template>
  <div class="container">
    <input
      v-model="pokemonSearch"
      placeholder="Search pokemon"
      type="text"
      :class="changeClass"
      @keyup.enter="handleClick"
      @input="handleChange"
    />
    <div :class="checkDropdown">
      <div v-for="pokemon in potentialPokemon" :key="pokemon.name">
        {{ pokemon.name }}
      </div>
    </div>
    <!-- <img
      @click="handleClick"
      src="../../public/pokeball.png"
      class="search-button"
    /> -->
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      isPokemon: false,
      showDropdown: false,
    };
  },
  computed: {
    pokemonSearch: {
      get() {
        return this.$store.state.pokemonSearch;
      },
      set(str) {
        if (str.length > 0) {
          console.log("true");
          this.showDropdown = true;
        } else {
          console.log("false");
          this.showDropdown = false;
        }
        const list = this.$store.state.pokemonList;
        const pokeFound = list.find((pokemon) => pokemon.name === str);
        if (pokeFound) {
          this.isPokemon = true;
        } else {
          this.isPokemon = false;
        }
        this.$store.commit("setPokemonSearch", str);
      },
    },
    changeClass() {
      return this.isPokemon ? "input-green" : "input-red";
    },
    pokemonSearchList() {
      const list = this.$store.state.pokemonList;
      return list.map((pokemon) => pokemon.name);
    },
    checkDropdown() {
      return this.showDropdown ? "dropdownShow" : "dropdownHidden";
    },
    potentialPokemon() {
      return this.$store.state.potentialPokemon;
    },
  },
  methods: {
    handleClick() {
      console.log("you clicked it");
    },
    handleChange() {
      const list = this.$store.state.pokemonList;
      const search = this.$store.state.pokemonSearch;
      const searchList = list.filter((pokemon) =>
        pokemon.name.includes(search)
      );
      this.$store.commit("setPotentialPokemon", searchList);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}
.search-button {
  max-height: 30px;
  width: auto;
  padding-left: 12px;
}
.input-red {
  color: red;
}
.input-green {
  color: green;
}
.holder {
  position: relative;
}
.dropdownHidden {
  display: none;
}

.dropdownShow {
  display: block;
  position: absolute;
  border: 1px solid black;
  z-index: 1;
  background: white;
  margin-top: 20px;
  max-height: 500px;
  overflow: scroll;
}
</style>
