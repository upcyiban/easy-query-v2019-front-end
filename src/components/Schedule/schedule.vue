<template>
  <div class="Schedule">
    <div class="HeaderRow-container">
      <div v-for="item in HeaderRow" :key="item">
        {{item}}
      </div>
    </div>
    <div class="class-container">
      <div class="HeaderCol-container">
        <div v-for="item in 11" :key="item">
          {{item}}
        </div>
      </div>
      <div class="classes-container">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedule',
  data () {
    return {
      HeaderRow: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    }
  }
}
</script>

<style scoped>
.Schedule {
  width: 100%;
  height: 100%;
}
.HeaderRow-container {
  width: 95%;
  height: 5%;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
}
.HeaderRow-container div {
  width: 14.2%;
  height: 100%;
  font-size: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.class-container {
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: row;
}
.HeaderCol-container {
  width: 5%;
  height: 100%;
}
.HeaderCol-container div {
  width: 100%;
  height: 9%;
  font-size: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.classes-container {
  width: 95%;
  height: 100%;
}
</style>
