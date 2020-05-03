<template>
  <main>
    <fieldset>
      <legend>Weights</legend>
      <Input
        label="Hero rating"
        placeholder="Set the rating weight"
        step="0.5"
        type="number"
        v-model="weights.rating"
      />
      <Input
        label="Map"
        placeholder="Set the map weight"
        step="0.5"
        type="number"
        v-model="weights.map"
      />
      <Input
        label="Counter"
        placeholder="Set the counter weight"
        step="0.5"
        type="number"
        v-model="weights.counter"
      />
      <Input
        label="Countered"
        placeholder="Set the countered weight"
        step="0.5"
        type="number"
        v-model="weights.countered"
      />
      <Input
        label="Map"
        placeholder="Set the synergy weight"
        step="0.5"
        type="number"
        v-model="weights.synergy"
      />
      <button @click="save">Save</button>
    </fieldset>
    <fieldset>
      <legend>Data</legend>
      <button @click="exportData">Export data</button>
      <button @click="importData">Import data</button>
      <button @click="clearData">Clear data</button>
    </fieldset>
  </main>
</template>

<script>
  import Input from '../components/Input.vue';

  export default {
    name: 'Configuration',
    props: {
      configurations: Object,
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
          counter: this.configurations.weights.counter,
          countered: this.configurations.weights.countered,
          map: this.configurations.weights.map,
          rating: this.configurations.weights.rating,
          synergy: this.configurations.weights.synergy,
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
        this.$emit('saveConfigurations', { weights: this.weights });
      },
    },
  };
</script>

<style scoped>
</style>
