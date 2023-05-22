import ApiService from '../api.service'

const DepartmentService = {
    GetAll(lang){
        return ApiService.get(`/hrm/Department/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/Department/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/hrm/Department/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/Department/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/Department/Delete?id=${id}`)
    }
}
export default DepartmentService