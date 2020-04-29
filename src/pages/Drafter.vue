<template>
  <main>
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
    props: {
      heroes: Object,
      maps: Object,
    },
    data() {
      return {
        sortedHeroes: sortHeroes(this.heroes),
      }
    },
  }
</script>

<style scoped>
</style>
