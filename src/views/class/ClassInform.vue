<template>
  <div class="pub">
    <my-crumbs></my-crumbs>
    <div class="filter">
      <div class="filter-item">
        <div class="label">班级名称:{{className}}</div>
      </div>
      <div class="filter-item">
        <div class="btn" @click="sendMsg">发布通知</div>
      </div>
      <div class="filter-item">
        <div class="btn" @click="open2">删除</div>
      </div>
    </div>
    <div class="table">
      <div class="left_ear"></div>
      <div class="right_ear"></div>
      <el-table ref="table" :data="tableData" @selection-change="handleSelectionChange" tooltip-effect="dark" header-cell-class-name="tableTou" cell-class-name="tableRow">
        <el-table-column label="序号" type="selection" width="30">
        </el-table-column>
        <el-table-column :index="indexMethod" type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="source" label="发布来源" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="people" label="发布人" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="发布时间" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{scope.row.inputTime.split(' ')[0]}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="text-btn" @click="show('set',scope.row)">详情</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="fenye" v-if="total!=0">
        <el-pagination :current-page.sync="currentPage" @current-change="handleCurrentChange" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="input13" :visible.sync="dialogDetailShow" width="946px" center custom-class="pwdDialog">
      <div class="tz_input">
        <span class="tz_title">通知标题</span>
        <el-input v-model="input11" disabled placeholder="请输入内容"></el-input>
      </div>

      <div class="tz_input">
        <span class="tz_title">通知内容</span>
        <el-input disabled type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea">
        </el-input>
      </div>

      <div class="tz_input">
        <span class="tz_title">发布来源</span>
        <el-input v-model="input12" disabled placeholder="请输入内容"></el-input>
      </div>

      <!-- <div class="tz_input">
        <span class="tz_title">发布人</span>
        <el-input v-model="input13" disabled placeholder="请输入内容"></el-input>
      </div> -->

      <div slot="footer" style="height: 50px;display: flex;justify-content: center;margin-top: 30px">
        <!-- <div class="btn">保存</div> -->
      </div>
    </el-dialog>
    <el-dialog title="班级通知" :visible.sync="dialogDetailShow1" width="946px" @close="isClose" center custom-class="pwdDialog">
      <div class="tz_input">
        <span class="tz_title">通知标题</span>
        <el-input v-model="input1" :maxlength="50" placeholder="请输入内容"></el-input>
      </div>

      <div class="tz_input">
        <span class="tz_title">通知内容</span>
        <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea">
        </el-input>
      </div>

      <div class="tz_input">
        <span class="tz_title">发布来源</span>
        <el-input v-model="input2" :maxlength="50" placeholder="请输入内容"></el-input>
      </div>

      <!-- <div class="tz_input">
        <span class="tz_title">发布人</span>
        <el-input v-model="input3" :maxlength="6" placeholder="请输入内容"></el-input>
      </div> -->

      <div slot="footer" style="height: 50px;display: flex;justify-content: center;margin-top: 30px">
        <div class="btn" @click="send">发布</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import fetch from '@/assets/http/fetch';
import allApi from '@/assets/api/school';
export default {
  data () {
    return {
      className: "",
      speReg: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
      faReg: /[@#\$%\^&\*]+/g,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      input: '',
      input1: '',
      input11: '',
      input12: '',
      input13: '',
      input2: '',
      input3: '',
      textarea: '',
      textarea1: '',
      dialogDetailShow: false,
      dialogDetailShow1: false,
      tableData: [
      ],
      deleteData: ''
    }
  },
  created () {
    this.getData()
    this.getClassData()
  },
  methods: {
    indexMethod (index) { return index + 1 + (this.currentPage - 1) * this.pageSize; },
    handleCurrentChange () {
      this.getData()
    },
    getClassData () {
      fetch.get(allApi.getClassInfo, '', res => {
        this.className = res.data.className
      })
    },
    clsData () {
      this.input1 = ''
      this.input2 = ''
      this.input3 = ''
      this.textarea = ''
    },
    isClose () {
      this.clsData()
    },
    send () {
      let a = {
        title: this.input1,
        content: this.textarea,
        source: this.input2,
        people: this.input3
      }

      if (this.input1 === '' || this.textarea === '' || this.input2 === '') {
        this.$message({
          message: '请输入完整的信息',
          type: 'warning'
        });
        return
      }

      // if (!this.speReg.test(this.input3)) {
      //   this.$message({
      //     message: '请输入正确的姓名',
      //     type: 'warning'
      //   });
      //   return
      // }

      fetch.post(allApi.addClassMessage, a, res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.getData()
          this.clsData()
          this.dialogDetailShow1 = false
        }
      })
    },
    getData () {
      let a = {
        pageNumber: this.currentPage,
        pageSize: this.pageSize
      }
      fetch.get(allApi.getClassMessage, a, res => {
        if (res.code === 200) {
          this.tableData = res.data.row
          this.total = res.data.total
        } else if (res.code === 201) {
          this.total = 0
          this.tableData = []
        }
      })
    },
    sendMsg () {
      this.dialogDetailShow1 = true
    },
    dialogType () { },
    open2 () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isCls()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    isCls () {
      let a = {
        ids: this.deleteData
      }
      fetch.delete(allApi.delClassMessage, a, res => {
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
    },
    dat () { },
    show (t, row) {
      let a = {
        id: row.id
      }
      fetch.get(allApi.getClassMessageByid, a, res => {
        this.input11 = res.data.title
        this.textarea = res.data.content
        this.input12 = res.data.source
        this.input13 = res.data.people
      })
      // this.dialogType = t;
      // if(t === 'add'){
      //
      // }else{
      //
      // }
      this.dialogDetailShow = true
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      let b = []
      val.forEach(a => {
        b.push(a.id)
      })
      this.deleteData = b.join(',')
      this.multipleSelection = val;
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
.row-tf {
  position: relative;
  z-index: 99999;
}
.m-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #e4e4e4;
}
.m-col {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  letter-spacing: 1px;
  color: #485a5d;
}
.tz_input {
  width: 600px;
  margin: 0 auto;
  margin-top: 20px;
}

.tz_title {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #485a5d;
  font-family: MicrosoftYaHei;
  display: block;
  margin-bottom: 5px;
}
</style>