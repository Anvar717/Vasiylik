import ApiService from '../api.service'

const HrWorkDayOffService = {
    GetList(StartDate,EndDate,Search,SortColumn,OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/HrWorkDayOff/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/hrm/HrWorkDayOff/Get?id=${id}`)
    },
    GetDetail(id){       
        return ApiService.get(`/hrm/HrWorkDayOff/GetDetail?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/HrWorkDayOff/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/HrWorkDayOff/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/hrm/HrWorkDayOff/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/hrm/HrWorkDayOff/CancelApproval?id=${id}`)
    },
}
export default HrWorkDayOffService