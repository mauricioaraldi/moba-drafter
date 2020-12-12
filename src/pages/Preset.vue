<template>
  <main>
    <fieldset>
      <legend>Choose a preset</legend>
      <div>
        <button @click="choosePreset('hots')">Heroes of the Storm</button>
      </div>
    </fieldset>
  </main>
</template>

<script>
  import hots from '../../presets/hots.json';

  export default {
    name: 'Preset',
    props: {
      settings: Object,
      heroes: Object,
      maps: Object,
      roles: Object,
    },
    components: {},
    methods: {
      choosePreset(preset) {
        const confirmation = confirm('Doing this will erase all the current data. Are you sure?');

        if (!confirmation) {
          return;
        }

        let presets = {
          hots,
        };

        if (!presets[preset]) {
          alert('Preset data not found');
          return;
        }

        this.$emit('setPreset', presets[preset]);
        this.$router.push('/');
      },
    },
  };
</script>

<style lang="scss" scoped>
  fieldset {
    padding: 8px 0;
  }
  div {
    align-content: center;
    display: flex;
    justify-content: center;
  }
</style>