<template>
  <div class="pub">
    <my-crumbs></my-crumbs>
    <div class="filter">
      <div class="filter-item">
        <div class="btn" @click="show('add')">新建考勤</div>
      </div>
      <div class="filter-item" style="flex: 1;position: relative;">
        <p style="position: absolute;left: 50%;top: -20px;transform: translate(-50%);">当前全校默认考勤时间：星期一 -- 星期五 07：00 --18：00</p>
        <p style="position: absolute;left: 50%;top: 5px;transform: translate(-50%);color:red;">提示：如需特殊设置，请点击新建考勤</p>
      </div>
    </div>
    <div class="table">
      <div class="left_ear"></div>
      <div class="right_ear"></div>
      <el-table ref="table" :data="tableData" tooltip-effect="dark" header-cell-class-name="tableTou" cell-class-name="tableRow">
        <el-table-column label="考勤区间" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{['','星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][scope.row.startDay]}} --
            {{['','星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][scope.row.endDay]}}
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="到校时间" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="endTime" label="离校时间" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gradeName" label="发布对象" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="text-btn" style="margin-right: 20px;" @click="Modification(scope.row.id)">编辑</div>
            <div class="text-btn" @click="clickUser(scope.row.id)">删除</div>
          </template>
        </el-table-column>

      </el-table>
      <!--<div class="fenye">
				<el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>-->

    </div>
    <el-dialog :title="dialogType == 'add' ? '新建考勤' : '编辑'" :visible.sync="dialogShow" @closed="reset" width="800px" center custom-class="pwdDialog">
      <div class="edit">
        <el-form ref="form" :inline="true" :label-position="labelPosition" :model="form" label-width="110px" style="text-align: center;padding-top: 10px;">
          <el-form-item label="发布对象:">
            <el-select v-model="Tags" @change="getGrade(Tags)" clearable placeholder="请选择" size="small">
              <el-option v-for="item in Grade" :key="item.gradeId" :label="item.gradeName" :value="[item.gradeId,item.gradeName]">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 209px;text-align: left;padding-top: 6px;">
            <div class="btn" @click="addDomain">添加</div>
          </el-form-item>
          <br />
          <el-form-item>
            <el-tag v-for="(tag, index) in tags" :key="index" closable type="info" @close="handleClose(tag)">{{tag.gradeName}}</el-tag>
          </el-form-item>
          <br />
          <el-form-item label="考勤区间:">
            <el-select v-model="form.startDay" clearable placeholder="请选择" size="small">
              <el-option v-for="item in week" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span>--</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.endDay" clearable placeholder="请选择" size="small">
              <el-option v-for="item in week" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="到校考勤时间:" style="margin-top: 15px;">
            <el-time-picker style="width: 187px;" clearable size="small" :editable="false" v-model="form.startTime" value-format="HH:mm:ss" placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
          <el-form-item style="margin-top: 15px;">
            <span>--</span>
          </el-form-item>
          <el-form-item style="margin-top: 15px;">
            <el-time-picker style="width: 187px;" clearable size="small" :editable="false" v-model="form.endTime" value-format="HH:mm:ss" placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item>
            <div class="btn btn1" v-if="dialogType == 'edit'" @click="save">保存</div>
            <div class="btn btn1" v-if="dialogType == 'add'" @click="onSubmit">发布</div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import fetch from '@/assets/http/fetch';
import SchoolIntroduce from '@/assets/api/SchoolIntroduce';
export default {
  data () {
    return {
      ID: '',
      type: '',
      labelPosition: 'right',
      form: {
        startDay: '',
        endDay: '',
        startTime: '',
        endTime: ''
      },
      total: 0,
      pageSize: 10,
      currentPage: 0,
      dialogShow: false,
      dialogType: 'add',
      input12: '',
      input13: '',
      input14: '',
      options: [],
      week: [{
        label: '星期一',
        value: 1
      },
      {
        label: '星期二',
        value: 2
      },
      {
        label: '星期三',
        value: 3
      },
      {
        label: '星期四',
        value: 4
      },
      {
        label: '星期五',
        value: 5
      },
      {
        label: '星期六',
        value: 6
      },
      {
        label: '星期日',
        value: 7
      }
      ],
      Grade: [],
      grade: '',
      tags: [],
      Tags: [],
      tableData: [],
      Table: []
    }
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      fetch.get(SchoolIntroduce.getCheckingSetall, '', res => {
        if (res.code === 200) {
          this.tableData = res.data;
          this.total = res.total;

        } else {
          this.tableData = [];
          this.total = 0;
        }
      })
    },
    foramtDate (data) {
      data.forEach(ele => {
        let result = ele.startTime;

        result = result.slice(11, 19)

        ele.startTime = result;
        let resulto1 = ele.endTime;

        resulto1 = resulto1.slice(11, 19)

        ele.endTime = resulto1;
      });
    },
    show (t) {
      var objone = []
      this.dialogType = t
      this.dialogShow = true
      this.type = t
      fetch.get(SchoolIntroduce.getGradeByschoolId, '', res => {
        let school = JSON.parse(res)
        if (school.code === 200) {
          school.data.forEach((a, i) => {
            objone[i] = {
              gradeName: a.studyPhase + a.gradeName,
              gradeId: a.gradeId
            }
          })
          this.Grade = objone
        }
      })
    },
    onSubmit () {
      let gradeId = ''
      let gradeName = ''
      this.tags.forEach(v => {
        gradeId += v.gradeId + ','
        gradeName += v.gradeName + ','
      });
      let par = {
        gradeName: gradeName.slice(0, gradeName.lastIndexOf(',')),
        gradeId: gradeId.slice(0, gradeId.lastIndexOf(',')),
        ...this.form
      }
      let flag = true
      for (var key in par) {
        console.log(key)
        if (par[key]) {
          console.log(par[key])
        } else {
          flag = false;
        }
      }
      if (!flag) {
        this.$message({
          message: '请填写完整',
          type: 'warning'
        });
        flag = false;
        return
      } else {
        flag = true;
      }
      console.log('666')
      fetch.post(SchoolIntroduce.insertCheckingSet, par, res => {

        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.getData();
          this.dialogShow = false;
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      })
    },
    save () {
      let gradeId = ''
      let gradeName = ''
      this.tags.forEach(v => {
        gradeId += v.gradeId + ','
        gradeName += v.gradeName + ','
      });
      let par = {
        Id: this.ID,
        gradeName: gradeName.slice(0, gradeName.lastIndexOf(',')),
        gradeId: gradeId.slice(0, gradeId.lastIndexOf(',')),
        ...this.form
      }
      let flag = true
      for (var key in par) {
        console.log(key)
        if (par[key]) {
          console.log(par[key])
        } else {
          flag = false;
        }
      }
      if (!flag) {
        this.$message({
          message: '请填写完整',
          type: 'warning'
        });
        flag = false;
        return
      } else {
        flag = true;
      }
      fetch.put(SchoolIntroduce.updateChecksetByid, par, res => {
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.getData();
          this.dialogShow = false;
        } else {

        }
      })
    },
    getGrade (id) {
      this.grade = id
    },
    addDomain () {
      if (this.Tags == '') {
        this.$message({
          message: '请选择发送对象！',
          type: 'warning'
        })
        return
      }
      if (this.type === 'add') {
        fetch.get(SchoolIntroduce.addGradeCheck, { gradeId: this.grade[0] }, res => {
          if (res.data === true) {
            this.$message({
              message: '不能重复添加！',
              type: 'warning'
            })
            return
          } else {
            var f = false
            this.tags.forEach(a => {
              if (a.gradeId == this.grade[0]) {
                f = true
              }
            })
            if (!f) {
              this.tags.push({
                gradeName: this.grade[1],
                gradeId: this.grade[0]
              })
            } else {
              this.$message({
                type: 'warning',
                message: '不能重复添加'
              })
            }
          }
        })
      } else {
        fetch.get(SchoolIntroduce.addGradeCheck, { checkId: this.type, gradeId: this.grade[0] }, res => {
          console.log(res)
          if (res.data === true) {
            this.$message({
              message: '不能重复添加！',
              type: 'warning'
            })
            return
          } else {
            var f = false
            this.tags.forEach(a => {
              if (a.gradeId == this.grade[0]) {
                f = true
              }
            })
            if (!f) {
              this.tags.push({
                gradeName: this.grade[1],
                gradeId: this.grade[0]
              })
            } else {
              this.$message({
                type: 'warning',
                message: '不能重复添加'
              })
            }

          }
        })
      }

    },
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    reset () {
      for (const key in this.form) {
        this.form[key] = "";
      }
      this.tags = []
      this.Tags = []
      this.ID = ''
    },
    Modification (id) {

      this.show('edit')
      this.type = id
      fetch.get(SchoolIntroduce.getChecksetByid, {
        checkId: id
      }, res => {
        if (res.code == 200) {

          this.ID = res.data.id
          let d = []
          let gradeIds = res.data.gradeId.split(",")
          let gradeNames = res.data.gradeName.split(",")
          gradeIds.forEach((v, i) => {
            d[i] = v
            gradeNames.forEach((a, j) => {
              this.tags[j] = { gradeName: a, gradeId: d[j] }
            });
          });
          this.form.startDay = res.data.startDay
          this.form.endDay = res.data.endDay
          this.form.startTime = res.data.startTime
          this.form.endTime = res.data.endTime
        }

      })
    },
    clickUser (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetch.delete(SchoolIntroduce.deleteChecksetByids, { checksetIds: id }, res => {
          if (res.code === 200) {
            this.currentPage = 1
            this.getData()
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }).catch(() => {

      });
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

.el-checkbox + .el-checkbox {
  margin-left: 0;
}

.edit .input {
  width: 150px;
  margin: 0 10px;
  height: 30px;
}

.edit .add {
  display: inline-block;
  width: 30px;
  height: 30px;
  background: #ffffff url(../../assets/school_img/jj.png) no-repeat center
    center;
  position: relative;
  left: 10px;
  top: 10px;
  cursor: pointer;
}

.edit .el-tag--info {
  margin-top: 10px;
  margin-right: 10px;
  background: rgba(46, 192, 225, 0.1);
  color: #606266;
  font-size: 14px;
  border: 1px solid #2ec0e1;
  border-radius: 2px;
}
</style>