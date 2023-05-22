import ApiService from '../api.service'

const KinshipDegreeService = {
    Get(id){       
        return ApiService.get(`/KinshipDegree/Get?id=${id}`)
    },
    GetAll(lang,ClearCache){
        return ApiService.get(`/KinshipDegree/GetAll?lang=${lang}&ClearCache=${ClearCache}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/KinshipDegree/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/KinshipDegree/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/KinshipDegree/Delete?id=${id}`)
    }
}
export default KinshipDegreeService