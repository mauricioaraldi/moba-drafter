<template>
  <header>
    <img src="../assets/logo.png" alt="logo" />

    <nav>
      <router-link to="/settings" active-class="active">Settings</router-link>
      <router-link to="/preset" active-class="active">Presets</router-link>
      <router-link to="/drafter" active-class="active" exact>Drafter</router-link>
      <router-link to="/manager" active-class="active">Manager</router-link>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'Header',
  };
</script>

<style lang="scss" scoped>
  header {
    align-items: center;
    background-color: $primary-color;
    display: flex;
    padding: 8px;
    text-align: center;
  }

  img {
    margin-right: 8px;
    width: 60px;
  }

  nav {
    display: grid;
    flex-grow: 2;
    grid-gap: 1px;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(2, 50%);
    margin: auto;
  }

  nav > a {
    background-color: $tertiary-complement-color;
    color: $light-color;
    padding: 8px 0;
    text-decoration: none;
    width: 100%;
  }

  .active {
    background-color: $tertiary-color;
  }
</style>
