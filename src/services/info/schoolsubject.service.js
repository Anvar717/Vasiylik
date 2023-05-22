import ApiService from '../api.service'

const SchoolSubjectService = {
    GetAll(lang, forCurriculum){
        return ApiService.get(`/SchoolSubject/GetAll?lang=${lang}&forCurriculum=${forCurriculum}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolSubject/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){       
        return ApiService.get(`/SchoolSubject/Get?id=${id}`)
    },
      Update(data){
        return ApiService.post('/SchoolSubject/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SchoolSubject/Delete?id=${id}`)
    }
}
export default SchoolSubjectService