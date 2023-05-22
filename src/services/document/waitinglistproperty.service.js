import ApiService from '../api.service'

const WaitingListPropertyService = {
    Get(id){       
        return ApiService.get(`/WaitingListProperty/Get?id=${id}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/WaitingListProperty/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/WaitingListProperty/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/WaitingListProperty/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/WaitingListProperty/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/WaitingListProperty/CancelApproval?id=${id}`)
    },
    Fill(data){
        return ApiService.post('/WaitingListProperty/Fill',data)
    },
}
export default WaitingListPropertyService