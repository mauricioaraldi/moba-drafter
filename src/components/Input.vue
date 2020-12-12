<template>
  <label :class="variant">
    <span v-if="label" :class="variant">{{ label }}</span>
    <input
      :class="variant"
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
      variant: String,
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

<style lang="scss" scoped>
  label {
    display: block;
  }

  span {
    display: block;
    margin-bottom: 4px;
  }

  input {
    box-sizing: border-box;
    width: 100%;

      &.small {
        width: 50px;
      }
  }
</style>
