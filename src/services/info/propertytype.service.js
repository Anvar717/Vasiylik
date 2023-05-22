import ApiService from '../api.service'

const PropertyTypeService = {
    Get(id){       
        return ApiService.get(`/PropertyType/Get?id=${id}`)
    },
    GetAll(lang){
        return ApiService.get(`/PropertyType/GetAll?lang=${lang}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/PropertyType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/PropertyType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/PropertyType/Delete?id=${id}`)
    }
}
export default PropertyTypeService