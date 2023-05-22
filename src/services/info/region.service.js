import ApiService from '../api.service'

const RegionService = {
    Get(id){       
          return ApiService.get(`/Region/Get?id=${id}`)
    },
    GetAll(lang, OblastID){
        return ApiService.get(`/Region/GetAll?lang=${lang}&OblastID=${OblastID}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Region/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/Region/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Region/Delete?id=${id}`)
    }
}
export default RegionService