import ApiService from '../api.service'

const HigherEduClassifierService = {
    GetAll(lang){
        return ApiService.get(`/hrm/HigherEduClassifier/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/HigherEduClassifier/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/hrm/HigherEduClassifier/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/HigherEduClassifier/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/HigherEduClassifier/Delete?id=${id}`)
    }
}
export default HigherEduClassifierService