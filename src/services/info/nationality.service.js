import ApiService from "../api.service";
const NationalityService = {
  GetAll(lang) {
    return ApiService.get(`/Nationality/GetAll?lang=${lang}`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/Nationality/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
};
export default NationalityService;
