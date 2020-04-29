<template>
  <main>
    <p>Manager!</p>
    <button @click="addHero">Add hero</button>
  </main>
</template>

<script>
  export default {
    name: 'Manager',
    props: {
      heroes: Object,
      maps: Object,
    },
    methods: {
      addHero() {
        this.$emit('addHero', {id: 'test', name: 'Test'})
      }
    }
  }
</script>

<style scoped>
</style>
