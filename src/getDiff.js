import { diffChars } from 'diff'

/*Wrapper around jsdiff's diffChars. It returns an object that
* describes which parts of two given strings for comparison 
* (original and new) were changed by addition, subtraction or 
* remained unchanged.
*/
function diff (value1 = '', value2 = '') {
  return diffChars(value1, value2)
}

export default function getDiff (obj1, obj2) {
  const allProps = [...Object.keys(obj1), ...Object.keys(obj2)]
  return allProps
    .reduce((props, prop) => {
      return props.includes(prop) ? props : [...props, prop]
    }, [])
    .map(prop => {
      return {
        name: prop,
        diff: diff(obj1[prop], obj2[prop]),
        left: obj1[prop],
        right: obj2[prop]
      }
    })
}
