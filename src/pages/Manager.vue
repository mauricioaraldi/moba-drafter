<template>
  <main>
    <router-link to="/hero">Add hero</router-link>
  </main>
</template>

<script>
  export default {
    name: 'Manager',
    props: {
      heroes: Object,
      maps: Object,
    },
  }
</script>

<style scoped>
</style>
