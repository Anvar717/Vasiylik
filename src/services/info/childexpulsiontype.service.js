import ApiService from '../api.service'

const ChildExpulsionTypeService = {
    GetAll(lang,isToOrphanage){
        return ApiService.get(`/ChildExpulsionType/GetAll?lang=${lang}&isToOrphanage=${isToOrphanage}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/ChildExpulsionType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/ChildExpulsionType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/ChildExpulsionType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/ChildExpulsionType/Delete?id=${id}`)
    }
}
export default ChildExpulsionTypeService