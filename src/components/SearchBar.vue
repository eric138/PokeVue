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
        v-for="(pokemon, index) in potentialPokemon"
        :key="index"
        :ref="getRef(index)"
        :class="changeDropdownClass(index)"
        @click="handleClick(pokemon)"
        @mouseenter="changeFocus(index)"
      >
        {{ pokemon.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      isPokemon: false,
      showDropdown: false,
      focusedItem: 1,
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
    handleClick(pokemon) {
      this.$store.commit("setPokemonSearch", pokemon.name);
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then((response) => response.json())
        .then((data) => this.$store.commit("setSelectedPokemon", data));
      this.showDropdown = false;
      this.isPokemon = true;
    },
    handleEnter() {
      if (this.$store.state.pokemonSearch.length >= 1) {
        const potentialPokemon = this.$store.state.potentialPokemon;
        this.handleClick(potentialPokemon[this.focusedItem - 1]);
      }
    },
    handleUp() {
      if (this.focusedItem > 1) {
        this.focusedItem--;
      }
    },
    handleDown() {
      const potentialPokemon = this.$store.state.potentialPokemon;
      if (this.focusedItem < potentialPokemon.length) {
        this.focusedItem++;
      }
    },
    handleChange() {
      const list = this.$store.state.pokemonList;
      const search = this.$store.state.pokemonSearch;
      const searchList = list.filter((pokemon) =>
        pokemon.name.includes(search)
      );
      this.$store.commit("setPotentialPokemon", searchList);
    },
    getRef(index) {
      return `dropItem${index + 1}`;
    },
    changeDropdownClass(index) {
      if (index + 1 === this.focusedItem) {
        return "dropdownItemFocus";
      } else {
        return "dropdownItem";
      }
    },
    changeFocus(index) {
      this.focusedItem = index + 1;
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
.dropdownItemFocus {
  background-color: lightgreen;
  border-color: white;
  padding: 3px;
}
</style>
