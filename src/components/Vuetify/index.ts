import application from './mixins/application'
import theme from './mixins/theme'
import icons from './mixins/icons'
import options from './mixins/options'
import genLang from './mixins/lang'
import { consoleWarn } from '../../util/console'
import goTo from './util/goTo'
import { VueConstructor } from 'vue/types'
import { Vuetify as VuetifyPlugin } from 'types'

const Vuetify: VuetifyPlugin = {
  install (Vue, opts = {}) {
    if ((this as any).installed) return

    (this as any).installed = true

    checkVueVersion(Vue)

    const lang = genLang(opts.lang)
    let _rtl: boolean

    Vue.prototype.$vuetify = new Vue({
      mounted () {
        this.rtl = opts.rtl || false
      },
      data: {
        application,
        breakpoint: {},
        dark: false,
        icons: icons(opts.iconfont, opts.icons),
        lang,
        options: options(opts.options),
        theme: theme(opts.theme)
      },
      methods: {
        goTo,
        t: lang.t.bind(lang)
      },
      computed: {
        rtl: {
          get () {
            return _rtl
          },
          set (val: boolean) {
            if (val) {
              document.documentElement.dir = 'rtl'
            } else {
              document.documentElement.dir = 'ltr'
            }
            _rtl = val
          }
        }
      }
    })

    if (opts.transitions) {
      Object.values(opts.transitions).forEach(transition => {
        if (transition.name !== undefined && transition.name.startsWith('v-')) {
          Vue.component(transition.name, transition)
        }
      })
    }

    if (opts.directives) {
      Object.values(opts.directives).forEach(directive => {
        Vue.directive(directive.name, directive)
      })
    }

    if (opts.components) {
      Object.values(opts.components).forEach(component => {
        Vue.use(component)
      })
    }
  },
  version: __VUETIFY_VERSION__
}

/* istanbul ignore next */
function checkVueVersion (Vue: VueConstructor) {
  const vueDep = __REQUIRED_VUE__ as string

  const required = vueDep.split('.').map(v => v.replace(/\D/g, '')).map(Number)
  const actual = Vue.version.split('.').map(Number)

  // Simple semver caret range comparison
  const passes =
    actual[0] === required[0] && // major matches
    (actual[1] > required[1] || // minor is greater
      (actual[1] === required[1] && actual[2] >= required[2]) // or minor is eq and patch is >=
    )

  if (!passes) {
    consoleWarn(`Vuetify requires Vue version ${vueDep}`)
  }
}

export default Vuetify
