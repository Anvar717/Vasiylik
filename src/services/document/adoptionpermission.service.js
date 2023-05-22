import ApiService from '../api.service'

const AdoptionPermissionService = {
    Get(id){       
        return ApiService.get(`/AdoptionPermission/Get?id=${id}`)
    },
    GetList(docNumber,Search,SortColumn, OrderType, PageNumber, PageLimit, StatusId){
        return ApiService.get(`/AdoptionPermission/GetList?docNumber=${docNumber}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&StatusId=${StatusId}`)
    },
    ForDiscussion(id){
        return ApiService.post(`/AdoptionPermission/ForDiscussion?id=${id}`)
    },
    Reject(data){
        return ApiService.post('/AdoptionPermission/Reject', data)
    },
    Refused(data){
        return ApiService.post('/AdoptionPermission/Refused', data)
    },
    Permit(data){
        return ApiService.post('/AdoptionPermission/Permit',data)
    },
}
export default AdoptionPermissionService