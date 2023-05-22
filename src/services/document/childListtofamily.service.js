import ApiService from '../api.service'

const ChildListToFamilyService = {
    Get(id){       
        return ApiService.get(`/ChildListToFamily/Get?id=${id}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/ChildListToFamily/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/ChildListToFamily/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/ChildListToFamily/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/ChildListToFamily/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/ChildListToFamily/CancelApproval?id=${id}`)
    },
}
export default ChildListToFamilyService