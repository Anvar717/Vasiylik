import ApiService from '../api.service'

const StreetHouseStateService = {
    GetAll(lang){
        return ApiService.get(`/StreetHouseState/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/StreetHouseState/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/StreetHouseState/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/StreetHouseState/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/StreetHouseState/Delete?id=${id}`)
    }

}
export default StreetHouseStateService