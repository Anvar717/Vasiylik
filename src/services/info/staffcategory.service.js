import ApiService from '../api.service'

const StaffCategoryService = {
    GetAll(lang){
        return ApiService.get(`/hrm/StaffCategory/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/StaffCategory/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/hrm/StaffCategory/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/StaffCategory/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/StaffCategory/Delete?id=${id}`)
    }
}
export default StaffCategoryService