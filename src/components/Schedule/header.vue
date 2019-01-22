<template>
  <div class="Header">
    <div class="time-container">
      <div class="week-container">
        <div class="week-controller">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </div>
        <div class="week-time">
          <div>第1周</div>
          <span>大三第一学期</span>
        </div>
        <div class="week-controller">
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </div>
      </div>
      <div class="function-container">
        <div class="addcourse">
          <i class="fa fa-plus"></i>
        </div>
        <div class="backindex">
          <i class="fa fa-home"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.Header {
  width: 100%;
}
.time-container {
  height: 3rem;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.week-container {
  height: 100%;
  width: 40%;
  margin-left: 30%;
  display: flex;
  flex-direction: row;
}
.week-controller {
  height: 50%;
  width: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.week-time {
  width: 60%;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
}
.week-time span {
  font-size: 0.8rem;
}
.function-container {
  width: 30%;
  margin-left: 10%;
  font-size: 1.7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: 0.6;
}
.addcourse {
  margin-left: 1.4rem;
}
.backindex {
  margin-left: 1rem;
}
</style>
