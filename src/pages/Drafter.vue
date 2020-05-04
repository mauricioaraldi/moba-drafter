<template>
  <main>
    <Select
      label="Map"
      :options="maps"
      placeholder="Select a map"
      v-model="map"
    />

    <fieldset>
      <legend>Bans</legend>
      <Select
        :filterIds="getFilterIds()"
        :options="heroes"
        placeholder="Select a hero"
        v-model="banId"
      />
      <button @click="ban()">Ban</button>
    </fieldset>

    <fieldset>
      <legend>Ally picks</legend>
      <Select
        :filterIds="getFilterIds()"
        :options="heroes"
        placeholder="Select an ally pick"
        v-model="allyId"
      />
      <button @click="allyPick()">Pick</button>
    </fieldset>

    <fieldset>
      <legend>Enemy picks</legend>
      <Select
        :filterIds="getFilterIds()"
        :options="heroes"
        placeholder="Select an enemy pick"
        v-model="enemyId"
      />
      <button @click="enemyPick()">Pick</button>
    </fieldset>

    <p>Hero pool</p>
    <ul>
      <li v-for="hero in heroPoolSortedByScore" :key="hero.id">
        {{ hero.name }} [{{ hero.score }}]
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
        allyId: '',
        allyPicks: {},
        banId: '',
        bans: {},
        enemyId: '',
        enemyPicks: {},
        map: '',
      };
    },
    computed: {
      heroPoolSortedByScore() {
        const filterIds = this.getFilterIds();

        return Object.values(this.heroes)
          .filter(hero => filterIds.indexOf(hero.id) === -1)
          .map(hero => this.calculateScore(hero))
          .sort((a, b) => b.score - a.score);
      },
    },
    methods: {
      allyPick() {
        const hero = this.heroes[this.allyId];

        this.allyPicks[hero.id] = hero;
        this.allyId = '';
      },
      ban() {
        const hero = this.heroes[this.banId];

        this.bans[hero.id] = hero;
        this.banId = '';
      },
      calculateScore(hero) {
        const allies = Object.values(this.allyPicks);
        const enemies = Object.values(this.enemyPicks);

        hero.score = parseInt(hero.rating) * this.configurations.weights.rating;

        if (this.map && hero.maps[this.map]) {
          hero.score += parseInt(hero.maps[this.map]) * this.configurations.weights.map;
        }

        allies.forEach(ally => {
          if (hero.synergies[ally.id]) {
            hero.score += parseInt(hero.synergies[ally.id]) * this.configurations.weights.synergy;
          }
        });

        enemies.forEach(enemy => {
          if (hero.counters[enemy.id]) {
            hero.score += parseInt(hero.counters[enemy.id]) * this.configurations.weights.counters;
          }

          if (enemy.counters[hero.id]) {
            hero.score -= parseInt(enemy.counters[hero.id]) * this.configurations.weights.countered;
          }
        });

        return hero;
      },
      enemyPick() {
        const hero = this.heroes[this.enemyId];

        this.enemyPicks[hero.id] = hero;
        this.enemyId = '';
      },
      getFilterIds() {
        return [
          ...Object.keys(this.allyPicks),
          ...Object.keys(this.enemyPicks),
          ...Object.keys(this.bans),
        ];
      }
    },
  };
</script>

<style scoped>
  fieldset > label {
    display: inline-block;
  }
</style>
