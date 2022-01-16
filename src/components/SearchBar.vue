<template>
  <div
    class="container"
    @keyup.down="handleDown"
    @keyup.enter="handleEnter"
    @keyup.up="handleUp"
  >
    <input
      v-model="pokemonSearch"
      placeholder="Search pokemon"
      type="text"
      :class="changeClass"
      @input="handleChange"
    />
    <div :class="checkDropdown">
      <div
        v-for="pokemon in potentialPokemon"
        :key="pokemon.name"
        class="dropdownItem"
        @click="handleClick"
      >
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
          this.showDropdown = true;
        } else {
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
    handleEnter() {
      console.log("you hit enter");
    },
    handleUp() {
      console.log("you hit up");
    },
    handleDown() {
      console.log("you hit down");
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
  max-height: 400px;
  min-width: 175px;
  overflow-y: scroll;
}
.dropdownItem {
  padding: 3px;
  border: 1px black solid;
}
.dropdownItem:focus {
  background-color: lightgreen;
}
.dropdownItem:hover {
  background-color: lightgreen;
}
</style>
