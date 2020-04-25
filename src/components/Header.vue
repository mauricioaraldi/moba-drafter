<template>
  <header>
    <h1>Moba Drafter</h1>
    <nav>
      <a href="/">Drafter</a>
      <a href="/manager">Manager</a>
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
    left: 0;
    position: fixed;
    right: 0;
    text-align: center;
    top: 0;
  }

  header > nav > a:first-child {
    margin-right: 16px;
  }
</style>
