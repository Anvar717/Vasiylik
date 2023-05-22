import ApiService from '../api.service'

const HROrgStructureService = {
    GetAll(DepartmentID,OneDate){       
        return ApiService.get(`/hrm/HrOrgStructure/GetAll?DepartmentID=${DepartmentID}&OneDate=${OneDate}`)
    },
    GetList(Search,SortColumn,OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/HrOrgStructure/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/hrm/HrOrgStructure/Get?id=${id}`)
    },
    GetDetail(id){       
        return ApiService.get(`/hrm/HrOrgStructure/GetDetail?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/HrOrgStructure/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/HrOrgStructure/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/hrm/HrOrgStructure/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/hrm/HrOrgStructure/CancelApproval?id=${id}`)
    },
}
export default HROrgStructureService