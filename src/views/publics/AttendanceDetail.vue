<template>
  <div class="pub">
    <my-crumbs></my-crumbs>
    <div class="filter">
      <div class="filter-item">
        <el-form :inline="true" :model="filter" size="small">
          <template v-if="isRole === '学校'">
            <el-form-item label="年级:" prop="teacherName">
              <el-select v-model="filter.grade" @change="getClass(filter.grade)" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级:" prop="teacherName">
              <el-select v-model="filter.banji" clearable placeholder="请选择">
                <el-option v-for="item in options2" :key="item.classId" :label="item.className" :value="item.classId">
                </el-option>
              </el-select>
            </el-form-item>
          </template>

          <el-form-item label="日期:" prop="teacherName">
            <el-date-picker v-model="filter.times" clearable type="date" :editable="false" value-format="yyyy-MM-dd" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="考勤状态:" prop="teacherName">
            <el-select v-model="filter.personType" clearable placeholder="请选择">
              <el-option v-for="item in options1" :key="item.type" :label="item.value" :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="搜索">
            <el-input v-model="filter.name" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn" style="margin-top: 2px;" @click="findData">查询</div>
          </el-form-item>
          <el-form-item>
            <div class="btn" style="margin-top: 2px;" @click="exported">导出</div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table">
      <div class="left_ear"></div>
      <div class="right_ear"></div>
      <el-table ref="table" :data="tableData" tooltip-effect="dark" header-cell-class-name="tableTou" cell-class-name="tableRow" :summary-method="getSummaries" show-summary>
        <el-table-column prop="stuId" label="学号" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="stuName" label="姓名" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="normal" label="正常" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="late" label="迟到" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="leaveEarly" label="早退" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="truancy" label="缺席" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="异常" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.late + scope.row.truancy + scope.row.leaveEarly}}</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="fenye" v-if="total!=0">
        <el-pagination :current-page.sync="currentPage" :page-size="pageSize" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from '@/assets/http/fetch';
import allApi from '@/assets/api/school';
export default {
  data () {
    return {
      isRole: '',
      countData: [],
      filter: {
        personType: '',
        name: '',
        times: '',
        grade: '',
        banji: ''
      },
      input: '',
      currentPage: 1,
      options: [],
      options1: [
        { value: '正常', type: '1' },
        { value: '迟到', type: '2' },
        { value: '早退', type: '3' },
        { value: '缺席', type: '4' },
        { value: '异常', type: '5' }
      ],
      options2: [],
      tableData: [

      ],
      pageSize: 10,
      total: 0,

    }
  },
  created () {
    this.getData()
    this.getCount()
    this.getGrade()
    let a = sessionStorage.getItem('userInfo')
    a = JSON.parse(a)
    this.isRole = a.role
  },
  methods: {
    findData () {
      this.currentPage = 1
      this.getData()
      this.getCount()
    },
    getClass (val) {
      let a = {
        gradeId: val
      }
      fetch.get(allApi.getClassByGradeId, a, res => {
        this.options2 = JSON.parse(res).data
      })
      this.filter.banji = ''
    },
    getGrade () {
      fetch.get(allApi.getGradeByschoolId, '', res => {
        this.options = JSON.parse(res).data
      })
    },
    exported () {
      if (this.tableData.length == '0') {
        this.$message({
          duration: '1000',
          showClose: true,
          message: '没有数据',
          type: "warning"
        });
        return
      }
      let a = {
        date: this.filter.times,
        state: this.filter.personType,
        gradeId: this.filter.grade,
        classId: this.filter.banji,
      }
      fetch.export(allApi.export, a, res => {
        if (res.code === 200) {
          window.location = res.href
        }
      }, {
          target: '.btn3',
          loadingText: '正在导出'
        })
    },
    getCount () {
      let a = {
        gradeId: this.filter.grade,
        classId: this.filter.banji,
        date: this.filter.times,
        state: this.filter.personType,
        stuName: this.filter.name,
      }
      fetch.get(allApi.getCheckDetailsPageSumCount, a, res => {
        this.countData = res.data
      })
    },
    handleCurrentChange () {

      this.getData()
    },
    getData () {
      let a = {
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        gradeId: this.filter.grade,
        classId: this.filter.banji,
        date: this.filter.times,
        state: this.filter.personType,
        stuName: this.filter.name
      }
      fetch.get(allApi.getCheckDetailsPage, a, res => {
        if (res.code === 200) {
          this.tableData = res.data.row
          this.total = res.data.total

        } else if (res.code === 201) {
          this.total = 0
          this.tableData = []
        }

      })
    },
    getClass (val) {
      let a = {
        gradeId: val
      }
      fetch.get(allApi.getClassByGradeId, a, res => {
        this.options2 = JSON.parse(res).data
      })
      this.filter.banji = ''
    },
    getGrade () {
      var objone = {}
      fetch.get(allApi.getGradeByschoolId, '', res => {
        let school = JSON.parse(res)
        if (school.code === 200) {
          school.data.forEach((a, i) => {
            objone[i] = {
              gradeName: a.studyPhase + a.gradeName,
              gradeId: a.gradeId
            }
          })
          this.options = objone
        }
      })
    },
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if (index === 1) {
          sums[index] = '————';
          return;
        }
        else {

        }
        sums[2] = this.countData.normal
        sums[3] = this.countData.late
        sums[4] = this.countData.leaveEarly
        sums[5] = this.countData.truancy
        sums[6] = this.countData.exception

      });

      return sums;
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