import ApiService from '../api.service'

const SchoolLegalFormService = {
    Get(id){       
        return ApiService.get(`/SchoolLegalForm/Get?id=${id}`)
    },
    GetAll(lang){
        return ApiService.get(`/SchoolLegalForm/GetAll?lang=${lang}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolLegalForm/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/SchoolLegalForm/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SchoolLegalForm/Delete?id=${id}`)
    }
}
export default SchoolLegalFormService