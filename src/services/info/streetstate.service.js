import ApiService from '../api.service'

const StreetStateService = {
    GetAll(lang){
        return ApiService.get(`/StreetState/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/StreetState/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/StreetState/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/StreetState/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/StreetState/Delete?id=${id}`)
    }
}
export default StreetStateService