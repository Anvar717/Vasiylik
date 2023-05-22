import ApiService from '../api.service'

const ChildCharacterService = {
    GetAll(lang){
        return ApiService.get(`/ChildCharacter/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/ChildCharacter/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/ChildCharacter/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/ChildCharacter/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/ChildCharacter/Delete?id=${id}`)
    }
}
export default ChildCharacterService