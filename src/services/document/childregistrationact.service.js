import ApiService from '../api.service'

const ChildRegistrationActService = {
    Get(id){       
        return ApiService.get(`/ChildRegistrationAct/Get?id=${id}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/ChildRegistrationAct/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/ChildRegistrationAct/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/ChildRegistrationAct/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/ChildRegistrationAct/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/ChildRegistrationAct/CancelApproval?id=${id}`)
    },
}
export default ChildRegistrationActService