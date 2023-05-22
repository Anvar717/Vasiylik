import ApiService from '../api.service'

const DecisionsOrgService = {
    GetAll(lang){
        return ApiService.get(`/DecisionsOrg/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/DecisionsOrg/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/DecisionsOrg/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/DecisionsOrg/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/DecisionsOrg/Delete?id=${id}`)
    }
}
export default DecisionsOrgService