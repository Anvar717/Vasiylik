import ApiService from '../api.service'

const ColorService = {
    GetAll(iseye){
        return ApiService.get(`/Color/GetAll?iseye=${iseye}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Color/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/Color/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/Color/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Color/Delete?id=${id}`)
    }
}
export default ColorService