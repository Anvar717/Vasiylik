import ApiService from "../api.service";

const PersonService = {
  GetAll() {
    return ApiService.get(`/Person/GetAll`);
  },
  GetList(
    ID,
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
    documentseries,
    documentnumber,
    isstudent,
    identitydocumentid,
    organizationid,
    oblastid,
    regionid,
    inn,
    pinfl,
  ) {
    if (inn === null || inn === undefined) {
      inn = ''
    }
    if (pinfl === undefined || pinfl === null) {
      pinfl = ""
    }
    if (identitydocumentid === undefined || identitydocumentid === null) {
      identitydocumentid = 0
    } return ApiService.get(`/Person/GetList?ID=${ID}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&documentseries=${documentseries}&documentnumber=${documentnumber}&isstudent=${isstudent}&identitydocumentid=${identitydocumentid}&organizationid=${organizationid}&oblastid=${oblastid}&regionid=${regionid}&inn=${inn}&pinfl=${pinfl}`);
  },
  Get(
    id,
    identitydocumentid,
    docseries,
    docnumber,
    docdate,
    inn,
    pinfl,
    returndata,
    isStudent
  ) {
    return ApiService.get(
      `/Person/Get?id=${id}&identitydocumentid=${identitydocumentid}&docseries=${docseries}&docnumber=${docnumber}&docdate=${docdate}&inn=${inn}&pinfl=${pinfl}&returndata=${returndata}&isStudent=${isStudent}`
    );
  },
  GetFromGovData(documentSeries, documentNumber, pinfl, dateOfBirth, isStudent, INN, identityDocumentId) {
    return ApiService.get(`/Person/GetFromGovData?documentSeries=${documentSeries}&documentNumber=${documentNumber}&pinfl=${pinfl}&dateOfBirth=${dateOfBirth}&isStudent=${isStudent}&INN=${INN}&identityDocumentId=${identityDocumentId}`);
  },
  ChangeIdentityDocument(personId, identityDocumentId, documentSeries, documentNumber, dateOfBirth, pinfl) {
    return ApiService.get(`/Person/ChangeIdentityDocument?personId=${personId}&identityDocumentId=${identityDocumentId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&dateOfBirth=${dateOfBirth}&pinfl=${pinfl}`);
  },
  Update(data) {
    return ApiService.post(`/Person/Update`, data);
  },
  Delete(id) {
    return ApiService.delete(`/Person/Delete?id=${id}`);
  },
  GetChildrenList(DocumentSeries, DocumentNumber, Search, SortColumn, OrderType, PageNumber, PageLimit, isAllStudent) {
    return ApiService.get(`/Person/GetChildrenList?DocumentSeries=${DocumentSeries}&DocumentNumber=${DocumentNumber}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&isAllStudent=${isAllStudent}`)
  },
  GetGuardianshipList(inn, pinfl, Search, SortColumn, OrderType, PageNumber, PageLimit, IsAllGuardianship) {
    return ApiService.get(`/Person/GetGuardianshipList?DocumentSeries=${inn}&DocumentNumber=${pinfl}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&isAllStudent=${IsAllGuardianship}`)
  },
  GetEmployeeList(inn, pinfl, Search, SortColumn, OrderType, PageNumber, PageLimit, IsAllEmployee) {
    return ApiService.get(`/hrm/Person/GetEmployeeList?inn=${inn}&pinfl=${pinfl}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&IsAllEmployee=${IsAllEmployee}`)
  },
  UpdateDataFromEGov(id) {
    return ApiService.get(`/Person/UpdateDataFromEGov?id=${id}`);
  },
};
export default PersonService;
