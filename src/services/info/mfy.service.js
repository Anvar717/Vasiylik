import ApiService from '../api.service'

const MfyService = {
    GetAll(lang, RegionID){
        return ApiService.get(`/Mfy/GetAll?lang=${lang}&RegionID=${RegionID}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Mfy/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/Mfy/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/Mfy/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Mfy/Delete?id=${id}`)
    }
}
export default MfyService