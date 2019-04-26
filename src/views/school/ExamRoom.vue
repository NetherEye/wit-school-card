<template>
  <div class="pub">
    <my-crumbs></my-crumbs>
    <div class="filter">
      <div class="filter-item">
        <div class="btn" @click="show('add')">新增</div>
      </div>
    </div>
    <div class="table">
      <div class="left_ear"></div>
      <div class="right_ear"></div>
      <el-table ref="table" :data="tableData" tooltip-effect="dark" header-cell-class-name="tableTou" cell-class-name="tableRow">
        <el-table-column prop="examRoomNum" label="考场号" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gradeNameone" label="发布班牌" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="examName" label="考试名称" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="subjectName" label="考试科目" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="numberRange" label="考生号区间" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="startTime" label="考试开始时间" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="endTime" label="考试结束时间" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="invigilator" label="监考人" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- <div class="text-btn" @click="Modification(scope.row.id,scope.row.gradeId)">编辑</div> -->
            <div class="text-btn" @click="Examine(scope.row.id)" style="margin: 0 18px;">查看</div>
            <div class="text-btn" @click="Delete(scope.row.id)">删除</div>
          </template>
        </el-table-column>

      </el-table>
      <!--<div class="fenye">
				<el-pagination :current-page.sync="currentPage" :page-size="pageSize" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>-->

    </div>

    <el-dialog :title="title" :visible.sync="dialogDetailShow" :width="dialogType == 'look' ? '600px' : '800px'" center custom-class="pwdDialog" @closed="clsDat">

      <template v-if="dialogType == 'add'">
        <el-form ref="form" :model="form" :rules="rules" size="small" style="width:  712px;margin-left:  38px;margin-right: 50px;margin-top: 30px;" :inline="true" :disabled="View=='hidd'">
          <el-form-item label="考试名称" prop="examName" style="width: 346px;text-align: right;">
            <el-input v-model="form.examName" clearable :maxlength="30" placeholder="请选择" size="small" style="width: 194px;"></el-input>
          </el-form-item>
          <el-form-item label="考场号" prop="examRoomNum" style="width: 346px;text-align: right;">
            <el-input v-model.number="form.examRoomNum" placeholder="请输入数字" :maxlength="30" clearable size="small " style="width: 194px;"></el-input>
          </el-form-item>
          <el-form-item label="发布年级" prop="gradeId" style="width: 346px;text-align: right;">
            <el-select v-model="form.gradeId" value-key="id" clearable placeholder="请选择" size="small" @change="handlexian" style="width: 194px;">
              <el-option v-for="item in tableSchool" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布班级" prop="classId" style="width: 346px;text-align: right;">
            <el-select v-model="form.classId" clearable placeholder="请选择" size="small" style="width: 194px;">
              <el-option v-for="item in SchoolclassId" :key="item.classId" :label="item.className" :value="item.classId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考试科目" prop="subjectId" style="width: 346px;text-align: right;">
            <el-select v-model="form.subjectId" clearable placeholder="请选择" style="width: 194px;" size="small" @focus="addDiscipline">
              <el-option v-for="item in Subjects" :key="item.id" :label="item.courseName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考生号区间" prop="numberRange" style="width: 346px;text-align: right;">
            <el-input v-model="form.numberRange" :maxlength="30" placeholder="请选择" clearable size="small" style="width: 194px;"></el-input>
          </el-form-item>
          <el-form-item label="考试开始时间" prop="startTime" style="width: 346px;text-align: right;">
            <el-date-picker v-model="form.startTime" :editable="false" type="datetime" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" size="small" style="width: 194px;" placeholder="请选择">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="考试结束时间" prop="endTime" style="width: 346px;text-align: right;">
            <el-date-picker v-model="form.endTime" :editable="false" type="datetime" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" size="small" style="width: 194px;" placeholder="请选择">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="监考人" prop="invigilator" style="width: 346px;text-align: right;">
            <el-input v-model="form.invigilator" placeholder="例如 某某某、某某" :maxlength="30" clearable size="small" style="width: 194px;"></el-input>
          </el-form-item>

          <el-form-item label="班牌展示开始时间" prop="startShowTime" style="width: 346px;text-align: right;">
            <el-date-picker v-model="form.startShowTime" :editable="false" :picker-options="pickerOptions" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" size="small" style="width: 194px;" placeholder="请选择">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="班牌展示结束时间" prop="endShowTime" style="width: 346px;text-align: right;">
            <el-date-picker v-model="form.endShowTime" :editable="false" :picker-options="pickerOptions" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" size="small" style="width: 194px;" placeholder="请选择">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <template slot="footer">
          <div class="dialog-footer">
            <div class="btn" v-if="Viewone=='show'" @click="save(save)">保存</div>
            <div class="btn" v-if="Viewone=='hidd'" @click="dialogDetailShow=false">发布</div>
            <div class="btn" v-if="Viewone=='show'||Viewone=='hidd'" @click="dialogDetailShow=false">取消</div>
          </div>
        </template>
      </template>

      <!-- detail -->
      <template v-if="dialogType == 'look'">
        <div class="p_item" style="padding-left: 210px;">课程号：2017 </div>
        <div class="p_item" style="padding-left: 210px;">课程名称：三年级 </div>
        <div class="p_item" style="padding-left: 210px;">授课年级：1000 </div>
        <div class="p_item" style="padding-left: 210px;">授课教师姓名：1000 </div>
        <div class="p_item" style="padding-left: 210px;">授课日期：1000 </div>
        <div class="p_item" style="padding-left: 210px;">上课学年：1000 </div>
        <div class="p_item" style="padding-left: 210px;">考试方式： 笔试</div>
        <div slot="footer" style="height: 50px;">
        </div>
      </template>

    </el-dialog>

  </div>
</template>

<script>
import fetch from '@/assets/http/fetch';
import Equipment from "@/assets/api/Equipment"
import ExamRoom from '@/assets/api/ExamRoom';
export default {
  data () {
    var telPassthree = (rule, value, callback) => {
      var regEn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
      if (regEn.test(value)) {
        callback(new Error('不能有特殊字符'));
      } else {
        callback();
        telPassthree
      }
    };
    var teleshuz = (rule, value, callback) => {
      var regEn = /^[0-9]*$/;
      if (!regEn.test(value)) {
        callback(new Error('只能是数字'));
      } else {
        callback();

      }
    };
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
      title: '',
      currentPage: 1,
      dialogDetailShow: false,
      dialogType: 'add',
      View: '',

      Viewone: '',
      GradeId: '', //修改 查看
      options: [],
      tableSchool: [], //年级
      SchoolclassId: [], //班级
      //			考试科目
      Subjects: [],
      form: {
        examName: '',
        examRoomNum: '',
        subjectId: '',
        subjectName: '',
        numberRange: '',
        showEndTime: '',
        startTime: '',
        endTime: '',
        invigilator: '',
        gradeId: '',
        gradeName: '',
        classId: '',
        className: '',
        startShowTime: '',
        endShowTime: '',
      },

      tableData: [],
      rules: {
        subjectId: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },],
        gradeId: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },],
        examName: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }, {
          validator: teleHanz,
          trigger: 'blur'
        }],
        examRoomNum: [{
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          validator: teleshuz,
          trigger: 'blur'
        }
        ],
        classId: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },],
        subjectName: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },

        ],
        numberRange: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }, {
          validator: teleshuz,
          trigger: 'blur'
        }],
        showEndTime: [{
          required: true,
          message: '必填项',
          trigger: 'change'
        },],
        startTime: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },

        ],
        endTime: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },],
        invigilator: [{
          required: true,
          message: '必填项',
          trigger: 'change'
        }, {
          validator: telPassthree,
          trigger: 'blur'
        }],
        className: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },

        ],
        startShowTime: [{
          required: true,
          message: '必填项',
          trigger: 'change'
        },],
        endShowTime: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        },

        ],
      },
      pageSize: 10,
      total: 0,
      currentPage: 0,
    }
  },
  created () {
    this.getData();
  },
  methods: {

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
        } else if (school.code === 211) {

          this.tableSchool = [];
        } else {
          this.$message({
            message: school.message,
            type: 'warning'
          });
          this.tableSchool = []
        }
      })
    },
    addDiscipline () {
      //考试科目
      fetch.get(ExamRoom.getcourseByGradeId, '', res => {
        if (res.code === 200) {
          this.Subjects = res.data
        } else {

        }
      })
    },
    //获取班级
    handlexian (v) {
      this.SchoolclassId = [];
      this.form.classId = ''

      if (!v) {
        return
      };
      let par = {
        gradeId: this.form.gradeId
      }

      fetch.get(Equipment.getClassByGradeId, par, res => {
        let school = JSON.parse(res)
        if (school.code === 200) {

          this.SchoolclassId = school.data

        } else if (school.code === 201) {
          this.$message({
            message: '暂无班级',
            type: 'warning'
          });
        } else {
          this.$message({
            message: school.message,
            type: 'success'
          });
        }
      })
    },
    handlexian01 (v) {
      this.form.subjectId = '',
        this.Subjects = [];
      this.SchoolclassId = [];
      this.form.classId = ''
      let par = {
        gradeId: this.GradeId
      }
      //考试科目

      fetch.get(ExamRoom.getcourseByGradeId, par, res => {

        if (res.code === 200) {
          this.Subjects = res.data

        } else {

        }
      })
      fetch.get(Equipment.getClassByGradeId, par, res => {
        let school = JSON.parse(res)
        if (school.code === 200) {
          this.SchoolclassId = school.data

        } else if (school.code === 201) {
          this.$message({
            message: '暂无班级',
            type: 'warning'
          });
        } else {
          this.$message({
            message: school.message,
            type: 'success'
          });
        }
      })
    },
    //获取数据
    getData () {
      let par = {
        pageSize: this.pageSize,
        pageNumber: this.currentPage,
      }

      fetch.get(ExamRoom.getExamRoom, par, res => {
        if (res.code === 200) {
          this.foramtDate(res.data.row)
          this.tableData = res.data.row
          this.total = res.data.total
        } else if (res.code === 201) {
          this.tableData = [];
          this.total = 0
        }
      })
    },
    foramtDate (data) {
      data.forEach(ele => {
        let result = ele.gradeName;
        let resulto1 = ele.className;
        resulto1 = result + ',' + resulto1
        ele.gradeNameone = resulto1;
      });
    },
    show (t) {
      this.dialogType = t
      this.View = ''
      this.title = '新增考场'
      this.Viewone = 'show'
      this.dialogDetailShow = true
      this.Forgrade();
      this.handlexian();

    },
    //查看
    Examine (id) {
      this.View = 'hidd'
      this.title = '考场详情'
      this.Viewone = ''
      this.Forgrade();
      this.handlexian01();
      let par = {
        examRoomId: id
      }
      fetch.get(ExamRoom.getExamRoomByid, par, res => {
        if (res.code === 200) {
          this.form.examName = res.data.examName
          this.form.examRoomNum = res.data.examRoomNum
          this.form.subjectName = res.data.subjectName
          this.form.numberRange = res.data.numberRange
          this.form.showEndTime = res.data.showEndTime
          this.form.startTime = res.data.startTime
          this.form.endTime = res.data.endTime
          this.form.invigilator = res.data.invigilator
          this.form.gradeId = res.data.gradeId
          this.form.classId = res.data.classId
          this.form.subjectId = res.data.subjectId
          this.form.startShowTime = res.data.startShowTime
          this.form.endShowTime = res.data.endShowTime
        } else {

        }
      })

      this.dialogDetailShow = true
    },
    //编辑
    Modification (id, gradeId) {
      this.GradeId = gradeId
      this.title = '编辑考场'
      this.Viewone = 'hidd'
      this.Forgrade();
      this.handlexian01();
      this.View = ''

      let par = {
        examRoomId: id
      }
      fetch.get(ExamRoom.getExamRoomByid, par, res => {
        if (res.code === 200) {
          this.form.examName = res.data.examName
          this.form.examRoomNum = res.data.examRoomNum
          this.form.numberRange = res.data.numberRange
          this.form.showEndTime = res.data.showEndTime
          this.form.startTime = res.data.startTime
          this.form.endTime = res.data.endTime
          this.form.invigilator = res.data.invigilator
          this.form.gradeId = res.data.gradeId
          this.form.classId = res.data.classId
          this.form.gradeName = res.data.gradeName
          this.form.subjectId = res.data.subjectId
          this.form.subjectName = res.data.subjectName
          this.form.className = res.data.className
          this.form.startShowTime = res.data.startShowTime
          this.form.endShowTime = res.data.endShowTime

        } else {

        }

        this.dialogDetailShow = true
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
          examRoomId: id
        }
        fetch.delete(ExamRoom.deleteExamRoomByid, par, res => {
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
    save (form) {
      this.$refs['form'].validate(b => {
        if (b) {
          var arr = this.form.subjectId
          var obj = {}
          console.log(this.Subjects, '55')
          obj = this.Subjects.find((item) => { //这里的Subjects就是上面遍历的数据源
            return item.id === this.form.subjectId;
            //筛选出匹配数据，是对应数据的整个对象
          });
          let subjectId = obj.id
          let subjectName = obj.courseName

          var arr01 = this.form.gradeId
          var obj01 = {}
          obj01 = this.tableSchool.find((item) => { //这里的tableSchool就是上面遍历的数据源
            return item.gradeId === this.form.gradeId;
            //筛选出匹配数据，是对应数据的整个对象
          });
          console.log(obj01, '6666')
          let gradeId = obj01.gradeId
          let gradeName = obj01.gradeName

          var arr02 = this.form.classId
          var obj02 = {}
          obj02 = this.SchoolclassId.find((item) => { //这里的SchoolclassId就是上面遍历的数据源
            return item.classId === this.form.classId;
            //筛选出匹配数据，是对应数据的整个对象
          });
          let classId = obj02.classId
          let className = obj02.className
          let par = {
            examName: this.form.examName,
            examRoomNum: this.form.examRoomNum,
            subjectId: subjectId,
            subjectName: subjectName,
            numberRange: this.form.numberRange,
            showEndTime: this.form.showEndTime,
            startTime: this.form.startTime,
            endTime: this.form.endTime,
            invigilator: this.form.invigilator,
            gradeId: gradeId,
            gradeName: gradeName,
            classId: classId,
            className: className,
            startShowTime: this.form.startShowTime,
            endShowTime: this.form.endShowTime,
          }
          fetch.post(ExamRoom.insertExamRoom, par, res => {
            if (res.code === 200) {
              var _loading = this.$loading({
                text: '添加成功'
              })
              setTimeout(() => {
                _loading.close();
                window.close();
              }, 3000);
              this.getData()
              this.dialogDetailShow = false
            } else {
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
          })
        } else {
          return false;
        }

      })

    },
    clsDat () {
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