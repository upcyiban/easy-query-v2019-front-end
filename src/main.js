// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css'
import axios from "axios"
Vue.config.productionTip = false

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]

Vue.prototype.$axios = axios

Vue.prototype.$GetQueryString = function (name) {  //  截取VQ
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
},

Vue.prototype.$getYearWeek = function (dateString) {  //  转换日期为周数
  var da =dateString;//日期格式2015-12-30
  var date1 = new Date(da.substring(0,4), parseInt(da.substring(5,7)) - 1, da.substring(8,10));
  var date2 = new Date(da.substring(0,4), 0, 1);
  var dateWeekNum=date2.getDay(); //以周日为第一天
  if (dateWeekNum<0) {
    dateWeekNum=6;
  }
  if (dateWeekNum<4) {
      date2.setDate(date2.getDate()-dateWeekNum);
  } else {
      date2.setDate(date2.getDate()+7-dateWeekNum);
  }
  var d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
  if (d<0) {
      var date3 = (date1.getFullYear()-1)+"-12-31";
      return getYearWeek(date3);
  } else {
      var year=date1.getFullYear();
      var week=Math.ceil((d+1 )/ 7);
      return week;
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
