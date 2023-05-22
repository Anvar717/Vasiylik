import ApiService from '../api.service'

const StaffTypeBasicTariffService = {
    GetAll(lang){
        return ApiService.get(`/hrm/StaffTypeBasicTariff/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/StaffTypeBasicTariff/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/hrm/StaffTypeBasicTariff/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/StaffTypeBasicTariff/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/StaffTypeBasicTariff/Delete?id=${id}`)
    }
}
export default StaffTypeBasicTariffService