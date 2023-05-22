import ApiService from '../api.service'

const HelperService = {
    GetStateList() {
        return ApiService.get('/Helper/GetStateList')
    },
    GetStatusList() {
        return ApiService.get('/Helper/GetStatusList')
    },
    GetModuleList(lang) {
        return ApiService.get(`/Helper/GetModuleList?lang=${lang}`)
    },
    GetRoleList() {
        return ApiService.get(`/Helper/GetRoleList`)
    },
    GetAllTeachersInSchool(organizationid) {
        if (organizationid === null || organizationid === undefined) {
            organizationid = 0
        }
        return ApiService.get(`/Helper/GetAllTeachersInSchool?organizationid=${organizationid}`)
    },
    GetPersonCountInSchool(organizationid) {
        return ApiService.get(`/Helper/GetPersonCountInSchool?organizationid=${organizationid}`)
    },
    GetAllAdmissionType() {
        return ApiService.get(`/Helper/GetAllAdmissionType`)
    },
    GetAllQuoteType() {
        return ApiService.get(`/Helper/GetAllQuoteType`)
    },
    DeleteParentUserData(mobilenumber, documentseriesnumber) {
        return ApiService.get(`/Helper/DeleteParentUserData?mobilenumber=${mobilenumber}&documentseriesnumber=${documentseriesnumber}`)
    },
    SyncErpTables() {
        return ApiService.get(`/Helper/SyncErpTables`)
    },
    UpdateParentUserMobileNumber(oldmobilenumber, newmobilenumber, documentseriesnumber) {
        return ApiService.get(`/Helper/UpdateParentUserMobileNumber?oldmobilenumber=${oldmobilenumber}&newmobilenumber=${newmobilenumber}&documentseriesnumber=${documentseriesnumber}`)
    },
    GetAllIdentityDocSeries(IdentityDocumentId) {
        return ApiService.get(`/Helper/GetAllIdentityDocSeries?IdentityDocumentId=${IdentityDocumentId}`)
    },
    GetAllKinshipDegree() {
        return ApiService.get(`/Helper/GetAllKinshipDegree`)
    },
    GetGenderList() {
        return ApiService.get(`/Helper/GetGenderList`)
    },
    GetGuardianshipTypeList() {
        return ApiService.get(`/Helper/GetGuardianshipTypeList`)
    },
    GetInvalidTypeList() {
        return ApiService.get(`/Helper/GetInvalidTypeList`)
    },
    GetEducationPlaceTypeList() {
        return ApiService.get(`/Helper/GetEducationPlaceTypeList`)
    },
    GetHealthTypeList() {
        return ApiService.get(`/Helper/GetHealthTypeList`)
    },
    GetAllLanguage() {
        return ApiService.get("/Helper/GetAllLanguage")
    },
    GetPersonEducationPlace(documentSeries, documentNumber) {
        return ApiService.get(`/Helper/GetPersonEducationPlace?documentSeries=${documentSeries}&documentNumber=${documentNumber}`)
    },
    GetAllocationTypeList(lang) {
        return ApiService.get(`/Helper/GetAllocationTypeList?lang=${lang}`)
    },
    GetChildStudyTypeList() {
        return ApiService.get("/Helper/GetChildStudyTypeList")
    },
    GetLivingConditionList() {
        return ApiService.get("/Helper/GetLivingConditionList")
    },
    GetTariffScaleTypeList(lang){
        return ApiService.get(`/hrm/HelperHrm/GetTariffScaleTypeList?lang=${lang}`)
    },
    GetEmploymentType(lang){
        return ApiService.get(`/hrm/HelperHrm/GetEmploymentType?lang=${lang}`)
    },
    HrEmpAppointOrderType(lang){
        return ApiService.get(`/hrm/HelperHrm/HrEmpAppointOrderType?lang=${lang}`)
    },
    GetOrganizationAccountList(){
        return ApiService.get("/hrm/HelperHrm/GetOrganizationAccountList")
    },
    GetAll(oblastid,regionid,isfarmfy){
        return ApiService.get(`/hrm/HelperHrm/GetAll?oblastid=${oblastid}&regionid=${regionid}&isfarmfy=${isfarmfy}`)
    },
    GetTimeSheetIndicator(lang){
        return ApiService.get(`/hrm/HelperHrm/GetTimeSheetIndicator?lang=${lang}`)
    },
    
};
export default HelperService;
