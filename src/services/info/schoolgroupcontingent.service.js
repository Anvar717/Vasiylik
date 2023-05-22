import ApiService from '../api.service'

const SchoolGroupContingentService = {
    Get(id){       
        return ApiService.get(`/SchoolGroupContingent/Get?id=${id}`)
    },
    GetAll(lang){
        return ApiService.get(`/SchoolGroupContingent/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolGroupContingent/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/SchoolGroupContingent/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SchoolGroupContingent/Delete?id=${id}`)
    }
}
export default SchoolGroupContingentService