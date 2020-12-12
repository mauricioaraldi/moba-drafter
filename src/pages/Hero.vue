<template>
  <main v-if="hero">
    <Input label="Name" v-model="hero.name" type="text"/>
    <Select
      :options="this.roles"
      placeholder="Select a role"
      v-model="hero.role"
    />
    <Input
      label="Rating"
      max="10"
      min="0"
      placeholder="Rating"
      type="number"
      v-model="hero.rating"
    />
    <RatingSetter v-model="hero.rating"/>


    <fieldset>
      <legend>Synergies</legend>
      <Select
        :filterIds="[...Object.keys(this.hero.synergies), this.hero.id]"
        :options="this.heroes"
        placeholder="Select a synergy"
        v-model="addSynergyValue"
      />
      <button @click="addSynergy">Add</button>
      <ul>
        <li v-for="key in Object.keys(hero.synergies)" :key="key">
          <button class="delete-button" @click="removeSynergy(key)">X</button>
          <span class="name">{{ heroes[key].name }}</span>
          <Input
            max="10"
            min="0"
            placeholder="Synergy rating"
            type="number"
            v-model="hero.synergies[key]"
          />
          <RatingSetter v-model="hero.synergies[key]"/>
        </li>
      </ul>
    </fieldset>

    <fieldset>
      <legend>Counters</legend>
      <Select
        :filterIds="[...Object.keys(this.hero.counters), this.hero.id]"
        :options="this.heroes"
        placeholder="Select a counter"
        v-model="addCounterValue"
      />
      <button @click="addCounter">Add</button>
      <ul>
        <li v-for="key in Object.keys(hero.counters)" :key="key">
          <button class="delete-button" @click="removeCounter(key)">X</button>
          <span class="name">{{ heroes[key].name }}</span>
          <Input
            max="10"
            min="0"
            placeholder="Counter rating"
            type="number"
            v-model="hero.counters[key]"
          />
          <RatingSetter v-model="hero.counters[key]"/>
        </li>
      </ul>
    </fieldset>

    <fieldset>
      <legend>Maps</legend>
      <Select
        :filterIds="Object.keys(this.hero.maps)"
        :options="this.maps"
        placeholder="Select a map"
        v-model="addMapValue"
      />
      <button @click="addMap">Add</button>
      <ul>
        <li v-for="key in Object.keys(hero.maps)" :key="key">
          <button class="delete-button" @click="removeMap(key)">X</button>
          <span class="name">{{ maps[key].name }}</span>
          <Input
            max="10"
            min="0"
            placeholder="Map rating"
            type="number"
            v-model="hero.maps[key]"
          />
          <RatingSetter v-model="hero.maps[key]"/>
        </li>
      </ul>
    </fieldset>

    <button @click="deleteHero" v-if="hero.id">Delete</button>
    <button @click="save">Save</button>
  </main>

  <main v-else>
    No hero found for this id!
  </main>
</template>

<script>
  import Input from '../components/Input.vue';
  import RatingSetter from '../components/RatingSetter.vue';
  import Select from '../components/Select.vue';

  export default {
    name: 'Hero',
    props: {
      settings: Object,
      heroes: Object,
      maps: Object,
      roles: Object,
    },
    data() {
      const id = this.$route.params.id;
      const hero = id ? this.heroes[id] : {
        name: '',
        counters: {},
        maps: {},
        rating: '0',
        synergies: {},
      };

      return {
        hero,
        addCounterValue: '',
        addMapValue: '',
        addSynergyValue: '',
      };
    },
    components: {
      Input,
      RatingSetter,
      Select,
    },
    methods: {
      addCounter() {
        this.$set(this.hero.counters, this.addCounterValue, '10');
        this.addCounterValue = '';
      },
      addMap() {
        this.$set(this.hero.maps, this.addMapValue, '10');
        this.addMapValue = '';
      },
      addSynergy() {
        this.$set(this.hero.synergies, this.addSynergyValue, '10');
        this.$set(this.heroes[this.addSynergyValue].synergies, this.hero.id, '10');
        this.addSynergyValue = '';
      },
      deleteHero() {
        const confirmation = confirm('Are you sure that you want to delete this hero?');

        if (!confirmation) {
          return;
        }

        this.$emit('deleteHero', this.hero);        
        this.$router.push('/manager');
      },
      removeCounter(key) {
        if (!key) {
          return;
        }

        this.$delete(this.hero.counters, key);
        this.$forceUpdate();
      },
      removeMap(key) {
        if (!key) {
          return;
        }

        this.$delete(this.hero.maps, key);
        this.$forceUpdate();
      },
      removeSynergy(key) {
        if (!key) {
          return;
        }

        this.$delete(this.hero.synergies, key);
        this.$forceUpdate();
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
  main > label:nth-child(2) {
    margin: 0 16px;
  }

  label {
    display: inline-block;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  ul > li {
    padding: 8px;
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
