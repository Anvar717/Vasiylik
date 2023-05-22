import ApiService from "./api.service";
const ReportService = {
  GetDocumentsMonitoring(schoolyearid, oblastid, regionid) {
    return ApiService.get(
      `/Report/GetDocumentsMonitoring?schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}`
    );
  },
  PrintQuotaAdmApplication(
    lang,
    admissionTypeId,
    educationLanguageId,
    educationDirectionId,
    schoolSubjectId
  ) {
    return ApiService.print(
      `/Report/PrintQuotaAdmApplication?lang=${lang}&admissionTypeId=${admissionTypeId}&educationLanguageId=${educationLanguageId}&educationDirectionId=${educationDirectionId}&schoolSubjectId=${schoolSubjectId}`
    );
  },
  GetApplicantCountByStatus(
    quotatypeid,
    educationlanguageid,
    oblastid,
    regionid,
    duplicateadressmvd,
    duplicateadressuser
  ) {
    return ApiService.get(
      `/Report/GetApplicantCountByStatus?quotatypeid=${quotatypeid}&educationlanguageid=${educationlanguageid}&oblastid=${oblastid}&regionid=${regionid}&duplicateadressmvd=${duplicateadressmvd}&duplicateadressuser=${duplicateadressuser}`
    );
  },
  ChildRegistrationActReport(data) {
    return ApiService.post('/Report/ChildRegistrationActReport', data);
  },
  ChildUnderGuardianshipReport(data) {
    return ApiService.post(
      '/Report/ChildUnderGuardianshipReport', data
    );
  },
  ChildRegistrationActList(data) {
    return ApiService.post('/Report/ChildRegistrationActList', data);
  },
  ChildUnderGuardianshipList(data) {
    return ApiService.post('/Report/ChildUnderGuardianshipList', data);
  },
  ChildUnderGuardianshipPrint(data) {
    return ApiService.printtemp(
      '/Report/ChildUnderGuardianshipPrint', data
    );
  },
  ChildRegistrationActPrint(data) {
    return ApiService.printtemp(
      '/Report/ChildRegistrationActPrint', data
    );
  },
  CreatedCountChildRegistrationActByDatePrint(startDate, endDate) {
    return ApiService.printtemp(
      `/Report/CreatedCountChildRegistrationActByDatePrint?startDate=${startDate}&endDate=${endDate}`
    );
  },
  CreatedCountChildUnderGuardianshipByDatePrint(startDate, endDate) {
    return ApiService.printtemp(
      `/Report/CreatedCountChildUnderGuardianshipByDatePrint?startDate=${startDate}&endDate=${endDate}`
    );
  },
  ChildRegistrationActListPrint(data) {
    return ApiService.printtemp(
      '/Report/ChildRegistrationActListPrint', data
    );
  },
  ChildUnderGuardianshipListPrint(data) {
    return ApiService.printtemp(
      '/Report/ChildUnderGuardianshipListPrint', data
    );
  },
  CreatedCountChildRegistrationActByDate(startDate, endDate) {
    return ApiService.get(`/Report/CreatedCountChildRegistrationActByDate?startDate=${startDate}&endDate=${endDate}`);
  },
  CreatedCountChildUnderGuardianshipByDate(startDate, endDate) {
    return ApiService.get(`/Report/CreatedCountChildUnderGuardianshipByDate?startDate=${startDate}&endDate=${endDate}`);
  },
  ChildRegistrationActListForSelect(Search, SortColumn, OrderType, PageNumber, PageLimit, pinfl, identityDocumentId, documentSeries, documentNumber) {
    return ApiService.get(`/Report/ChildRegistrationActListForSelect?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&pinfl=${pinfl}&identityDocumentId=${identityDocumentId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}`)
  },
  ChildUnderGuardianshipListForSelect(Search, SortColumn, OrderType, PageNumber, PageLimit, pinfl, identityDocumentId, documentSeries, documentNumber) {
    return ApiService.get(`/Report/ChildUnderGuardianshipListForSelect?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&pinfl=${pinfl}&identityDocumentId=${identityDocumentId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}`)
  },
  HousingQueueReport(oblastId, regionId, isOrphan) {
    return ApiService.post(`/Report/HousingQueueReport?oblastId=${oblastId}&regionId=${regionId}&isOrphan=${isOrphan}`,);
  },
  HousingQueueReportPrint(oblastId, regionId, isOrphan) {
    return ApiService.printtemp(
      `/Report/HousingQueueReportPrint?oblastId=${oblastId}&regionId=${regionId}&isOrphan=${isOrphan}`
    );
  },
  HousingQueueReportByOrganization() {
    return ApiService.post(`/Report/HousingQueueReportByOrganization`);
  },
  HousingQueueReportByRegion(isOrphan) {
    return ApiService.post(`/Report/HousingQueueReportByRegion?isOrphan=${isOrphan}`);
  },
  GetChildMonitoringReport(data) {
    return ApiService.post('/Report/GetChildMonitoringReport', data);
  },
  GetChildMonitoringListReport(data) {
    return ApiService.post('/Report/GetChildMonitoringListReport', data);
  },
};
export default ReportService;