<template>
  <header>
    <h1>Moba Drafter</h1>
    <nav>
      <router-link to="/" active-class="active" exact>Drafter</router-link>
      <router-link to="/manager" active-class="active">Manager</router-link>
      <button>Export data</button>
      <button>Import data</button>
      <button @click="clearData">Clear data</button>
    </nav>
  </header>
</template>

<script>
  import constants from '../constants';

  export default {
    name: 'Header',
    methods: {
      clearData() {
        const confirmation = confirm('Are you sure that you want to clear all saved data?');

        if (!confirmation) {
          return;
        }

        localStorage.removeItem(constants.LOCAL_STORAGE.DATA);
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>
  header {
    background-color: #FFFFFF;
    padding: 16px;
    text-align: center;
  }

  header > nav > a,
  header > nav > button {
    margin-right: 16px;
  }

  header > nav > button:last-child {
    margin-right: 0;
  }

  h1 {
    margin-top: 0;
  }

  .active {
    color: #FF0000;
  }
</style>
