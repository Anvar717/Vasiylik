import { onUpdated } from '@vue/composition-api'
import ApiService from '../api.service'

const EducationDirectionService = {
    GetAllEducationDirection(lang){
        return ApiService.get(`/EducationDirection/GetAllEducationDirection?lang=${lang}`)
    }, 
    GetAllEducationDirectionSubject(lang, educationdirectionid){
      return ApiService.get(`/EducationDirection/GetAllEducationDirectionSubject?lang=${lang}&educationdirectionid=${educationdirectionid}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/EducationDirection/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/EducationDirection/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post(`/EducationDirection/Update`, data)
    },
    Delete(id){
        return ApiService.delete(`/EducationDirection/Delete?id=${id}`)
    }
}
export default EducationDirectionService