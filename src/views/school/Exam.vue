<template>
  <div class="pub">
    <my-crumbs></my-crumbs>
    <div class="filter">
      <div class="filter-item">
        <div class="label">年级</div>
        <el-select v-model="form.gradeId" clearable placeholder="请选择" size="small">
          <el-option v-for="item in tableSchool" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId">
          </el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <div class="label">考试日期</div>

        <el-date-picker v-model="form.examTime" :editable="false" value-format='yyyy-MM-dd HH:mm:ss' type="date" size="small" style="width: 194px;" placeholder="请选择">
        </el-date-picker>
      </div>
      <div class="filter-item">
        <div class="btn" @click="getData">查询</div>
      </div>
      <div class="filter-item">
        <div class="btn" @click="show('add')">新建考试</div>
      </div>
    </div>
    <div class="table">
      <div class="left_ear"></div>
      <div class="right_ear"></div>
      <el-table ref="table" :data="tableData" tooltip-effect="dark" header-cell-class-name="tableTou" cell-class-name="tableRow">
        <el-table-column prop="examName" label="考试名称" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="examTime" label="考试日期" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="showStartTime" label="展示开始时间" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="showEndTime" label="展示结束时间" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gradeName" label="发布对象" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- <div class="text-btn" @click="Modification(scope.row.id)" style="margin: 0 4px;">编辑</div> -->
            <div class="text-btn" @click="Delete(scope.row.id)" style="margin: 0 4px;">删除</div>
          </template>
        </el-table-column>

      </el-table>
      <!--<div class="fenye">
				<el-pagination :current-page.sync="currentPage" :page-size="pageSize" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>-->

    </div>

    <el-dialog :title="dialogType == 'add' ? '新建考试' : '编辑'" :visible.sync="dialogDetailShow" :width="dialogType == 'look' ? '600px' : '800px'" center custom-class="pwdDialog" @closed="clsDat">

      <template>
        <el-form ref="form" :model="form" :rules="rules" style="width: 712px;margin-left: 38px;margin-right: 50px;margin-top: 30px;" :inline="true">
          <el-form-item label="考试名称" prop="examName" style="width: 346px;text-align: right;">
            <el-input v-model="form.examName" clearable :maxlength="15" size="small " style="width: 194px;"></el-input>
          </el-form-item>
          <el-form-item label="考试日期" prop="examTime" style="width: 346px;text-align: right;">
            <el-date-picker v-model="form.examTime" :editable="false" :picker-options="pickerOptions" value-format='yyyy-MM-dd HH:mm:ss' @change="gettime(form.examTime)" type="date" size="small" style="width: 194px;" placeholder="请选择">
            </el-date-picker>

          </el-form-item>
          <el-form-item label="展示开始时间" prop="showStartTime" style="width: 346px;text-align: right;">
            <el-date-picker v-model="form.showStartTime" :editable="false" :picker-options="pickerOptions" ype="dates" size="small" style="width: 194px;" value-format='yyyy-MM-dd' placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="展示结束时间" prop="showEndTime" style="width: 346px;text-align: right;">
            <el-date-picker v-model="form.showEndTime" :editable="false" :picker-options="pickerOptions" ype="dates" size="small" style="width: 194px;" value-format='yyyy-MM-dd' placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发布对象" prop="Tags" style="width: 346px;text-align: right;">
            <el-select v-model="Tags" clearable placeholder="请选择" size="small" @change="Forgrade(Tags)" style="width: 194px;">
              <el-option v-for="item in tableSchool" :key="item.gradeId" :label="item.gradeName" :value="[item.gradeId,item.gradeName]">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 346px;text-align: left;padding-top: 6px;">
            <div class="btn" @click="addDomain">添加</div>
          </el-form-item>
          <el-form-item style="width: 100%;">
            <el-tag v-for="(tag, index) in tags" :key="index" closable type="info" @close="handleClose(tag)">{{tag.gradeName}}</el-tag>
          </el-form-item>
          <el-form-item style="width: 100%;text-align: center;letter-spacing: 1px;color: #919d9f;">
            <div style="display: flex;align-items: center;justify-content: center;">距离考试还有<span style="font-size: 26px;color: #ff1919;margin: 0 5px;">{{predestination}}</span>天</div>
          </el-form-item>

        </el-form>
        <template slot="footer">
          <div class="dialog-footer">
            <div class="btn btn1" v-if="Viewone=='show'" @click="save('form')">保存</div>
            <div class="btn btn1" v-if="Viewone=='hidd'" @click="dialogDetailShow=false">发布</div>
          </div>
        </template>
      </template>

    </el-dialog>

  </div>
</template>

<script>
import fetch from "@/assets/http/fetch"
import Exam from "@/assets/api/Exam"
import grade from "@/assets/api/grade"
import Equipment from "@/assets/api/Equipment"
export default {
  data () {
    var teleHanz = (rule, value, callback) => {
      var regEn = /([\u4e00-\u9fa5])$/;
      if (!regEn.test(value)) {
        callback(new Error('只能汉字'));
      } else {
        callback();
        teleHanz
      }
    };
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      input: '',
      pageSize: 10,
      total: 0,
      currentPage: 0,
      grade: '',
      Tags: [],
      tableSchool: [], //年级
      dialogDetailShow: false,
      dialogType: 'add',
      options: [],
      tags: [],
      form: {
        examName: '',
        examTime: '',
        gradeId: '',
        gradeName: '',
        showStartTime: '',
        showEndTime: '',
      },
      Viewone: '',
      tableData: [],
      //时间
      predestination: 0,
      rules: {
        examName: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }, {
          validator: teleHanz,
          trigger: 'blur'
        }],
        examTime: [{
          required: true,
          message: '必填项',
          trigger: 'change'
        },],
        showEndTime: [{
          required: true,
          message: '必填项',
          trigger: 'change'
        },],
        showStartTime: [{
          required: true,
          message: '必填项',
          trigger: 'change'
        },],
        showStartTime: [{
          required: true,
          message: '必填项',
          trigger: 'change'
        },],
        Tags: [{

        },],
        gradeName: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          type: 'number',
          message: '年龄必须为数字值'
        }
        ]
      }

    }
  },
  created () {
    this.getData();
    //			this.getGrade();
    this.Forgrade();
  },
  methods: {
    gettime (id) {
      var examTime = this.form.examTime
      var date = new Date();
      var dateSpan,

        iDays;
      var sDate1 = Date.parse(examTime);
      var sDate2 = Date.parse(date);
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      if (sDate2 < sDate1) {
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        this.predestination = iDays
      } else {
        this.predestination = '已过期'
      }

    },

    addDomain () {
      var f = false
      this.tags.forEach(a => {
        if (a.gradeId == this.Tags[0]) {
          f = true
        }
      })
      if (!f) {
        this.tags.push({
          gradeName: this.Tags[1],
          gradeId: this.Tags[0]
        })
      } else {
        this.$message({
          type: 'warning',
          message: '不能重复添加'
        })
      }
    },
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    // 获取年级
    Forgrade () {
      var objone = []
      fetch.get(Equipment.getGradeByschoolId, '', res => {
        let school = JSON.parse(res)
        if (school.code === 200) {
          school.data.forEach((a, i) => {
            objone[i] = {
              gradeName: a.studyPhase + a.gradeName,
              gradeId: a.gradeId
            }
          })
          this.tableSchool = objone;
        } else if (school.code === 201) {

          this.tableSchoo = [];
        } else {
          this.$message({
            message: school.message,
            type: 'warning'
          });
          this.tableSchool = []

        }
      })
    },
    getGrade () {
      fetch.get(Equipment.getGradeByschoolId, '', res => {
        let school = JSON.parse(res)
        if (school.code === 200) {
          this.tableSchool = school.data;
        } else if (school.code === 201) {

          this.tableSchoo = [];
        } else {
          this.$message({
            message: school.message,
            type: 'warning'
          });
          this.tableSchool = []

        }
      })
    },
    getGrade (id) {

      this.gradeId = id
    },
    // 获取考试
    getData () {
      let par = {
        pageSize: this.pageSize,
        pageNumber: this.currentPage,
        gradeId: this.form.gradeId,
        examTime: this.form.examTime,
      }
      fetch.get(Exam.getExam, par, res => {

        if (res.code === 200) {
          this.foramtDate(res.data.row)
          this.tableData = res.data.row;
          this.total = res.data.total;
        } else if (res.code === 201) {
          this.tableData = [];
          this.total = 0;
        }
      })
    },
    foramtDate (data) {
      data.forEach(ele => {
        let result = ele.showStartTime;

        result = result.slice(0, 4).split("-") + '-' + result.slice(5, 7).split("-") + '-' + result.slice(8, 10).split("-");

        ele.showStartTime = result;
        let resulto1 = ele.showEndTime;

        resulto1 = resulto1.slice(0, 4).split("-") + '-' + resulto1.slice(5, 7).split("-") + '-' + resulto1.slice(8, 10).split("-");

        ele.showEndTime = resulto1;
      });
    },
    show (t) {
      this.dialogType = 'edit'
      this.dialogDetailShow = true
      this.Viewone = 'show'
    },
    //编辑
    Modification (id) {
      this.Forgrade();
      this.dialogType = 'add'
      this.Viewone = 'hidd'
      this.dialogDetailShow = true
      let par = {
        examId: id
      }
      fetch.get(Exam.getExamByid, par, res => {
        if (res.code === 200) {
          this.form.examName = res.data.examName
          this.form.examTime = res.data.examTime
          let d = []
          let gradeIds = res.data.gradeId.split(",")
          let gradeNames = res.data.gradeName.split(",")
          gradeIds.forEach((v, i) => {
            d[i] = v
            gradeNames.forEach((a, j) => {

              if (a == '') {
                this.tags[j] = {
                  gradeName: a,
                  gradeId: d[j]
                }
              } else {

                this.tags[j] = {
                  gradeName: a,
                  gradeId: d[j]
                }
              }

            });
          });
          this.form.showStartTime = res.data.showStartTime.slice(0, 12)
          this.form.showEndTime = res.data.showEndTime.slice(0, 12)
          this.gettime()
        } else {

        }
      })
    },
    Delete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let par = {
          examId: id
        }
        fetch.delete(Exam.deleteExamByid, par, res => {

          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            });
            this.getData();
          } else {
            this.$message({
              message: res.message,
              type: 'success'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //保存
    save (form) {
      var sDate1 = Date.parse(this.form.showStartTime);
      var sDate2 = Date.parse(this.form.showEndTime);
      var sDate = Date.parse(this.form.examTime);
      if (sDate < sDate1) {
        this.$message({
          message: '展示开始时间不能大于考试时间',
          type: 'warning'
        });
        return
      }
      if (sDate < sDate2) {
        this.$message({
          message: '展示结束时间不能大于考试时间',
          type: 'warning'
        });
        return
      }
      let gradeId = []
      let gradeName = []
      this.tags.forEach(a => {
        gradeId.push(a.gradeId)
        gradeName.push(a.gradeName)

      })

      this.$refs[form].validate((valid) => {
        if (valid) {
          let par = {
            examName: this.form.examName,
            examTime: this.form.examTime,
            gradeId: gradeId.join(',').slice(','),
            gradeName: gradeName.join(',').slice(','),
            showStartTime: this.form.showStartTime,
            showEndTime: this.form.showEndTime,
          }

          fetch.post(Exam.insertExam, par, res => {
            if (res.code === 200) {
              this.getData()
              this.dialogDetailShow = false
            } else {
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
          })
          this.flag = true;
        } else {
          return false;
          this.flag = false;
        }

      })
    },
    //发布
    release () {
      let gradeId = []
      let gradeName = []
      this.tags.forEach(a => {
        gradeId.push(a.grade_id)
        gradeName.push(a.grade_name)

      })

      this.$refs['form'].validate(b => {
        let par = {
          examName: this.form.examName,
          examTime: this.form.examTime,
          gradeId: gradeId.join(',').slice(','),
          gradeName: gradeName.join(',').slice(','),
          showStartTime: this.form.showStartTime,
          showEndTime: this.form.showEndTime,
        }

        fetch.post(Exam.insertExam, par, res => {

          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            });
            this.getData();
            this.dialogDetailShow = false
          } else {
            this.$message({
              message: res.message,
              type: 'success'
            });
          }
        })
      })
    },
    clsDat () {
      for (const key in this.form) {
        this.form[key] = "";
      }
      this.predestination = '';
      this.Tags = '';
      this.tags = [];
      if (this.dialogType != 'look') {
        this.$refs['form'].resetFields()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pub {
  height: 100%;
  overflow-y: auto;
}
</style>