export const shallowEqual = (obj1, obj2) => {
    const [keys1, keys2] = [Object.keys(obj1), Object.keys(obj2)]

    return keys1.length === keys2.length && keys1.every(key => obj1[key] === obj2[key])
}