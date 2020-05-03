<template>
  <main v-if="role">
    <Input label="Name" v-model="role.name" type="text"/>

    <button @click="deleteRole" v-if="role.id">Delete</button>
    <button @click="save">Save</button>
  </main>

  <main v-else>
    No role found for this id!
  </main>
</template>

<script>
  import Input from '../components/Input.vue';

  export default {
    name: 'Role',
    props: {
      configurations: Object,
      heroes: Object,
      maps: Object,
      roles: Object,
    },
    data() {
      const id = this.$route.params.id;
      const role = id ? this.roles[id] : { name: '' };

      return { role };
    },
    components: {
      Input,
    },
    methods: {
      deleteRole() {
        const confirmation = confirm('Are you sure that you want to delete this role?');

        if (!confirmation) {
          return;
        }

        this.$emit('deleteRole', this.role);        
        this.$router.push('/manager');
      },
      save() {
        if (!this.role.name) {
          return alert('Role name is required');
        }

        this.$emit('saveRole', this.role);
        this.$router.push('/manager');
      }
    },
  }
</script>

<style scoped>
</style>
