<template>
  <div class="pub">
    <my-crumbs></my-crumbs>
    <div class="filter">
      <div class="filter-item">
        <div class="label">班级名称:{{className}}</div>
      </div>
      <div class="filter-item">
        <div class="btn" @click="addHornr">新建表扬</div>
      </div>
      <div class="filter-item">
        <div class="btn" @click="ownTitle">自定义称号</div>
      </div>
    </div>
    <div class="table">
      <div class="left_ear"></div>
      <div class="right_ear"></div>
      <el-table ref="table" :data="tableData" @selection-change="handleSelectionChange" tooltip-effect="dark" header-cell-class-name="tableTou" cell-class-name="tableRow">
        <el-table-column :index="indexMethod" type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column prop="stuName" label="获奖学生" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="cardName" label="获奖称号" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="发布日期" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{scope.row.inputTime.split(' ')[0]}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="text-btn" @click="open2(scope.row)">删除</div>&nbsp;&nbsp;
            <div class="text-btn" @click="show(scope.row)">查看</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="fenye" v-if="total!=0">
        <el-pagination :current-page.sync="currentPage" @current-change="isFy" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="新增表扬学生" :visible.sync="dialogDetailShow" @close="isClose" width="546px" center custom-class="pwdDialog">
      <div class="tz_input1">
        <span class="tz_title">学生姓名</span>
        <template>
          <el-select style="width: 100%" v-model="value11" placeholder="请选择">
            <el-option v-for="item in options" :key="item.stuId" :label="item.stuName" clearable :value="item.stuId">
            </el-option>
          </el-select>
        </template>
      </div>
      <div class="tz_input1">
        <span class="tz_title">获奖称号</span>
        <template>
          <el-select style="width: 100%" v-model="value31" @change="isChange(value31)" placeholder="请选择">
            <el-option v-for="item in options1" :key="item.id" :label="item.cardName" :value="item.id">
            </el-option>
          </el-select>
        </template>
      </div>
      <div class="tz_input1">
        <div class="tz_input1" style="position: relative">
          <img :src="addImg" alt="" class="tz_input1">
          <div style="font-size: 33px;color: #ffffff;position: absolute;top: 50px;left: 30px ">{{addName}}</div>
        </div>
      </div>
      <div slot="footer" style="height: 50px;display: flex;justify-content: center;margin-top: 30px">
        <div class="btn" @click="send">发布</div>
      </div>
    </el-dialog>
    <el-dialog title="创建自定义称号" :visible.sync="dialogDetailShow5" width="546px" center custom-class="pwdDialog">
      <div class="setUpTitle" style="text-align: center">
        <div class="btn1 " @click="secondTitle">创建自定义称号</div>
        <div class="picCenter" style="text-align: center;">
          <div style="position: relative" class="bigImg1" v-for="(item,index) in urlData">
            <img :src="item.cardBackUrl" alt="">
            <div style="font-size: 33px;color:white;position: absolute;top: 60px;left: 10px">{{item.cardName}}</div>
            <div class="black">
              <div style="position: relative;top: 40px;" @click="open3(index)">
                <img src="../../assets/school_img/delete.png" alt="">
                <div style="color:white;">删除</div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div style="height: 20px"></div>
    </el-dialog>
    <el-dialog title="创建自定义称号" :visible.sync="dialogDetailShow6" width="546px" center custom-class="pwdDialog">
      <div class="setUpTitle">
        <div class="tz_input1">
          <span class="tz_title">表扬名称</span>
          <el-input v-model="honorName" :maxlength="10" placeholder="请输入内容"></el-input>
          <div class="redFont">
            （注：表扬卡名称不能超过10个字符）
          </div>
        </div>
        <div class="picCenter" style="text-align: center;">
          <div style="position: relative" class="bigImg" v-for="(item,index) in imgUrl" @click="isImg(index)">
            <img :src="item.imgUrl" alt="">
            <div class="black" ref="light"></div>
          </div>
        </div>
        <div style="margin-top: 20px; margin-left: 216px">
          <div class="btn" @click="isStar">保存</div>
          <div style="height: 20px"></div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="表扬榜详情" :visible.sync="dialogDetailShow2" width="546px" center custom-class="pwdDialog">
      <div class="tz_input1">
        <span class="tz_title">获奖学生</span>
        <el-input v-model="mainData.stuName" disabled placeholder="请输入内容"></el-input>
      </div>
      <div class="tz_input1">
        <span class="tz_title">获奖称号</span>
        <el-input v-model="mainData.cardName" disabled placeholder="请输入内容"></el-input>
      </div>
      <div class="tz_input1" style="position: relative">
        <img :src="mainData.details" alt="" class="tz_input1">
        <div style="font-size: 33px;color: #ffffff;position: absolute;top: 50px;left: 30px">{{mainData.cardName}}</div>
      </div>
      <div slot="footer" style="display: flex;justify-content: center;">
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
      speReg: /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,10})$/,
      regEn: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
      regCn: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im,
      className: "",
      value31: '',
      options1: [],
      isDisplay: false,
      urlData: '',
      honorName: '',
      imgUrl: [
        {
          imgUrl: 'https://store.gzeducard.com/class-brand/660a2ac0eb034011bebe44e536836df7.png',
          opacity: 0.5
        },
        {
          imgUrl: 'https://store.gzeducard.com/class-brand/2b82a4beb8c74f69b0562242e9037b7e.png',
          opacity: 0.5
        },
        {
          imgUrl: 'https://store.gzeducard.com/class-brand/69a5def7e82c4060b335bc738818bd74.png',
          opacity: 0.5
        },
        {
          imgUrl: 'https://store.gzeducard.com/class-brand/801e7ff498624c4c968c446cf415d46d.png',
          opacity: 0.5
        },
      ],
      value11: '',
      options: '',
      value1: '',
      value2: '',
      dialogDetailShow6: false,
      input2: '',
      textarea: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      input: '',
      dialogDetailShow: false,
      dialogDetailShow1: false,
      dialogDetailShow2: false,
      dialogDetailShow5: false,
      tableData: [
      ],
      options: '',
      stuName: '',
      mainData: {
        stuName: '',
        cardName: '',
        details: '',
      },
      deleteData: '',
      honorUrl: '',
      addImg: '',
      addName: ''
    }
  },
  created () {
    this.getData()
    this.getStudent()
    // this.getStar()
    this.getHonorCard()
    this.getClassData()

  },
  methods: {
    getClassData () {
      fetch.get(allApi.getClassInfo, '', res => {
        this.className = res.data.className
      })
    },
    indexMethod (index) { return index + 1 + (this.currentPage - 1) * this.pageSize; },
    isFy () {
      this.getData()
    },
    isChange (val) {
      this.options1.forEach(a => {
        if (a.id === val) {
          this.addImg = a.cardBackUrl
          this.addName = a.cardName

        }
      })
    },
    getHonorCard () {
      fetch.get(allApi.getPraisesCard, '', res => {
        this.options1 = res.data
      })
    },
    open3 (index) {
      this.$confirm('此操作将永久删除该称号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let a = {
          id: this.urlData[index].id
        }
        fetch.delete(allApi.delpraisesCard, a, res => {
          if (res.code == 200) {
            this.$message({
              message: res.message,
              type: 'success'
            });
            this.getStar()
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
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
    isEnter () {
      this.isDisplay = true
    },
    isStar () {
      if (this.honorName == '') {
        this.$message({
          message: "表扬名称不能为空",
          type: 'warning'
        });
        return
      }
      let a = {
        cardName: this.honorName,
        cardBackUrl: this.honorUrl
      }
      if (this.honorName.length > 10) {
        this.$message({
          message: "超过十个字",
          type: 'warning'
        });
        return
      }

      if (this.honorUrl === '') {
        this.$message({
          message: "请选择图片",
          type: 'warning'
        });
        return
      }

      if (this.regEn.test(this.honorName) || this.regCn.test(this.honorName)) {
        this.$message({
          message: "名称不能包含特殊字符",
          type: 'warning'
        });
        return
      }

      fetch.post(allApi.addPraisesCard, a, res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.dialogDetailShow6 = false
          this.getHonorCard()
          this.honorUrl = ''
          this.honorName = ''
          this.getStar()
        }
      })
    },
    isImg (index) {
      for (let i in this.imgUrl) {
        this.$refs.light[i].style.opacity = '0.5'
      }
      this.$refs.light[index].style.opacity = '0'
      this.honorUrl = this.imgUrl[index].imgUrl
    },
    secondTitle () {
      this.dialogDetailShow6 = true
    },
    ownTitle () {
      this.getStar()
      this.dialogDetailShow5 = true
    },
    getStar () {
      fetch.get(allApi.getPraisesCardAll, '', res => {
        this.urlData = res.data
      })
    },
    isClose () {
      this.clsData()
    },
    clsData () {
      this.input2 = ''
      this.textarea = ''
      this.value1 = ''
      this.value2 = ''
      this.value11 = ''
      this.addName = ''
      this.addImg = ''
      this.value31 = ''
    },
    getStudent () {
      fetch.get(allApi.getStudentByClassId, '', res => {
        this.options = res.data
      })
    },
    send () {
      this.options.forEach(b => {
        if (b.stuId === this.value11) {
          this.stuName = b.stuName
        }
      })
      if (this.stuName === '' || this.value31 === '') {
        this.$message({
          message: '请输入完整信息',
          type: 'warning'
        });
        return
      }
      if (this.value11 === '' || this.value11 === undefined) {
        this.$message({
          message: '学生姓名不能为空',
          type: 'warning'
        });
        return
      }
      let a = {
        stuName: this.stuName,
        praisesCardId: this.value31,
        cardBackUrl: this.addImg,
        details: this.textarea,
        stuId: this.value11
      }

      fetch.post(allApi.addPraises, a, res => {
        if (res.code == 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.dialogDetailShow = false
          this.clsData()
          this.getData()
        }
      })
    },
    addHornr () {
      this.dialogDetailShow = true
    },
    dialogType () { },
    dat () { },
    open2 (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let a = {
          id: row.id
        }
        fetch.delete(allApi.delpraises, a, res => {
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
    show (row) {
      let a = {
        id: row.id
      }
      fetch.get(allApi.getpraisesByid, a, res => {
        this.mainData.stuName = res.data.stuName
        this.mainData.cardName = res.data.cardName
        this.mainData.details = res.data.cardBackUrl
      })
      this.dialogDetailShow2 = true
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
    },
    getData () {
      let a = {
        pageNumber: this.currentPage,
        pageSize: this.pageSize
      }
      fetch.get(allApi.getPraises, a, res => {
        if (res.code === 200) {
          this.tableData = res.data.row
          this.total = res.data.total
        } else if (res.code === 201) {

          this.tableData = []
          this.total = 0
        }
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.redFont {
  color: #ff1919;
}

.picCenter img {
  width: 100%;
  margin-top: 10px;
}

.bigImg {
  width: 443px;
  margin: 0 auto;
}

.bigImg1 {
  width: 443px;
  margin: 0 auto;
}

.black img {
  width: 30px;
}

.black {
  position: absolute;
  top: 10px;
  left: 0;
  width: 443px;
  height: 152px;
  border-radius: 20px;
  background-color: black;
  opacity: 0.5;
}

.black1 {
  position: absolute;
  top: 10px;
  left: 0;
  width: 443px;
  height: 152px;
  border-radius: 20px;
}

.picCenter {
  height: 500px;
  overflow-y: auto;
  margin-top: 20px;
}

.li_font {
  line-height: 40px;
  text-align: left;
  margin-left: 17px;
}

.btn1 {
  width: 141px;
  height: 30px;
  background-color: #07bde4;
  border-radius: 4px;
  border: solid 1px #eeeeee;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #ffffff;
}

.list_input {
  float: left;
  width: 50%;
  text-align: center;
}

.table_input {
  width: 85%;
  margin: 0 auto;
  overflow: hidden;
}

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
.tz_input1 {
  width: 440px;
  margin: 0 auto;
  margin-top: 10px;
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