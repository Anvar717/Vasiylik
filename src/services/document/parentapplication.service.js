import ApiService from '../api.service'

const ParentApplicationService = {
    GetList(docNumber,Search,SortColumn, OrderType, PageNumber, PageLimit,StatusId){
        return ApiService.get(`/ParentApplication/GetList?docNumber=${docNumber}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&StatusId=${StatusId}`)
    },
}
export default ParentApplicationService