import ApiService from '../api.service'

const ChildMeasuresTakenForAdoptionService = {
    GetAll(lang){
        return ApiService.get(`/ChildMeasuresTakenForAdoption/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/ChildMeasuresTakenForAdoption/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/ChildMeasuresTakenForAdoption/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/ChildMeasuresTakenForAdoption/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/ChildMeasuresTakenForAdoption/Delete?id=${id}`)
    }
}
export default ChildMeasuresTakenForAdoptionService