<template>
  <div class="main-container">
    <Header />
    <Schedule v-on:classinfo="getClassInfo"/>
    <div class="alert-container" v-show="ifgetinfo">
      <div class="alert-body" v-html="classinfo">
      </div>
      <div class="alert-buttons">
        <button @click="closeAlert">确定</button>
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
      classinfo: ''
    };
  },
  created () {

  },
  mounted () {

  },
  methods: {
    getClassInfo (msg) {
      console.log(msg)
      this.classinfo = '课程名称：' + msg.class_name + '<br>' + '上课地点：' + msg.class_position + '<br>' + '上课时间：' + msg.class_times + '<br>' + '老师：' + msg.class_teacher
    },
    closeAlert () {
      this.classinfo = ''
      this.ifgetinfo = false
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
}
.alert-container {
  width: 70%;
  height: 15rem;
  position: absolute;
  top: 30%;
  left: 15%;
  z-index: 5;
  border: 1px grey solid;
  border-radius: 7px;
  background: lightgoldenrodyellow;
}
.alert-body {
  width: 100%;
  height: 80%;
  font-size: 1.2rem;
}
.alert-buttons {
  width: 100%;
  height: 20%;
  border-top: 1px grey solid;
  display: flex;
  flex-direction: row;
}
.alert-buttons button {
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  outline: none;
  font-size: 1.2rem;
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
