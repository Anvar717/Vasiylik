import ApiService from '../api.service'

const DecisionTextService = {
    GetAll(lang){
        return ApiService.get(`/DecisionText/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/DecisionText/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/DecisionText/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/DecisionText/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/DecisionText/Delete?id=${id}`)
    }
}
export default DecisionTextService