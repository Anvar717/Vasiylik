import ApiService from '../api.service'

const ChildUnderGuardExpulsionService = {
    Get(id){       
        return ApiService.get(`/ChildUnderGuardExpulsion/Get?id=${id}`)
    },
    GetList(StartDate,EndDate,Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/ChildUnderGuardExpulsion/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetDetail(id){       
        return ApiService.get(`/ChildUnderGuardExpulsion/GetDetail?id=${id}`)
    },
    Update(data){
        return ApiService.post('/ChildUnderGuardExpulsion/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/ChildUnderGuardExpulsion/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/ChildUnderGuardExpulsion/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/ChildUnderGuardExpulsion/CancelApproval?id=${id}`)
    },
}
export default ChildUnderGuardExpulsionService