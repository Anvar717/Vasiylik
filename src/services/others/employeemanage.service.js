import ApiService from '../api.service'

const EmployeeManageService = {
    GetAllFree(FullName,DateOfBirth,inn,PersonID){
        return ApiService.get(`/hrm/EmployeeManage/GetAllFree?FullName=${FullName}&DateOfBirth=${DateOfBirth}&inn=${inn}&PersonID=${PersonID}`)
    },
    GetAllInHRAcceptanceWork(FullName,DateOfBirth,OnDate,DepartmentID,hrempappointordertypeid){
        return ApiService.get(`/hrm/EmployeeManage/GetAllInHRAcceptanceWork?FullName=${FullName}&DateOfBirth=${DateOfBirth}&OnDate=${OnDate}&DepartmentID=${DepartmentID}&hrempappointordertypeid=${hrempappointordertypeid}`)
    },
   GetEmployeeListForComponent(OnDate,DepartmentID,HREmpAppointOrderTypeID,Search,SortColumn,OrderType,PageNumber,PageLimit,organizationid,isTeacher){
        return ApiService.get(`/hrm/EmployeeManage/GetEmployeeListForComponent?OnDate=${OnDate}&DepartmentID=${DepartmentID}&HREmpAppointOrderTypeID=${HREmpAppointOrderTypeID}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&organizationid=${organizationid}&isTeacher=${isTeacher}`)
    },
    GetHRAcceptedRateCount(OnDate,DepartmentID,PositionID){
        return ApiService.get(`/hrm/EmployeeManage/GetHRAcceptedRateCount?OnDate=${OnDate}&DepartmentID=${DepartmentID}&PositionID=${PositionID}`)
    },
};
export default EmployeeManageService;