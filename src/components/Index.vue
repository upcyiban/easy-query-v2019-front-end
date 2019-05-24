<template>
  <div class="main-container">
    <div class="index-container">
      <div class="header-container">E-Query</div>
      <div class="userinfo-container">
        <div class="user-head">
          <img :src="userInfo.avatar" alt>
        </div>
        <div class="welcome">
          <span>Hi</span>
          <div>{{userInfo.realname}}</div>
        </div>
      </div>
      <div class="function-menu">
        <div class="button-menu">
          <div class="function-button" v-for="i in 2" :key="i" @click="ToNextPage(i-1)">
            <div class="button-icon" :class="menu[i-1].bindclass" :style="{opacity : 0.2 + i*2/10}">
              <i class="fa fa-chevron-right fa-lg" aria-hidden="true"></i>
            </div>
            <div class="button-title">{{menu[i-1].title}}</div>
          </div>
        </div>
        <div class="slide-anime">
          <div class="triangle">
            <div class="another-triangle"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">易查询</div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      headurl: '',
      userId: '',
      userInfo: {
        realname: '',
        avatar: ''
      },
      menu: [
        {
          title: '查课表',
          bindclass: '',
          link: '/schedule'
        },
        {
          title: '自习教室',
          bindclass: '',
          link: '/studyarea'
        },
        {
          title: '已修学分',
          bindclass: '',
          link: '/credits'
        }
      ]
    };
  },
  methods: {
    ToNextPage (num) {
      this.menu[num].bindclass = ''
      console.log(1)
      for (let i = 0;i < 3;i ++) {
        if (i == num) {
          this.menu[i].bindclass = 'bindrotateclass'
        } else {
          this.menu[i].bindclass = ''
        }
      }
      console.log(this.menu[num].bindclass)
      setTimeout(()=>{
        this.$router.push(this.menu[num].link)
      },500);
    },
  },
  mounted () {
    var verify_request = localStorage.getItem('yb_verify_request')
    console.log(verify_request)
    this.$axios.get("http://yb.upc.edu.cn:8089/getUserInfo", {
      params: {
        vq: verify_request
      }
    }).then(rsp => {
      if (rsp.data.code == -1) {
        console.log("vq error")
        window.location.href =
          "https://openapi.yiban.cn/oauth/authorize?client_id=" +
          APPID +
          "&redirect_uri=" +
          CALLBACK +
          "&state=5050"
      } else {
        console.log(rsp)
        this.userInfo = rsp.data
        let studentId = rsp.data.studentid
        sessionStorage.setItem('studentId', studentId)
      }
    })
  },
};
</script>

<style scoped>
@font-face {
  font-family: "verdanab";
  src: url("../assets/verdanab.ttf");
}
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  user-select: none;
}
.index-container {
  position: absolute;
  top: 7.5%;
  height: 75%;
  width: 80%;
}
.header-container {
  width: 100%;
  height: 20%;
  font-family: "verdanab";
  font-size: 3.5rem;
  font-weight: bold;
  opacity: 0.8;
}
.userinfo-container {
  height: 40%;
  width: 100%;
}
.user-head {
  width: 40%;
  height: auto;
  border-radius: 50%;
  overflow: hidden;
}
.user-head img {
  height: auto;
  width: 100%;
  border-radius: 50%;
}
.welcome {
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.welcome div {
  font-size: 1.4rem;
  margin-left: 0.5rem;
}
.welcome span {
  font-size: 1.8rem;
  font-weight: bold;
}
.function-menu {
  width: 100%;
  height: 25%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.button-menu {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.function-button {
  height: auto;
  margin-top: 1.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  
}
.button-icon {
  height: 1.4rem;
  width: 1.4rem;
  border: 2px black solid;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}
.button-icon i {
  width: 40%;
  height: 45%;
  font-size: 1rem;
}
.button-title {
  height: 2rem;
  font-size: 1.4rem;
  line-height: 2rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.slide-anime {
  width: 50%;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.triangle {
  width: 40%;
  height: 150%;
  border: 2px gray solid;
  background: white;
  transform:rotate(30deg);
  position: absolute;
  right: -20%;
  bottom: -25%;
  animation: SlideToLeft1 0.5s;
}
.another-triangle {
  width: 20%;
  height: 100%;
  background: black;
  position: absolute;
  right: 0;
  animation: SlideToLeft2 0.5s;
  animation-fill-mode:forwards; 
}
.footer {
  height: 5%;
  position: absolute;
  bottom: 0;
}
.bindrotateclass {
  animation: rotate 0.5s;
}
@keyframes SlideToLeft1
{
  from {right: -50%}
  to {right: -20%}
}
@keyframes SlideToLeft2
{
  0%   {right: -55%}
  50%  {right: -55%}
  100% {right: -5%}
}
@keyframes rotate
{
  0%   {transform:rotate(0);}
  100% {transform:rotate(360deg);}
}
@media screen and (max-width: 321px) {
  .button-title {
    font-size: 1.2rem;
  }
}
</style>
