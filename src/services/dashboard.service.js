import ApiService from './api.service'
const DashboardService = {
    GetMicroTerritoryListInDashboard(oblastId,regionId,organizationId){
       return ApiService.get(`/Dashboard/GetMicroTerritoryListInDashboard?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}`)
   }
}
export default DashboardService