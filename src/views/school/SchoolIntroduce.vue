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
            <div style="margin-right:20px;" class="text-btn" @click="Modification(scope.row.id)">编辑</div>
            <div class="text-btn" @click="Examine(scope.row.id)">详情</div>
          </template>
        </el-table-column>

      </el-table>
      <div class="fenye" v-if="total!=0">
        <el-pagination :current-page.sync="currentPage" @current-change="handleCurrentChange" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

    </div>
    <el-dialog title="学校介绍" :visible.sync="dialogShow" @closed="reset" width="800px" center custom-class="pwdDialog">
      <div class="edit">
        <el-form ref="form" :label-position="labelPosition" :model="form">
          <el-form-item label="标题">
            <el-input placeholder="请输入标题" :maxlength="30" :disabled="dialogType =='show'" v-model="form.title" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="介绍内容">
            <el-input type="textarea" placeholder="请输入内容" :disabled="dialogType =='show'" v-model="form.content"></el-input>
          </el-form-item>
          <el-form-item label="发布来源">
            <el-input placeholder="请输入来源" :maxlength="30" :disabled="dialogType =='show'" v-model="form.source" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn btn1" v-if="dialogType == 'edit'" @click="onSubmit">保存</div>
            <div class="btn btn1" v-if="dialogType == 'add'" @click="release">发布</div>

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
        source: ''
      },
      dialogShow: false,
      dialogType: 'add',
      tableData: [],
      pageSize: 10,
      total: 0,
      currentPage: 0,

    }
  },
  created () {
    this.getData();
  },
  methods: {
    handleCurrentChange () {
      this.getData();
    },
    //			 获取学校新闻
    getData () {
      let par = {
        pageSize: this.pageSize,
        pageNumber: this.currentPage,
        type: 1
      }
      fetch.get(SchoolIntroduce.getSchoolMessage, par, res => {

        if (res.code === 200) {
          this.tableData = res.data.row;
          this.total = res.data.total;
        } else {
          this.tableData = [];
          this.total = 0;
        }
      })
    },
    show (t) {
      this.dialogType = 'add'
      this.dialogShow = true
    },
    reset () {
      for (const key in this.form) {
        this.form[key] = "";
      }
    },
    //			查看详情
    Examine (id) {
      this.dialogType = 'show'
      this.dialogShow = true
      fetch.get(SchoolIntroduce.getSchoolMessageByid, { schoolMessageId: id }, res => {
        if (res.code === 200) {
          this.form.title = res.data.title
          this.form.content = res.data.content
          this.form.source = res.data.source
          this.form.people = res.data.row.people
        }

      })
    },
    //修改
    Modification (id) {
      this.ID = id
      this.dialogType = 'edit'
      this.dialogShow = true
      let par = {
        schoolMessageId: id
      }
      fetch.get(SchoolIntroduce.getSchoolMessageByid, par, res => {

        if (res.code === 200) {
          this.form.title = res.data.title
          this.form.content = res.data.content
          this.form.source = res.data.source
          this.form.people = res.data.row.people
          this.form.id = res.data.row.id
        }

      })
    },
    //			发布
    release () {
      for (const key in this.form) {
        if (this.form[key] == "") {
          this.$message({
            message: '请填写完整项！',
            type: 'error'
          });
          return
        }
        var str = /[\u4e00-\u9fa5]$/;
        if (!str.test(this.form.title)) {
          this.$message({
            type: 'warning',
            message: '标题只能是中文！'
          })
          return
        }
      }
      let par = {
        title: this.form.title,
        content: this.form.content,
        source: this.form.source,
        people: JSON.parse(sessionStorage.getItem('userInfo')).nickName,
        type: 1
      }

      fetch.post(SchoolIntroduce.insertSchoolMessage, par, res => {

        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.getData();
          this.dialogShow = false;
        }
        else {

        }
      })
    },
    onSubmit () {
      var str = /[\u4e00-\u9fa5]$/;
      if (!str.test(this.form.title)) {
        this.$message({
          type: 'warning',
          message: '标题只能是中文！'
        })
        return
      }
      let par = {
        title: this.form.title,
        content: this.form.content,
        source: this.form.source,
        people: JSON.parse(sessionStorage.getItem('userInfo')).nickName,
        id: this.ID,
        type: 1
      }

      fetch.put(SchoolIntroduce.updateSchoolMessageByid, par, res => {

        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.getData();
          this.dialogShow = false;
        }
        else {

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
        fetch.delete(SchoolIntroduce.deleteSchoolMessageByid, { schoolMessageIds: ID.slice(0, ID.lastIndexOf(',')) }, res => {
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
</style>