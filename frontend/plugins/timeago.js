import Vue from 'vue';
import VueTimeago from 'vue-timeago';

Vue.use(VueTimeago, {
    name: 'Timeago',
    locale: 'hr',
    locales: {
      'hr': require('date-fns/locale/hr')
    }
  })