import ApiService from '../api.service'

const PositionClassificationService = {
    GetAll(lang){
        return ApiService.get(`/hrm/PositionClassification/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/PositionClassification/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/hrm/PositionClassification/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/PositionClassification/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/PositionClassification/Delete?id=${id}`)
    }
}
export default PositionClassificationService