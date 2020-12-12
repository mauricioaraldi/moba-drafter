<template>
  <main>
    <fieldset>
      <legend>Weights</legend>

      <form>
        <Input
          variant="small"
          label="Hero rating"
          placeholder="Set the rating weight"
          step="0.5"
          type="number"
          v-model="weights.rating"
        />
        <Input
          variant="small"
          label="Map"
          placeholder="Set the map weight"
          step="0.5"
          type="number"
          v-model="weights.map"
        />
        <Input
          variant="small"
          label="Counter"
          placeholder="Set the counter weight"
          step="0.5"
          type="number"
          v-model="weights.counter"
        />
        <Input
          variant="small"
          label="Countered"
          placeholder="Set the countered weight"
          step="0.5"
          type="number"
          v-model="weights.countered"
        />
        <Input
          variant="small"
          label="Synergy"
          placeholder="Set the synergy weight"
          step="0.5"
          type="number"
          v-model="weights.synergy"
        />
        <button id="saveButton" @click="save">Save</button>
      </form>
    </fieldset>
    <fieldset>
      <legend>Data</legend>
      <div id="dataButtons">
        <button @click="exportData">Export data</button>
        <button @click="importData">Import data</button>
        <button @click="clearData">Clear data</button>
      </div>
    </fieldset>
  </main>
</template>

<script>
  import Input from '../components/Input.vue';

  export default {
    name: 'Settings',
    props: {
      settings: Object,
      heroes: Object,
      maps: Object,
      roles: Object,
    },
    components: {
      Input,
    },
    data() {
      return {
        weights: {
          counter: this.settings.weights.counter,
          countered: this.settings.weights.countered,
          map: this.settings.weights.map,
          rating: this.settings.weights.rating,
          synergy: this.settings.weights.synergy,
        },
      };
    },
    methods: {
      clearData() {
        this.$emit('clearData');
        this.$router.push('/');
      },
      exportData() {},
      importData() {},
      save() {
        this.$emit('saveSettings', { weights: this.weights });
      },
    },
  };
</script>

<style lang="scss" scoped>
  form {
    display: grid;
    grid-gap: 8px 0;
    grid-template-columns: repeat(2, 50%);
  }

  fieldset {
    margin-bottom: 16px;
  }

  #saveButton {
    margin: 8px;
  }

  #dataButtons {
    display: flex;
    justify-content: center;
    padding: 8px;
  }

  #dataButtons > button:nth-child(2) {
    margin: 0 8px;
  }
</style>
