<template>
  <div>
    <div class="min-right">
      <div class="right">
        <span @click="logout">退出</span>
      </div>
    </div>
    <div>
      <div class="table">
        <div class="left_ear"></div>
        <div class="right_ear"></div>
        <el-table ref="table" :data="tableData" tooltip-effect="dark" header-cell-class-name="tableTou" cell-class-name="tableRow">
          <el-table-column prop="className" label="班级" align="center">
          </el-table-column>
          <el-table-column prop="gradeName" label="年级" align="center">
          </el-table-column>
          <el-table-column prop="schoolName" label="学校" align="center">
          </el-table-column>
          <el-table-column align="center" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small" style="color:rgb(76,180,208)">设置</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- <div class="fenye">
          <el-pagination :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="220">
          </el-pagination>
        </div> -->

      </div>
    </div>

  </div>

</template>
<script>
import fetch from '@/assets/http/fetch';
import allApi from '@/assets/api/grade';
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getClassData();
  },
  methods: {
    logout () {
      fetch.get(allApi.logout, '', res => {
        window.location.href = res
      })
    },
    handleClick (row) {
      let par = {
        classId: row.clazzId,
        gradeId: row.gradeId,
        schoolId: row.schoolId,
        teacherId: row.teacherId,
      }
      sessionStorage.setItem('userClass', JSON.stringify(row.className))
      fetch.put(allApi.setUserInfo, par, res => {
        if (res.code === 200) {
          this.$router.push('/home')
        } else {

        }
      })
    },
    getClassData () {
      fetch.get(allApi.getClassList, '', res => {
        if (res.code === 200) {
          this.tableData = res.data
        } else if (res.code === 201) {
          this.tableData = ''
        }
      })
    },
  }
}
</script>

<style  scoped>
.min-right {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.right {
  float: right;
  width: 100px;
  height: 40px;
  background-color: #ffffff;
  box-shadow: 4px 4px 8px 0px rgba(50, 195, 226, 0.39);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
  margin-top: 15px;
  user-select: none;
}
.right span {
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 2px;
  color: #2fc0e1;
}
.right span::before {
  content: url(../../assets/class_img/quit.png);
  margin-right: 4px;
  margin-top: 4px;
}
</style>
