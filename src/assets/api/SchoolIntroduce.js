let url = '/proxy'

let SchoolIntroduce = {
    'getSchoolMessage' : url + '/api/getSchoolMessage', //53.分页获取学校介绍，学校新闻
    'insertSchoolMessage' : url + '/api/insertSchoolMessage', //54.添加学校介绍，学校新闻
    'updateSchoolMessageByid' : url + '/api/updateSchoolMessageByid', //57.修改学校介绍，学校新闻
    'getSchoolMessageByid' : url + '/api/getSchoolMessageByid', //55.查询学校介绍，学校新闻
   'getSchoolInform':url + '/api/getSchoolInform', //55.查询学校通知
   'insertSchoolInform':url + '/api/insertSchoolInform', //55.查询学校通知
   'getSchoolInformByid':url + '/api/getSchoolInformByid', //55.查询学校通知
   'deleteSchoolInformByid':url + '/api/deleteSchoolInformByid', //55.查询学校通知
   'getGradeByschoolId':url + '/api/getGradeByschoolId', //55.年级
   'getClassByGradeId':url + '/api/getClassByGradeId', //55.年级
   'getCheckingSetall':url + '/api/getCheckingSetall',
   'insertCheckingSet':url + '/api/insertCheckingSet',
   'getChecksetByid':url + '/api/getChecksetByid',
   "deleteChecksetByids":url + '/api/deleteChecksetByids',
   "getCheckDetailsPage":url + '/api/getCheckDetailsPage',
   "deleteSchoolMessageByid":url + '/api/deleteSchoolMessageByid',
   "deleteSchoolInformByid":url + '/api/deleteSchoolInformByid',
   "addGradeCheck":url + '/api/addGradeCheck',
   "updateChecksetByid":url + '/api/updateChecksetByid',
}

export default SchoolIntroduce
