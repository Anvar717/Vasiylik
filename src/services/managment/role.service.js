import ApiService from '../api.service'

const RoleService = {
    GetAll(lang){
        return ApiService.get(`/Role/GetAll?lang=${lang}`)
    },
    GetList(Search,SortColumn,OrderType,PageNumber,PageLimit){
        return ApiService.get(`/Role/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/Role/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/Role/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Role/Delete?id=${id}`)
    }
};
export default RoleService;
    