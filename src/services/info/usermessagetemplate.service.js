import ApiService from '../api.service'

const UserMessageTemplateService = {
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/UserMessageTemplate/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/UserMessageTemplate/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/UserMessageTemplate/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/UserMessageTemplate/Delete?id=${id}`)
    }
}
export default UserMessageTemplateService