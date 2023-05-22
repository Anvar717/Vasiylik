import ApiService from '../api.service'

const CallCenterService = {
    GetParentListByPhoneNumber(phoneNumber){
        return ApiService.get(`/CallCenter/GetParentListByPhoneNumber?phoneNumber=${phoneNumber}`)
    },
    GetParentListByDocument(documentSeries , documentNumber , dateOfBirth){
        return ApiService.get(`/CallCenter/GetParentListByDocument?documentSeries=${documentSeries}&documentNumber=${documentNumber}&dateOfBirth=${dateOfBirth}`)
    },
    GetChildrenListByPhoneNumber(phoneNumber){
        return ApiService.get(`/CallCenter/GetChildrenListByPhoneNumber?phoneNumber=${phoneNumber}`)
    },
    GetChildrenListByDocument(documentSeries , documentNumber , dateOfBirth){
        return ApiService.get(`/CallCenter/GetChildrenListByDocument?documentSeries=${documentSeries}&documentNumber=${documentNumber}&dateOfBirth=${dateOfBirth}`)
    },
    GetAdmissionAppListByPhoneNumber(phoneNumber){
        return ApiService.get(`/CallCenter/GetAdmissionAppListByPhoneNumber?phoneNumber=${phoneNumber}`)
    },
    GetAdmissionAppListByRegNumber(regNumber){
        return ApiService.get(`/CallCenter/GetAdmissionAppListByRegNumber?regNumber=${regNumber}`)
    },
    GetAdmissionAppListByParentId(parentId){
        return ApiService.get(`/CallCenter/GetAdmissionAppListByParentId?parentId=${parentId}`)
    },
    GetAdmissionAppListByChildrenId(childrenId){
        return ApiService.get(`/CallCenter/GetAdmissionAppListByChildrenId?childrenId=${childrenId}`)
    },
};
export default CallCenterService;
    