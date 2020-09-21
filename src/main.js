import Vue from 'vue'
import Antd from 'ant-design-vue'

import App from './App.vue'
import router from './router'
import store from './store'
import Authorized from '@components/authorized'
import auth from './directives/auth'

import 'ant-design-vue/dist/antd.less'

Vue.config.productionTip = false

Vue.use(Antd)
// 全局注册
Vue.component('Authorized', Authorized)

Vue.use(auth)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
