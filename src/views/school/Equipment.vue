<template>
  <div class="pub">
    <my-crumbs></my-crumbs>
    <div class="filter">
      <div class="filter-item">
        <div class="label">年级</div>
        <el-select v-model="gradeId" clearable placeholder="请选择" @change="handlexian" size="small">
          <el-option v-for="item in tableSchool" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId">
          </el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <div class="label">班级</div>
        <el-select v-model="classId" clearable placeholder="请选择" size="small">
          <el-option v-for="item in SchoolclassId" :key="item.classId" :label="item.className" :value="item.classId">
          </el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <div class="label">设备编号</div>
        <el-input v-model="coding" clearable placeholder="请输入设备编号/别名/SNIMEI" size="small "></el-input>
      </div>
      <div class="filter-item">
        <div class="btn" @click="gitadd">申请账号</div>
      </div>
      <div class="filter-item">
        <div class="btn" @click="getData">查询</div>
      </div>
      <div class="filter-item">
        <div class="btn" @click="derive">导出Excel</div>
      </div>
      <div class="filter-item  ">
        <div class=" btn2" @click="administrator">设置管理员密码</div>
      </div>
    </div>
    <div class="table">
      <div class="left_ear"></div>
      <div class="right_ear"></div>
      <el-table ref="table" :data="tableData" tooltip-effect="dark" header-cell-class-name="tableTou" cell-class-name="tableRow">
        <el-table-column prop="deviceAccount" label="账号" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="coding" label="设备编号" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gradeName" label="年级/班级" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="startTime" label="开机时间" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="endTime" label="离线时间" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="deviceState" label="在线状态" align="center" show-overflow-tooltip>
          <template slot-scope='scope'>
            {{scope.row.deviceState=='1'?'在线': scope.row.deviceState=='2'?'离线':''}}
          </template>
        </el-table-column>
        <el-table-column prop="screenState" label="屏幕状态" align="center" show-overflow-tooltip>
          <template slot-scope='scope'>
            {{scope.row.deviceState=='1'?'亮屏':scope.row.deviceState=='1'?'息屏':''}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="text-btn" @click="install(scope.row.id)">设置</div>
            <div class="text-btn" @click="Delete(scope.row.id)" style="margin: 0 18px;">删除</div>
            <div class="text-btn" @click="Examine(scope.row.id)">详情</div>
          </template>
        </el-table-column>

      </el-table>
      <!--<div class="fenye">
				<el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>-->
    </div>
    <!-- 设置管理员密码 -->
    <el-dialog title="设置管理员密码" :visible.sync="dialogTableVisible" width="600px" center custom-class="pwdDialog" @closed="clsDat02">
      <el-form ref="formone" :model="goForm" style="display: flex;flex-direction: column;align-items: center;justify-content: center;height: 306px;flex-wrap: wrap;">
        <el-input placeholder="初始密码" v-model="goForm.oldPwd" style="width: 450px;height: 50px;margin: 5px 0;">
          <img slot="prefix" src="../../assets/school_img/mm.png" style="margin-top: 8px;" />
        </el-input>
        <el-input placeholder="新密码" v-model="goForm.newPwd" style="width: 450px;margin: 15px 0;">
          <img slot="prefix" src="../../assets/school_img/mm.png" style="margin-top: 8px;" />
        </el-input>
        <el-input placeholder="确认新密码" v-model="goForm.newPwdone" style="width: 450px;margin: 15px 0;">
          <img slot="prefix" src="../../assets/school_img/mm2.png" style="margin-top: 8px;" />
        </el-input>
        <div class="btn" style=" margin-top:20px" @click="preserve">提交</div>
      </el-form>
    </el-dialog>
    <el-dialog title="设备详情" :visible.sync="dialogDetailShow" width="600px" center custom-class="pwdDialog">
      <template v-if="eqIsLogin">
        <div class="p_item" style="padding-left: 110px;">设备编号：{{getDetails.coding}} </div>
        <!--<div class="p_item" style="padding-left: 110px;">（别名）：{{getDetails.deviceState}}</div>-->
        <div class="p_item" style="padding-left: 110px;">IMEI：{{getDetails.imei}}</div>
        <div class="p_item" style="padding-left: 110px;">SN：{{getDetails.sn}} </div>
        <div class="p_item" style="padding-left: 110px;">MAC：{{getDetails.mac}} </div>
        <div class="p_item" style="padding-left: 110px;">版本号：{{getDetails.version}} </div>
        <div class="p_item" style="padding-left: 110px;">学校/年级/班级：{{getDetails.gradeName}} </div>
        <div class="p_item" style="padding-left: 110px;">接入时间：{{getDetails.joinTime}} </div>
        <div class="p_item" style="padding-left: 110px;">开机时间：{{getDetails.startTime}}</div>
        <div class="p_item" style="padding-left: 110px;">离线时间：{{getDetails.endTime}} </div>
        <div class="p_item" style="padding-left: 110px;">磁盘总空间：{{getDetails.diskTotalSpace}} </div>
        <div class="p_item" style="padding-left: 110px;"> 磁盘可用空间：{{getDetails.diskAvailableSpace}} </div>
        <div class="p_item" style="padding-left: 110px;">设备总内存：{{getDetails.totalMemory}}</div>
        <div class="p_item" style="padding-left: 110px;">设备可用内存：{{getDetails.availableMemory}} </div>
        <div class="p_item" style="padding-left: 110px;">启用状态：{{getDetails.screenState}} </div>
        <div class="p_item" style="padding-left: 110px;">设备CPU使用率%：{{getDetails.cpuUse}}</div>
      </template>
      <template v-else>
        <div class="noLogin" style="display: flex;flex-direction: column;align-items: center;">
          <img style="width: 63px;height: 63px;margin-top: 27px;" src="../../assets/school_img/gth.png" />
          <span style="margin-top: 15px;letter-spacing: 1px;color: #2EC0E1;margin-bottom: 82px;">此设备尚未登录</span>
        </div>
      </template>
    </el-dialog>
    <el-dialog :visible.sync="dialogSetShow" width="946px" center custom-class="pwdDialog" @closed="clsDat">
      <template slot="title">
        <div class="dialog-tab">
          <div class="set"><span :class="dialogCardType === 'set' ? 'activeT' : ''" @click="handleTab('set')">定时设置</span></div>
          <div class="pwd"><span :class="dialogCardType === 'pwd' ? 'activeT' : ''" @click="handleTab('pwd')">账户密码</span></div>
        </div>
      </template>
      <template v-if="dialogCardType === 'set'">
        <el-table ref="table" :data="Timing01" tooltip-effect="dark" header-cell-class-name="d-tableTou" cell-class-name="d-tableRow">
          <el-table-column prop="isOpen" label="启用" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="on-off" :class="scope.row.isOpen? 'on' : 'off'" @click="handleIs(scope.row)"></div>
            </template>
          </el-table-column>
          <el-table-column prop="timingDate" label="星期" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="startDate" label="开机时间" align="center">
            <template slot-scope="scope">
              <el-time-select v-model="scope.row.startDate" :editable="false" style="width:  148px;" size="mini" :picker-options="{
							    start: '00:00',
							    step: '00:01',
							    end: '23:59'
							  }" placeholder="选择时间">
              </el-time-select>
            </template>
          </el-table-column>
          <el-table-column prop="endDate" label="离线时间" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-time-select v-model="scope.row.endDate" :editable="false" style="width: 148px;" size="mini" :picker-options="{
							    start: '00:00',
							    step: '00:01',
							    end: '23:59'
							  }" placeholder="选择时间">
              </el-time-select>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-if="dialogCardType === 'pwd'">
        <el-form ref="form" :model="pwdForm" style="display: flex;flex-direction: column;align-items: center;justify-content: center;height: 436px;flex-wrap: wrap;">
          <el-input placeholder="当前密码" v-model="pwdForm.oldPwd" style="width: 450px;height: 50px;margin: 15px 0;">
            <img slot="prefix" src="../../assets/school_img/mm.png" style="margin-top: 8px;" />
          </el-input>
          <el-input placeholder="修改密码" v-model="pwdForm.newPwd" style="width: 450px;margin: 15px 0;">
            <img slot="prefix" src="../../assets/school_img/mm.png" style="margin-top: 8px;" />
          </el-input>
          <el-input placeholder="确认密码" v-model="pwdForm.newPwdone" style="width: 450px;margin: 15px 0;">
            <img slot="prefix" src="../../assets/school_img/mm2.png" style="margin-top: 8px;" />
          </el-input>
        </el-form>

      </template>

      <template slot="footer">
        <div class="dialog-footer">
          <div class="btn" v-if="dialogCardType === 'pwd'" @click="preserve">保存</div>
          <div class="btn" v-if="dialogCardType === 'set'" @click="preservePwo">保存</div>
        </div>
      </template>

    </el-dialog>

    <el-dialog :title="createUserState ? '账号信息' : '新增账号'" :visible.sync="createUserShow" width="600px" center custom-class="pwdDialog" @closed="clsDat01">
      <template v-if="createUserState">
        <el-form ref="form" :model="createForm" style="display: flex;flex-direction: column;align-items: center;justify-content: center;height: 210px;">
          <el-form-item label="申请年级" style="display: flex;">
            <el-select v-model="createForm.gradeId" clearable placeholder="请选择" @change="applyhandlexian" size="small">
              <el-option v-for="item in applytableSchool" :key="item.gradeId" :label="item.gradeName" :value="[item.gradeId,item.gradeName]">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请班级" style="display: flex;">
            <el-select v-model="createForm.classId" clearable placeholder="请选择" size="small">
              <el-option v-for="item in applySchoolclassId" :key="item.classId" :label="item.className" :value="[item.classId,item.className]">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

      </template>

      <template slot="footer" v-if="createUserState">
        <div class="dialog-footer">
          <div class="btn" @click="Submit">提交</div>
        </div>
      </template>

      <template slot="footer" v-if="!createUserState">
        <div class="noLogin" style="display: flex;flex-direction: column;align-items: center;">
          <img style="width: 63px;height: 63px;margin-top: 27px;" src="../../assets/school_img/d.png" />
          <span style="margin-top: 15px;letter-spacing: 1px;color: #2EC0E1;margin-bottom: 29px;">创建成功</span>
        </div>
        <div class="p_item">设备编号：09bc333d </div>
      </template>

      <template slot="footer" v-if="!createUserState">
        <div class="dialog-footer">
        </div>
      </template>

    </el-dialog>

  </div>
</template>

<script>
import fetch from "@/assets/http/fetch"
import Equipment from "@/assets/api/Equipment"

export default {
  data () {
    return {
      dialogTableVisible: false,
      input: '',
      liebiaoID: '', //列表ID
      gradeId: '', //年级id
      classId: '', //班级id
      coding: '', //
      SchoolclassId: [], //班级
      getDetails: [], //详情
      currentPage: 1,
      dialogDetailShow: false,
      dialogSetShow: false,
      eqIsLogin: true, // 设备是否登录
      createUserShow: false, // 申请账户
      dialogCardType: 'set', // 会话框 tab切换类型 pwd
      createUserState: true, // 申请账户状态 
      Timing01: [

      ],
      Timing: [{
        timingDate: '星期一',
        startDate: '',
        endDate: '',
        isOpen: true,
      },
      {
        timingDate: '星期二',
        startDate: '',
        endDate: '',
        isOpen: true,
      },
      {
        timingDate: '星期三',
        startDate: '',
        endDate: '',
        isOpen: true,
      },
      {
        timingDate: '星期四',
        startDate: '',
        endDate: '',
        isOpen: true,
      },
      {
        timingDate: '星期五',
        startDate: '',
        endDate: '',
        isOpen: true,
      },
      {
        timingDate: '星期六',
        startDate: '',
        endDate: '',
        isOpen: true,
      }, {
        timingDate: '星期日',
        startDate: '',
        endDate: '',
        isOpen: true,
      }
      ],
      createForm: {
        gradeId: '',
        classId: '',
      },
      options: [],

      pwdForm: {
        newPwdone: '',
        oldPwd: '',
        newPwd: '',
      },
      goForm: {
        newPwdone: '',
        oldPwd: '',
        newPwd: '',
      },
      tableSchool: [], //年级
      applytableSchool: [], //申请年级
      applySchoolclassId: [], //申请班级
      tableData: [],

      pageSize: 10,
      total: 0,
      currentPage: 1,
    }
  },
  created () {
    this.getData();
    this.Forgrade();
    //			this.applyForgrade();
  },
  methods: {
    //	修改时间
    preserve () {
      if (this.pwdForm.newPwd != this.pwdForm.newPwdone) {
        this.$message({
          message: '修改密码不一致',
          type: 'warning'
        });
        return
      }
      let par = {
        deviceId: this.liebiaoID,
        oldPwd: this.pwdForm.oldPwd,
        newPwd: this.pwdForm.newPwd,
      }
      fetch.put(Equipment.updateDeviceUserPwd, par, res => {

        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.getData();
          this.currentPage = 1
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      })
    },
    //     定时设置
    preservePwo () {

      let par = {
        deviceId: this.liebiaoID,
        setDetails: JSON.stringify(this.Timing01)
      }
      fetch.post(Equipment.setDeviceTime, par, res => {
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.getData();
          this.dialogSetShow = false
        } else if (res.length == 0) {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      })
    },
    //			获取时间
    gitTiom () {
      let par = {
        deviceId: this.liebiaoID,
      }
      fetch.get(Equipment.getDeviceTime, par, res => {

        if (res.code === 200) {
          if (res.data.length === 0) {

            this.Timing01 = [{
              timingDate: '星期一',
              startDate: '',
              endDate: '',
              isOpen: true,
            },
            {
              timingDate: '星期二',
              startDate: '',
              endDate: '',
              isOpen: true,
            },
            {
              timingDate: '星期三',
              startDate: '',
              endDate: '',
              isOpen: true,
            },
            {
              timingDate: '星期四',
              startDate: '',
              endDate: '',
              isOpen: true,
            },
            {
              timingDate: '星期五',
              startDate: '',
              endDate: '',
              isOpen: true,
            },
            {
              timingDate: '星期六',
              startDate: '',
              endDate: '',
              isOpen: true,
            }, {
              timingDate: '星期日',
              startDate: '',
              endDate: '',
              isOpen: true,
            }
            ]
          } else {

            this.Timing01 = res.data
          }
        } else {

          this.$message({
            message: res.message,
            type: 'warning'
          })
          this.Timing01 = this.Timing
        }
      })
    },
    //设置
    install (id) {

      this.liebiaoID = id
      this.gitTiom();
      this.dialogSetShow = true

    },
    //		删除
    Delete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let par = {
          deviceId: id
        }
        fetch.delete(Equipment.deleteDeviceUser, par, res => {
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            });
            this.getData();
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

    //申请账号
    gitadd () {
      this.createUserShow = true;
      this.createUserState = true;
      this.applyForgrade();
    },
    Submit () {

      if (this.createForm.gradeId == '' || this.createForm.gradeId == undefined) {
        this.$message({
          message: '年级不能为空',
          type: 'success'
        });
        return
      }
      if (this.createForm.classId == '' || this.createForm.classId == undefined) {
        this.$message({
          message: '班级不能为空',
          type: 'success'
        });
      }
      var arr = this.createForm.gradeId
      var obj = {}
      for (var key in arr) {
        obj[key] = arr[key]

      }
      let gradeId = obj[0]
      let gradeName = obj[1]

      var arrat = this.createForm.classId
      var obj01 = {}
      for (var key01 in arrat) {
        obj01[key01] = arrat[key01]

      }
      let classId = obj01[0]
      let className = obj01[1]
      let par = {
        gradeId: gradeId,
        gradeName: gradeName,
        classId: classId,
        className: className,
      }
      fetch.post(Equipment.applyDeviceUser, par, res => {
        if (res.code === 200) {
          this.getData();
          this.createUserState = false
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      })
    },
    //管理员
    administrator () {
      //   this.dialogTableVisible = true
    },
    //导出
    derive () {
      let par = {
        gradeId: this.gradeId,
        classId: this.classId,
      }

      fetch.export(Equipment.export, par, res => {

        if (res.code === 200) {

          window.location = res.href
        }
      })
    },
    //		详情
    Examine (id) {
      this.dialogDetailShow = true
      let par = {
        deviceId: id
      }
      fetch.get(Equipment.getDeviceDetails, par, res => {
        if (res.code === 200) {
          this.getDetails = res.data
        } else {

        }
      })
    },

    // 获取设备
    getData () {
      let par = {
        pageSize: this.pageSize,
        pageNumber: this.currentPage,
        gradeId: this.gradeId,
        classId: this.classId,
        coding: this.coding,
      }
      fetch.get(Equipment.getDeviceUser, par, res => {
        if (res.code === 200) {
          this.foramtDate(res.data.row)
          this.tableData = res.data.row;
          this.total = res.data.total;
        } else {
          this.tableData = [];
          this.total = 0;
        }
      })
    },
    foramtDate (data) {
      data.forEach(ele => {
        let result = ele.gradeName;
        let resulto1 = ele.className;
        resulto1 = result + ',' + resulto1
        ele.gradeName = resulto1;
      });
    },
    // 获取年级
    Forgrade () {
      var objone = {}
      fetch.get(Equipment.getGradeByschoolId, '', res => {

        let school = JSON.parse(res)
        if (school.code === 200) {
          school.data.forEach((a, i) => {
            objone[i] = {
              gradeName: a.studyPhase + a.gradeName,
              gradeId: a.gradeId
            }
          })
          this.tableSchool = objone
        } else if (school.code === 201) {

          this.tableSchoo = [];
        } else {
          this.$message({
            message: school.message,
            type: 'warning'
          });
          this.tableSchool = []

        }
      })
    },
    //获取班级
    handlexian (v) {
      this.SchoolclassId = [];
      this.classId = ''

      if (!v) {
        return
      };
      let par = {
        gradeId: this.gradeId
      }
      fetch.get(Equipment.getClassByGradeId, par, res => {
        let school = JSON.parse(res)
        if (school.code === 200) {

          this.SchoolclassId = school.data
        } else if (school.code === 201) {

          this.SchoolclassId = []
        } else {
          this.$message({
            message: school.message,
            type: 'warning'
          });
          this.SchoolclassId = []
        }
      })
    },
    // 申请年级
    applyForgrade () {
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
          this.applytableSchool = objone;
        } else if (school.code === 201) {
          this.$message({
            message: school.message,
            type: 'warning'
          });
          this.applytableSchool = [];
        } else {

          this.applytableSchool = [];

        }
      })
    },
    //申请班级
    applyhandlexian (v) {
      this.applySchoolclassId = [];
      this.createForm.classId = ''
      var arr = this.createForm.gradeId
      var obj = {}
      for (var key in arr) {
        obj[key] = arr[key]

      }

      let gradeId = obj[0]

      if (!v) {
        return
      };
      let par = {
        gradeId: gradeId
      }

      fetch.get(Equipment.getClassByGradeId, par, res => {
        let school = JSON.parse(res)
        if (school.code === 200) {
          this.applySchoolclassId = school.data

        } else if (school.code === 201) {
          this.applySchoolclassId = []
        } else {
          this.$message({
            message: school.message,
            type: 'success'
          });
          this.applySchoolclassId = []
        }
      })
    },
    handleTab (t) {
      if (t === this.dialogCardType) {
        return
      }
      this.dialogCardType = t
    },
    handleIs (row) {

      row.isOpen = !row.isOpen
    },
    clsDat () {
      this.Timing = [];
      this.pwdForm.oldPwd = '';
      this.pwdForm.newPwd = '';
      this.pwdForm.newPwdone = '';

    },
    clsDat01 () {
      this.createForm.gradeId = ''
      this.createForm.classId = ''
    },
    clsDat02 () {
      this.goForm.oldPwd = '';
      this.goForm.newPwd = '';
      this.goForm.newPwdone = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pub {
  height: 100%;
  overflow: auto;
}

.dialog-tab {
  display: flex;
  justify-content: space-around;
  padding-right: 31px;
  letter-spacing: 2px;
  color: #ffffff;
  font-size: 18px;
}

.dialog-tab > div > span {
  opacity: 0.5;
  cursor: pointer;
}

.dialog-tab .activeT {
  opacity: 1;
  position: relative;
  transition: all 0.2s;
}

.activeT::before {
  content: url(../../assets/school_img/sjj.png);
  position: absolute;
  bottom: -23px;
  left: 28px;
}

.d-tableRow {
  background: #f4f4f4 !important;
}

.on-off {
  width: 35px;
  height: 20px;
  cursor: pointer;
  margin: 0 auto;
  transition: all 0.2s;
}

.on {
  background: url(../../assets/school_img/k.png) no-repeat center center;
}

.off {
  background: url(../../assets/school_img/g.png) no-repeat center center;
}
</style>