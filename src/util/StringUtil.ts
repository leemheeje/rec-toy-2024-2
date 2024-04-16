import _ from 'lodash'
import classNames from 'classnames'

export default class StringUtil {
  static getUUID(sf?) {
    return _.uniqueId(sf ? sf : '_uid_')
  }
  static setPriceComma(str) {
    return str ? str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'
  }
  static classNames(o) {
    // const _o = o
    // return Object.keys(_o)
    //   .filter((k) => _o[k])
    //   .join(' ')
    return classNames(o)
  }
}
