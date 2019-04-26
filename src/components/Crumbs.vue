<template>
	<div class="crumbs">
		{{crumbs}}
	</div>

</template>
<script>
export default {
	data(){
		return {
			crumbs: ''
		}
	},
	created(){
		let li1 = ['设备管理'],
			li2 = ['年级管理', '学科管理', '班级管理', '教师管理', '学生管理', '考试设置', '考场设置'],
			li3 = ['学校介绍', '学校新闻', '学校通知'],
			li4 = ['考勤设置', '考勤详情'],
			li5 = ['班级信息', '班级风采', '班级荣誉', '班级课表', '班级值日', '班级通知', '表扬榜']
		let _crumbs = ''
		
		if(li1.indexOf(this.$route.name) !== -1){
			_crumbs += '设备管理>>' + this.$route.name
		}else if(li2.indexOf(this.$route.name) !== -1){
			_crumbs += '教学管理>>' + this.$route.name
		}else if(li3.indexOf(this.$route.name) !== -1){
			_crumbs += '校级建设>>' + this.$route.name
		}else if(li4.indexOf(this.$route.name) !== -1){
			_crumbs += '考勤管理>>' + this.$route.name
		}else if(li5.indexOf(this.$route.name) !== -1){
			_crumbs += '班级建设>>' + this.$route.name
		}
		
		this.crumbs = _crumbs
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.crumbs {
	font-size: 14px;
	letter-spacing: 1px;
	color: #485a5d;
	margin-top: 20px;
	margin-left: 37px;
}
</style>