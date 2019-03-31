<template>
  <div class="main-container">
    <Header />
    <Schedule v-on:classinfo="getClassInfo"/>
    <div class="alert-container" v-show="ifgetinfo">
      <div class="alert-frame">
        <div class="alert-body">
          <div class="Icon-container">
            <img src="../assets/schoolIcon.jpg" alt="">
          </div>
          <div class="classinfo-container">
            <div class="class-name">
              {{classinfo.class_name}}
            </div>
            <div class="class-info">
              <div class="class-head">
                <div v-for="i in 4" :key="i-1">
                  {{classheader[i-1]}}
                </div>
              </div>
              <div class="class-content">
                <div>{{classinfo.class_position}}</div>
                <div>{{classinfo.class_weeks}}</div>
                <div>{{classinfo.class_times}}</div>
                <div>{{classinfo.class_teacher}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="alert-buttons" v-show="iscustom">
          <div>
            <button @click="editCustomClass">
              编辑
            </button>
          </div>
          <div>
            <button @click="deleteCustomClass">
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="overmain"  v-show="ifgetinfo" @click="closeAlert"></div>
  </div>
</template>

<script>
import Header from './Schedule/header.vue';
import Schedule from './Schedule/schedule.vue';

export default {
  components: {
    Header : Header,
    Schedule : Schedule
  },
  name: "schedule",
  data() {
    return {
      ifgetinfo: false,
      classinfo: {
        class_name: '',
        class_position: '',
        class_weeks: '',
        class_times: '',
        class_teacher: '',
        id: -1
      },
      classheader: ['教室', '周数', '节数', '老师'],
      iscustom: false
    };
  },
  created () {

  },
  mounted () {

  },
  methods: {
    getClassInfo (msg) {
      console.log(msg)
      this.classinfo = msg.classinfo
      if (msg.iscustom == 1) {
        this.iscustom = true
      }
    },
    closeAlert () {
      this.classinfo = ''
      this.ifgetinfo = false
      this.iscustom = false
    },
    editCustomClass () {
      let obj = this.classinfo
      let str = JSON.stringify(obj)
      sessionStorage.setItem('editclassinfo', str)
      this.$router.push('/schedule/addcourse')
    },
    deleteCustomClass () {
      let url = 'http://yb.upc.edu.cn:8089/deleteCustomCourse'
      let data = {
        id: this.classinfo.id
      }
      console.log(this.classinfo.id)
      this.$axios.post(url, data).then(rsp => {
        console.log(rsp)
        if (rsp.data.result == 'success') {
          alert('删除课程成功！')
          this.closeAlert()
        }
      })
    }
  },
  watch: {
    classinfo(val, oldval) {
      if (val != '') {
        this.ifgetinfo = true
      }
    }
  }
};
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
.alert-container {
  width: 70%;
  height: 25rem;
  position: absolute;
  top: 15%;
  left: 15%;
  z-index: 5;
  border: 1px grey solid;
  border-radius: 1.2rem;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.alert-frame {
  width: 90%;
  height: 93%;
  border: 1px #DDDDDD solid;
  border-radius: 1rem;
}
.alert-body {
  width: 100%;
  height: 85%;
  font-size: 1.2rem;
  position: relative;
}
.Icon-container {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.Icon-container img {
  height: 60%;
  width: auto;
}
.classinfo-container {
  height: 65%;
  width: 75%;
  margin-left: 12.5%;
}
.class-name {
  min-height: 15%;
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
}
.class-info {
  width: 75%;
  height: 35%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  color: #555555;
  position: absolute;
  bottom: 0;
}
.class-head {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
}
.class-content {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.class-content div {
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.alert-buttons {
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
}
.alert-buttons div {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.alert-buttons button {
  background: none;
  border: none;
  outline: none;
  font-size: 1rem;
  color: #888888;
}
.overmain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background: black;
  opacity: 0.2;
  z-index: 4;
}
</style>
