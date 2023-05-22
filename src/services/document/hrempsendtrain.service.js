import ApiService from '../api.service'

const HrEmpSendTrainService = {
    GetList(StartDate,EndDate,Search,SortColumn,OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/HrEmpSendTrain/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/hrm/HrEmpSendTrain/Get?id=${id}`)
    },
    GetDetail(id){       
        return ApiService.get(`/hrm/HrEmpSendTrain/GetDetail?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/HrEmpSendTrain/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/HrEmpSendTrain/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/hrm/HrEmpSendTrain/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/hrm/HrEmpSendTrain/CancelApproval?id=${id}`)
    },
}
export default HrEmpSendTrainService