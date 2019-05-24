<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    document.title = '易查询'
    var verify_request = ''
    var yb_uid = ''
    var APPID = 'f41ab16a3604b2bc'
    var CALLBACK = 'http://f.yiban.cn/iapp33017'
    if (this.getQueryVariable("verify_request")) {
      console.log(2323)
      verify_request = this.getQueryVariable("verify_request")
      yb_uid = this.getQueryVariable("yb_uid")
      localStorage.setItem('yb_verify_request', this.getQueryVariable("verify_request"))
      localStorage.setItem('yb_uid', this.getQueryVariable("yb_uid"))
      this.$router.push('/')
    } else {
      if (localStorage.getItem('yb_verify_request')) {
        verify_request = localStorage.getItem('yb_verify_request')
        yb_uid = localStorage.getItem('yb_uid')
        if (this.getQueryVariable("verify_request")) {
          this.$router.push('/')
        }
      } else {
        if (
          verify_request == -1 ||
          verify_request === "" ||
          verify_request === null
        ) {
          window.location.href =
            "https://openapi.yiban.cn/oauth/authorize?client_id=" +
            APPID +
            "&redirect_uri=" +
            CALLBACK +
            "&state=5050"
        }
      }
    }
    
  },
  methods: {
    getQueryVariable (variable) {
      console.log(window.location)
      var query = window.location.hash.substring(3);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
      }
      return(null);
    }
  }
}
</script>

<style>

</style>
