<template>
  <main>
    <Select
      label="Map"
      :options="maps"
      placeholder="Select a map"
      v-model="map"
      v-if="maps.length"
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
          <button class="delete-button" @click="removeBan(hero)">X</button>
          <span class="name">{{ hero.name }}</span>
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
          <button class="delete-button" @click="removeAlly(hero)">X</button>
          <span class="name">{{ hero.name }}</span>
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
          <button class="delete-button" @click="removeEnemy(hero)">X</button>
          <span class="name">{{ hero.name }}</span>
        </li>
      </ul>
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
      settings: Object,
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
    computed: {
      heroPoolSortedByScore() {
        return Object.values(this.heroPool)
                .map(hero => this.calculateScore(hero))
                .sort((a, b) => b.score - a.score);
      },
    },
    methods: {
      allyPick() {
        if (!this.allyId) {
          return;
        }

        const hero = this.heroes[this.allyId];

        this.$delete(this.heroPool, hero.id);
        this.$set(this.allyPicks, hero.id, hero);

        this.allyId = '';
      },
      ban() {
        if (!this.banId) {
          return;
        }

        const hero = this.heroes[this.banId];

        this.$delete(this.heroPool, hero.id);
        this.$set(this.bans, hero.id, hero);

        this.banId = '';
      },
      calculateScore(hero) {
        const allies = Object.values(this.allyPicks);
        const enemies = Object.values(this.enemyPicks);
        const { weights } = this.settings;

        hero.score = 0;

        if (hero.rating) {
          hero.score += parseInt(hero.rating) * parseInt(weights.rating);
        }

        if (this.map && hero.maps[this.map]) {
          hero.score += parseInt(hero.maps[this.map]) * parseInt(weights.map);
        }

        allies.forEach(ally => {
          if (hero.synergies[ally.id]) {
            hero.score += parseInt(hero.synergies[ally.id]) * parseInt(weights.synergy);
          }
        });

        enemies.forEach(enemy => {
          if (hero.counters[enemy.id]) {
            hero.score += parseInt(hero.counters[enemy.id]) * parseInt(weights.counter);
          }

          if (enemy.counters[hero.id]) {
            hero.score -= parseInt(enemy.counters[hero.id]) * parseInt(weights.countered);
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
        this.$set(this.enemyPicks, hero.id, hero);

        this.enemyId = '';
      },
      removeAlly(hero) {
        if (!hero) {
          return;
        }

        this.$set(this.heroPool, hero.id, hero);
        this.$delete(this.allyPicks, hero.id);
      },
      removeBan(hero) {
        if (!hero) {
          return;
        }

        this.$set(this.heroPool, hero.id, hero);
        this.$delete(this.bans, hero.id);
      },
      removeEnemy(hero) {
        if (!hero) {
          return;
        }

        this.$set(this.heroPool, hero.id, hero);
        this.$delete(this.enemyPicks, hero.id);
      },
    },
  };
</script>

<style scoped>
  fieldset > label {
    display: inline-block;
  }

  ul > li:nth-child(even) {
    background-color: #E0E0E0;
  }

  .delete-button {
    padding: 6px 0 0;
  }

  .name {
    display: inline-block;
    text-align: center;
    width: 100px;
  }
</style>
