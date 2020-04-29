<template>
  <header>
    <h1>Moba Drafter</h1>
    <nav>
      <a href="/">Drafter</a>
      <a href="/manager">Manager</a>
      <button>Export data</button>
      <button>Import data</button>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<style scoped>
  header {
    background-color: #FFFFFF;
    padding: 16px;
    text-align: center;
  }

  header > nav > a,
  header > nav > button:nth-child(3) {
    margin-right: 16px;
  }

  h1 {
    margin-top: 0;
  }
</style>
