<template>
  <div class="Schedule">
    <div class="HeaderRow-container">
      <div v-for="i in 7" :key="i" :id="'Header-' + (i-1)">
        {{HeaderRow[i-1]}}
      </div>
    </div>
    <div class="class-container">
      <div class="HeaderCol-container">
        <div v-for="item in 12" :key="item">
          {{item}}
        </div>
      </div>
      <div class="classes-container row-container">
        <div v-for="i in 7" :key="i" class="col-container" :id="'Row-' + (i-1)">
          <div v-for="j in 12" :key="j" class="classinfo-container" :id="i + '-' + j" v-html="classInfos[i-1][j]">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '../../assets/eventBus.js'
export default {
  name: 'schedule',
  data () {
    return {
      HeaderRow: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      HeadRow: '',
      thisweek: null,
      thisday: null,
      today: {
        thisweek: null,
        thisday: null,
      },
      courses: null,
      classInfos: null,
      coursesOfThisWeek: [],
      classcolor: [
        'rgb(208, 230, 216)',
        'rgb(168, 216, 185)',
        'rgb(27, 129, 62)',
        'rgb(92, 157, 114)',
        'rgb(36, 147, 110)',
        'rgb(54, 86, 60)',
      ]
    }
  },
  methods: {
    GetCoursesOfThisWeek () {
      var courseNum = 0
      var _this = this
      this.classInfos = {}
      this.coursesOfThisWeek = [] //初始化
      for (let i = 0;i < 7;i ++) {
        this.classInfos[i] = {}
        for (let j = 0;j <= 12;j ++) {
          this.classInfos[i][j] = ''
        }
      }
      Object.keys(this.courses).forEach(originNum => {
        var str = this.courses[originNum].class_weeks
        if (str.indexOf('-') != -1) {
          if (str.indexOf(',') != -1) {       // '1-3,'
            let strs = str.split(/[,]/)
            Object.keys(strs).forEach(key => {
              if (strs[key].indexOf('-') != -1) {     // '1-3'
                let strings = strs[key].split(/[-]/)
                if (strings[0] <= this.thisweek && this.thisweek <= strings[1]) {
                  this.coursesOfThisWeek[courseNum] = this.courses[originNum]
                  courseNum ++
                }
              } else {      // '3'
                if (strs[key] == this.thisweek) {
                  this.coursesOfThisWeek[courseNum] = this.courses[originNum]
                  courseNum ++
                }
              }
            })
          } else {        // '1-3'
            let strs = str.split(/[-]/)
            if (strs[0] <= this.thisweek && this.thisweek <= strs[1]) {
              this.coursesOfThisWeek[courseNum] = this.courses[originNum]
              courseNum ++
            }
          }
        } else {        // '1,2,3,4','2'
          let strs = str.split(/[,]/)
          Object.keys(strs).forEach(i => {
            if (strs[i] == this.thisweek) {
              this.coursesOfThisWeek[courseNum] = this.courses[originNum]
              courseNum ++
            }
          })
        }
        if (this.courses.length) {  //  筛选本周课程
          if (this.courses.length-1 == originNum) {
              Object.keys(this.coursesOfThisWeek).forEach(i => {
              var classinfo = this.coursesOfThisWeek[i].class_name + '<br>@<br>' + this.coursesOfThisWeek[i].class_position
              var weektime = this.coursesOfThisWeek[i].class_times
              var startTime = parseInt(weektime.substr(1, 2))
              var endTime = parseInt(weektime.slice(-2))
              weektime = parseInt(weektime.charAt(0))
              for (let n = 1;n <= 12;n ++) {
                if (n >= startTime && n <= endTime) {
                  weektime = weektime % 7  // 转化id
                  this.classInfos[weektime][n] = classinfo
                  this.$set(_this.classInfos[weektime], n, classinfo)
                }
              }
            })
          }
        }
      })
    },
    FixStyle () {
      var classNum = 0
      for (let i = 0;i < 7; i++) {
        for (let j = 1;j <= 12;j ++) {
          var id = (i+1) + '-' + j
          document.getElementById(id).style.backgroundColor = '' // reset background
          if (this.classInfos[i][j] != '') {
            var lastTime = 0
            for (let k = j;k <= 13;k ++) {
              if (this.classInfos[i][k] == this.classInfos[i][j]) {
                lastTime ++
                continue
              } else if (this.classInfos[i][k] != this.classInfos[i][j] || k > 12) {
                let height = lastTime * 8.3
                let colorNum = classNum % 5 + 1
                document.getElementById(id).style.height = height + '%'
                document.getElementById(id).style.backgroundColor = this.classcolor[colorNum]
                document.getElementById(id).style.borderRadius = '5px'
                document.getElementById(id).style.borderLeft = '1px rgb(242, 242, 242) solid'
                document.getElementById(id).style.borderTop = '1px rgb(242, 242, 242) solid'
                for (let l = j+1;l < k;l ++) {
                  let Id = (i+1) + '-' + l
                  document.getElementById(Id).style.height = '0%'
                }
                j = k - 1
                classNum ++
                break
              }
            }
          }
        }
      }
      if (this.thisweek == this.today.thisweek) {
        for (let i = 0;i < 7;i ++) {
          let bodyid = 'Row-' + i
          let headerid = 'Header-' + i
          if (this.thisday % 7  == i) {
            document.getElementById(bodyid).style.width = '18%'
            document.getElementById(headerid).style.width = '18%'
            document.getElementById(headerid).style.borderLeft = '3px solid rgb(133, 183, 150)'
            document.getElementById(headerid).style.borderRight = '3px solid rgb(133, 183, 150)'
            document.getElementById(headerid).style.backgroundColor = 'rgb(133, 183, 150)'
            document.getElementById(bodyid).style.backgroundColor = this.classcolor[0]
          } else if (this.thisday % 7 != i) {
            document.getElementById(bodyid).style.width = '13.8%'
            document.getElementById(headerid).style.width = '13.8%'
          }
        }
      } else if (this.thisweek != this.today.thisweek) {
        console.log
        for (let i = 0;i < 7;i ++) {
          let bodyid = 'Row-' + i
          let headerid = 'Header-' + i
          document.getElementById(bodyid).style.width = '14.2%'
          document.getElementById(headerid).style.width = '14.2%'
          document.getElementById(headerid).style.border = 'none'
          document.getElementById(headerid).style.background = 'none'
          document.getElementById(bodyid).style.backgroundColor = 'rgb(242, 242, 242)'
        }
      }
    }
  },
  created () {
    this.classInfos = {}
    for (let i = 0;i < 7;i ++) {
      this.classInfos[i] = {}
      for (let j = 0;j <= 12;j ++) {
        this.classInfos[i][j] = ''
      }
    }
    Bus.$on('today', msg => {
      this.today = msg;
      this.thisday = msg.thisday
      this.thisweek = msg.thisweek
    })
    Bus.$on('thisweek', msg => {
      this.thisweek = msg
    })
    this.courses = new Array()
    var courseNum = 0
    let url = '/api/getSchedule'
    this.$axios.get(url, {
      params: {
        studentid: '1707010229',
        grade: '2018-2019-1'
      }
    }).then(rsp => {
      console.log(rsp)
      this.courses = rsp.data.school_courses
      this.GetCoursesOfThisWeek()
      this.FixStyle()
    })
  },
  watch: {
    thisweek (val, oldval) {
      this.GetCoursesOfThisWeek()
      this.FixStyle()
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
  height: 8.33%;
  font-size: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.classes-container {
  width: 95%;
  height: 100%;
  background-color: rgb(242, 242, 242)
}
.row-container {
  display: flex;
  flex-direction: row;
}
.col-container {
  display: flex;
  flex-direction: column;
  width: 14.2%;
}
.classinfo-container {
  width: 100%;
  height: 8.3%;
  font-size: 0.8rem;
  overflow: hidden;
}
</style>
