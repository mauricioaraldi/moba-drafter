<template>
  <div>
    <button @click="set('STRONG')">Strong</button>
    <button @click="set('GOOD')">Good</button>
    <button @click="set('MIDDLE')">Middle</button>
    <button @click="set('WEAK')">Weak</button>
    <button @click="set('NONE')">None</button>
  </div>
</template>

<script>
  import { LEVEL } from '../constants';

  export default {
    name: 'RatingSetter',
    methods: {
      set(level) {
        const rating = LEVEL[level];
        this.$emit('input', rating);
      }
    }
  }
</script>

<style scoped>
  div {
    display: inline-block;
  }
</style>
