/**
 * Sort a heroes object by name, returning an array
 * 
 * @author mauricio.araldi
 * @since 0.1.0
 * 
 * @param {heroes: Object} heroes Heroes by id
 * @return {Array} Heroes sorted by name
 */
export const sortHeroes = (heroes) => {
  return Object.keys(heroes).map(id => heroes[id]).sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }

    if (b.name > a.name) {
      return -1;
    }

    return 0;
  });
}