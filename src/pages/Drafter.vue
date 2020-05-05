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
        :options="heroPool"
        placeholder="Select a ban"
        v-model="banId"
      />
      <button @click="ban()">Ban</button>

      <ul>
        <li v-for="hero in bans" :key="hero.id">
          {{ hero.name }}
        </li>
      </ul>
    </fieldset>

    <fieldset>
      <legend>Ally picks</legend>
      <Select
        :options="heroPool"
        placeholder="Select an ally pick"
        v-model="allyId"
      />
      <button @click="allyPick()">Pick</button>

      <ul>
        <li v-for="hero in allyPicks" :key="hero.id">
          {{ hero.name }}
        </li>
      </ul>
    </fieldset>

    <fieldset>
      <legend>Enemy picks</legend>
      <Select
        :options="heroPool"
        placeholder="Select an enemy pick"
        v-model="enemyId"
      />
      <button @click="enemyPick()">Pick</button>

      <ul>
        <li v-for="hero in enemyPicks" :key="hero.id">
          {{ hero.name }}
        </li>
      </ul>
    </fieldset>

    <p>Hero pool</p>
    <ul>
      <li v-for="hero in getHeroPoolSortedByScore()" :key="hero.id">
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
        heroPool: Object.assign({}, this.heroes),
        allyId: '',
        allyPicks: {},
        banId: '',
        bans: {},
        enemyId: '',
        enemyPicks: {},
        map: '',
      };
    },
    methods: {
      allyPick() {
        if (!this.allyId) {
          return;
        }

        const hero = this.heroes[this.allyId];

        this.$delete(this.heroPool, hero.id);

        this.allyPicks[hero.id] = hero;
        this.allyId = '';

        this.calculateHeroPoolScore();
      },
      ban() {
        if (!this.banId) {
          return;
        }

        const hero = this.heroes[this.banId];

        this.$delete(this.heroPool, hero.id);

        this.bans[hero.id] = hero;
        this.banId = '';

        this.calculateHeroPoolScore();
      },
      calculateHeroPoolScore() {
        Object.values(this.heroPool).forEach(hero => this.calculateScore(hero));
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
        if (!this.enemyId) {
          return;
        }

        const hero = this.heroes[this.enemyId];

        this.$delete(this.heroPool, hero.id);

        this.enemyPicks[hero.id] = hero;
        this.enemyId = '';

        this.calculateHeroPoolScore();
      },
      getFilterIds() {
        return [
          ...Object.keys(this.allyPicks),
          ...Object.keys(this.enemyPicks),
          ...Object.keys(this.bans),
        ].map(id => parseInt(id));
      },
      getHeroPoolSortedByScore() {
        return Object.values(this.heroPool)
          .sort((a, b) => b.score - a.score);
      },
    },
  };
</script>

<style scoped>
  fieldset > label {
    display: inline-block;
  }
</style>
