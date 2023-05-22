import ApiService from '../api.service'

const ChildApplicationService = {
    GetList(docNumber,Search,SortColumn, OrderType, PageNumber, PageLimit,StatusId){
        return ApiService.get(`/ChildApplication/GetList?docNumber=${docNumber}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&StatusId=${StatusId}`)
    },
    GetDetail(childselectapplicationid){
        return ApiService.get(`/ChildApplication/GetDetail?childselectapplicationid=${childselectapplicationid}`)
    },
    MetWithTheChild(id){
        return ApiService.post(`/ChildApplication/MetWithTheChild?id=${id}`)
    },
    ConfirmDecisionApplicant(id){
        return ApiService.post(`/ChildApplication/ConfirmDecisionApplicant?id=${id}`)
    },
}
export default ChildApplicationService