<template>
  <div id="app">
    <list-container />
  </div>
</template>

<script>
import ListContainer from "./components/ListContainer.vue";

export default {
  components: {
    "list-container": ListContainer,
  },
};
</script>

<style>
#app {
  margin: 1rem;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
