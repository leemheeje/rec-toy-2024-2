import _ from 'lodash'

export default class ObjectUtil {
  static isEmpty(o) {
    return _.isEmpty(o)
  }
  static startsWith(string, target, position = 0) {
    return _.startsWith(string, target, position)
  }
}
