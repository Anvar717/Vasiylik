import ApiService from '../api.service'

const IdentityDocumentService = {
    Get(id){       
        return ApiService.get(`/IdentityDocument/Get?id=${id}`)
    },
    GetAll(lang,ClearCache){
        return ApiService.get(`/IdentityDocument/GetAll?lang=${lang}&ClearCache=${ClearCache}`)
    }, 
    GetAllIdentityDocSeries(IdentityDocumentID,lang,ClearCache){
        return ApiService.get(`/IdentityDocument/GetAllIdentityDocSeries?lang=${lang}&ClearCache=${ClearCache}&IdentityDocumentID=${IdentityDocumentID}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/IdentityDocument/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/IdentityDocument/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/IdentityDocument/Delete?id=${id}`)
    }
}
export default IdentityDocumentService