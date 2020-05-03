<template>
  <label>
    <span v-if="label">{{ label }}</span>
    <input
      :min="min"
      :max="max"
      :placeholder="label"
      :step="step"
      :type="type"
      v-on="inputListeners"
      :value="this.$attrs.value"
    />
  </label>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      label: String,
      min: String,
      max: String,
      step: String,
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
  };
</script>

<style scoped>
  label {
    display: block;
  }

  span {
    display: block;
  }
</style>
