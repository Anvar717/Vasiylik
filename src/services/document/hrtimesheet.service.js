import ApiService from '../api.service'

const HRTimeSheetService = {
    GetList(StartDate,EndDate,Search,SortColumn,OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/HRTimeSheet/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetSentList(StartDate,EndDate,Search,SortColumn,OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/HRTimeSheet/GetSentList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/hrm/HRTimeSheet/Get?id=${id}`)
    },
    HrTimeSheetFill(data){
        return ApiService.post('/hrm/HRTimeSheet/HrTimeSheetFill',data)
    },
    FillHRTimeSheetDay(data){
        return ApiService.post('/hrm/HRTimeSheet/FillHRTimeSheetDay',data)
    },
    ClearHrTimeSheet(data){
        return ApiService.post('/hrm/HRTimeSheet/ClearHrTimeSheet',data)
    },
    GetDetail(id){       
        return ApiService.get(`/hrm/HRTimeSheet/GetDetail?id=${id}`)
    },
    GetHRTimeSheetTables(DocumentId,Search,SortColumn,OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/HRTimeSheet/GetHRTimeSheetTables?DocumentId=${DocumentId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetHRTimeSheetTable(id){       
        return ApiService.get(`/hrm/HRTimeSheet/GetHRTimeSheetTable?id=${id}`)
    },
    UpdateHRTimeSheetTable(data){
        return ApiService.post('/hrm/HRTimeSheet/UpdateHRTimeSheetTable',data)
    },
    DeleteHRTimeSheetTable(id){
        return ApiService.delete(`/hrm/HRTimeSheet/DeleteHRTimeSheetTable?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/HRTimeSheet/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/HRTimeSheet/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/hrm/HRTimeSheet/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/hrm/HRTimeSheet/CancelApproval?id=${id}`)
    },
    Send(id){
        return ApiService.post(`/hrm/HRTimeSheet/Send?id=${id}`)
    },
    Accept(id){
        return ApiService.post(`/hrm/HRTimeSheet/Accept?id=${id}`)
    },
    Reject(id,reason){
        return ApiService.post(`/hrm/HRTimeSheet/Reject?id=${id}&reason=${reason}`)
    },
    Cancel(id){
        return ApiService.post(`/hrm/HRTimeSheet/Cancel?id=${id}`)
    },
}
export default HRTimeSheetService