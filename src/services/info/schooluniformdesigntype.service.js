import ApiService from '../api.service'

const SchoolUniformDesignTypeService = {
    Get(id){
     return ApiService.get(`/SchoolUniformDesignType/Get/${id}`)
    },
    GetAll(lang){
        return ApiService.get(`/SchoolUniformDesignType/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolUniformDesignType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/SchoolUniformDesignType/Update',data)
    },
    Delete(id){
        return ApiService.post(`/SchoolUniformDesignType/Delete/${id}`)
    }
}
export default SchoolUniformDesignTypeService