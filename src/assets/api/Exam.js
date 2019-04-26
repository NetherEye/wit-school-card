let url = '/proxy'

let Exam = {
	'getGradeByschoolId' : url + '/api/getGradeByschoolId', //1.获取当前学校下的年级。
	'getExam' : url + '/api/getExam', //3.获取年级下的所有课程
    'getExamRoom' : url + '/api/getExamRoom', //41.分页获取考场设置信息
    'insertExam' : url + '/api/insertExam', //41.分页获取考场设置信息
    'getExamByid' : url + '/api/getExamByid', //39.查询单个考试
    'deleteExamByid' : url + '/api/deleteExamByid', //39.查询单个考试
}

export default Exam
