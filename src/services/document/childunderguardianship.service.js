import ApiService from '../api.service'

const ChildUnderGuardianshipService = {
    Get(id) {
        return ApiService.get(`/ChildUnderGuardianship/Get?id=${id}`)
    },
    GetList(statusId, childName, guardianName, search, sortColumn, orderType, pageNumber, pageLimit, inn, pinfl, identityDocumentId, documentSeries, documentNumber) {
        return ApiService.get(`/ChildUnderGuardianship/GetList?statusId=${statusId}&childName=${childName}&guardianName=${guardianName}&search=${search}&sortColumn=${sortColumn}&orderType=${orderType}&pageNumber=${pageNumber}&pageLimit=${pageLimit}&inn=${inn}&pinfl=${pinfl}&identityDocumentId=${identityDocumentId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}`)
    },
    Update(data) {
        return ApiService.post('/ChildUnderGuardianship/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/ChildUnderGuardianship/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/ChildUnderGuardianship/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/ChildUnderGuardianship/CancelApproval?id=${id}`)
    },
}
export default ChildUnderGuardianshipService