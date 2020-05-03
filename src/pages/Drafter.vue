<template>
  <main>
    <Select
      label="Map"
      :options="maps"
      placeholder="Select a map"
      v-model="map"
      @change="updateHeroPool"
    />

    <fieldset>
      <legend>Bans</legend>
      <Select
        :options="heroPool"
        placeholder="Select a hero"
        v-model="heroBans"
      />
      <button @click="ban()">Ban</button>
    </fieldset>

    <fieldset>
      <legend>Ally picks</legend>
      <Select
        :options="heroPool"
        placeholder="Select an ally pick"
        v-model="allyPicks"
      />
      <button @click="allyPick()">Pick</button>
    </fieldset>

    <fieldset>
      <legend>Enemy picks</legend>
      <Select
        :options="heroPool"
        placeholder="Select an enemy pick"
        v-model="enemyPicks"
      />
      <button @click="enemyPick()">Pick</button>
    </fieldset>

    <p>Hero pool</p>
    <ul>
      <li v-for="hero in heroPool" :key="hero.id">
        {{ hero.name }} {{ calculateScore(hero) }}
      </li>
    </ul>
  </main>
</template>

<script>
  import Select from '../components/Select';

  export default {
    name: 'Drafter',
    props: {
      configurations: Object,
      heroes: Object,
      maps: Object,
      roles: Object,
    },
    components: {
      Select,
    },
    data() {
      return {
        map: '',
        heroBans: '',
        allyPicks: '',
        enemyPicks: '',
        heroPool: Object.assign({}, this.heroes),
      };
    },
    methods: {
      allyPick() {
      },
      ban() {
      },
      calculateScore(hero) {
        console.log(hero);
      },
      enemyPick() {
      },
      updateHeroPool() {
      }
    }
  }
</script>

<style scoped>
  fieldset > label {
    display: inline-block;
  }
</style>
