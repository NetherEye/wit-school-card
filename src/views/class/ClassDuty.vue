<template>
  <div class="pub">
    <my-crumbs></my-crumbs>
    <div class="filter">
      <div class="filter-item">
        <div class="label">班级名称:{{className}}</div>
      </div>
      <div class="filter-item">
        <div class="btn" @click="show('add')">新增</div>
      </div>

    </div>

    <div class="table">
      <div class="left_ear"></div>
      <div class="right_ear"></div>
      <el-table ref="table" :data="tableData" tooltip-effect="dark" header-cell-class-name="tableTou" cell-class-name="tableRow">
        <el-table-column prop="startTime" label="开始日期" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="endTime" label="结束日期" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="one" label="星期一" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{formatShowName(scope.row.one)}}
          </template>
        </el-table-column>
        <el-table-column prop="two" label="星期二" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{formatShowName(scope.row.two)}}
          </template>
        </el-table-column>
        <el-table-column prop="three" label="星期三" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{formatShowName(scope.row.three)}}
          </template>
        </el-table-column>
        <el-table-column prop="four" label="星期四" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{formatShowName(scope.row.four)}}
          </template>
        </el-table-column>
        <el-table-column prop="five" label="星期五" align="center" show-overflow-tooltip>\
          <template slot-scope="scope">
            {{formatShowName(scope.row.five)}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="text-btn" @click="show('set', scope.row)">编辑</div>
            <div class="text-btn" @click="show1(scope.row)" style="margin: 0 18px;">查看</div>
            <div class="text-btn" @click="del(scope.row)">删除</div>
          </template>
        </el-table-column>

      </el-table>
      <div class="fenye" v-if="total!=0">
        <el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

    </div>

    <el-dialog :title="dialogType == 'add' ? '新增值日' : '编辑值日'" :visible.sync="dialogDetailShow" @closed="dialogClose" width="946px" center custom-class="pwdDialog">
      <div class="filter" style="border-bottom: 1px solid #E4E4E4;padding-bottom: 20px;margin: 0;padding-top: 20px;padding-left: 20px;">
        <div class="filter-item">
          <div class="label">周开始日期</div>
          <el-date-picker v-model="dat.start" :editable="false" value-format="yyyy-MM-dd" :picker-options="pickerOptions" format="yyyy年MM月dd" placeholder="选择周" size="small">
          </el-date-picker>
        </div>
        <div class="filter-item">
          <div class="label">周结束日期</div>
          <el-date-picker v-model="formatT" :editable="false" disabled format="yyyy年MM月dd日" placeholder="选择周" size="small">
          </el-date-picker>
        </div>
      </div>
      <div class="p_item" style="padding-left: 35px;display: flex;justify-content: space-between;">
        <div class="left" style="width: 45px;height: 14px;">星期一</div>
        <div class="center" style="flex: 1;padding-left: 60px;overflow: auto;display: flex;flex-wrap: nowrap;align-items: center;">
          <el-tag v-for="tag in tags.one" style="margin-right: 2px;" :key="tag.stuId" @close="handleClose('one',tag.stuId)" size="medium" closable color="#f2fdff">
            {{tag.stuName}}
          </el-tag>

        </div>
        <div class="right" style="display: flex;align-items: center;">
          <el-select v-model="dat.one" clearable placeholder="请输入学生姓名" filterable size="small" style="width: 145px;margin-right: 20px;">
            <el-option v-for="item in options" :key="item.stuId" :label="item.stuName" :value="item.stuId">
            </el-option>
          </el-select>
          <i class="a-sum" @click="add('one')">+</i>
        </div>
      </div>
      <div class="p_item" style="padding-left: 35px;display: flex;justify-content: space-between;">
        <div class="left" style="width: 45px;height: 14px;">星期二</div>
        <div class="center" style="flex: 1;padding-left: 60px;overflow: auto;display: flex;flex-wrap: nowrap;align-items: center;">
          <el-tag v-for="tag in tags.two" style="margin-right: 2px;" :key="tag.stuId" @close="handleClose('two',tag.stuId)" size="medium" closable color="#f2fdff">
            {{tag.stuName}}
          </el-tag>

        </div>
        <div class="right" style="display: flex;align-items: center;">
          <el-select v-model="dat.two" clearable placeholder="请输入学生姓名" filterable size="small" style="width: 145px;margin-right: 20px;">
            <el-option v-for="item in options" :key="item.stuId" :label="item.stuName" :value="item.stuId">
            </el-option>
          </el-select>
          <i class="a-sum" @click="add('two')">+</i>
        </div>
      </div>
      <div class="p_item" style="padding-left: 35px;display: flex;justify-content: space-between;">
        <div class="left" style="width: 45px;height: 14px;">星期三</div>
        <div class="center" style="flex: 1;padding-left: 60px;overflow: auto;display: flex;flex-wrap: nowrap;align-items: center;">
          <el-tag v-for="tag in tags.three" style="margin-right: 2px;" :key="tag.stuId" @close="handleClose('three',tag.stuId)" size="medium" closable color="#f2fdff">
            {{tag.stuName}}
          </el-tag>

        </div>
        <div class="right" style="display: flex;align-items: center;">
          <el-select v-model="dat.three" clearable placeholder="请输入学生姓名" filterable size="small" style="width: 145px;margin-right: 20px;">
            <el-option v-for="item in options" :key="item.stuId" :label="item.stuName" :value="item.stuId">
            </el-option>
          </el-select>
          <i class="a-sum" @click="add('three')">+</i>
        </div>
      </div>
      <div class="p_item" style="padding-left: 35px;display: flex;justify-content: space-between;">
        <div class="left" style="width: 45px;height: 14px;">星期四</div>
        <div class="center" style="flex: 1;padding-left: 60px;overflow: auto;display: flex;flex-wrap: nowrap;align-items: center;">
          <el-tag v-for="tag in tags.four" style="margin-right: 2px;" :key="tag.stuId" @close="handleClose('four',tag.stuId)" size="medium" closable color="#f2fdff">
            {{tag.stuName}}
          </el-tag>

        </div>
        <div class="right" style="display: flex;align-items: center;">
          <el-select v-model="dat.four" clearable placeholder="请输入学生姓名" filterable size="small" style="width: 145px;margin-right: 20px;">
            <el-option v-for="item in options" :key="item.stuId" :label="item.stuName" :value="item.stuId">
            </el-option>
          </el-select>
          <i class="a-sum" @click="add('four')">+</i>
        </div>
      </div>
      <div class="p_item" style="padding-left: 35px;display: flex;justify-content: space-between;">
        <div class="left" style="width: 45px;height: 14px;">星期五</div>
        <div class="center" style="flex: 1;padding-left: 60px;overflow: auto;display: flex;flex-wrap: nowrap;align-items: center;">
          <el-tag v-for="tag in tags.five" style="margin-right: 2px;" :key="tag.stuId" @close="handleClose('five',tag.stuId)" size="medium" closable color="#f2fdff">
            {{tag.stuName}}
          </el-tag>

        </div>
        <div class="right" style="display: flex;align-items: center;">
          <el-select v-model="dat.five" clearable placeholder="请输入学生姓名" filterable size="small" style="width: 145px;margin-right: 20px;">
            <el-option v-for="item in options" :key="item.stuId" :label="item.stuName" :value="item.stuId">
            </el-option>
          </el-select>
          <i class="a-sum" @click="add('five')">+</i>
        </div>
      </div>

      <div slot="footer" style="height: 50px;display: flex;justify-content: center;">
        <div class="btn" @click="save" v-if="dialogType == 'add'">保存</div>
        <div class="btn" @click="update" v-if="dialogType == 'set'">修改</div>
      </div>
    </el-dialog>

    <el-dialog title="值日详情" :visible.sync="sdialogDetailShow" width="946px" @closed="hideLookDialog" center custom-class="pwdDialog">
      <div class="filter" style="border-bottom: 1px solid #E4E4E4;padding-bottom: 20px;margin: 0;padding-top: 20px;padding-left: 20px;">
        日期：{{row.startTime}} ~ {{row.endTime}}
      </div>
      <div class="p_item" style="padding-left: 35px;display: flex;justify-content: space-between;">
        <div class="left" style="width: 45px;height: 14px;">星期一</div>
        <div class="center" style="flex: 1;padding-left: 60px;overflow: auto;display: flex;flex-wrap: nowrap;align-items: center;">
          {{formatShowName(row['one'])}}

        </div>
      </div>
      <div class="p_item" style="padding-left: 35px;display: flex;justify-content: space-between;">
        <div class="left" style="width: 45px;height: 14px;">星期二</div>
        <div class="center" style="flex: 1;padding-left: 60px;overflow: auto;display: flex;flex-wrap: nowrap;align-items: center;">
          {{formatShowName(row['two'])}}

        </div>
      </div>
      <div class="p_item" style="padding-left: 35px;display: flex;justify-content: space-between;">
        <div class="left" style="width: 45px;height: 14px;">星期三</div>
        <div class="center" style="flex: 1;padding-left: 60px;overflow: auto;display: flex;flex-wrap: nowrap;align-items: center;">
          {{formatShowName(row['three'])}}

        </div>
      </div>
      <div class="p_item" style="padding-left: 35px;display: flex;justify-content: space-between;">
        <div class="left" style="width: 45px;height: 14px;">星期四</div>
        <div class="center" style="flex: 1;padding-left: 60px;overflow: auto;display: flex;flex-wrap: nowrap;align-items: center;">
          {{formatShowName(row['four'])}}

        </div>
      </div>
      <div class="p_item" style="padding-left: 35px;display: flex;justify-content: space-between;">
        <div class="left" style="width: 45px;height: 14px;">星期五</div>
        <div class="center" style="flex: 1;padding-left: 60px;overflow: auto;display: flex;flex-wrap: nowrap;align-items: center;">
          {{formatShowName(row['five'])}}

        </div>
      </div>

      <div slot="footer" style="height: 50px;display: flex;justify-content: center;">

      </div>
    </el-dialog>

  </div>
</template>

<script>
import fetch from '@/assets/http/fetch'
import allApi from '@/assets/api/school'
import ClassDuty from '@/assets/api/ClassDuty'
export default {
  data () {
    return {
      className: "",
      input: '',
      options: [],
      setForm: {},
      dialogDetailShow: false,
      sdialogDetailShow: false,
      dialogType: 'add',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [
      ],
      dat: {
        start: '',
        end: '',
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        id: ''
      },
      pickerOptions: {
        disabledDate (time) {
          if (time.getDay() !== 1) {
            return true
          }
        }
      },
      tags: {
        one: [],
        two: [],
        three: [],
        four: [],
        five: []
      },
      row: { // 值日详情数据
        start: '',
        end: '',
        one: '',
        two: '',
        three: '',
        four: '',
        five: ''
      }
    }
  },
  created () {
    this.getData()
    this.getStudent()
    this.getClassData()
  },
  methods: {
    getClassData () {
      fetch.get(allApi.getClassInfo, '', res => {
        this.className = res.data.className
      })
    },
    show (t, row) {
      this.dialogType = t;
      if (t === 'add') {

      } else {
        let { startTime } = row
        this.dat['start'] = startTime.split(' ')[0]
        this.dat['id'] = row.id
        let aray = ['one', 'two', 'three', 'four', 'five'].forEach(a => {
          let arr = row[a].split(';')
          arr.forEach(b => {
            this.tags[a].push(
              {
                stuName: b.split(',')[1],
                stuId: b.split(',')[0]
              }
            )
          })

        })

      }
      this.dialogDetailShow = true
    },
    show1 (row) {
      this.row = row
      this.sdialogDetailShow = true
    },
    getData () {
      let par = {
        pageSize: this.pageSize,
        pageNumber: this.currentPage
      }
      fetch.get(ClassDuty.getList, par, res => {
        if (res.code === 200) {
          this.tableData = res.data.row
          this.total = res.data.total
        } else {
          this.tableData = []
          this.total = 0
        }
      })
    },
    getStudent () {

      fetch.get(ClassDuty.getStudent, '', res => {
        if (res.code === 200) {
          this.options = res.data
        } else {
          this.options = []
        }
      })
    },
    add (t) {

      for (let j = 0; j < this.tags[t].length; j++) {
        if (this.tags[t][j].stuId === this.dat[t]) {
          this.$message({
            type: 'warning',
            message: '学生已存在！'
          })
          return
        }
      }

      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].stuId === this.dat[t]) {
          this.tags[t].push(this.options[i])
          break
        }
      }

    },
    handleClose (t, id, index) {
      console.log('666')
      this.tags[t]
      for (let i = 0; i < this.tags[t].length; i++) {
        if (this.tags[t][i].stuId === id) {
          this.tags[t].splice(i, 1)
          break
        }
      }
    },
    dialogClose () {
      this.tags = {
        one: [],
        two: [],
        three: [],
        four: [],
        five: []
      }
      this.dat = {
        start: '',
        end: '',
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        id: ''
      }
    },
    save () {
      let result = {}
      for (let item in this.tags) {
        result[item] = []
        this.tags[item].forEach(a => {
          result[item].push(a.stuId + ',' + a.stuName)
        })
        result[item] = result[item].join(';')
      }


      new Date()

      let par = {
        startTime: this.dat.start,
        endTime: this.$moment(this.formatT).format('YYYY-MM-DD'),
        ...result
      }
      for (let it in par) {
        if (!par[it]) {
          this.$message({
            type: 'warning',
            message: '请填写完整！'
          })
          return
        }
      }

      fetch.post(ClassDuty.addDuty, par, res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getData()
          this.dialogDetailShow = false
        }
      })
    },
    update () {
      let result = {}
      for (let item in this.tags) {
        result[item] = []
        this.tags[item].forEach(a => {
          result[item].push(a.stuId + ',' + a.stuName)
        })
        result[item] = result[item].join(';')
      }


      new Date()

      let par = {
        startTime: this.dat.start,
        endTime: this.$moment(this.formatT).format('YYYY-MM-DD'),
        ...result,
        id: this.dat.id
      }
      for (let it in par) {
        if (!par[it]) {
          this.$message({
            type: 'warning',
            message: '请填写完整！'
          })
          return
        }
      }

      fetch.put(ClassDuty.updateDuty, par, res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.getData()
          this.dialogDetailShow = false
        }
      })
    },
    del (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetch.delete(ClassDuty.delDuty, { ids: row.id }, res => {
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
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 处理显示名
    formatShowName (row) {
      if (!row) {
        return
      }
      let arr = row.split(';')
      let str = ''
      arr.forEach(a => {
        let name = a.split(',')[1]
        str += ' ' + name
      })
      return str
    },
    hideLookDialog () {
      this.row = {}
    }

  },
  computed: {
    formatT () {
      return new Date(this.dat.start).getTime() + 345600000
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pub {
  height: 100%;
  overflow-y: auto;
  position: relative;
}
.b-card {
  background-color: #ffffff;
  box-shadow: 0px 2px 9px 0px rgba(105, 105, 105, 0.07);
  border-radius: 3px;
  margin: 20px;
  padding: 28px 40px;
}

.a-sum {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #2ec0e1;
  border-radius: 4px;

  text-align: center;
  line-height: 28px;
  color: #fff;
  font-size: 26px;
  cursor: pointer;
  margin-right: 28px;
}
</style>