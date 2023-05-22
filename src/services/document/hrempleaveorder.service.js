import ApiService from '../api.service'

const HREmpLeaveOrderService = {
    GetAll(personid){       
        return ApiService.get(`/hrm/HREmpLeaveOrder/GetAll?personid=${personid}`)
    },
    GetList(StartDate,EndDate,Search,SortColumn,OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/HREmpLeaveOrder/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetUnpaidHREmpleaveOrderList(StartDate,EndDate,Search,SortColumn,OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/HREmpLeaveOrder/GetUnpaidHREmpleaveOrderList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetCountWorkDays(StartData,EndData){
        return ApiService.get(`/hrm/HREmpLeaveOrder/GetCountWorkDays?StartData=${StartData}&EndData=${EndData}`)
    },
    Get(id){       
        return ApiService.get(`/hrm/HREmpLeaveOrder/Get?id=${id}`)
    },
    GetDetail(id){       
        return ApiService.get(`/hrm/HREmpLeaveOrder/GetDetail?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/HREmpLeaveOrder/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/HREmpLeaveOrder/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/hrm/HREmpLeaveOrder/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/hrm/HREmpLeaveOrder/CancelApproval?id=${id}`)
    },
}
export default HREmpLeaveOrderService