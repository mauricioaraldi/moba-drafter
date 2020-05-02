<template>
  <main>
    <fieldset>
      <legend>Heroes</legend>
      <router-link to="/manager/hero">Add</router-link>
      <ul>
        <li v-for="hero in sortedHeroes" :key="hero.id">
          <router-link :to="`/manager/hero/${hero.id}`">{{ hero.name }}</router-link>
        </li>
      </ul>
    </fieldset>
    <fieldset>
      <legend>Maps</legend>
      <router-link to="/manager/map">Add</router-link>
      <ul>
        <li v-for="map in sortedMaps" :key="map.id">
          <router-link :to="`/manager/map/${map.id}`">{{ map.name }}</router-link>
        </li>
      </ul>
    </fieldset>
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
        sortedMaps: sortData(this.maps),
      }
    },
  }
</script>

<style scoped>
</style>
