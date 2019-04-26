<template>
  <div class="pub">
    <my-crumbs></my-crumbs>
    <div class="filter">
      <div class="filter-item">
        <div class="label">班级名称:{{className}}</div>
      </div>
      <div class="filter-item">
        <div class="btn" @click="show1">上传照片</div>
        <div class="btn" @click="show2" style="margin: 0 15px;">上传视频</div>
        <div class="btn" @click="open2">删除</div>
      </div>

    </div>
    <div class="b-card">
      <div class="list">
        <div class="item" v-for="(item, index) in tableData" :key="index">
          <div class="img">
            <img style="width: 100%;height: 100%;" v-if="item.fileType === 1" :src="item.fileUrl" />
            <video :src="item.fileUrl" controls="controls" v-else style="width: 100%;height: 100%;">

            </video>
          </div>
          <div class="title"><i :class="item.isCheck ? 'is' : ''" @click="checkBox(index,item.isCheck)"></i><span>{{item.fileName}}</span></div>
        </div>
      </div>

      <div class="fenye" v-if="total!=0">
        <el-pagination :current-page.sync="currentPage" @current-change="curChange" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="新建班级荣誉" :visible.sync="dialogDetailShow1" @close="closedShow1" width="600px" center custom-class="pwdDialog">
      <div class="file-container jpg">
        <img :src="fileImg" alt="" style="width: 100%;height: 100%">
        <input type="file" class="displayFile" @change="changeFile1" ref="fileData1" style="position: absolute;top: 0;left: 0;">
      </div>
      <div class="title">
        <div class="label" style="width: 80px;margin-left: 20px;">图片名称</div>
        <el-input v-model="input1" clearable placeholder="请输入名称" size="small" disabled></el-input>
      </div>

      <div slot="footer" style="height: 50px;display: flex;justify-content: center;">
        <div class="btn" @click="uploading">上传</div>
      </div>
    </el-dialog>
    <el-dialog title="新建班级荣誉" @close="closed2" :visible.sync="dialogDetailShow2" width="600px" center custom-class="pwdDialog">
      <div class="file-container mov">
        <video :src="movieUrl" controls="controls" style="width: 100%;height: 100%;z-index: 10000;position: absolute;top: 0;left: 0;" v-if="isShow">

        </video>
        <input type="file" class="displayFile" @change="changeFile2" ref="fileData2" style="position: absolute;top: 0;left: 0;">
      </div>
      <div class="title">
        <div class="label" style="width: 80px;margin-left: 20px;">视频名称</div>
        <el-input v-model="input2" clearable placeholder="请输入名称" size="small" disabled></el-input>
      </div>

      <div slot="footer" style="height: 50px;display: flex;justify-content: center;">
        <div class="btn" @click="uploading1">上传</div>
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

      isShow: false,
      currentPage: 1,
      input1: '',
      input2: '',
      options: [],
      total: 0,
      setForm: {},
      dialogDetailShow1: false,
      dialogDetailShow2: false,
      dialogType: 'jpg',
      dat: {},
      fileType: '',
      tableData: [],
      fileImg: '',
      pageSize: 6,
      idArr: '',
      className: ""

    }
  },
  created () {
    this.getData()
    this.getClassData()
  },
  methods: {
    open2 () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let a = {
          fileids: this.idArr
        }
        fetch.delete(allApi.deleteClassFiles, a, res => {
          if (res.code == 200) {
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
    getClassData () {
      fetch.get(allApi.getClassInfo, '', res => {
        this.className = res.data.className
      })
    },
    closed2 () {
      this.isShow = false
      this.movieUrl = ''
      this.$refs['fileData2'].value = '';
      this.input2 = ''
    },
    closedShow1 () {
      console.log(this.$refs['fileData1'].value)
      this.fileImg = ''
      this.$refs['fileData1'].value = '';
      this.input1 = ''

    },
    checkBox (index, isCheck) {
      this.tableData[index].isCheck = !this.tableData[index].isCheck
      let arr = []
      this.tableData.forEach(x => {
        if (x.isCheck) {
          arr.push(x.id)
        }
      })
      this.idArr = arr.join(',')
    },
    curChange () {
      this.getData()
    },
    getData () {
      let a = {
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        type: 2
      }
      fetch.get(allApi.getClassFilePage, a, res => {
        if (res.code === 200) {
          this.tableData = res.data.row
          this.total = res.data.total
        } else if (res.code === 201) {
          this.total = 0
          this.tableData = ''
        }

      })

    },
    //上传图片
    uploading () {
      if (this.fileImg === '' || this.input1 === '') {
        this.$message({
          type: 'warning',
          message: '请选择图片'
        })
        return
      }
      let a = {
        fileUrl: this.fileImg,
        fileName: this.input1,
        type: 2,
        fileType: 1
      }
      fetch.post(allApi.addClassFile, a, res => {
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.dialogDetailShow1 = false
          this.dialogDetailShow2 = false
          this.$refs['fileData1'].value = '';
          this.input1 = ''
          this.fileImg = ''
          this.getData()
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    changeFile1 () {
      var file = this.$refs['fileData1'].files[0];
      if (file === null) {
        alert('sss')
        return
      }
      if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/bmp' && file.type !== 'image/gif') {
        this.$message({
          type: 'warning',
          message: '文件格式错误！'
        })
        this.$refs['fileData'].value = '';
        return
      }
      else {
        let param = new FormData(); //创建form对象
        param.append('file', file); //通过append向form对象添加数据
        fetch.postImport(allApi.file, param, res => {
          if (res.code === 200) {
            this.input1 = res.data.name.split('.')[0]
            this.fileImg = res.data.url
          }
        })
      }
    },
    //上传视频
    uploading1 () {
      let a = {
        fileUrl: this.movieUrl,
        fileName: this.input2,
        type: 2,
        fileType: 2
      }
      if (this.movieUrl === undefined || this.input2 === '') {
        this.$message({
          type: 'warning',
          message: '请完善表单'
        })
        return
      }

      fetch.post(allApi.addClassFile, a, res => {

        if (res.code == 200) {

          this.dialogDetailShow2 = false
          this.$refs['fileData2'].value = '';
          this.input2 = ''
          this.getData()
        }
      })
    },

    changeFile2 () {
      var file = this.$refs['fileData2'].files[0];
      if (file.type !== 'video/mp4' && file.type !== 'video/avi' && file.type !== 'video/rmvb' && file.type !== 'video/ts') {
        this.$message({
          type: 'warning',
          message: '请使用正确的视频格式！'
        })
        this.$refs['fileData'].value = '';
        return
      }
      else {
        let param = new FormData(); //创建form对象
        param.append('file', file); //通过append向form对象添加数据
        fetch.postImport(allApi.file, param, res => {

          if (res.code === 200) {
            this.$message({
              type: 'success',
              duration: '1000',
              message: res.message
            })
            this.input2 = res.data.name.split('.')[0]
            this.movieUrl = res.data.url
            this.isShow = true
          }
        })
      }
    },
    show1 () {
      this.dialogDetailShow1 = true
    },
    show2 () {
      this.dialogDetailShow2 = true
    }
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
  padding: 0 12px;
}

.displayFile {
  width: 100%;
  height: 100%;
  opacity: 0;
}

.list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 510px;
  height: 307px;
  background-color: #ffffff;
  box-shadow: 0px 5px 15px 0px rgba(175, 192, 209, 0.55);
  border-radius: 8px;
  margin: 28px 23px 10px 23px;
}

.img {
  width: 510px;
  height: 252px;
  background-color: #ffffff;
  border-radius: 8px 8px 0px 0px;
}
.title {
  width: 510px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title > i {
  display: inline-block;
  width: 21px;
  height: 21px;
  background: url(../../assets/class_img/wxz.png) no-repeat;
  cursor: pointer;
}
.title span {
  font-size: 16px;
  letter-spacing: 2px;
  color: #485a5d;
  margin-left: 10px;
}
.title .is {
  background: url(../../assets/class_img/xz.png) no-repeat;
}

.file-container {
  width: 560px;
  height: 247px;
  margin: 20px;
  cursor: pointer;
  position: relative;
}
.jpg {
  background: #f1f1f1 url(../../assets/class_img/photo.png) no-repeat center
    center;
}
.mov {
  background: #f1f1f1 url(../../assets/class_img/video.png) no-repeat center
    center;
}
</style>