import ApiService from '../api.service'

const SchoolYearService = {
    Get(id){       
        return ApiService.get(`/SchoolYear/Get?id=${id}`)
    },
    GetAll(lang){
        return ApiService.get(`/SchoolYear/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolYear/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/SchoolYear/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SchoolYear/Delete?id=${id}`)
    }

}
export default SchoolYearService