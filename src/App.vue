<template>
  <div>
    <Header @clearData="clearData"/>
    <main>
      <router-view
        :settings="settings"
        @deleteHero="deleteHero"
        @deleteMap="deleteMap"
        @deleteRole="deleteRole"
        :heroes="heroes"
        :maps="maps"
        :roles="roles"
        @saveSettings="saveSettings"
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
        settings: {
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
        this.$router.push('/preset');
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
      saveSettings(settings) {
        this.settings = settings;
        this.saveData();
      },
      saveData() {
        const data = {
          settings: this.settings,
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
        this.settings = preset.settings
        this.heroes = preset.heroes
        this.maps = preset.maps
        this.roles = preset.roles
      }
    },
  };
</script>

<style scoped>  
</style>

<style lang="scss">
  @import '~normalize.css';
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');

  body { 
    background: $primary-color;
    font-family: 'Montserrat', sans-serif;
  }

  main {
    padding: 8px;
  }

  fieldset {
    background-color: $gray-color;
    border: none;
    padding: 0;
  }

  fieldset > legend {
    background: $primary-gray-gradient;
    color: $light-color;
    padding: 4px;
    text-shadow: 1px 1px 1px $dark-color;
    width: 100%;
  }

  fieldset > form {
    padding: 8px;
  }
</style>
