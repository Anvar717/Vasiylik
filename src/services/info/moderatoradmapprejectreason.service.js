import ApiService from '../api.service'

const ModeratorAdmAppRejectReasonService = {
    Get(id){
        return ApiService.get(`/ModeratorAdmAppRejectReason/Get?id=${id}`)
    },
    GetAll(lang){
      return ApiService.get(`/ModeratorAdmAppRejectReason/GetAll?lang=${lang}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/ModeratorAdmAppRejectReason/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/ModeratorAdmAppRejectReason/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/ModeratorAdmAppRejectReason/Delete?id=${id}`)
    }
}
export default ModeratorAdmAppRejectReasonService