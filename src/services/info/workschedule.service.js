import ApiService from '../api.service'

const WorkScheduleService = {
    GetAll(lang){
        return ApiService.get(`/hrm/WorkSchedule/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/hrm/WorkSchedule/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/hrm/WorkSchedule/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/hrm/WorkSchedule/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/hrm/WorkSchedule/Delete?id=${id}`)
    }
}
export default WorkScheduleService