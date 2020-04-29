<template>
  <div>
    <Header />
    <main>
      <router-view :heroes="heroes" :maps="maps" @addHero="addHero"></router-view>
    </main>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import constants from './constants';

  export default {
    name: 'App',
    data: () => {
      let data = {
        heroes: {},
        maps: {},
      };

      const savedData = localStorage.getItem(constants.LOCALSTORAGE.DATA);

      if (!savedData) {
        localStorage.setItem(constants.LOCALSTORAGE.DATA, JSON.stringify(data));
      } else {
        data = JSON.parse(savedData);
      }

      data.heroes = {
        test: {
          id: 'test',
          name: 'Test'
        },
        testa: {
          id: 'testa',
          name: 'TestA'
        },
        testb: {
          id: 'testb',
          name: 'TestB'
        },
      }

      return {
        heroes: data.heroes,
        maps: data.maps,
      };
    },
    methods: {
      addHero(hero) {
        console.log(hero);
      }
    },
    components: {
      Header
    }
  }
</script>

<style scoped>  
</style>

<style>
  @import '~normalize.css';

  body { 
    background: #F7F7F7;
  }

  main {
    padding: 16px;
  }
</style>
