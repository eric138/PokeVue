import { createStore } from "vuex";

export default createStore({
  state: {
    pokemonList: [],
    pokemonSearch: "",
    potentialPokemon: [],
    selectedPokemon: {},
  },
  mutations: {
    setPokemonList(state, pokeList) {
      state.pokemonList = pokeList;
    },
    setPokemonSearch(state, str) {
      state.pokemonSearch = str;
    },
    setPotentialPokemon(state, pokeList) {
      state.potentialPokemon = pokeList;
    },
    setSelectedPokemon(state, pokemon) {
      state.selectedPokemon = pokemon;
    },
  },
  actions: {},
  getters: {}, //allows you to do stuff to the state before sending to app
  modules: {},
});
