<template>
  <label>
    <span v-if="label">{{ label }}</span>
    <select :value="this.$attrs.value" v-on="inputListeners">
      <option disabled value="">{{ placeholder }}</option>
      <option
        :key="option.id"
        v-for="option in this.filteredOptions"
        :value="option.id"
      >
        {{option.name}}
      </option>
    </select>
  </label>
</template>

<script>
  import { sortData } from '../Utils';

  export default {
    name: 'Select',
    props: {
      filterIds: [Number, Array],
      label: String,
      options: [Object, Array],
      placeholder: String,
      sort: Boolean,
    },
    inheritAttrs: false,
    computed: {
      filteredOptions() {
        const { filterIds, options, sort } = this;
        let optionsAsArray = Array.isArray(options) ? options : Object.values(options);

        if (filterIds) {
          const filterIdsArray = Array.isArray(filterIds) ? filterIds : [filterIds];
          const filtersAsNumber = filterIdsArray.map(id => parseInt(id));
          optionsAsArray = optionsAsArray.filter(option => filtersAsNumber.indexOf(option.id) === -1);
        }

        return sort !== false ? sortData(optionsAsArray) : optionsAsArray;
      },
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
