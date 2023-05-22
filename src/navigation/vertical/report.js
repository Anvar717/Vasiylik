export default [
  {
    header: "Reports",
  },
  {
    title: "Reports",
    icon: "ClipboardIcon",
    visible: [
      "ChildUnderGuardianshipReportView",
      "HousingQueueReportXTVView",
      "HousingQueueReportRegionView",
      "HousingQueueReportOrphanView",
      "ChildMonitoringReportView",
      "ChildMonitoringListReportView"
    ],
    children: [
      {
        title: "GetChildUnderGuardianshipReport",
        route: "GetChildUnderGuardianshipReport",
        visible: "ChildUnderGuardianshipReportView",
      },
      {
        title: "ChildUnderGuardianshipList",
        route: "ChildUnderGuardianshipList",
        visible: "ChildRegistrationActListView",
      },
      {
        title: "HousingQueueReport",
        route: "HousingQueueReport",
        visible: "HousingQueueReportXTVView",
      },
      {
        title: "HousingQueueReportByRegion",
        route: "HousingQueueReportByRegion",
        visible: "HousingQueueReportRegionView",
      },
      {
        title: "HousingQueueReportByOrganization",
        route: "HousingQueueReportByOrganization",
        visible: "HousingQueueReportOrphanView",
      },
      {
        title: "GetChildMonitoringReport",
        route: "GetChildMonitoringReport",
        visible: "ChildMonitoringReportView",
      },
      {
        title: "GetChildMonitoringListReport",
        route: "GetChildMonitoringListReport",
        visible: "ChildMonitoringListReportView",
      },
    ],
  },
  {
    title: "MercyHouseReport",
    icon: "ClipboardIcon",
    visible: ["ChildRegistrationActReportView", "CreatedChildCountByDateView", "ChildRegistrationActListView"],
    children: [
      {
        title: "GetChildRegistrationActReport",
        route: "GetChildRegistrationActReport",
        visible: "ChildRegistrationActReportView",
      },
      {
        title: "CreatedCountChildRegistrationAct",
        route: "CreatedCountChildRegistrationAct",
        visible: "CreatedChildCountByDateView",
      },
      {
        title: "ChildRegistrationActList",
        route: "ChildRegistrationActList",
        visible: "ChildRegistrationActListView",
      },
    ],
  },
];
