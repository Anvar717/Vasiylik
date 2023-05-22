import ApiService from '../api.service'

const MfyStateService = {
    GetAll(lang){
        return ApiService.get(`/MfyState/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/MfyState/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/MfyState/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/MfyState/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/MfyState/Delete?id=${id}`)
    }
}
export default MfyStateService