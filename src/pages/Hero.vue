<template>
  <main>
    <Input label="Name" v-model="hero.name" type="text"/>

    <fieldset>
      <legend>Synergies</legend>
      <Select
        :filters="[...Object.values(this.hero.synergies), this.hero]"
        :options="this.heroes"
        placeholder="Select a synergy"
        v-model="addSynergyValue"
      />
      <button @click="addSynergy">Add</button>
      <ul>
        <li v-for="hero in hero.synergies" :key="hero.id">
          {{ hero.name }}
        </li>
      </ul>
    </fieldset>

    <fieldset>
      <legend>Counters</legend>
      <Select
        :filters="[...Object.values(this.hero.counters), this.hero]"
        :options="this.heroes"
        placeholder="Select a counter"
        v-model="addCounterValue"
      />
      <button @click="addCounter">Add</button>
      <ul>
        <li v-for="hero in hero.counters" :key="hero.id">
          {{ hero.name }}
        </li>
      </ul>
    </fieldset>

    <fieldset>
      <legend>Maps</legend>
      <Select
        :filters="Object.values(this.hero.maps)"
        :options="this.maps"
        placeholder="Select a map"
        v-model="addMapValue"
      />
      <button @click="addMap">Add</button>
      <ul>
        <li v-for="map in hero.maps" :key="map.id">
          {{ hero.map }}
        </li>
      </ul>
    </fieldset>

    <button @click="save">Save</button>
  </main>
</template>

<script>
  import Input from '../components/Input.vue';
  import Select from '../components/Select.vue';

  export default {
    name: 'AddHero',
    props: {
      heroes: Object,
      maps: Object,
    },
    data() {
      const id = this.$route.params.id;
      const hero = this.heroes[id] || {
        name: '',
        counters: {},
        maps: {},
        synergies: {},
      };

      return {
        hero,
        addCounterValue: null,
        addMapValue: null,
        addSynergyValue: null,
      };
    },
    components: {
      Input,
      Select,
    },
    methods: {
      addCounter() {
        this.hero.counters[this.addCounterValue] = this.heroes[this.addCounterValue];
        this.addCounterValue = null;
      },
      addMap() {
        this.hero.maps[this.addMapValue] = this.heroes[this.addMapValue];
        this.addMapValue = null;
      },
      addSynergy() {
        this.hero.synergies[this.addSynergyValue] = this.heroes[this.addSynergyValue];
        this.addSynergyValue = null;
      },
      save() {
        if (!this.hero.name) {
          return alert('Hero name is required');
        }

        this.$emit('saveHero', this.hero);
        this.$router.push('/manager');
      }
    },
  }
</script>

<style scoped>
  label {
    display: inline-block;
  }
</style>
