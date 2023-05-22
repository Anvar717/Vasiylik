import ApiService from '../api.service'

const HousingQueueService = {
    Get(id){       
        return ApiService.get(`/HousingQueue/Get?id=${id}`)
    },
    GetHouseOrder(id){       
        return ApiService.get(`/HousingQueue/GetHouseOrder?id=${id}`)
    },
    GetDecision(id){       
        return ApiService.get(`/HousingQueue/GetDecision?id=${id}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/HousingQueue/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/HousingQueue/Update',data)
    },
    UpdateHousingQueueDecision(housingQueueId, data){
        return ApiService.post(`/HousingQueue/UpdateHousingQueueDecision?housingQueueId=${housingQueueId}`, data)
    },
    UpdateHousingQueueHouseOrder(housingQueueId,data){
        return ApiService.post(`/HousingQueue/UpdateHousingQueueHouseOrder?housingQueueId=${housingQueueId}`,data)
    },
    Delete(id){
        return ApiService.delete(`/HousingQueue/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/HousingQueue/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/HousingQueue/CancelApproval?id=${id}`)
    },
    Send(id){
        return ApiService.post(`/HousingQueue/Send?id=${id}`)
    },
    Reject(id,description){
        return ApiService.post(`/HousingQueue/Reject?id=${id}&description=${description}`)
    },
    Permit(id){
        return ApiService.post(`/HousingQueue/Permit?id=${id}`)
    },
    Cancel(id){
        return ApiService.post(`/HousingQueue/Cancel?id=${id}`)
    },
    Accept(id){
        return ApiService.post(`/HousingQueue/Accept?id=${id}`)
    },
    GetListForHeader(statusId,organizationName,pinfl,search,sortColumn, orderType, pageNumber, pageLimit){
        return ApiService.get(`/HousingQueue/GetListForHeader?statusId=${statusId}&organizationName=${organizationName}&pinfl=${pinfl}&search=${search}&sortColumn=${sortColumn}&orderType=${orderType}&pageNumber=${pageNumber}&pageLimit=${pageLimit}`)
    },
    GetKadastrInfo(housingQueueId){
        return ApiService.get(`/HousingQueue/GetKadastrInfo?housingQueueId=${housingQueueId}`)
    },
    CheckKadastrData(housingQueueId){
        return ApiService.get(`/HousingQueue/CheckKadastrData?housingQueueId=${housingQueueId}`)
    }
}
export default HousingQueueService