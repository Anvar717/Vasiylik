import ApiService from '../api.service'

const PropertyRightService = {
    Get(id){       
        return ApiService.get(`/PropertyRight/Get?id=${id}`)
    },
    GetAll(lang){
        return ApiService.get(`/PropertyRight/GetAll?lang=${lang}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/PropertyRight/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/PropertyRight/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/PropertyRight/Delete?id=${id}`)
    }
}
export default PropertyRightService