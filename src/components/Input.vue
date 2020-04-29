<template>
  <label>
    <span>{{ label }}</span>
    <input :placeholder="label" :type="type" v-on="inputListeners"/>
  </label>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      label: String,
      model: Object,
      type: String,
    },
    inheritAttrs: false,
    computed: {
      inputListeners() {
        return Object.assign(
          {},
          this.$listeners,
          { input: event => this.$emit('input', event.target.value) },
        );
      },
    },
  }
</script>

<style scoped>
  label {
    display: block;
  }

  span {
    display: block;
  }
</style>
