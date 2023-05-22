import ApiService from '../api.service'

const StreetService = {
    Get(externalid){       
        return ApiService.get(`/Street/Get?id=${externalid}`)
    },
    GetAll(lang, RegionID){
        return ApiService.get(`/Street/GetAll?lang=${lang}&RegionID=${RegionID}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Street/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    UpdateStreet(data){
        return ApiService.post('/Street/UpdateStreet',data)
    },
    Delete(id){
        return ApiService.delete(`/Street/Delete?id=${id}`)
    }
}
export default StreetService