<template>
  <div class="Schedule">
    <div class="HeaderRow-container">
      <div class="month">
        <span>2</span>
        月
      </div>
      <div v-for="i in 7" :key="i" :id="'Header-' + (i-1)" class="header-row">
        {{HeaderRow[i-1]}}
        <span v-html="getdate(i-1)">
        </span>
      </div>
    </div>
    <div class="class-container">
      <div class="HeaderCol-container">
        <div v-for="item in 12" :key="item">{{item}}</div>
      </div>
      <div class="classes-container row-container">
        <div v-for="i in 7" :key="i" class="col-container" :id="'Row-' + (i-1)">
          <div
            v-for="j in 12"
            :key="j"
            class="classinfo-container"
            :id="i + '-' + j"
            v-html="classInfos[i-1][j][0]"
            @click="passClassInfo(i-1, j)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "../../assets/eventBus.js";
export default {
  name: "schedule",
  data() {
    return {
      HeaderRow: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      HeadRow: "",
      thisweek: null,
      thisday: null,
      seasonstart: '',
      today: {
        thisweek: '',
        thisday: '',
        studygrade: ''
      },
      courses: null,
      customcourses: null,
      schoolcourses: null,
      classInfos: null,
      coursesOfThisWeek: [],
      schoolLength: 0,
      classcolor: [
        "#DDE8EE",
        "#FF7676",
        "#FFD066",
        "#89EEFF",
        "#FFF95D",
        "#B7EE4A",
        "#8FCBFF",
        "#B59CFF"
      ]
    };
  },
  methods: {
    GetCoursesOfThisWeek() {
      var courseNum = 0;
      var _this = this;
      if (this.schoolcourses != null) {
        this.schoolLength = this.schoolcourses.length
        console.log(this.schoolLength)
        console.log(this.schoolcourses)
      }
      this.classInfos = {};
      this.coursesOfThisWeek = []; //初始化
      for (let i = 0; i < 7; i++) {
        this.classInfos[i] = {};
        for (let j = 0; j <= 12; j++) {
          this.classInfos[i][j] = {};
        }
      }
      Object.keys(this.courses).forEach(originNum => {
        var str = this.courses[originNum].class_weeks;
        if (originNum == this.schoolLength) {
          this.schoolLength = courseNum
          console.log(this.schoolLength)
        }
        if (str.indexOf("-") != -1) {
          if (str.indexOf(",") != -1) {
            // '1-3,'
            let strs = str.split(/[,]/);
            Object.keys(strs).forEach(key => {
              if (strs[key].indexOf("-") != -1) {
                // '1-3'
                let strings = strs[key].split(/[-]/);
                if (
                  strings[0] <= this.thisweek &&
                  this.thisweek <= strings[1]
                ) {
                  this.coursesOfThisWeek[courseNum] = this.courses[originNum];
                  courseNum++;
                }
              } else {
                // '3'
                if (strs[key] == this.thisweek) {
                  this.coursesOfThisWeek[courseNum] = this.courses[originNum];
                  courseNum++;
                }
              }
            });
          } else {
            // '1-3'
            let strs = str.split(/[-]/);
            if (strs[0] <= this.thisweek && this.thisweek <= strs[1]) {
              this.coursesOfThisWeek[courseNum] = this.courses[originNum];
              courseNum++;
            }
          }
        } else {
          // '1,2,3,4','2'
          let strs = str.split(/[,]/);
          Object.keys(strs).forEach(i => {
            if (strs[i] == this.thisweek) {
              this.coursesOfThisWeek[courseNum] = this.courses[originNum];
              courseNum++;
            }
          });
        }
        if (this.courses.length) {
          //  筛选本周课程
          if (this.courses.length - 1 == originNum) {
            Object.keys(this.coursesOfThisWeek).forEach(i => {
              var classinfo =
                this.coursesOfThisWeek[i].class_name +
                "<br>@" +
                this.coursesOfThisWeek[i].class_position;
              var weektime = this.coursesOfThisWeek[i].class_times;
              if (weektime != null) {
                var startTime = parseInt(weektime.substr(1, 2));
                var endTime = parseInt(weektime.slice(-2));
                weektime = parseInt(weektime.charAt(0));
                for (let n = 1; n <= 12; n++) {
                  if (n >= startTime && n <= endTime) {
                    weektime = weektime % 7; // 转化id
                    this.classInfos[weektime][n][0] = classinfo; // 存储课表信息
                    if (i < this.schoolLength) {                // 存储课表属性
                      this.$set(_this.classInfos[weektime][n], 1, 0);
                    } else if (i >= this.schoolLength) {
                      this.$set(_this.classInfos[weektime][n], 1, 1);
                    }
                    this.$set(_this.classInfos[weektime][n], 0, classinfo);
                    this.$set(_this.classInfos[weektime][n], 2, i);
                  }
                }
              }
            });
          }
        }
      });
    },
    FixStyle() {
      // 表头部分
      for (let i = 0; i < 7; i++) {
        let headerid = "Header-" + i;
        if (this.thisday % 7 == i && this.thisweek == this.today.thisweek) {
          document.getElementById(headerid).style.backgroundColor = '#DDE8EE'
        } else {
          document.getElementById(headerid).style.backgroundColor = '#F4F8F9'
        }
        for (let j = 1;j <= 12;j++) { //重置小格高度
          let bodyid = (i+1) + '-' + j
          document.getElementById(bodyid).style.height = '8%'
        }
      }
      // 课表部分
      var classNum = 0;
      for (let i = 0; i < 7; i++) {
        for (let j = 1; j <= 12; j++) {
          var id = i + 1 + "-" + j
          document.getElementById(id).style.backgroundColor = "" // 重置背景颜色
          if (this.classInfos[i][j][0]) {
            var lastTime = 0
            for (let k = j; k <= 13; k++) {
              if (k <= 12 && this.classInfos[i][k][0] == this.classInfos[i][j][0]) {
                lastTime++;
                continue;
              } else if (
                this.classInfos[i][k] != this.classInfos[i][j] ||
                k > 12
              ) {
                let height = lastTime * 8.2;
                let colorNum = (classNum % 7) + 1;
                document.getElementById(id).style.height = height + "%";
                if (this.classInfos[i][j][1] == 0) {
                  document.getElementById(id).style.backgroundColor = this.classcolor[colorNum];
                } else if (this.classInfos[i][j][1] == 1) {
                  document.getElementById(id).style.backgroundColor = 'rgb(250, 220, 220)';
                }
                document.getElementById(id).style.borderRadius = "5px";
                for (let l = j + 1; l < k; l++) {
                  let Id = i + 1 + "-" + l;
                  document.getElementById(Id).style.height = "0%";
                }
                j = k - 1;
                classNum++;
                break;
              }
            }
          }
        }
      }
      /*if (this.thisweek == this.today.thisweek) { //调节宽度
        for (let i = 0; i < 7; i++) {
          let bodyid = "Row-" + i;
          let headerid = "Header-" + i;
          if (this.thisday % 7 == i) {
            document.getElementById(bodyid).style.width = "18%";
            document.getElementById(headerid).style.width = "18%";
            document.getElementById(headerid).style.borderLeft =
              "3px solid rgb(133, 183, 150)";
            document.getElementById(headerid).style.borderRight =
              "3px solid rgb(133, 183, 150)";
            document.getElementById(headerid).style.backgroundColor =
              "rgb(133, 183, 150)";
            document.getElementById(
              bodyid
            ).style.backgroundColor = this.classcolor[0];
          } else if (this.thisday % 7 != i) {
            document.getElementById(bodyid).style.width = "13.8%";
            document.getElementById(headerid).style.width = "13.8%";
          }
        }
      } else if (this.thisweek != this.today.thisweek) {
        for (let i = 0; i < 7; i++) {
          let bodyid = "Row-" + i;
          let headerid = "Header-" + i;
          document.getElementById(bodyid).style.width = "14.2%";
          document.getElementById(headerid).style.width = "14.2%";
          document.getElementById(headerid).style.border = "none";
          document.getElementById(headerid).style.background = "none";
          document.getElementById(bodyid).style.backgroundColor =
            "rgb(242, 242, 242)";
        }
      }*/
    },
    passClassInfo (i, j) {
      var InfoId = this.classInfos[i][j][2]
      var Info = {
        classinfo: this.coursesOfThisWeek[InfoId],
        iscustom: this.classInfos[i][j][1]
      }
      if (this.coursesOfThisWeek[InfoId] != undefined) {
        console.log('可以传')
        console.log(this.coursesOfThisWeek[InfoId])
        this.$emit('classinfo', Info)
      }
    },
    getdate (days) {
      var beginDateStr = this.seasonstart.replace(/-/g,"\/");
      var beginDate = new Date(beginDateStr)
      beginDate.setDate(beginDate.getDate() + (this.thisweek-1)*7 + days)
      var endDateStr = (beginDate.getMonth()+1) + "-" + beginDate.getDate()
      console.log(endDateStr)
      return endDateStr
    }
  },
  created() {
    this.classInfos = {}
    for (let i = 0; i < 7; i++) {
      this.classInfos[i] = {}
      for (let j = 0; j <= 12; j++) {
        this.classInfos[i][j] = ""
      }
    }
    Bus.$on("today", msg => {
      this.today = msg
      this.thisday = msg.thisday;
      this.thisweek = msg.thisweek;
    })
    Bus.$on("thisweek", msg => {
      this.thisweek = msg
    })
    Bus.$on("seasonstart", msg => {
      this.seasonstart = msg
    })
    this.courses = new Array()
  },
  mounted () {
    let url = "/api/getSchedule"
    var studentId = sessionStorage.getItem('studentId')
    var studygrade = this.today.studygrade
    this.$axios
      .get(url, {
        params: {
          studentid: studentId,
          grade: studygrade
        }
      })
      .then(rsp => {
        console.log(rsp);
        this.schoolcourses = rsp.data.school_courses
        this.customcourses = rsp.data.custom_courses
        this.courses = this.schoolcourses.concat(this.customcourses)
        this.GetCoursesOfThisWeek()
        this.FixStyle()
      });
  },
  watch: {
    thisweek(val, oldval) {
      this.GetCoursesOfThisWeek()
      this.FixStyle()
    }
  }
};
</script>

<style scoped>
.Schedule {
  width: 100%;
  height: 100%;
}
.HeaderRow-container {
  width: 100%;
  height: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #F4F8F9;
}
.HeaderRow-container div {
  width: 13.4%;
  height: 100%;
  font-size: 0.8rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.month {
  width: 5% !important;
  height: 100%;
  font-size: 0.7rem !important;
}
.header-row span {
  font-size: 0.6rem;
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
  background: #F4F8F9;
}
.classes-container {
  width: 95%;
  height: 100%;
  background-color: white;
}
.row-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.col-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 13.7%;
}
.classinfo-container {
  width: 100%;
  height: 8.2%;
  font-size: 0.8rem;
  overflow: hidden;
  color: #404040;
}
@media screen and (max-width: 376px) {
  .classinfo-container {
    font-size: 0.6rem;
  }
}
</style>
