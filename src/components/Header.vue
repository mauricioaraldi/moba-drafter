<template>
  <header>
    <h1>Moba Drafter</h1>
    <nav>
      <router-link to="/" active-class="active" exact>Drafter</router-link>
      <router-link to="/manager" active-class="active">Manager</router-link>
      <router-link to="/configuration" active-class="active">Configuration</router-link>
      <router-link to="/preset" active-class="active">Presets</router-link>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'Header',
  };
</script>

<style scoped>
  header {
    background-color: #FFFFFF;
    padding: 16px;
    text-align: center;
  }

  header > nav > a,
  header > nav > button {
    margin-right: 16px;
  }

  header > nav > button:last-child {
    margin-right: 0;
  }

  h1 {
    margin-top: 0;
  }

  .active {
    color: #FF0000;
  }
</style>
