<template>
  <div class="pub">
    <my-crumbs></my-crumbs>
    <div class="filter">
      <div class="filter-item">
        <div class="label">班级名称:{{className}}</div>
      </div>
      <div class="filter-item">
        <div class="btn" @click="bianji">编辑</div>
      </div>
      <!--<div class="filter-item">-->
      <!--<div class="btn">导入</div>-->
      <!--</div>-->
    </div>
    <div class="table">
      <div class="left_ear"></div>
      <div class="right_ear"></div>
      <el-table ref="table" :data="tableData1" :span-method="arraySpanMethod" tooltip-effect="dark" header-cell-class-name="tableTou" cell-class-name="tableRow">
        <el-table-column prop="order" label="节数" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="课时" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.type == 't'">
              <span>{{scope.row.startTime}}</span>-
              <span>{{scope.row.endTime}}</span>
            </div>
            <div v-else>

            </div>
          </template>
        </el-table-column>
        <el-table-column prop="one" label="星期一" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="two" label="星期二" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="three" label="星期三" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="four" label="星期四" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="five" label="星期五" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="six" label="星期六" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="seven" label="星期天" align="center" show-overflow-tooltip>
        </el-table-column>
      </el-table>

    </div>
    <el-dialog title="班级课表设置" :visible.sync="dialogDetailShow" width="1690px" center custom-class="pwdDialog" @closed="clsDat">

      <div class="filter" style="margin-bottom: 20px;">
        <div class="filter-item">
          <div class="btn" @click="add('t')">新增一行</div>
        </div>
        <div class="filter-item">
          <div class="btn" @click="add('tf')">新增通栏</div>
        </div>
      </div>

      <div class="m-tb">
        <div class="m-row" style="background: #F4F4F4;">
          <div class="m-col" style="width: 5%;">节数</div>
          <div class="m-col" style="width: 30%;">课时</div>
          <div class="m-col" style="width: 10%;">星期一</div>
          <div class="m-col" style="width: 10%;">星期二</div>
          <div class="m-col" style="width: 10%;">星期三</div>
          <div class="m-col" style="width: 10%;">星期四</div>
          <div class="m-col" style="width: 10%;">星期五</div>
          <div class="m-col" style="width: 10%;">星期六</div>
          <div class="m-col" style="width: 10%;">星期天</div>
          <div class="m-col" style="width: 10%;">操作</div>
        </div>
        <div class="m-row" v-for="(item, i) in tableData" :key="i">
          <template v-if="item.type === 't'">
            <div class="m-col" style="width: 5%;">第{{item.order}}节</div>
            <div class="m-col" style="width: 30%;">
              <el-time-select v-model="item.startTime" :editable="false" :picker-options="{
										start: '06:30',
										step: '00:15',
										end: '23:30'
									  }" placeholder="选择时间">
              </el-time-select>
              &nbsp;至&nbsp;
              <el-time-select v-model="item.endTime" :editable="false" :picker-options="{
										start: '06:30',
										step: '00:15',
										end: '23:30'
									  }" placeholder="选择时间">
              </el-time-select>
            </div>
            <div class="m-col" style="width: 10%;">
              <el-select v-model="item.one" placeholder="请选择" size="mini" style="width: 116px;">
                <el-option v-for="item in options" readonly :key="item.id" :label="item.courseName" :value="item.courseName">
                </el-option>
              </el-select>
            </div>
            <div class="m-col" style="width: 10%;">
              <el-select v-model="item.two" placeholder="请选择" size="mini" style="width: 116px;">
                <el-option v-for="item in options" :key="item.id" :label="item.courseName" :value="item.courseName">
                </el-option>
              </el-select>
            </div>
            <div class="m-col" style="width: 10%;">
              <el-select v-model="item.three" placeholder="请选择" size="mini" style="width: 116px;">
                <el-option v-for="item in options" :key="item.id" :label="item.courseName" :value="item.courseName">
                </el-option>
              </el-select>
            </div>
            <div class="m-col" style="width: 10%;">
              <el-select v-model="item.four" placeholder="请选择" size="mini" style="width: 116px;">
                <el-option v-for="item in options" :key="item.id" :label="item.courseName" :value="item.courseName">
                </el-option>
              </el-select>
            </div>
            <div class="m-col" style="width: 10%;">
              <el-select v-model="item.five" placeholder="请选择" size="mini" style="width: 116px;">
                <el-option v-for="item in options" :key="item.id" :label="item.courseName" :value="item.courseName">
                </el-option>
              </el-select>
            </div>
            <div class="m-col" style="width: 10%;">
              <el-select v-model="item.six" placeholder="请选择" size="mini" style="width: 116px;">
                <el-option v-for="item in options" :key="item.id" :label="item.courseName" :value="item.courseName">
                </el-option>
              </el-select>
            </div>
            <div class="m-col" style="width: 10%;">
              <el-select v-model="item.seven" placeholder="请选择" size="mini" style="width: 116px;">
                <el-option v-for="item in options" :key="item.id" :label="item.courseName" :value="item.courseName">
                </el-option>
              </el-select>
            </div>
            <div class="m-col" style="width: 10%;">
              <div class="text-btn" @click="open2(i,item.id)">删除</div>
            </div>
          </template>
          <template v-else>
            <div style="width: 100%;height: 50px;display: flex;justify-content: space-between;align-items: center;">
              <div style="width: 400px;"></div>
              <div class="span" style="font-size: 14px;letter-spacing: 1px;color: #485a5d;">{{item.one}}</div>
              <div style="display: flex;width: 460px;justify-content: space-between;">
                <div class="btn" @click="setTyName(item)">修改</div>
                <div class="btn" @click="handleOffset('top', item, i)">上移</div>
                <div class="btn" @click="handleOffset('bottom', item, i)">下移</div>
                <div class="btn" @click="open2(i,item.id)">删除</div>
              </div>
            </div>
          </template>
        </div>

      </div>

      <template slot="footer" v-if="tableData.length !== 0">
        <div class="dialog-footer">
          <div class="btn" @click="save">保存</div>
        </div>
      </template>

    </el-dialog>
  </div>
</template>

<script>
import fetch from '@/assets/http/fetch';
import allApi from '@/assets/api/school';
export default {
  data () {
    return {
      regEn: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
      regCn: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im,
      isStatus: false,
      input: '',
      dialogDetailShow: false,
      dat: {

      },
      tableData: [
      ],
      newName: '课间操',
      options: [
      ],
      tableData1: [],
      className: "",
      tableStatus: false,
      changeName: ''
    }
  },
  created () {
    this.getClass()
    this.getData()
    this.getClassData()
  },
  methods: {
    getClassData () {
      fetch.get(allApi.getClassInfo, '', res => {
        this.className = res.data.className
      })
    },
    bianji () {
      this.dialogDetailShow = true
      this.tableData = this.tableData1
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {

      if (row.type === 'tf') {

      }
    },
    getData () {
      fetch.get(allApi.getClassSchedule, '', res => {
        this.tableData1 = res.data
        if (this.tableData1.length > 0) {
          this.isStatus = true
        }
      })
    },
    timeData (data) {

    },
    reWrite () {
      this.save()
    },
    getClass () {
      fetch.get(allApi.getcourseByClassId, '', res => {
        this.options = res.data
      })
    },
    save () {
      this.tableData.forEach(a => {
        if (a.startTime > a.endTime) {
          this.$message({
            message: '开始时间不能大于结束时间',
            type: 'warning'
          });
          this.tableStatus = false
        }
        else if (a.startTime === '' || a.endTime === '') {
          this.$message({
            message: '课时时间不能为空',
            type: 'warning'
          });
          this.tableStatus = false
        } else if (a.one === '' || a.two === '' || a.three === '' || a.four === '' || a.five === '') {
          this.$message({
            message: '周一到周五的课程不能为空',
            type: 'warning'
          });
          this.tableStatus = false
        }
        else {
          this.tableStatus = true
        }

      })

      if (this.tableStatus) {
        console.log(this.tableData, '666')
        let a = {
          str: JSON.stringify(this.tableData)
        }
        fetch.post(allApi.addClassSchedule, a, res => {
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
          }
        })
      }
      else {
      }

    },
    clsDat () {
      this.getData()
    },
    setTyName (row) {
      this.$prompt('输入通栏名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (this.regEn.test(value) || this.regCn.test(value)) {
          this.$message({
            type: 'warning',
            message: '不能包含特殊字符'
          })
          return false;
        } else if (value === '') {
          this.$message({
            type: 'warning',
            message: '通栏名字不能为空'
          })
          return false;
        }
        else {
          this.newName = value
          row.one = value
          row.two = value
          row.three = value
          row.four = value
          row.five = value
          row.six = value
          row.seven = value
        }
      })
    },
    add (t) {
      var c = 1;
      this.tableData.forEach(a => {
        if (a.type === 't') {
          c++
        }
      })
      if (t === 't') {
        this.tableData.push({
          order: c,
          type: t,
          startTime: '',
          endTime: '',
          one: '',
          two: '',
          three: '',
          four: '',
          five: '',
          six: '',
          seven: '',
        })
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].order = i + 1
        }
      }
      else {
        this.tableData.push({
          order: c,
          type: t,
          startTime: '0',
          endTime: '0',
          one: this.newName,
          two: this.newName,
          three: this.newName,
          four: this.newName,
          five: this.newName,
          six: this.newName,
          seven: this.newName,
        })
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].order = i + 1
        }
      }
    },
    handleOffset (t, item, i) {
      if (t === 'top') {
        if (i === 0) {
          this.$message({
            type: 'warning',
            message: '已经到顶部了'
          })
          return
        }
        let s = this.tableData[i - 1];
        this.tableData.splice(i - 1, 2, item, s)
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].order = i + 1
        }
      } else {
        if (i === this.tableData.length - 1) {
          this.$message({
            type: 'warning',
            message: '已经到底部了'
          })
          return
        }
        let s = this.tableData[i + 1];
        this.tableData.splice(i, 2, s, item)
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].order = i + 1
        }
      }
    },
    open2 (i, id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(i, 1)
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].order = i + 1
        }
        let a = {
          delIds: id
        }
        fetch.post(allApi.addClassSchedule, a, res => {
          if (res.code === 200) {
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
    del () {

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
</style>