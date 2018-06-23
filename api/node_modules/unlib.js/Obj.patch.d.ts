/**
 * Once you've called `unlib.Object.patch`, you are able to use the following methods.
 */
interface Object {
  append: <T>(src: T) => T & {}
  appendAll: <T>(src: T) => T & {}
  appendEnumerable: <T>(src: T) => T & {}
  appendOwnProperties: <T>(src: T) => T & {}

  update: <T>(src: T) => {}
  updateAll: <T>(src: T) => {}
  updateEnumerable: <T>(src: T) => {}
  updateOwnProperties: <T>(src: T) => {}
}