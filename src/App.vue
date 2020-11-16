<template>
  <div>
    <Header @clearData="clearData"/>
    <main>
      <router-view
        :configurations="configurations"
        @deleteHero="deleteHero"
        @deleteMap="deleteMap"
        @deleteRole="deleteRole"
        :heroes="heroes"
        :maps="maps"
        :roles="roles"
        @saveConfigurations="saveConfigurations"
        @saveHero="saveHero"
        @saveMap="saveMap"
        @saveRole="saveRole"
        @setPreset="setPreset"
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
        configurations: {
          weights: {
            rating: '10',
            map: '1',
            counter: '1',
            countered: '1.5',
            synergy: '1',
          },
        },
        currentId: '0',
        heroes: {},
        maps: {},
        roles: {},
      };

      const savedData = localStorage.getItem(LOCAL_STORAGE.DATA);

      if (!savedData) {
        localStorage.setItem(LOCAL_STORAGE.DATA, JSON.stringify(data));
      } else {
        data = JSON.parse(savedData);
      }

      return data;
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
      deleteRole(role) {
        if (!role || !role.id) {
          return;
        }

        delete this.roles[role.id];

        Object.keys(this.heroes).forEach(key => {
          const curHero = this.heroes[key];

          if (curHero.role === role.id) {
            curHero.role = '';
          }
        });

        this.saveData();
      },
      saveConfigurations(configurations) {
        this.configurations = configurations;
        this.saveData();
      },
      saveData() {
        const data = {
          configurations: this.configurations,
          currentId: this.currentId,
          heroes: this.heroes,
          maps: this.maps,
          roles: this.roles,
        };

        localStorage.setItem(LOCAL_STORAGE.DATA, JSON.stringify(data));
      },
      saveHero(hero) {
        if (!hero) {
          return;
        }

        if (!hero.id) {
          let currentId = parseInt(this.currentId);

          hero.id = ++currentId;

          this.currentId = currentId;
        }

        this.heroes[hero.id] = hero;

        this.saveData();
      },
      saveMap(map) {
        if (!map) {
          return;
        }

        if (!map.id) {
          let currentId = parseInt(this.currentId);

          map.id = ++currentId;

          this.currentId = currentId;
        }

        this.maps[map.id] = map;

        this.saveData();
      },
      saveRole(role) {
        if (!role) {
          return;
        }

        if (!role.id) {
          let currentId = parseInt(this.currentId);

          role.id = ++currentId;

          this.currentId = currentId;
        }

        this.roles[role.id] = role;

        this.saveData();
      },
      setPreset(preset) {
        this.configurations = preset.configurations
        this.heroes = preset.heroes
        this.maps = preset.maps
        this.roles = preset.roles
      }
    },
  };
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
