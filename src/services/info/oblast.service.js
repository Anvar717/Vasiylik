import ApiService from '../api.service'

const OblastService = {
    Get(id){       
        return ApiService.get(`/Oblast/Get?id=${id}`)
    },
    GetAll(lang){
        return ApiService.get(`/Oblast/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Oblast/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/Oblast/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Oblast/Delete?id=${id}`)
    }
}
export default OblastService