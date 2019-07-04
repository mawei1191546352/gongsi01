/*
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-06-05 10:29:13
 * @LastEditors: mawei
 * @LastEditTime: 2019-07-01 17:42:25
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)
let lang = (navigator.languages && navigator.languages[0]) || navigator.language ||  navigator.browserLanguage.toLowerCase()
lang = lang.split('-')[0]
console.log(lang,'语言',navigator.languages)
// if(lang!='zh'){
//   lang = 'en'
// }
if(window.localStorage.getItem('localeLanguage')){
  lang = window.localStorage.getItem('localeLanguage')
}else{
  lang = 'zh'
}
// lang = 'zh'
// Vue.store.dispatch('async__set_lang',lang);
console.log(lang,'语言')
const DEFAULT_LANG = lang
const LOCALE_KEY = 'localeLanguage'
let zh = Object.assign(require('./zh.json'),zhLocale)
let en = Object.assign(require('./en.json'),enLocale)

const locales = {
  zh:zh,
  en:en,
}

const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales,
})
// 组件国际化
ElementLocale.i18n(function (key, value) {
    return i18n.t(key, value)
})

export const setup = lang => {
  if (lang === undefined) {
    lang = window.localStorage.getItem(LOCALE_KEY)
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  window.localStorage.setItem(LOCALE_KEY, lang)

  // Object.keys(locales).forEach(lang => {
  //   document.body.classList.remove(`lang-${lang}`)
  // })
  // document.body.classList.add(`lang-${lang}`)
  // document.body.setAttribute('lang', lang)

  Vue.config.lang = lang
  i18n.locale = lang
}

setup(lang)
window.i18n = i18n;
export default i18n