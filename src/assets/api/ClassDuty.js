let url = '/proxy'

let ClassDuty = {
    'getList' : url + '/api/getDutyRoster',
    'getStudent': url + '/api/getStudentByClassId',
    'addDuty': url + '/api/addDutyRoster',
    'updateDuty': url + '/api/updateDutyRosterByid',
    'delDuty': url + '/api/delDutyRoster'
}

export default ClassDuty
