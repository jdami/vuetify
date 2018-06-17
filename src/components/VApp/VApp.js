import '../../stylus/components/_app.styl'

// Component level mixins
import AppTheme from './mixins/app-theme'
import AppBreakpoint from './mixins/app-breakpoint'

// Directives
import Resize from '../../directives/resize'

import { syncPageDirection } from '../../util/helpers'

export default {
  name: 'v-app',

  mixins: [
    AppBreakpoint,
    AppTheme
  ],

  directives: {
    Resize
  },

  props: {
    id: {
      type: String,
      default: 'app'
    },
    dark: Boolean
  },

  computed: {
    classes () {
      return {
        [`theme--${this.dark ? 'dark' : 'light'}`]: true
      }
    },
    dir () {
      return this.$vuetify.rtl ? 'rtl' : 'auto'
    }
  },

  mounted () {
    syncPageDirection(this.$vuetify.rtl)
    this.$vuetify.dark = this.dark
  },

  watch: {
    dark () {
      this.$vuetify.dark = this.dark
    },
    '$vuetify.rtl': () => syncPageDirection(this.$vuetify.rtl)
  },

  render (h) {
    const data = {
      staticClass: 'application',
      'class': this.classes,
      attrs: { 'data-app': true, dir: this.dir },
      domProps: { id: this.id },
      directives: [{
        name: 'resize',
        value: this.onResize
      }]
    }

    const wrapper = h('div', { staticClass: 'application--wrap' }, this.$slots.default)

    return h('div', data, [wrapper])
  }
}
