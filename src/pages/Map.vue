<template>
  <main v-if="map">
    <Input label="Name" v-model="map.name" type="text"/>
    <Input label="Objective Time (in seconds)" v-model="map.objectiveTime" type="number"/>

    <button @click="deleteMap" v-if="map.id">Delete</button>
    <button @click="save">Save</button>
  </main>

  <main v-else>
    No map found for this id!
  </main>
</template>

<script>
  import Input from '../components/Input.vue';

  export default {
    name: 'Map',
    props: {
      heroes: Object,
      maps: Object,
      roles: Object,
    },
    data() {
      const id = this.$route.params.id;
      const map = id ? this.maps[id] : {
        name: '',
        objectiveTime: '0'
      };

      return {
        map,
      };
    },
    components: {
      Input,
    },
    methods: {
      deleteMap() {
        const confirmation = confirm('Are you sure that you want to delete this map?');

        if (!confirmation) {
          return;
        }

        this.$emit('deleteMap', this.map);        
        this.$router.push('/manager');
      },
      save() {
        if (!this.map.name) {
          return alert('Map name is required');
        }

        this.$emit('saveMap', this.map);
        this.$router.push('/manager');
      }
    },
  }
</script>

<style scoped>
</style>
