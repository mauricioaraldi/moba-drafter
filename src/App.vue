<template>
  <div>
    <Header />
    <main>
      <router-view
        :heroes="heroes"
        :maps="maps"
        @saveHero="saveHero"
      />
    </main>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import constants from './constants';

  export default {
    name: 'App',
    data() {
      let data = {
        currentId: 0,
        heroes: {},
        maps: {},
      };

      const savedData = localStorage.getItem(constants.LOCALSTORAGE.DATA);

      if (!savedData) {
        localStorage.setItem(constants.LOCALSTORAGE.DATA, JSON.stringify(data));
      } else {
        data = JSON.parse(savedData);
      }

      return {
        currentId: data.currentId,
        heroes: data.heroes,
        maps: data.maps,
      };
    },
    components: {
      Header
    },
    methods: {
      saveData() {
        const data = {
          currnetId: this.currentId,
          heroes: this.heroes,
          maps: this.maps,
        };

        localStorage.setItem(constants.LOCALSTORAGE.DATA, JSON.stringify(data));
      },
      saveHero(hero) {
        if (!hero.id) {
          hero.id = ++this.currentId;
        }

        this.heroes[hero.id] = hero;

        this.saveData();
      }
    },
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
