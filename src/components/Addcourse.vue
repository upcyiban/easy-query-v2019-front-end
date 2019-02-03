<template>
  <div class="main-container">
    <div class="submit-container">
      <button class="submit" @click="submit">保存</button>
    </div>
    <div class="form-container">
      <div class="form-frame" align="center">
        <div class="class-name" @click="EditInfo(0)">
          <div class="headerCol">课程名称</div>
          <div class="headerCol input-container">
            <input type="text" placeholder="未填写" v-model="classname">
          </div>
        </div>
        <div class="class-infos">
          <div class="class-info" id="title-1" @click="EditInfo(1)">
            <div class="headerCol">{{titles[1]}}</div>
            <div class="headerCol input-container">
              <input type="text" placeholder="未填写" v-model="classposition">
            </div>
          </div>
          <div class="class-info" id="title-2" @click="EditInfo(2)">
            <div class="headerCol">{{titles[2]}}</div>
            <div class="headerCol input-container"></div>
          </div>
          <div class="class-info weeks-frame" @click="EditInfo(2)">
            <div class="weeks-container">
              <div v-for="i in 18" :key="i" class="week-container" @click="selectweek(i)">
                <div class="week-button" :id="'week-' + i">{{i}}</div>
              </div>
            </div>
            <div class="functions-container">
              <div v-for="i in 3" :key="i" class="radio-container">
                <div class="radio" @click="radio(i)">
                  <div class="radio-inner" :id="'radio-inner-' + i"></div>
                </div>
                {{radios[i-1]}}
              </div>
            </div>
          </div>
          <div class="class-info" id="title-3" @click="EditInfo(3)">
            <div class="headerCol">{{titles[3]}}</div>
            <div class="headerCol input-container">
              <input type="text" placeholder="未填写" v-model="classtimes">
            </div>
          </div>
          <div class="class-info" id="title-4" @click="EditInfo(4)">
            <div class="headerCol">{{titles[4]}}</div>
            <div class="headerCol input-container">
              <input type="text" placeholder="未填写" v-model="classteacher">
            </div>
          </div>
        </div>
      </div>
      <div class="Tips">注：节数请按 ‘1020304’ 格式填写，其中第一位代表上课时间（周一至周日分别为1-7），后每两位为上课小节</div>
    </div>
    <div class="alert-container" v-show="ifsubmit">
      <div class="alert-body">
        {{submitinfo}}
      </div>
      <div class="alert-buttons">
        <button @click="continueAdd">继续添加</button>
        <button @click="$router.push('/schedule')">返回课表</button>
      </div>
    </div>
    <div class="overmain"  v-show="ifsubmit" @click="continueAdd"></div>
  </div>
</template>

<script>
export default {
  name: "addcourse",
  data() {
    return {
      titles: ["课程名称", "　　教室", "　　周数", "　　节数", "　　老师"],
      radios: ["单周", "双周", "全选"],
      radioNum: 0,
      classname: '',
      classweeks: '',
      classposition: '',
      classtimes: '',
      classteacher: '',
      studentid: '1707010229',
      classgrade: '2018-2019-1',
      ifsubmit: false,
      submitinfo: ''
    };
  },
  methods: {
    submit() {
      console.log("点击了保存按钮")
      for (let i = 1;i <= 18;i ++) {
        let id = 'week-' + i
        if (document.getElementById(id).style.borderColor == 'black') {
          if (this.classweeks == '') {
            this.classweeks += i
          } else {
            this.classweeks += (',' + i)
          }
        }
      }
      let url = 'http://yb.upc.edu.cn:8089/addCustomCourse'
      let data = {
        class_name: this.classname,
        class_grade: this.classgrade,
        class_teacher: this.classteacher,
        class_position: this.classposition,
        class_times: this.classtimes,
        class_weeks: this.classweeks,
        student_id: this.studentid
      }
      this.$axios.post(url, data).then(rsp => {
        console.log(rsp)
        if (rsp.data = 'success') {
          this.ifsubmit = true
          this.submitinfo = '添加成功！'
        } else {
          this.ifsubmit = true
          this.submitinfo = '添加失败，请稍后重试！若无法解决请联系小易'
        }
      })
    },
    selectweek(i) {
      let id = "week-" + i;
      if (
        document.getElementById(id).style.border == "none" ||
        document.getElementById(id).style.border == ""
      ) {
        document.getElementById(id).style.border = "2px black solid";
      } else {
        document.getElementById(id).style.border = "none";
      }
    },
    EditInfo(item) {
      for (let i = 1; i <= 4; i++) {
        let id = "title-" + i;
        document.getElementById(id).style.borderLeft = "1px grey solid";
        document.getElementById(id).style.width = "98%";
      }
      if (item != 0) {
        let id = "title-" + item;
        console.log(id);
        document.getElementById(id).style.borderLeft = "7px black solid";
        document.getElementById(id).style.width = "100%";
      }
    },
    radio(num) {
      for (let i = 1; i <= 3; i++) {
        let ID = "radio-inner-" + i;
        document.getElementById(ID).style.backgroundColor = "white";
      }
      if (num != this.radioNum) {
        this.radioNum = num
        let ID = "radio-inner-" + num;
        document.getElementById(ID).style.backgroundColor = "black";
        if (num == 1 || num == 2) {
          for (let i = 1; i <= 18; i++) {
            if (i % 2 == num % 2) {
              let id = "week-" + i;
              document.getElementById(id).style.border = "2px black solid";
            } else {
              let id = "week-" + i;
              document.getElementById(id).style.border = "2px white solid";
            }
          }
        } else if (num == 3) {
          for (let i = 1; i <= 18; i++) {
            let id = "week-" + i;
            document.getElementById(id).style.border = "2px black solid";
          }
        }
      } else if (num == this.radioNum) {
        this.radioNum = 0
        for (let i = 1; i <= 18; i++) {
          let id = "week-" + i;
          document.getElementById(id).style.border = "2px white solid";
        }
      }
    },
    continueAdd () {
      this.ifsubmit = false
    }
  },
  created() {
    document.title = "添加课程";
  }
};
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.submit-container {
  width: 100%;
  height: 7%;
}
.submit {
  width: 15%;
  height: 100%;
  font-size: 1.2rem;
  margin-left: 83%;
  background: none;
  outline: none;
  border: none;
}
.form-container {
  width: 100%;
  height: 93%;
  position: relative;
  z-index: 3;
}
.form-frame {
  width: 80%;
  height: 80%;
  margin-left: 10%;
}
.class-name {
  height: 10%;
  width: 98%;
  border-left: white 1px solid;
  display: flex;
  flex-direction: row;
}
.headerCol {
  width: 30%;
  height: 100%;
  font-size: 1.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.input-container {
  margin-left: 5%;
  width: 65%;
}
.input-container input {
  width: 100%;
  font-size: 1.3rem;
  border: none;
}
.class-infos {
  width: 100%;
  height: 90%;
}
.class-info {
  height: 10%;
  width: 98%;
  border-left: grey 1px solid;
  display: flex;
  flex-direction: row;
}
.weeks-frame {
  height: 50%;
  display: flex;
  flex-direction: column;
}
.weeks-container {
  margin-left: 10%;
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.week-container {
  width: 16%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.week-button {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  border: none;
  text-align: center;
}
.functions-container {
  margin-left: 10%;
  width: 90%;
  height: 30%;
  display: flex;
  flex-direction: row;
}
.radio-container {
  width: 33.33%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.radio {
  width: 1rem;
  height: 1rem;
  margin-right: 0.6rem;
  border-radius: 50%;
  border: 1px lightgray solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.radio-inner {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  border: 1px grey solid;
}
.overmain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.2;
  z-index: 4;
}
.alert-container {
  width: 60%;
  height: 10rem;
  position: absolute;
  top: 30%;
  left: 20%;
  z-index: 5;
  border: 1px grey solid;
  border-radius: 7px;
  background: lightgoldenrodyellow;
}
.alert-body {
  width: 100%;
  height: 70%;
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.alert-buttons {
  width: 100%;
  height: 30%;
  border-top: 1px grey solid;
  display: flex;
  flex-direction: row;
}
.alert-buttons button {
  width: 50%;
  height: 100%;
  background: none;
  border: none;
  outline: none;
  font-size: 1.2rem;
  border-right: 1px grey solid;
}
@media screen and (max-width: 376px) {
  .submit {
    font-size: 1rem;
  }
  .headerCol {
    font-size: 1.2rem;
  }
}
@media screen and (max-width: 321px) {
  .submit {
    font-size: 1rem;
  }
  .headerCol {
    font-size: 1rem;
  }
}
</style>
