<template>
  <main>
    <p>Drafter!</p>
    <ul>
      <li v-for="index in 3" :key="index">
        {{ sortedHeroes[index - 1] }}
      </li>
    </ul>
  </main>
</template>

<script>
  import { sortHeroes } from '../Utils'

  export default {
    name: 'Drafter',
    data() {
      return {
        sortedHeroes: sortHeroes(this.heroes), 
      }
    },
    props: {
      heroes: Object,
      maps: Object,
    },
  }
</script>

<style scoped>
</style>
