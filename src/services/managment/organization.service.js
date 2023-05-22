import ApiService from '../api.service'

const OrganizationService = {
    GetAll(oblastid,regionid,isfarmfy){
        return ApiService.get(`/Organization/GetAll?oblastid=${oblastid}&regionid=${regionid}&isfarmfy=${isfarmfy}`)
    },
    GetOrganizationAccountList(){
        return ApiService.get(`/Organization/GetOrganizationAccountList`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit,oblastid,regionid,isfarmfy){
        return ApiService.get(`/Organization/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&oblastid=${oblastid}&regionid=${regionid}&isfarmfy=${isfarmfy}`)
    },
    Get(id,inn){
        return ApiService.get(`/Organization/Get?id=${id}&inn=${inn}`)
    },
    Update(data){
        return ApiService.post(`/Organization/Update`,data)
    },
    Delete(id){
        return ApiService.delete(`/Organization/Delete?id=${id}`)
    },
    GetOrganizationList(Search,SortColumn, OrderType, PageNumber, PageLimit,oblastid,regionid,isfarmfy){
        return ApiService.get(`/Organization/GetOrganizationList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&oblastid=${oblastid}&regionid=${regionid}&isfarmfy=${isfarmfy}`)
    },
}
export default OrganizationService