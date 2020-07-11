import Vue from 'vue'
import App from './App.vue'
import {hello, bye} from './data';
import {showMessage} from './funk';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

showMessage(hello);
showMessage(bye);

