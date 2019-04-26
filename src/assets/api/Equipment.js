let url = '/proxy'

let Equipment = {
    'getDeviceUser' : url + '/api/getDeviceUser',
    'getGradeByschoolId' : url + '/api/getGradeByschoolId',
    'getcourseByGradeId' : url + '/api/getcourseByGradeId', //3.获取年级下的所有课程
    'getClassByGradeId' : url + '/api/getClassByGradeId', //3.获取年级下的班级
    'getSchoolMessage' : url + '/api/getSchoolMessage', //53.分页获取学校介绍，学校新闻
    'getCheckDetailsCountByClass' : url + '/api/getCheckDetailsCountByClass', //  5.考勤统计班级端首页
    'getDeviceDetails' : url + '/api/getDeviceDetails', //  5.考勤统计班级端首页
    'applyDeviceUser' : url + '/api/applyDeviceUser', //  25.申请账号
    'updateDeviceUserPwd' : url + '/api/updateDeviceUserPwd', //  29.修改设备密码
    'deleteDeviceUser' : url + '/api/deleteDeviceUser', //  29.修改设备密码
    'setDeviceTime' : url + '/api/setDeviceTime', //  30.设置设备的定时设置
    'getDeviceTime' : url + '/api/getDeviceTime', //  30.设置设备的定时设置
    'export' : url + '/api/deviceUser/export', //  30.设置设备的定时设置
}

export default Equipment
