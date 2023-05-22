import ApiService from '../api.service'

const PositionService = {
    GetAll(departmentId,tariffScaleTypeId,isByOrganization,staffTypeBasicTariffId){
        return ApiService.get(`/hrm/Position/GetAll?departmentId=${departmentId}&tariffScaleTypeId=${tariffScaleTypeId}&isByOrganization=${isByOrganization}&staffTypeBasicTariffId=${staffTypeBasicTariffId}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/Position/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/hrm/Position/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/Position/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/Position/Delete?id=${id}`)
    }
}
export default PositionService