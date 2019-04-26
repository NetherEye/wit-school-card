<template>
  <div class="ov">
    <div class="pub">
      <div class="left">
        <div class="p-h1">考勤统计</div>
        <el-form ref="form" :model="createForm">
          <div v-if="isRole === '学校'">
            <el-form-item label="年级" style="display: flex;margin-left:  19px;margin-bottom: 10px;">
              <el-select v-model="createForm.gradeId" clearable placeholder="请选择" style='width: 100%;' @change="handlexian" size="small">
                <el-option v-for="item in tableSchool" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级" style="display: flex;margin-left: 19px;margin-bottom: 10px;">
              <el-select v-model="createForm.classId" clearable placeholder="请选择" size="small">
                <el-option v-for="item in SchoolclassId" :key="item.classId" :label="item.className" :value="item.classId">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="日期" style="display:  flex;margin-left: 19px;margin-bottom: 10px;">
            <el-date-picker v-model="createForm.startTime" type="date" size="small" :editable="false" style='width: 93%;' value-format="yyyy-MM-dd" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item style="display: flex;margin-left: 19px;">
            <div class="btn" style="width: 190px;margin-left: 38px;height: 40px;line-height: 40px;" @click="onSubmit">查询</div>
          </el-form-item>
        </el-form>
        <div class="deshed" style="height: 1px;background-color: #E4E4E4;margin: 0 12px;"></div>
        <div style="position: relative;">
          <div id="m-echart" style="height: 324px;">

          </div>
          <div class="len">
            <li><i style="background: #00d9ff;"><span></span></i>正常<span>{{arr[0]}}</span></li>
            <li><i style="background: #01c1ae;"><span></span></i>早退<span>{{arr[1]}}</span></li>
            <li><i style="background: #a678ff;"><span></span></i>迟到<span>{{arr[2]}}</span></li>
            <li><i style="background: #fd5a85;"><span></span></i>异常<span>{{arr[4]}}</span></li>
            <li><i style="background: #ffd561;"><span></span></i>缺席<span>{{arr[3]}}</span></li>

          </div>
        </div>
      </div>
      <div class="right">
        <div class="h" style="display: flex;justify-content: space-between;">
          <div class="p-h1" v-if="isRole === '学校'">学校新闻</div>
          <div class="p-h1" v-else>班级通知</div>
          <div class="p-h1" style="font-size: 14px;cursor: pointer;letter-spacing: 1px;" @click="go">查看更多</div>
        </div>
        <template v-for="item in SchoolFournalism">
          <div class="msg-item" style="height: 56px;border-bottom: 1px dashed #E4E4E4;display: flex;align-items: center;justify-content: space-between;margin: 0 20px;">
            <div class="msg ellipsis" style="font-size: 14px;letter-spacing: 1px;color: #485a5d;">{{item.title}}</div>
            <span style="font-size: 14px;letter-spacing: 1px;color: #919d9f;min-width: 90px;">{{item.inputTime}}</span>
          </div>
        </template>

      </div>
      <div class="footer-bg"></div>
    </div>
  </div>
</template>

<script>
var echarts = require('echarts/lib/echarts');

require("echarts/lib/component/tooltip");
require('echarts/lib/chart/pie');
import fetch from "@/assets/http/fetch"
import Equipment from "@/assets/api/Equipment"
import allApi from "@/assets/api/school"

export default {
  data () {
    return {
      tableSchool: [],//年级
      SchoolclassId: [],//班级
      SchoolFournalism: [],//学校新闻
      createForm: {
        gradeId: '',
        classId: '',
        startTime: '',
      },
      options: [],

      fpFinsin: [],
      arr: [0, 0, 0, 0, 0],
      isRole: ""
    }

  },
  mounted () {
    this.init()
  },
  created () {
    this.Forgrade();
    this.onSubmit();
    let a = sessionStorage.getItem('userInfo')
    a = JSON.parse(a)

    this.isRole = a.role
    if (this.isRole == '学校') {
      this.Fournalism()

    } else {
      this.tz()
    }
  },
  methods: {
    go () {
      if (this.isRole === '学校') {
        this.$router.push('/school-news')
      } else {
        this.$router.push('/class-inform')
      }
    },
    //查询
    onSubmit () {
      if (this.isRole === '学校') {
        let par = {
          gradeId: this.createForm.gradeId,
          classId: this.createForm.classId,
          date: this.createForm.startTime,
        }
        fetch.get(Equipment.getCheckDetailsCountByClass, par, res => {
          if (res.code === 200) {
            this.arr = [0, 0, 0, 0, 0]
            res.data.forEach(a => {
              this.arr[Number(a.state) - 1] = a.count
            })
            this.init()
          } else {
            this.arr = []
            this.init()
          }
        })
      } else {
        let par = {
          date: this.createForm.startTime,
        }
        fetch.get(Equipment.getCheckDetailsCountByClass, par, res => {

          if (res.code === 200) {
            this.arr = [0, 0, 0, 0, 0]
            res.data.forEach(a => {

              this.arr[Number(a.state) - 1] = a.count
            })
            this.init()
          } else {
            this.arr = []
            this.init()
          }
        })
      }

    },
    // 获取学校新闻
    Fournalism () {
      let par = {
        pageSize: 8,
        pageNumber: 1,
        type: 2
      }
      fetch.get(Equipment.getSchoolMessage, par, res => {
        if (res.code === 200) {
          this.SchoolFournalism = res.data.row;
        } else {
          this.SchoolFournalism = [];
        }
      })
    },
    tz () {
      let a = {
        pageNumber: 1,
        pageSize: 8
      }
      fetch.get(allApi.getClassMessage, a, res => {
        if (res.code === 200) {
          this.SchoolFournalism = res.data.row
        } else if (res.code === 201) {
          this.total = 0
        }
      })
    },
    Forgrade () {
      var objone = {}
      fetch.get(Equipment.getGradeByschoolId, '', res => {
        let school = JSON.parse(res)
        console.log(school)
        if (school.code === 200) {
          school.data.forEach((a, i) => {
            objone[i] = {
              gradeName: a.studyPhase + a.gradeName,
              gradeId: a.gradeId
            }
          })
          this.tableSchool = objone
        } else if (school.code === 201) {

          this.tableSchool = [];
        }
        else {
          this.$message({
            duration: 500,
            message: school.message,
            type: 'warning'
          });
          this.tableSchool = []
        }
      })
    },
    //获取班级
    handlexian (v) {
      this.SchoolclassId = [];
      this.createForm.classId = ''

      if (!v) {
        return
      };
      let par = {
        gradeId: this.createForm.gradeId
      }
      fetch.get(Equipment.getClassByGradeId, par, res => {
        let school = JSON.parse(res)

        if (school.code === 200) {

          this.SchoolclassId = school.data

        } else if (school.code === 201) {

        }
        else {
          this.$message({
            message: school.message,
            type: 'success'
          });
        }
      })
    },
    init () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('m-echart'));
      // 绘制图表
      myChart.setOption({
        roseType: 'angle',
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: '考勤统计',
            type: 'pie',
            radius: '62%',
            center: ['30%', '50%'], // 中心园的位置
            data: [
              {
                value: (this.arr[0] / (this.arr[0] + this.arr[1] + this.arr[2] + this.arr[3] + this.arr[4])) * 100,
                name: '正常',
                itemStyle: {
                  color: '#00d9ff'
                }
              },
              {
                value: (this.arr[1] / (this.arr[0] + this.arr[1] + this.arr[2] + this.arr[3] + this.arr[4])) * 100,
                name: '早退',
                itemStyle: {
                  color: '#01c1ae'
                }
              },
              {
                value: (this.arr[2] / (this.arr[0] + this.arr[1] + this.arr[2] + this.arr[3] + this.arr[4])) * 100,
                name: '迟到',
                itemStyle: {
                  color: '#a678ff'
                }
              },
              {
                value: (this.arr[4] / (this.arr[0] + this.arr[1] + this.arr[2] + this.arr[3] + this.arr[4])) * 100,
                name: '异常',
                itemStyle: {
                  color: '#fd5a85'
                }
              },
              {
                value: (this.arr[3] / (this.arr[0] + this.arr[1] + this.arr[2] + this.arr[3] + this.arr[4])) * 100,
                name: '缺席',
                itemStyle: {
                  color: '#ffd561'
                }
              }
            ],
            label: {
              show: false
            }
          }
        ]
      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ov {
  height: 100%;
  overflow-y: auto;
}
.pub {
  display: flex;
  margin: 20px 0 0px 20px;
  background-color: #edf0f5;
  flex-wrap: wrap;
  margin-bottom: 150px;
}
.left {
  width: 480px;
  height: 600px;
  background-color: #ffffff;
  box-shadow: 0px 2px 9px 0px rgba(105, 105, 105, 0.07);
  margin-right: 20px;
  margin-bottom: 20px;
}

.right {
  flex: 1;
  height: 600px;
  background-color: #ffffff;
  box-shadow: 0px 2px 9px 0px rgba(105, 105, 105, 0.07);
  border-radius: 3px;
  min-width: 480px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.footer-bg {
  position: fixed;
  bottom: 0;
  z-index: 9;
  height: 212px;
  left: 0;
  right: 0;
  background: url(../../assets/school_img/footer-bg.png) no-repeat;
}

.p-h1 {
  font-size: 18px;
  letter-spacing: 2px;
  color: #485a5d;
  margin: 19px;
}

#m-echart {
  position: relative;
}
.len {
  position: absolute;
  top: 44px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #919d9f;
  right: 100px;
}
.len > li {
  display: flex;
  align-items: center;
  height: 19px;
  margin: 24px 0;
}
.len > li > span {
  margin-left: 9px;
  font-size: 24px;
  letter-spacing: 1px;
  color: #919d9f;
}
.len > li > i {
  margin-right: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
}
.len > li > i > span {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #ffffff;
}
</style>