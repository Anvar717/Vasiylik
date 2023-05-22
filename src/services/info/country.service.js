import ApiService from '../api.service'

const CountryService = {
    Get(id){       
        return ApiService.get(`/Country/Get?id=${id}`)
    },
    GetAll(lang){
        return ApiService.get(`/Country/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Country/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/Country/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Country/Delete?id=${id}`)
    }
}
export default CountryService