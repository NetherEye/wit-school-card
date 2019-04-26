<template>
  <div class="pub">
    <my-crumbs></my-crumbs>
    <div class="filter">
      <div class="filter-item">
        <div class="btn" @click="show('add')">新建发布</div>
      </div>
      <div class="filter-item">
        <div class="btn" @click="clickUser">删除</div>
      </div>
    </div>
    <div class="table">
      <div class="left_ear"></div>
      <div class="right_ear"></div>
      <el-table ref="table" :data="tableData" tooltip-effect="dark" header-cell-class-name="tableTou" cell-class-name="tableRow" @selection-change="handleSelectionChange">
        <el-table-column align="center" type="selection">
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="source" label="发布来源" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="people" label="发布人" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="inputTime" label="发布时间" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- <div style="margin-right:20px;" class="text-btn" @click="Modification(scope.row.id)">编辑</div> -->
            <div class="text-btn" @click="Examine(scope.row.id)">详情</div>
          </template>
        </el-table-column>

      </el-table>
      <div class="fenye" v-if="total!=0">
        <el-pagination :current-page.sync="currentPage" @current-change="getData" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="学校通知" :visible.sync="dialogShow" width="800px" @closed="reset" center custom-class="pwdDialog">
      <div class="edit">
        <el-form ref="form" :label-position="labelPosition" :model="form">
          <el-form-item label="标题">
            <el-input placeholder="请输入标题" :maxlength="30" v-model="form.title" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="通知内容">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form.content"></el-input>
          </el-form-item>
          <el-form-item label="发布方式">
            <el-radio-group v-model="form.manner">
              <el-radio :label="1">立即全屏展示：展示时间
                <el-input class="input" placeholder="请输入内容" v-model="form.showTime" clearable></el-input>分钟</el-radio>
              <el-radio :label="2">延迟展示：延迟时间
                <el-input class="input" placeholder="请输入内容" v-model="form.delayTime" clearable></el-input>分钟，展示时间
                <el-input class="input" placeholder="请输入内容" v-model="form.showTime" clearable></el-input>分钟</el-radio>
              <el-radio :label="3">班牌首页显示：展示时间
                <el-input class="input" placeholder="请输入内容" v-model="form.showTime" clearable></el-input>分钟</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发布对象">
            <el-select style="margin-right:20px;" v-model="gradeClassStr.grade" @change="getClass(gradeClassStr.grade)" clearable placeholder="请选择年级">
              <el-option v-for="item in Grade" :key="item.gradeId" :label="item.gradeName" :value="[item.gradeId,item.gradeName]">
              </el-option>
            </el-select>
            <el-select v-model="gradeClassStr.class" @change="getClassId(gradeClassStr.class)" clearable placeholder="请选择班级">
              <el-option v-for="item in Class" :key="item.classId" :label="item.className" :value="[item.classId,item.className]">
              </el-option>
            </el-select>
            <span class="add" @click="addDomain"></span>
          </el-form-item>
          <el-form-item>
            <el-tag v-for="(tag, index) in tags" :key="index" closable type="info" @close="handleClose(tag)">{{tag.grade_name+tag.class_name}}</el-tag>
          </el-form-item>
          <el-form-item label="发布来源">
            <el-input placeholder="请输入来源" :maxlength="30" v-model="form.source" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn btn1" @click="release">发布</div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="学校通知" :visible.sync="dialogDetailShow" width="800px" @closed="reset" center custom-class="pwdDialog">
      <div class="edit" style="padding-bottom: 30px;">
        <el-form ref="form" :label-position="labelPosition" :model="form">
          <el-form-item label="标题">
            <el-input placeholder="请输入标题" :disabled="dialogType='show'" v-model="form.title" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="通知内容">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :disabled="dialogType='show'" placeholder="请输入内容" v-model="form.content"></el-input>
          </el-form-item>
          <el-form-item label="发布方式">
            <el-checkbox-group :disabled="dialogType='show'">
              <el-checkbox v-if="form.manner == 1">立即全屏展示：展示时间
                <el-input class="input" placeholder="请输入内容" v-model="time" clearable></el-input>分钟</el-checkbox>
              <el-checkbox v-if="form.manner == 2">延迟展示：延迟时间
                <el-input class="input" placeholder="请输入内容" v-model="time" clearable></el-input>分钟，展示时间
                <el-input class="input" placeholder="请输入内容" v-model="time" clearable></el-input>分钟</el-checkbox>
              <el-checkbox v-if="form.manner == 3">班牌首页显示：展示时间
                <el-input class="input" placeholder="请输入内容" v-model="time" clearable></el-input>分钟</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="发布对象">
            <el-tag v-for="(tag, index) in form.temp" :key="index" type="info">{{tag.grade_name+tag.class_name}}</el-tag>
          </el-form-item>
          <el-form-item label="发布来源">
            <el-input placeholder="请输入来源" :disabled="dialogType='show'" v-model="form.source" clearable>
            </el-input>
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
      labelPosition: 'top',
      form: {
        title: '',
        content: '',
        source: '',
        manner: '',
        showTime: '',
        delayTime: '',
      },
      grade: '',
      class: '',
      time: 1,
      gradeClassStr: {
        grade: '',
        class: ''
      },

      total: 0,
      currentPage: 1,
      pageSize: 10,
      dialogDetailShow: false,
      dialogShow: false,
      dialogType: 'add',
      Grade: [],
      Class: [],
      tags: [],
      tableData: []

    }
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      let par = {
        pageSize: this.pageSize,
        pageNumber: this.currentPage
      }
      fetch.get(SchoolIntroduce.getSchoolInform, par, res => {
        if (res.code === 200) {
          this.tableData = res.data.row;
          this.total = res.data.total;
        } else {
          this.tableData = [];
          this.total = 0;
        }
      })
    },
    reset () {
      for (const key in this.form) {
        this.form[key] = "";
      }
      for (const key in this.gradeClassStr) {
        this.gradeClassStr[key] = "";
      }
      this.tags = []
      this.grade = ''
      this.class = ''
    },
    show (t) {
      var objone = []
      this.dialogType = t
      this.dialogShow = true
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
    getClass (id) {
      this.gradeClassStr.class = ''
      this.Class = []
      this.grade = id
      fetch.get(SchoolIntroduce.getClassByGradeId, {
        gradeId: id[0]
      }, res => {
        this.Class = JSON.parse(res).data
      })
    },
    getClassId (id) {

      this.class = id
    },
    release () {
      //				||this.form.content==''||this.form.source==''||this.form.manner==''||this.gradeClassStr==''
      if (this.form.title == '') {
        this.$message({
          type: 'warning',
          message: '标题不能为空！'
        })
        return
      }
      var str = /[\u4e00-\u9fa5]$/;
      if (!str.test(this.form.title)) {
        this.$message({
          type: 'warning',
          message: '标题只能为中文！'
        })
        return
      }
      if (this.form.content == '') {
        this.$message({
          type: 'warning',
          message: '内容不能为空！'
        })
        return
      }
      if (this.form.source == '') {
        this.$message({
          type: 'warning',
          message: '发布来源不能为空！'
        })
        return
      }
      if (this.tags == '') {
        this.$message({
          type: 'warning',
          message: '请添加发布对象！'
        })
        return
      }
      if (this.form.manner == '') {
        this.$message({
          type: 'warning',
          message: '选择发布方式！'
        })
        return
      }
      if (this.form.manner == 1 || this.form.manner == 3) {
        if (this.form.showTime == '') {
          this.$message({
            type: 'warning',
            message: '展示时间不能为空！'
          })
          return
        }
      }
      if (this.form.manner == 2) {
        if (this.form.showTime == '' || this.form.delayTime == '') {
          this.$message({
            type: 'warning',
            message: '展示时间不能为空！'
          })
          return
        }
      }
      var str = /[\u4e00-\u9fa5]$/;
      if (!str.test(this.form.title)) {
        this.$message({
          type: 'warning',
          message: '只能是中文！'
        })
        return
      }
      let par = {
        gradeClassStr: JSON.stringify(this.tags),
        ...this.form
      }
      fetch.post(SchoolIntroduce.insertSchoolInform, par, res => {
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
    addDomain () {

      if (this.gradeClassStr.class == '') {
        this.$message({
          type: 'warning',
          message: '请填写完整内容'
        })
        return
      }
      var f = false
      this.tags.forEach(a => {
        console.log(a, '111')

        if (a.class_id === this.class[0] && a.grade_id === this.grade[0]) {
          f = true
        }
      })
      if (!f) {
        this.tags.push({
          class_name: this.class[1],
          class_id: this.class[0],
          grade_name: this.grade[1],
          grade_id: this.grade[0]
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
    Examine (id) {
      this.dialogType = 'show'
      this.dialogDetailShow = true
      fetch.get(SchoolIntroduce.getSchoolInformByid, {
        schoolInformId: id
      }, res => {

        if (res.code == 200) {
          this.form = res.data
          const date2 = new Date(this.form.showEndTime).getTime()
          const date1 = new Date(this.form.showStartTime).getTime()
          this.time = (date2 - date1).getMinutes()
        }
      })
    },
    Modification (id) {
      this.ID = id
      this.show('edit')
      fetch.get(SchoolIntroduce.getSchoolInformByid, {
        schoolInformId: id
      }, res => {

        if (res.code == 200) {
          this.form.title = res.data.title
          this.form.source = res.data.source
          this.form.manner = res.data.manner
          this.form.content = res.data.content
          this.tags = res.data.temp

          const date2 = new Date(res.data.showEndTime).getTime()
          const date1 = new Date(res.data.showStartTime).getTime()
          const Time = new Date(date2 - date1).getMinutes()

          if (res.data.manner == 1) {
            this.form.showTime = Time
          } else if (res.data.manner == 2) {
            this.form.showTime = Time
            this.form.delayTime = Time
          } else if (res.data.manner == 3) {
            this.form.showTime = Time
          }


        }

      })
    },
    clickUser () {
      if (!this.Table) {
        this.$message({
          duration: '1000',
          showClose: true,
          message: '请选择列表',
          type: "error"
        });
        return
      }
      let ID = ''
      this.Table.forEach(v => {
        ID += v.id + ','
      });
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetch.delete(SchoolIntroduce.deleteSchoolInformByid, {
          schoolInformIds: ID.slice(0, ID.lastIndexOf(','))
        }, res => {
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            });
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
    },
    handleSelectionChange (val) {
      this.Table = val;
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

.el-radio + .el-radio,
.el-checkbox + .el-checkbox {
  margin-left: 0;
}

.el-radio {
  margin-top: 10px;
}

.el-radio:first-child {
  margin-top: 0;
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