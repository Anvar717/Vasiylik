import ApiService from '../api.service'

const GuardianshiplessReasonService = {
    GetAll(lang){
        return ApiService.get(`/GuardianshiplessReason/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/GuardianshiplessReason/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/GuardianshiplessReason/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/GuardianshiplessReason/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/GuardianshiplessReason/Delete?id=${id}`)
    }
}
export default GuardianshiplessReasonService