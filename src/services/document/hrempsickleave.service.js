import ApiService from '../api.service'

const HREmpSickLeaveService = {
    GetList(StartDate,EndDate,Search,SortColumn,OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/HREmpSickLeave/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/hrm/HREmpSickLeave/Get?id=${id}`)
    },
    GetDetail(id){       
        return ApiService.get(`/hrm/HREmpSickLeave/GetDetail?id=${id}`)
    },
    GetUnpaidHREmpSickLeaveList(Search,SortColumn,OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/HREmpSickLeave/GetUnpaidHREmpSickLeaveList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/hrm/HREmpSickLeave/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/HREmpSickLeave/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/hrm/HREmpSickLeave/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/hrm/HREmpSickLeave/CancelApproval?id=${id}`)
    },
}
export default HREmpSickLeaveService