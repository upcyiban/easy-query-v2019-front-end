<template>
  <div class="Header">
    <div class="time-container">
      <div class="week-container">
        <div class="week-controller" @click="weekcontroller(-1)">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </div>
        <div class="week-time">
          <div>第{{thisweek}}周</div>
          <span>大{{grade}}第{{season}}学期</span>
        </div>
        <div class="week-controller" @click="weekcontroller(1)">
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </div>
      </div>
      <div class="function-container">
        <div class="addcourse" @click="$router.push('/schedule/addcourse')">
          <i class="fa fa-plus"></i>
        </div>
        <div class="backindex" @click="$router.push('/')">
          <i class="fa fa-home"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from '../../assets/eventBus'
export default {
  name: 'Header',
  data () {
    return {
      thisweek: 1,
      thisday: 1,
      today: null,
      seasonstart: null,
      grade: '',
      season: '',
      grades: ['一', '二', '三', '四', '五']
    }
  },
  methods: {
    weekcontroller (i) {
      this.thisweek += i
      if (this.thisweek <= 0) {
        this.thisweek = 1
      } else if (this.thisweek >= 18) {
        this.thisweek = 18
      }
      Bus.$emit('thisweek', this.thisweek)
    }
  },
  created () {
    var studentId = sessionStorage.getItem('studentId')
    var studentgrade = parseInt(studentId.substr(0,2))
    console.log(studentgrade)
    var studygrade = ''
    var nowDate = new Date()
    console.log(nowDate)
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1;
    if (month < 10) {
      month = '0' + month
    }
    var day = nowDate.getDate();
    if (day < 10) {
      day = '0' + day
    }
    var thisdate = year + '-' + month + '-' + day
    console.log(year + '-' + month + '-' + day)
    var startdate = ''
    if (month < 2 || (month == 2 && day <= 17) || (month >= 8)) {   //第一学期
      studygrade = '2018-2019-1'
      startdate = '2018-09-3'
      if (month >= 8) {
        this.grade = this.grades[year - 2000 - studentgrade]
        console.log(this.grade)
      } else {
        this.grade = this.grades[year - 2000 - studentgrade - 1]
        console.log(this.grade)
      }
      this.season = '一'
    } else if ((month == 2 && day > 15) || (month > 2 && month < 6) || (month == 6 && day < 30)) {   //第二学期
      studygrade = '2018-2019-2'
      startdate = '2019-02-24'
      this.grade = this.grades[year - 2000 - studentgrade - 1]
      this.season = '二'
    } else if ((month == 6 && day >= 30) || (month == 7 && day <= 30)) {    //小学期
      studygrade = '2018-2019-3'
      startdate = '2019-06-30'
      this.grade = this.grades[year - 2000 - studentgrade - 1]
      this.season = '三'
    }
    this.seasonstart = startdate
    console.log(startdate)
    startdate = this.$getYearWeek(startdate)
    console.log(startdate)
    thisdate = this.$getYearWeek(thisdate)
    console.log(thisdate)
    this.thisweek = thisdate - startdate + 1
    if (this.thisweek < 0) {
      this.thisweek = 1
    }
    this.thisday = new Array(7, 1, 2, 3, 4, 5, 6)[nowDate.getDay()];
    this.today = {
      thisweek: this.thisweek,
      thisday: this.thisday,
      studygrade: studygrade
    }
    sessionStorage.setItem('studygrade', studygrade)
  },
  mounted () {
    Bus.$emit('today', this.today)
    Bus.$emit('thisweek', this.thisweek)
    Bus.$emit('seasonstart', this.seasonstart)
  },
}
</script>
<style scoped>
.Header {
  width: 100%;
  height: 8%
}
.time-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.week-container {
  height: 100%;
  width: 45%;
  margin-left: 27.5%;
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
  font-size: 1.6rem;
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
  width: 25%;
  margin-left: 2.5%;
  font-size: 1.7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: 0.6;
}
.addcourse {
  margin-left: 1.2rem;
}
.backindex {
  margin-left: 1rem;
}
</style>
