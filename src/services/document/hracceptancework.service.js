import ApiService from '../api.service'

const HrAcceptanceWorkService = {
    GetHrAcceptanceWorkPersonlist(hracceptanceworkid){       
        return ApiService.get(`/hrm/HrAcceptanceWork/GetHrAcceptanceWorkPersonlist?hracceptanceworkid=${hracceptanceworkid}`)
    },
    GetList(StartDate,EndDate,Search,SortColumn,OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/HrAcceptanceWork/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetUnpaidHrAcceptanceWorkList(StartDate,EndDate,Search,SortColumn,OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/HrAcceptanceWork/GetUnpaidHrAcceptanceWorkList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/hrm/HrAcceptanceWork/Get?id=${id}`)
    },
    GetDetail(id){       
        return ApiService.get(`/hrm/HrAcceptanceWork/GetDetail?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/HrAcceptanceWork/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/HrAcceptanceWork/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/hrm/HrAcceptanceWork/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/hrm/HrAcceptanceWork/CancelApproval?id=${id}`)
    },
}
export default HrAcceptanceWorkService