export default [
  {
    path: "/document/childregistrationact",
    name: "childregistrationact",
    component: () => import("@/views/document/childregistrationact/index.vue"),
    meta: {
      pageTitle: "ChildRegistrationAct",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildRegistrationAct",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childregistrationact/edit/id=:id",
    name: "EditChildRegistrationAct",
    component: () => import("@/views/document/childregistrationact/edit.vue"),
    meta: {
      pageTitle: "ChildRegistrationAct",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildRegistrationAct",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childregistrationact/create/id=0",
    name: "CreateChildRegistrationAct",
    component: () => import("@/views/document/childregistrationact/create.vue"),
    meta: {
      pageTitle: "ChildRegistrationAct",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildRegistrationAct",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childregistrationact/view/id=:id",
    name: "ChildRegistrationActView",
    component: () => import("@/views/document/childregistrationact/view.vue"),
    meta: {
      pageTitle: "ChildRegistrationActView",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildRegistrationActView",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childunderguardianship",
    name: "childunderguardianship",
    component: () => import("@/views/document/childunderguardianship/index.vue"),
    meta: {
      pageTitle: "ChildUnderGuardianship",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildUnderGuardianship",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childunderguardianship/edit/id=:id",
    name: "EditChildUnderGuardianship",
    component: () => import("@/views/document/childunderguardianship/edit.vue"),
    meta: {
      pageTitle: "ChildUnderGuardianship",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildUnderGuardianship",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childunderguardianship/create/id=0",
    name: "CreateChildUnderGuardianship",
    component: () => import("@/views/document/childunderguardianship/create.vue"),
    meta: {
      pageTitle: "ChildUnderGuardianship",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildUnderGuardianship",
          active: true,
        },
      ],
    },
  },
   {
    path: "/document/childunderguardianship/view/id=:id",
    name: "ChildUnderGuardianshipView",
    component: () => import("@/views/document/childunderguardianship/view.vue"),
    meta: {
      pageTitle: "ChildUnderGuardianshipView",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildUnderGuardianshipView",
          active: true,
        },
      ],
    },
  },
  // {
  //   path: "/document/waitinglistproperty",
  //   name: "waitinglistproperty",
  //   component: () => import("@/views/document/waitinglistproperty/index.vue"),
  //   meta: {
  //     pageTitle: "WaitingListProperty",
  //     breadcrumb: [
  //       {
  //         text: "Document",
  //       },
  //       {
  //         text: "WaitingListProperty",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: "/document/waitinglistproperty/edit/id=:id",
  //   name: "EditWaitingListProperty",
  //   component: () => import("@/views/document/waitinglistproperty/edit.vue"),
  //   meta: {
  //     pageTitle: "WaitingListProperty",
  //     breadcrumb: [
  //       {
  //         text: "Document",
  //       },
  //       {
  //         text: "WaitingListProperty",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: "/document/waitinglistproperty/view/id=:id",
  //   name: "WaitingListPropertyView",
  //   component: () => import("@/views/document/waitinglistproperty/view.vue"),
  //   meta: {
  //     pageTitle: "WaitingListPropertyView",
  //     breadcrumb: [
  //       {
  //         text: "Document",
  //       },
  //       {
  //         text: "WaitingListPropertyView",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  {
    path: "/document/adoptionpermission",
    name: "adoptionpermission",
    component: () => import("@/views/document/adoptionpermission/index.vue"),
    meta: {
      pageTitle: "AdoptionPermission",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "AdoptionPermission",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/adoptionpermission/edit/id=:id",
    name: "EditAdoptionPermission",
    component: () => import("@/views/document/adoptionpermission/view.vue"),
    meta: {
      pageTitle: "AdoptionPermission",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "AdoptionPermission",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/adoptionpermission/view/id=:id",
    name: "AdoptionPermissionView",
    component: () => import("@/views/document/adoptionpermission/view.vue"),
    meta: {
      pageTitle: "AdoptionPermissionView",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "AdoptionPermissionView",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childlisttofamily",
    name: "childlisttofamily",
    component: () => import("@/views/document/childlisttofamily/index.vue"),
    meta: {
      pageTitle: "ChildListToFamily",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildListToFamily",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childlisttofamily/edit/id=:id",
    name: "EditChildListToFamily",
    component: () => import("@/views/document/childlisttofamily/edit.vue"),
    meta: {
      pageTitle: "ChildListToFamily",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildListToFamily",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childlisttofamily/view/id=:id",
    name: "ChildListToFamilyView",
    component: () => import("@/views/document/childlisttofamily/view.vue"),
    meta: {
      pageTitle: "ChildListToFamilyView",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildListToFamilyView",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childapplication",
    name: "childapplication",
    component: () => import("@/views/document/childapplication/index.vue"),
    meta: {
      pageTitle: "ChildApplication",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildApplication",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childapplication/view/id=:id",
    name: "ChildApplicationView",
    component: () => import("@/views/document/childapplication/view.vue"),
    meta: {
      pageTitle: "ChildApplicationView",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildApplicationView",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childorphanagemovement",
    name: "childorphanagemovement",
    component: () => import("@/views/document/childorphanagemovement/index.vue"),
    meta: {
      pageTitle: "ChildOrphanageMovement",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildOrphanageMovement",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childorphanagemovement/edit/id=:id",
    name: "EditChildOrphanageMovement",
    component: () => import("@/views/document/childorphanagemovement/edit.vue"),
    meta: {
      pageTitle: "ChildOrphanageMovement",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildOrphanageMovement",
          active: true,
        },
      ],
    }
  },
  {
    path: "/document/childorphanagemovement/view/id=:id",
    name: "ViewChildOrphanageMovement",
    component: () => import("@/views/document/childorphanagemovement/view.vue"),
    meta: {
      pageTitle: "ChildOrphanageMovement",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildOrphanageMovement",
          active: true,
        },
      ],
    }
  },
  {
    path: "/document/childregexpulsion",
    name: "childregexpulsion",
    component: () => import("@/views/document/childregexpulsion/index.vue"),
    meta: {
      pageTitle: "ChildRegExpulsion",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildRegExpulsion",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childregexpulsion/edit/id=:id",
    name: "EditChildRegExpulsion",
    component: () => import("@/views/document/childregexpulsion/edit.vue"),
    meta: {
      pageTitle: "ChildRegExpulsion",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildRegExpulsion",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childregexpulsion/view/id=:id",
    name: "ViewChildRegExpulsion",
    component: () => import("@/views/document/childregexpulsion/view.vue"),
    meta: {
      pageTitle: "ChildRegExpulsion",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildRegExpulsion",
          active: true,
        },
      ],
    }
  },
  {
    path: "/document/childorphanagemovementSPON",
    name: "childorphanagemovementSPON",
    component: () => import("@/views/document/childorphanagemovement/indexheader.vue"),
    meta: {
      pageTitle: "ChildOrphanageMovementSPON",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildOrphanageMovementSPON",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childorphanagemovementSPON/view/id=:id",
    name: "ViewChildOrphanageMovementSPON",
    component: () => import("@/views/document/childorphanagemovement/view.vue"),
    meta: {
      pageTitle: "ChildOrphanageMovementSPON",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildOrphanageMovementSPON",
          active: true,
        },
      ],
    }
  },
  // {
  //   path: "/document/parentapplication",
  //   name: "parentapplication",
  //   component: () => import("@/views/document/parentapplication/index.vue"),
  //   meta: {
  //     pageTitle: "ParentApplication",
  //     breadcrumb: [
  //       {
  //         text: "Document",
  //       },
  //       {
  //         text: "ParentApplication",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: "/document/parentapplication/view/id=:id",
  //   name: "ParentApplicationView",
  //   component: () => import("@/views/document/parentapplication/view.vue"),
  //   meta: {
  //     pageTitle: "ParentApplicationView",
  //     breadcrumb: [
  //       {
  //         text: "Document",
  //       },
  //       {
  //         text: "ParentApplicationView",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  {
    path: "/document/housingqueue",
    name: "housingqueue",
    component: () => import("@/views/document/housingqueue/index.vue"),
    meta: {
      pageTitle: "HousingQueue",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HousingQueue",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/housingqueue/edit/id=:id",
    name: "EditHousingQueue",
    component: () => import("@/views/document/housingqueue/edit.vue"),
    meta: {
      pageTitle: "HousingQueue",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HousingQueue",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/housingqueue/view/id=:id",
    name: "ViewHousingQueue",
    component: () => import("@/views/document/housingqueue/view.vue"),
    meta: {
      pageTitle: "HousingQueue",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HousingQueue",
          active: true,
        },
      ],
    }
  },
  {
    path: "/document/housingqueueSPON",
    name: "housingqueueSPON",
    component: () => import("@/views/document/housingqueue/indexheader.vue"),
    meta: {
      pageTitle: "HousingQueueSPON",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HousingQueueSPON",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childmonitoring",
    name: "childmonitoring",
    component: () => import("@/views/document/childmonitoring/index.vue"),
    meta: {
      pageTitle: "ChildMonitoring",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildMonitoring",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childmonitoring/edit/id=:id",
    name: "EditChildMonitoring",
    component: () => import("@/views/document/childmonitoring/edit.vue"),
    meta: {
      pageTitle: "ChildMonitoring",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildMonitoring",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childmonitoring/view/id=:id",
    name: "ViewChildMonitoring",
    component: () => import("@/views/document/childmonitoring/view.vue"),
    meta: {
      pageTitle: "ChildMonitoring",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildMonitoring",
          active: true,
        },
      ],
    }
  },
  {
    path: "/document/courtapplication",
    name: "courtapplication",
    component: () => import("@/views/document/courtapplication/index.vue"),
    meta: {
      pageTitle: "CourtApplication",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "CourtApplication",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/courtapplication/view/id=:id",
    name: "ViewCourtApplication",
    component: () => import("@/views/document/courtapplication/view.vue"),
    meta: {
      pageTitle: "CourtApplication",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "CourtApplication",
          active: true,
        },
      ],
    }
  },
  // {
  //   path: "/document/courtapplication/edit/id=:id",
  //   name: "EditCourtApplication",
  //   component: () => import("@/views/document/courtapplication/edit.vue"),
  //   meta: {
  //     pageTitle: "CourtApplication",
  //     breadcrumb: [
  //       {
  //         text: "Document",
  //       },
  //       {
  //         text: "CourtApplication",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  {
    path: "/document/hracceptancework",
    name: "hracceptancework",
    component: () => import("@/views/document/hracceptancework/index.vue"),
    meta: {
      pageTitle: "HrAcceptanceWork",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HrAcceptanceWork",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hracceptancework/edit/id=:id",
    name: "EditHrAcceptanceWork",
    component: () => import("@/views/document/hracceptancework/edit.vue"),
    meta: {
      pageTitle: "HrAcceptanceWork",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HrAcceptanceWork",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hracceptancework/view/id=:id",
    name: "ViewHrAcceptanceWork",
    component: () => import("@/views/document/hracceptancework/view.vue"),
    meta: {
      pageTitle: "HrAcceptanceWork",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HrAcceptanceWork",
          active: true,
        },
      ],
    }
  },
  {
    path: "/document/hrempleaveorder",
    name: "hrempleaveorder",
    component: () => import("@/views/document/hrempleaveorder/index.vue"),
    meta: {
      pageTitle: "HREmpLeaveOrder",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HREmpLeaveOrder",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hrempleaveorder/edit/id=:id",
    name: "EditHREmpLeaveOrder",
    component: () => import("@/views/document/hrempleaveorder/edit.vue"),
    meta: {
      pageTitle: "HREmpLeaveOrder",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HREmpLeaveOrder",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hrempleaveorder/view/id=:id",
    name: "ViewHREmpLeaveOrder",
    component: () => import("@/views/document/hrempleaveorder/view.vue"),
    meta: {
      pageTitle: "HREmpLeaveOrder",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HREmpLeaveOrder",
          active: true,
        },
      ],
    }
  },
  {
    path: "/document/hrempsendtrain",
    name: "hrempsendtrain",
    component: () => import("@/views/document/hrempsendtrain/index.vue"),
    meta: {
      pageTitle: "HrEmpSendTrain",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HrEmpSendTrain",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hrempsendtrain/edit/id=:id",
    name: "EditHrEmpSendTrain",
    component: () => import("@/views/document/hrempsendtrain/edit.vue"),
    meta: {
      pageTitle: "HrEmpSendTrain",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HrEmpSendTrain",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hrempsendtrain/view/id=:id",
    name: "ViewHrEmpSendTrain",
    component: () => import("@/views/document/hrempsendtrain/view.vue"),
    meta: {
      pageTitle: "HrEmpSendTrain",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HrEmpSendTrain",
          active: true,
        },
      ],
    }
  },
  {
    path: "/document/hrempsickleave",
    name: "hrempsickleave",
    component: () => import("@/views/document/hrempsickleave/index.vue"),
    meta: {
      pageTitle: "HREmpSickLeave",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HREmpSickLeave",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hrempsickleave/edit/id=:id",
    name: "EditHREmpSickLeave",
    component: () => import("@/views/document/hrempsickleave/edit.vue"),
    meta: {
      pageTitle: "HREmpSickLeave",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HREmpSickLeave",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hrempsickleave/view/id=:id",
    name: "ViewHREmpSickLeave",
    component: () => import("@/views/document/hrempsickleave/view.vue"),
    meta: {
      pageTitle: "HREmpSickLeave",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HREmpSickLeave",
          active: true,
        },
      ],
    }
  },
  {
    path: "/document/hrworkdayoff",
    name: "hrworkdayoff",
    component: () => import("@/views/document/hrworkdayoff/index.vue"),
    meta: {
      pageTitle: "HrWorkDayOff",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HrWorkDayOff",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hrworkdayoff/edit/id=:id",
    name: "EditHrWorkDayOff",
    component: () => import("@/views/document/hrworkdayoff/edit.vue"),
    meta: {
      pageTitle: "HrWorkDayOff",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HrWorkDayOff",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hrworkdayoff/view/id=:id",
    name: "ViewHrWorkDayOff",
    component: () => import("@/views/document/hrworkdayoff/view.vue"),
    meta: {
      pageTitle: "HrWorkDayOff",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HrWorkDayOff",
          active: true,
        },
      ],
    }
  },
  {
    path: "/document/hrtimesheet",
    name: "hrtimesheet",
    component: () => import("@/views/document/hrtimesheet/index.vue"),
    meta: {
      pageTitle: "HRTimeSheet",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HRTimeSheet",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hrtimesheet/edit/id=:id",
    name: "EditHRTimeSheet",
    component: () => import("@/views/document/hrtimesheet/edit.vue"),
    meta: {
      pageTitle: "HRTimeSheet",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HRTimeSheet",
          active: true,
        },
      ],
    },
  },
   {
    path: "/document/hrtimesheet/tabrow/id=:id",
    name: "EditTabRowHRTimeSheet",
    component: () => import("@/views/document/hrtimesheet/tabrow.vue"),
    meta: {
      pageTitle: "HRTimeSheet",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HRTimeSheet",
          active: true,
        },
      ],
    }
  },
  {
    path: "/document/hrtimesheet/view/id=:id",
    name: "ViewHRTimeSheet",
    component: () => import("@/views/document/hrtimesheet/view.vue"),
    meta: {
      pageTitle: "HRTimeSheet",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HRTimeSheet",
          active: true,
        },
      ],
    }
  },
  {
    path: "/document/hrorgstructure",
    name: "hrorgstructure",
    component: () => import("@/views/document/hrorgstructure/index.vue"),
    meta: {
      pageTitle: "HROrgStructure",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HROrgStructure",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hrorgstructure/edit/id=:id",
    name: "EditHROrgStructure",
    component: () => import("@/views/document/hrorgstructure/edit.vue"),
    meta: {
      pageTitle: "HROrgStructure",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HROrgStructure",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hrorgstructure/view/id=:id",
    name: "ViewHROrgStructure",
    component: () => import("@/views/document/hrorgstructure/view.vue"),
    meta: {
      pageTitle: "HROrgStructure",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HROrgStructure",
          active: true,
        },
      ],
    }
  },
  {
    path: "/document/hrrecallleave",
    name: "hrrecallleave",
    component: () => import("@/views/document/hrrecallleave/index.vue"),
    meta: {
      pageTitle: "HrRecallLeave",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HrRecallLeave",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hrrecallleave/edit/id=:id",
    name: "EditHrRecallLeave",
    component: () => import("@/views/document/hrrecallleave/edit.vue"),
    meta: {
      pageTitle: "HrRecallLeave",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HrRecallLeave",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/hrrecallleave/view/id=:id",
    name: "ViewHrRecallLeave",
    component: () => import("@/views/document/hrrecallleave/view.vue"),
    meta: {
      pageTitle: "HrRecallLeave",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "HrRecallLeave",
          active: true,
        },
      ],
    }
  },
  {
    path: "/document/childunderguardexpulsion",
    name: "childunderguardexpulsion",
    component: () => import("@/views/document/childunderguardexpulsion/index.vue"),
    meta: {
      pageTitle: "ChildUnderGuardExpulsion",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildUnderGuardExpulsion",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childunderguardexpulsion/edit/id=:id",
    name: "EditChildUnderGuardExpulsion",
    component: () => import("@/views/document/childunderguardexpulsion/edit.vue"),
    meta: {
      pageTitle: "ChildUnderGuardExpulsion",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildUnderGuardExpulsion",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/childunderguardexpulsion/view/id=:id",
    name: "ViewChildUnderGuardExpulsion",
    component: () => import("@/views/document/childunderguardexpulsion/view.vue"),
    meta: {
      pageTitle: "ChildUnderGuardExpulsion",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ChildUnderGuardExpulsion",
          active: true,
        },
      ],
    }
  },
];
