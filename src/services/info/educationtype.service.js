import ApiService from '../api.service'

const EducationTypeService = {
    GetAll(lang,isgroup){
        return ApiService.get(`/hrm/EducationType/GetAll?lang=${lang}&isgroup=${isgroup}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/EducationType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/hrm/EducationType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/EducationType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/EducationType/Delete?id=${id}`)
    }
}
export default EducationTypeService