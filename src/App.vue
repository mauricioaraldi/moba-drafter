<template>
  <div>
    <Header @clearData="clearData"/>
    <main>
      <router-view
        @deleteHero="deleteHero"
        @deleteMap="deleteMap"
        :heroes="heroes"
        :maps="maps"
        @saveHero="saveHero"
        @saveMap="saveMap"
      />
    </main>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import { LOCAL_STORAGE } from './constants';

  export default {
    name: 'App',
    data() {
      let data = {
        currentId: 0,
        heroes: {},
        maps: {},
      };

      const savedData = localStorage.getItem(LOCAL_STORAGE.DATA);

      if (!savedData) {
        localStorage.setItem(LOCAL_STORAGE.DATA, JSON.stringify(data));
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
      clearData() {
        const confirmation = confirm('Are you sure that you want to clear all saved data?');

        if (!confirmation) {
          return;
        }

        localStorage.removeItem(LOCAL_STORAGE.DATA);
        this.currentId = 0;
        this.$router.push('/');
      },
      deleteHero(hero) {
        if (!hero || !hero.id) {
          return;
        }

        delete this.heroes[hero.id];

        Object.keys(this.heroes).forEach(key => {
          const curHero = this.heroes[key];

          delete curHero.synergies[hero.id];
          delete curHero.counters[hero.id];
        });

        this.saveData();
      },
      deleteMap(map) {
        if (!map || !map.id) {
          return;
        }

        delete this.maps[map.id];

        Object.keys(this.heroes).forEach(key => {
          const curHero = this.heroes[key];

          delete curHero.maps[map.id];
        });

        this.saveData();
      },
      saveData() {
        const data = {
          currentId: this.currentId,
          heroes: this.heroes,
          maps: this.maps,
        };

        localStorage.setItem(LOCAL_STORAGE.DATA, JSON.stringify(data));
      },
      saveHero(hero) {
        if (!hero) {
          return;
        }

        if (!hero.id) {
          hero.id = ++this.currentId;
        }

        this.heroes[hero.id] = hero;

        this.saveData();
      },
      saveMap(map) {
        if (!map) {
          return;
        }

        if (!map.id) {
          map.id = ++this.currentId;
        }

        this.maps[map.id] = map;

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
