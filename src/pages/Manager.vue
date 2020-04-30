<template>
  <main>
    <router-link to="/manager/hero">Add hero</router-link>
    <ul>
      <li v-for="hero in sortedHeroes" :key="hero.id">
        <router-link :to="`/manager/hero/${hero.id}`">{{ hero.name }}</router-link>
      </li>
    </ul>
  </main>
</template>

<script>
  import { sortData } from '../Utils'

  export default {
    name: 'Manager',
    props: {
      heroes: Object,
      maps: Object,
    },
    data() {
      return {
        sortedHeroes: sortData(this.heroes),
      }
    },
  }
</script>

<style scoped>
</style>
