/**
 * Sort a data object by name, returning an array
 * 
 * @author mauricio.araldi
 * @since 0.1.0
 * 
 * @param {Object | Array} data Data by id
 * @return {Array} Data sorted by name
 */
export const sortData = (data) => {
  if (!data) {
    return;
  }

  const array = Array.isArray(data) ? data : Object.keys(data).map(id => data[id]);
  return array.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }

    if (b.name > a.name) {
      return -1;
    }

    return 0;
  });
};
