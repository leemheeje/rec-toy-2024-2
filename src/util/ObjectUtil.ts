import _ from 'lodash'

export default class ObjectUtil {
  static isEmpty(o) {
    return _.isEmpty(o)
  }
  static startsWith(string, target, position = 0) {
    return _.startsWith(string, target, position)
  }
  static cloneDeep(o) {
    return _.cloneDeep(o)
  }
  static isEqual(po, co) {
    return _.isEqual(po, co)
  }
  static isArray(o) {
    return _.isArray(o)
  }
  static isObject(o) {
    return _.isObject(o)
  }
}
