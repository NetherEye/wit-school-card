let url = '/proxy'

let ExamRoom = {
	'getcourseByGradeId' : url + '/api/getcourseByGradeId', //3.获取年级下的所有课程
    'getGradeByschoolId' : url + '/api/getGradeByschoolId', //41.分页获取考场设置信息
    'getExamRoom' : url + '/api/getExamRoom', //41.分页获取考场设置信息
    'insertExamRoom' : url + '/api/insertExamRoom', //42.添加考场
    'getExamRoomByid' : url + '/api/getExamRoomByid', //43.查询单个考场
    'deleteExamRoomByid' : url + '/api/deleteExamRoomByid', //43.查询单个考场

}

export default ExamRoom
