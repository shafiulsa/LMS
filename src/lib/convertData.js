export const replaceMongoIdInArray = (array) => {
    if (!array || !Array.isArray(array)) return [];
    const mappedArray = array.map(item => {
      if (!item) return item;
      return {
        id: item._id ? item._id.toString() : item.id,
        ...item
      }
    }).map(({_id, ...rest}) => rest);

    return mappedArray;
  }

  export const replaceMongoIdInObject = (obj) => {
    if (!obj) return null;
    const {_id, ...updatedObj} = {...obj, id: obj._id ? obj._id.toString() : obj.id};
   return updatedObj;
  }