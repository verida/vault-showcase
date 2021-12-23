import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend
} from 'vee-validate/dist/vee-validate.full.esm'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('did', value => {
  if (/^did:(vda):[a-zA-Z0-9]*$/.test(value)) {
    return true
  }

  return "The entered value doesn't match the expected format"
})
