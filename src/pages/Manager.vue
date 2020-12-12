<template>
  <main>
    <fieldset>
      <legend>Roles</legend>
      <router-link to="/manager/role">Add</router-link>
      <ul>
        <li v-for="role in sortedRoles" :key="role.id">
          <router-link :to="`/manager/role/${role.id}`">{{ role.name }}</router-link>
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

    <fieldset>
      <legend>Heroes</legend>
      <router-link to="/manager/hero">Add</router-link>
      <ul>
        <li v-for="hero in sortedHeroes" :key="hero.id">
          <router-link :to="`/manager/hero/${hero.id}`">{{ hero.name }}</router-link>
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
      settings: Object,
      heroes: Object,
      maps: Object,
      roles: Object,
    },
    data() {
      return {
        sortedHeroes: sortData(this.heroes),
        sortedMaps: sortData(this.maps),
        sortedRoles: sortData(this.roles),
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
