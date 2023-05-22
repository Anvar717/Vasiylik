import ApiService from '../api.service'

const SchoolUniformRequestService = {
    Get(id){
     return ApiService.get(`/SchoolUniformRequest/Get/${id}`)
    },
    GetAll(lang){
        return ApiService.get(`/SchoolUniformRequest/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolUniformRequest/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/SchoolUniformRequest/Update',data)
    },
    Delete(id){
        return ApiService.post(`/SchoolUniformRequest/Delete/${id}`)
    },
    Approve(id){
        return ApiService.post(`/SchoolUniformRequest/Approve/${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/SchoolUniformRequest/CancelApproval/${id}`)
    },

}
export default SchoolUniformRequestService