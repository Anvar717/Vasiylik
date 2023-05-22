import ApiService from '../api.service'

const AdmImageService = {
    Get(id){
        return ApiService.print(`/AdmImage/Get?id=${id}`)
    },
	AttachImage(data){
        return ApiService.post('/AdmImage/AttachProjectFile',data)
    },
    Delete(id){
        return ApiService.delete(`/AdmImage/Delete?id=${id}`)
    },
};
export default AdmImageService;
    