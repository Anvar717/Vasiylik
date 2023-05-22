import ApiService from '../api.service'

const PersonService = {
    GetEmployeeList(inn,pinfl,Search,SortColumn,OrderType,PageNumber,PageLimit,IsAllEmployee){
        return ApiService.get(`/hrm/Person/GetEmployeeList?inn=${inn}&pinfl=${pinfl}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&IsAllEmployee=${IsAllEmployee}`)
    },
    Update(data){
        return ApiService.post('/hrm/Person/Update',data)
    },
    Get(id,identitydocumentid,docseries,docnumber,docdate,inn,pinfl,returndata,isStudent){
        return ApiService.get(`/hrm/Person/Get?id=${id}&identitydocumentid=${identitydocumentid}&docseries=${docseries}&docnumber=${docnumber}&docdate=${docdate}&inn=${inn}&pinfl=${pinfl}&returndata=${returndata}&isStudent=${isStudent}`)
    },
};
export default PersonService;