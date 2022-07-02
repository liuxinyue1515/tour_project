// 入口js

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import router from './router'

import axios from "axios"

import App from './App.vue'

import {Menu, MenuItem, Submenu, Input, Button} from 'element-ui'
import {Carousel, CarouselItem} from 'element-ui'
import {Row, Col, Pagination} from 'element-ui'
import {Collapse , CollapseItem, Descriptions, DescriptionsItem, Rate, Tag} from 'element-ui'
import {Form, FormItem, Upload, DatePicker, TimePicker} from 'element-ui'
import {Table, TableColumn} from 'element-ui'
import {Notification} from 'element-ui'
import {Dialog} from 'element-ui'

// 公共
Notification.zIndex = 9999
Vue.component(Notification.name, Notification)
Vue.prototype.$notify = Notification;
// Banner
Vue.component(Menu.name,Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Submenu.name, Submenu);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
// Home
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
// TourList
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Pagination.name, Pagination);
// Tour
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);
Vue.component(Descriptions.name, Descriptions);
Vue.component(DescriptionsItem.name, DescriptionsItem);
Vue.component(Rate.name, Rate);
Vue.component(Tag.name, Tag);
// Create
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Upload.name, Upload);
Vue.component(DatePicker.name, DatePicker);
Vue.component(TimePicker.name, TimePicker);
// Manage
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
// Bought
Vue.component(Dialog.name, Dialog);

Vue.prototype.axios = axios
Vue.prototype.axios.defaults.baseURL = 'http://tour.somebodycn.xyz:7777'

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
