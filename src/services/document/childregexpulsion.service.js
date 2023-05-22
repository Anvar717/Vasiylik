import ApiService from '../api.service'

const ChildRegExpulsionService = {
    Get(id){       
        return ApiService.get(`/ChildRegExpulsion/Get?id=${id}`)
    },
    GetList(StartDate,EndDate,Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/ChildRegExpulsion/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/ChildRegExpulsion/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/ChildRegExpulsion/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/ChildRegExpulsion/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/ChildRegExpulsion/CancelApproval?id=${id}`)
    },
}
export default ChildRegExpulsionService