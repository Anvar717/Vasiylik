import ApiService from "../api.service";

const OrganizationTypeService = {
  GetAll(lang) {
    return ApiService.get(`/OrganizationType/GetAll?lang=${lang}`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/OrganizationType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/OrganizationType/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post(`/OrganizationType/Update`, data);
  },
  Delete(id) {
    return ApiService.delete(`/OrganizationType/Delete?id=${id}`);
  },
};
export default OrganizationTypeService;
