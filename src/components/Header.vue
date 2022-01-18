<template>
  <div class="header">
    <img
      class="logo"
      alt="Pokemon logo"
      src="https://logos-world.net/wp-content/uploads/2020/05/Pokemon-Logo.png"
    />
    <SearchBar />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
export default {
  name: "Header",
  components: {
    SearchBar,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  max-height: 75px;
  width: auto;
  padding: 8px;
}
.header {
  max-height: 100px;
  width: 80%;
  align-items: center;
  background-color: white;
  display: flex;
  border-color: black;
  border-radius: 24px;
  border-style: solid;
  justify-content: space-between;
  box-shadow: 0 5px 10px rgb(0 0 0 / 0.5);
}
#nav {
  padding-left: 24px;
  padding-right: 24px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
