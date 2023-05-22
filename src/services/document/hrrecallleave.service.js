import ApiService from '../api.service'

const HrRecallLeaveService = {
    GetList(Search,SortColumn,OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/HrRecallLeave/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/hrm/HrRecallLeave/Get?id=${id}`)
    },
    GetDetail(id){       
        return ApiService.get(`/hrm/HrRecallLeave/GetDetail?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/HrRecallLeave/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/HrRecallLeave/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/hrm/HrRecallLeave/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/hrm/HrRecallLeave/CancelApproval?id=${id}`)
    },
}
export default HrRecallLeaveService