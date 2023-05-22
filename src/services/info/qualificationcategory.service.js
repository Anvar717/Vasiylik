import ApiService from '../api.service'

const QualificationCategoryService = {
    GetAll(lang){
        return ApiService.get(`/hrm/QualificationCategory/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/QualificationCategory/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/hrm/QualificationCategory/Get?id=${id}`)
    },
    GetPersonQualificationCategory(personId,schoolSubjectId,schoolGradeId,onDate){
        return ApiService.get(`/hrm/QualificationCategory/GetPersonQualificationCategory?personId=${personId}&schoolSubjectId=${schoolSubjectId}&schoolGradeId=${schoolGradeId}&onDate=${onDate}`)
    },
    Update(data){
        return ApiService.post('/hrm/QualificationCategory/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/QualificationCategory/Delete?id=${id}`)
    }
}
export default QualificationCategoryService