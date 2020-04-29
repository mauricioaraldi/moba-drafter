<template>
  <main>
    <Input label="Name" v-model="name"/>
    <button @click="save">Save</button>
  </main>
</template>

<script>
  import Input from '../components/Input.vue';

  export default {
    name: 'AddHero',
    props: {
      heroes: Object,
      maps: Object,
    },
    data() {
      return {
        name: '',
      };
    },
    components: {
      Input,
    },
    methods: {
      save() {
        this.$emit('saveHero', { name: this.name });
      }
    },
  }
</script>

<style scoped>
</style>
