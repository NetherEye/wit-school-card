<template>
	<div class="pub">
		<my-crumbs></my-crumbs>
		<div class="filter">
			<div class="filter-item">
				<div class="label">班级信息:{{ classData.className}}</div>
			</div>
			<div class="filter-item">
				<div class="btn" @click="dialogDetailShow = true">编辑</div>
			</div>
			
		</div>
		<div class="bx">
			<div class="x-bx">
				
				<div class="y-bs">
					<div class="xb">
						<dl>
							<dt><img src="../../assets/class_img/name.png"/></dt>
							<dd>班级名称</dd>
							<dd>{{classData.className}}</dd>
						</dl>
						<dl>
							<dt><img src="../../assets/class_img/teacher.png"/></dt>
							<dd>班主任</dd>
							<dd>{{classData.classLeader}}</dd>
						</dl>
						<dl>
							<dt><img src="../../assets/class_img/leader.png"/></dt>
							<dd>班长</dd>
							<dd>{{classData.squadLeader}}</dd>
						</dl>
						<dl>
							<dt><img src="../../assets/class_img/people.png"/></dt>
							<dd>班级人数</dd>
							<dd>{{classData.classNum}}</dd>
						</dl>
						<dl>
							<dt><img src="../../assets/class_img/Introduction.png"/></dt>
							<dd>班级宣言</dd>
							<dd>{{classData.classTitle}}</dd>
						</dl>
					</div>
				</div>
				<div class="s-bs">
					
				</div>
			</div>
		</div>
		<el-dialog title="班级信息" :visible.sync="dialogDetailShow" width="600px" @close="isClose" center custom-class="pwdDialog">
			<div class="p_item" style="padding-left: 210px;">班级名称：{{classData.className}} </div>
			<div class="p_item" style="padding-left: 210px;">班主任：{{classData.classLeader}} </div>
			<div class="p_item" style="padding-left: 210px;">班级人数：{{classData.classNum}} </div>
			<el-form ref="form" label-position="right" :model="dat">
					<el-form-item label="班长" style="margin-left: 180px;margin-top: 20px;">
						<el-input v-model.number="dat.leader" :maxlength="6" placeholder="请输入姓名" clearable size="small " style="width: 194px;"></el-input>
					</el-form-item>
					<el-form-item label="班级宣言" style="margin-left: 150px;margin-top: 20px;">
						<el-input :maxlength="20" v-model.number="dat.title" placeholder="请输入宣言" clearable size="small " style="width: 194px;"></el-input>
					</el-form-item>
				</el-form>
			
			<div slot="footer" style="height: 50px;display: flex;justify-content: center;">
				<div class="btn" @click="isClick">保存</div>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
    import fetch from '@/assets/http/fetch';
    import allApi from '@/assets/api/school';
export default {
	data(){
		return {
            numberReg:'^[0-9]*$',
            speReg:   /^[\u4E00-\u9FA5]{2,6}$/,
			input: '',
			options: [],
			setForm: {},
			dialogDetailShow: false,
			dat: {
			    leader: '',
				title:''
			},
			classData: {
			    className : '',
				classLeader: '',
				classNum : '',
				id : '',
                squadLeader : '',
                classTitle : '',
			}
		}
	},
	created (){
		this.getData()
	},
	methods: {
        isClose () {
            this.dat.title = ''
            this.dat.leader = ''
		},
        isClick () {
            let a = {
                squadLeader : this.dat.leader,
                classTitle : this.dat.title,
				id : this.classData.id
			}

			if (this.dat.leader === '' || this.dat.title === '') {
                this.$message({
                    message: '请输入完整信息',
                    type: 'warning'
                });
                return
			}
			if (!this.speReg.test(this.dat.leader)) {
                this.$message({
                    message: '请输入正确的姓名',
                    type: 'warning'
                });
                return
			}


            fetch.put(allApi.updateClassInfo,a,res=>{
                if (res.code == 200) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    });
                    this.isClose()
                    this.dialogDetailShow = false
					this.getData()
				}
			})
		},
		getData (){
            fetch.get(allApi.getClassInfo,'',res=>{
                this.classData.className = res.data.className
                this.classData.classLeader = res.data.classTeacher
                this.classData.classNum = res.data.classNum
                this.classData.id = res.data.id
                this.classData.classTitle = res.data.classTitle
                this.classData.squadLeader = res.data.squadLeader
            })
        }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pub{
	height: 100%;
	overflow-y: auto;
	position: relative;
}
.bx{
	height: 884px;
	background-color: #ffffff;
	box-shadow: 0px 5px 15px 0px 
		rgba(175, 192, 209, 0.55);
	border-radius: 8px;
	max-width: 1715px;
	min-width: 837px;
	margin: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 35px;
}
.x-bx{
	flex: 1;
	max-width: 1647px;
	min-width: 837px;
	height: 811px;
	background: url(../../assets/class_img/xxbj.png) no-repeat;
	background-size: 100% 100%;
	position: relative;
}
.s-bs{
	width: 837px;
	height: 837px;
	background-color: #ffffff;
	opacity: 0.37;
	border-radius: 50%;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}
.y-bs{
	width: 738px;
	height: 738px;
	background-color: #ffffff;
	border-radius: 50%;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	z-index: 99;
}
.xb{
	width: 428px;
	height: 511px;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}
.xb dl{
	height: 72px;
	margin-bottom: 30px;
}
.xb dl dt{
	float: left;
	margin-right: 20px;
}
.xb dl dd:nth-child(2){
	font-size: 14px;
	letter-spacing: 1px;
	color: #485a5d;
	margin-bottom: 14px;
	margin-top: 11px;
}
.xb dl dd:last-child{
	font-size: 18px;
	letter-spacing: 2px;
	color: #485a5d;
	font-weight: bold;
}

</style>