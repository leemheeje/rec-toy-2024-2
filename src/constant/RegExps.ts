const RegExps = Object.freeze({
  SPECIAL: /[~`'"*+!@#$%^&()_={}[\]:;,.<>\\/?|-]/,
  FILTER_KOREAN: /^[ㄱ-ㅎ가-힣ㅏ-ㅣ]*$/,
  FILTER_ENGLISH: /^[a-zA-Z]*$/,
  FILTER_NUMBER: /^[0-9]*$/,
  FILTER_EMAIL: /^[0-9a-zA-Z-_.@]*$/,
  MATCH_KOREAN: /^[ㄱ-ㅎ가-힣ㅏ-ㅣ]*/i,
  MATCH_NUMBER: /^[0-9]*/i,
  MATCH_EMAIL: /^[0-9a-z]([0-9a-z-_.])*@[0-9a-z]([-_.]?[0-9a-z])*\.[a-z]{2,3}$/i,
  // MATCH_EMAIL: /^[0-9a-z-_.]*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]{2,3}$/i,
  MATCH_MOBILE_PHONE: /^01[016789]-[0-9]{3,4}-[0-9]{4}$/,
  MATCH_NO0505_NUMBER: /^0505[0-9]{3}[0-9]{4}$/,
  MATCH_TELE_PHONE: /^(02|0[3-6][1-5])[0-9]{3,4}[0-9]{4}$/,
  MATCH_ALPHANUMERICPLUS: /^[a-zA-Z0-9]+$/,
  MATCH_REFEMAILPLUS: /^[0-9a-z]([0-9a-z-_])*\.[a-z]{2,3}$/i,
  MATCH_MOBILE_PHONEPLUS: /^01[016789][0-9]{7,8}$/,
  MATCH_ALPHANUMERIC_KR: /^[a-zA-Z0-9ㄱ-ㅎ가-힣ㅏ-ㅣ]+$/,
  MATCH_ALPHANUMERIC_KOREAN_PLUS: /^[a-zA-Z0-9ㄱ-ㅎ가-힣ㅏ-ㅣ+&]+$/,
  MATCH_KOREAN_AND_ENGLISH: /^[a-zA-Zㄱ-ㅎ가-힣ㅏ-ㅣ]+$/,
  MATCH_DATE: /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/,
  // BxInputFieldMobile ㆍ ᆢ
  CHECK_NUMBER: /[^0-9]/g,
  CHECK_ALPHANUMERIC: /[^a-z|0-9|ㄱ-ㅎ|가-힣|\u318D\u119E\u11A2\u2022\u2025a\u00B7\uFE55]/gi,
  CHECK_KOREAN: /[^ㄱ-ㅎ|가-힣|\u318D\u119E\u11A2\u2022\u2025a\u00B7\uFE55]/g,
  CHECK_ALPHABET: /[^a-z|ㄱ-ㅎ|가-힣|\u318D\u119E\u11A2\u2022\u2025a\u00B7\uFE55]/gi,
  //REPLACE
  REPLACE_ONLY_KO: /[^ㄱ-ㅎ가-힣ㅏ-ㅣ]/g,
  REPLACE_ONLY_EN: /[^a-zA-Z]/g,
  REPLACE_ONLY_SPECIAL: /[^~`'"*+!@#$%^&()_={}[\]:;,.<>\\/?|-]/g
})

export default RegExps
