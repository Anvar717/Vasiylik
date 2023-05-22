import ApiService from '../api.service'

const CourtApplicationService = {
    GetList(StartDate,EndDate,Search,SortColumn,OrderType, PageNumber, PageLimit){
        return ApiService.get(`/CourtApplication/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/CourtApplication/Get?id=${id}`)
    },
    GetCourtApplicationFile(courtapplicationid){       
        return ApiService.get(`/CourtApplication/GetCourtApplicationFile?courtapplicationid=${courtapplicationid}`)
    },
    Accept(data){
        return ApiService.post(`/CourtApplication/Accept`,data)
    },
    Reject(data){
        return ApiService.post(`/CourtApplication/Reject`,data)
    },
    GetDetail(id){       
        return ApiService.get(`/CourtApplication/GetDetail?id=${id}`)
    },
}
export default CourtApplicationService