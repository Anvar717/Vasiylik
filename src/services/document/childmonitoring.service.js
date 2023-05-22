import ApiService from '../api.service'

const ChildMonitoringService = {
    Get(id,childUnderGuardianshipId){       
        return ApiService.get(`/ChildMonitoring/Get?id=${id}&childUnderGuardianshipId=${childUnderGuardianshipId}`)
    },
    GetList(StartDate,EndDate,Search,SortColumn, OrderType, PageNumber, PageLimit, statusid){
        return ApiService.get(`/ChildMonitoring/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&statusid=${statusid}`)
    },
    Update(data){
        return ApiService.post('/ChildMonitoring/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/ChildMonitoring/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/ChildMonitoring/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/ChildMonitoring/CancelApproval?id=${id}`)
    },
    GetDetail(childmonitoringid){
        return ApiService.get(`/ChildMonitoring/GetDetail?childmonitoringid=${childmonitoringid}`)
    },
}
export default ChildMonitoringService