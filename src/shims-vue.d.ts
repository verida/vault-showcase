/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare module "vue" {
  import { CompatVue } from "@vue/runtime-dom";
  const Vue: CompatVue;
  export default Vue;
  export * from "@vue/runtime-dom";
}

declare global {
  interface Window {
    _: any;
  }
}

declare module "bootstrap-vue";
declare module "underscore";
declare module "@saeris/vue-spinners";