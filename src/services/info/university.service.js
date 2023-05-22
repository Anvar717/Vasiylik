import ApiService from '../api.service'

const UniversityService = {
    GetAll(lang,countryId,oblastId){
        return ApiService.get(`/hrm/University/GetAll?lang=${lang}&countryId=${countryId}&oblastId=${oblastId}`)
    }, 
    GetList(countryId,oblastId,Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/University/GetList?countryId=${countryId}&oblastId=${oblastId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/hrm/University/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/University/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/University/Delete?id=${id}`)
    }
}
export default UniversityService