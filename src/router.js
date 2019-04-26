import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/publics/Index'
import Root from './views/publics/Root'

const Equipment = resolve => require(['./views/school/Equipment'], resolve)
const Subject = resolve => require(['./views/school/Subject'], resolve)
const Grade = resolve => require(['./views/school/Grade'], resolve)
const Class = resolve => require(['./views/school/Class'], resolve)
const Teacher = resolve => require(['./views/school/Teacher'], resolve)
const Student = resolve => require(['./views/school/Student'], resolve)
const Exam = resolve => require(['./views/school/Exam'], resolve)
const ExamRoom = resolve => require(['./views/school/ExamRoom'], resolve)
const SchoolIntroduce = resolve => require(['./views/school/SchoolIntroduce'], resolve)
const SchoolNews = resolve => require(['./views/school/SchoolNews'], resolve)
const SchoolInform = resolve => require(['./views/school/SchoolInform'], resolve)
const AttendanceSet = resolve => require(['./views/school/AttendanceSet'], resolve)
const AttendanceDetail = resolve => require(['./views/publics/AttendanceDetail'], resolve)
const Reminder = resolve => require(['./views/publics/reminder'], resolve)
const limitpage = resolve => require(['./views/publics/501'], resolve)
const together = resolve => require(['./views/publics/201'], resolve)

const ClassInfo = resolve => require(['./views/class/ClassInfo'], resolve)
const ClassMien = resolve => require(['./views/class/ClassMien'], resolve)
const ClassHonor = resolve => require(['./views/class/ClassHonor'], resolve)
const ClassTimetable = resolve => require(['./views/class/ClassTimetable'], resolve)
const ClassDuty = resolve => require(['./views/class/ClassDuty'], resolve)
const ClassInform = resolve => require(['./views/class/ClassInform'], resolve)
const ClassPraise = resolve => require(['./views/class/ClassPraise'], resolve)

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
			path: '/reminder',
			name: '选择页',
			meta: ['班级'],
			component: Reminder
		},
		{
			path: '/501',
			name: '501',
			meta: ['班级'],
			component: limitpage
		},
		{
			path: '/201',
			name: '被迫下线',
			meta: ['班级', '学校'],
			component: together
		},
		{
			path: '',
			name: '根页面',
			meta: ['学校', '班级'],
			component: Root,
			children: [{
					path: '/home',
					name: '首页',
					meta: ['学校', '班级'],
					component: Index
				},
				{
					path: '/equipment',
					name: '设备管理',
					meta: ['学校'],
					component: Equipment
				},
				{
					path: '/grade',
					name: '年级管理',
					meta: ['学校'],
					component: Grade
				},
				{
					path: '/subject',
					name: '学科管理',
					meta: ['学校'],
					component: Subject
				},
				{
					path: '/class',
					name: '班级管理',
					meta: ['学校'],
					component: Class
				},
				{
					path: '/teacher',
					name: '教师管理',
					meta: ['学校'],
					component: Teacher
				},
				{
					path: '/student',
					name: '学生管理',
					meta: ['学校'],
					component: Student
				},
				{
					path: '/exam',
					name: '考试设置',
					meta: ['学校'],
					component: Exam
				},
				{
					path: '/exam-room',
					name: '考场设置',
					meta: ['学校'],
					component: ExamRoom
				},
				{
					path: '/school-introduce',
					name: '学校介绍',
					meta: ['学校'],
					component: SchoolIntroduce
				},
				{
					path: '/school-news',
					name: '学校新闻',
					meta: ['学校'],
					component: SchoolNews
				},
				{
					path: '/school-inform',
					name: '学校通知',
					meta: ['学校'],
					component: SchoolInform
				},
				{
					path: '/attendance-set',
					name: '考勤设置',
					meta: ['学校'],
					component: AttendanceSet
				},
				{
					path: '/attendance-detail',
					name: '考勤详情',
					meta: ['学校'],
					component: AttendanceDetail
				},

				{
					path: '/class-info',
					name: '班级信息',
					meta: ['班级'],
					component: ClassInfo
				},
				{
					path: '/class-mien',
					name: '班级风采',
					meta: ['班级'],
					component: ClassMien
				},
				{
					path: '/class-honor',
					name: '班级荣誉',
					meta: ['班级'],
					component: ClassHonor
				},
				{
					path: '/class-timetable',
					name: '班级课表',
					meta: ['班级'],
					component: ClassTimetable
				},
				{
					path: '/class-duty',
					name: '班级值日',
					meta: ['班级'],
					component: ClassDuty
				},
				{
					path: '/class-inform',
					name: '班级通知',
					meta: ['班级'],
					component: ClassInform
				},
				{
					path: '/class-praise',
					name: '表扬榜',
					meta: ['班级'],
					component: ClassPraise
				},
			]
		},

	]
})