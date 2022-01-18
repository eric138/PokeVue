<template>
  <div
    class="container"
    @keyup.down="handleDown"
    @keyup.enter="handleEnter"
    @keyup.up="handleUp"
  >
    <input
      v-model="pokemonSearch"
      placeholder="Gotta search them all!"
      type="text"
      ref="input"
      :class="changeClass"
      @input="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <div :class="checkDropdown" id="scrollContainer">
      <div
        v-for="(pokemon, index) in potentialPokemon"
        :key="index"
        :id="getRefs(index + 1)"
        :class="changeDropdownClass(index)"
        @mousedown="handleClick(pokemon)"
        @mouseenter="changeFocus(index)"
      >
        {{ pokemon.name }}
      </div>
    </div>
    <img :src="pokeball" class="img" @mousedown="handleImgClick" />
  </div>
</template>

<script>
import pokeball from "../../public/pokeball.png";
export default {
  name: "SearchBar",
  data() {
    return {
      isPokemon: false,
      showDropdown: false,
      focusedItem: 1,
      pokeball: pokeball,
      buttonDisabled: true,
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
          this.buttonDisabled = false;
        } else {
          this.isPokemon = false;
          this.buttonDisabled = true;
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
      this.buttonDisabled = true;
    },
    handleEnter() {
      if (this.$store.state.pokemonSearch.length >= 1) {
        const potentialPokemon = this.$store.state.potentialPokemon;
        this.handleClick(potentialPokemon[this.focusedItem - 1]);
      }
    },
    handleImgClick() {
      if (!this.buttonDisabled && this.isPokemon) {
        this.handleEnter();
      }
    },
    handleUp() {
      if (this.focusedItem > 1) {
        this.focusedItem--;
        this.fixScrolling(this.focusedItem);
      }
    },
    handleDown() {
      const potentialPokemon = this.$store.state.potentialPokemon;
      if (this.focusedItem < potentialPokemon.length) {
        this.focusedItem++;
        this.fixScrolling(this.focusedItem);
      }
    },
    handleChange() {
      const list = this.$store.state.pokemonList;
      const search = this.$store.state.pokemonSearch;
      const searchList = list.filter(
        (pokemon) =>
          pokemon.name.includes(search) && !pokemon.name.includes("-")
      );
      this.$store.commit("setPotentialPokemon", searchList);
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
    handleBlur() {
      this.showDropdown = false;
    },
    handleFocus() {
      const search = this.$store.state.pokemonSearch;
      if (search.length > 0) {
        this.showDropdown = true;
      }
    },
    fixScrolling(itemIndex) {
      var container = this.$el.querySelector(`#dropItem${itemIndex}`);
      container.scrollIntoView();
    },
    getRefs(index) {
      return `dropItem${index}`;
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
  border: 1px black solid;
  border-radius: 24px;
  width: 200px;
  height: 30px;
  padding-left: 12px;
}
.input-green {
  color: green;
  border: 1px black solid;
  border-radius: 24px;
  width: 200px;
  height: 30px;
  padding-left: 12px;
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
  border: 2px solid black;
  border-radius: 8px;
  z-index: 1;
  background: white;
  margin-top: 32px;
  max-height: 400px;
  min-width: 212px;
  overflow-y: scroll;
}
.dropdownItem {
  padding: 8px;
}
.dropdownItemFocus {
  background-color: lightgreen;
  border: 1px solid black;
  border-radius: 24px;
  padding: 3px;
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
.img {
  height: 34px;
  width: auto;
  padding-left: 12px;
}
</style>
