import ApiService from '../api.service'

const ChildOrphanageMovementService = {
    Get(id){       
        return ApiService.get(`/ChildOrphanageMovement/Get?id=${id}`)
    },
    GetList(directionType,personName,organizationName,StartDate,EndDate,Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/ChildOrphanageMovement/GetList?directionType=${directionType}&personName=${personName}&organizationName=${organizationName}&StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetAll(fromChildRegistrationActId){
        return ApiService.get(`/ChildOrphanageMovement/GetAll?fromChildRegistrationActId=${fromChildRegistrationActId}`)
    }, 
    Update(data){
        return ApiService.post('/ChildOrphanageMovement/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/ChildOrphanageMovement/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/ChildOrphanageMovement/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/ChildOrphanageMovement/CancelApproval?id=${id}`)
    },
    Send(id){
        return ApiService.post(`/ChildOrphanageMovement/Send?id=${id}`)
    },
    Reject(id,description){
        return ApiService.post(`/ChildOrphanageMovement/Reject?id=${id}&description=${description}`)
    },
    Permit(id){
        return ApiService.post(`/ChildOrphanageMovement/Permit?id=${id}`)
    },
    Cancel(id){
        return ApiService.post(`/ChildOrphanageMovement/Cancel?id=${id}`)
    },
    Accept(id){
        return ApiService.post(`/ChildOrphanageMovement/Accept?id=${id}`)
    },
    GetListHeader(personName,organizationName,StartDate,EndDate,Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/ChildOrphanageMovement/GetListForHeaderOrg?personName=${personName}&organizationName=${organizationName}&StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
}
export default ChildOrphanageMovementService