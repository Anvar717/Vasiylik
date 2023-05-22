export default [
  {
    path: "/report/GetChildRegistrationActReport",
    name: "GetChildRegistrationActReport",
    component: () =>
      import("@/views/reports/GetChildRegistrationActReport.vue"),
    meta: {
      pageTitle: "GetChildRegistrationActReport",
      breadcrumb: [
        {
          text: "Report",
        },
        {
          text: "GetChildRegistrationActReport",
          active: true,
        },
      ],
    },
  },
  {
    path: "/report/GetChildUnderGuardianshipReport",
    name: "GetChildUnderGuardianshipReport",
    component: () =>
      import("@/views/reports/GetChildUnderGuardianshipReport.vue"),
    meta: {
      pageTitle: "GetChildUnderGuardianshipReport",
      breadcrumb: [
        {
          text: "Report",
        },
        {
          text: "GetChildUnderGuardianshipReport",
          active: true,
        },
      ],
    },
  },
  {
    path: "/report/CreatedCountChildRegistrationAct",
    name: "CreatedCountChildRegistrationAct",
    component: () =>
      import("@/views/reports/CreatedCountChildRegistrationAct.vue"),
    meta: {
      pageTitle: "CreatedCountChildRegistrationAct",
      breadcrumb: [
        {
          text: "Report",
        },
        {
          text: "CreatedCountChildRegistrationAct",
          active: true,
        },
      ],
    },
  },
  {
    path: "/report/ChildRegistrationActList",
    name: "ChildRegistrationActList",
    component: () => import("@/views/reports/ChildRegistrationActList.vue"),
    meta: {
      pageTitle: "ChildRegistrationActList",
      breadcrumb: [
        {
          text: "Report",
        },
        {
          text: "ChildRegistrationActList",
          active: true,
        },
      ],
    },
  },
  {
    path: "/report/ChildUnderGuardianshipList",
    name: "ChildUnderGuardianshipList",
    component: () => import("@/views/reports/ChildUnderGuardianshipList.vue"),
    meta: {
      pageTitle: "ChildUnderGuardianshipList",
      breadcrumb: [
        {
          text: "Report",
        },
        {
          text: "ChildUnderGuardianshipList",
          active: true,
        },
      ],
    },
  },
  {
    path: "/report/HousingQueueReport",
    name: "HousingQueueReport",
    props : {
      changeid : 0
    },
    component: () =>
      import("@/views/reports/HousingQueueReport.vue"),
    meta: {
      pageTitle: "HousingQueueReport",
      breadcrumb: [
        {
          text: "Report",
        },
        {
          text: "HousingQueueReport",
          active: true,
        },
      ],
    },
  },
  {
    path: "/report/HousingQueueReportByRegion",
    name: "HousingQueueReportByRegion",
    props : {
      changeid : 1
    },
    component: () =>
      import("@/views/reports/HousingQueueReport.vue"),
    meta: {
      pageTitle: "HousingQueueReportByRegion",
      breadcrumb: [
        {
          text: "Report",
        },
        {
          text: "HousingQueueReportByRegion",
          active: true,
        },
      ],
    },
  },
  {
    path: "/report/HousingQueueReportByOrganization",
    name: "HousingQueueReportByOrganization",
    props : {
      changeid : 2
    },
    component: () =>
      import("@/views/reports/HousingQueueReport.vue"),
    meta: {
      pageTitle: "HousingQueueReportByOrganization",
      breadcrumb: [
        {
          text: "Report",
        },
        {
          text: "HousingQueueReportByOrganization",
          active: true,
        },
      ],
    },
  },
  {
    path: "/report/GetChildMonitoringReport",
    name: "GetChildMonitoringReport",
    props : {
      changeid : 0
    },
    component: () =>
      import("@/views/reports/GetChildMonitoringReport.vue"),
    meta: {
      pageTitle: "GetChildMonitoringReport",
      breadcrumb: [
        {
          text: "Report",
        },
        {
          text: "GetChildMonitoringReport",
          active: true,
        },
      ],
    },
  },
  {
    path: "/report/GetChildMonitoringListReport",
    name: "GetChildMonitoringListReport",
    props : {
      changeid : 0
    },
    component: () =>
      import("@/views/reports/GetChildMonitoringListReport.vue"),
    meta: {
      pageTitle: "GetChildMonitoringListReport",
      breadcrumb: [
        {
          text: "Report",
        },
        {
          text: "GetChildMonitoringListReport",
          active: true,
        },
      ],
    },
  },
];
