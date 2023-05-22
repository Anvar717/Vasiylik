export default [
  {
    header: "Document",
  },
  {
    title: "Document",
    icon: "BookIcon",
    visible: ['ChildUnderGuardianshipView', 'HousingQueueView', 'HousingQueueHeaderView', 'ChildMonitoringView', 'ChildUnderGuardExpulsionView'],
    children: [

      {
        title: "ChildUnderGuardianship",
        route: "childunderguardianship",
        visible: "ChildUnderGuardianshipView",
      },
      {
        title: "HousingQueue",
        route: "housingqueue",
        visible: "HousingQueueView",
      },
      {
        title: "HousingQueueSPON",
        route: "housingqueueSPON",
        visible: "HousingQueueHeaderView",
      },
      {
        title: "ChildMonitoring",
        route: "childmonitoring",
        visible: "ChildMonitoringView",
      },
      {
        title: "ChildUnderGuardExpulsion",
        route: "childunderguardexpulsion",
        visible: "ChildUnderGuardExpulsionView",
      },
    ],
  },
  {
    title: "HouseOfMercy",
    icon: "BookIcon",
    visible: ['ChildRegistrationActView', 'CourtApplicationView', 'ChildOrphanageMovementHeaderView', 'AdoptionPermissionView', 'ChildListToFamilyView', 'ChildApplicationView', 'ChildOrphanageMovementView', 'ChildRegExpulsionView'],
    children: [
      {
        title: "ChildRegistrationAct",
        route: "childregistrationact",
        visible: "ChildRegistrationActView",
      },
      {
        title: "CourtApplication",
        route: "courtapplication",
        visible: "CourtApplicationView",
      },
      {
        title: "ChildOrphanageMovementSPON",
        route: "childorphanagemovementSPON",
        visible: "ChildOrphanageMovementHeaderView",
      },
      {
        title: "AdoptionPermission",
        route: "adoptionpermission",
        visible: "AdoptionPermissionView",
      },
      {
        title: "ChildListToFamily",
        route: "childlisttofamily",
        visible: "ChildListToFamilyView",
      },
      {
        title: "ChildApplication",
        route: "childapplication",
        visible: "ChildApplicationView",
      },
      {
        title: "ChildOrphanageMovement",
        route: "childorphanagemovement",
        visible: "ChildOrphanageMovementView",
      },
      {
        title: "ChildRegExpulsion",
        route: "childregexpulsion",
        visible: "ChildRegExpulsionView",
      },
    ],
  },
  {
    title: "PersonnelDepartment",
    icon: "BookIcon",
    visible: ['HROrgStructureView', 'HrAcceptanceWorkView', 'HREmpLeaveOrderView', 'HrEmpSendTrainView', 'HREmpSickLeaveView', 'HrWorkDayOffView', 'HRTimesheetView', 'HrRecallLeaveView'],
    children: [
      {
        title: "HROrgStructure",
        route: "hrorgstructure",
        visible: "HROrgStructureView",
      },
      {
        title: "HrAcceptanceWork",
        route: "hracceptancework",
        visible: "HrAcceptanceWorkView",
      },
      {
        title: "HREmpLeaveOrder",
        route: "hrempleaveorder",
        visible: "HREmpLeaveOrderView",
      },
      {
        title: "HrEmpSendTrain",
        route: "hrempsendtrain",
        visible: "HrEmpSendTrainView",
      },
      {
        title: "HREmpSickLeave",
        route: "hrempsickleave",
        visible: "HREmpSickLeaveView",
      },
      {
        title: "HrWorkDayOff",
        route: "hrworkdayoff",
        visible: "HrWorkDayOffView",
      },
      {
        title: "HrRecallLeave",
        route: "hrrecallleave",
        visible: "HrRecallLeaveView",
      },
      {
        title: "HRTimeSheet",
        route: "hrtimesheet",
        visible: "HRTimesheetView",
      },
    ],
  },

  // {
  //   title: "Bepul_qishgi",
  //   icon: "GiftIcon",
  //   route: "schoolinfo",
  //   visible: true,
  // },
  // {
  //   title: "Bepul_darsliklar",
  //   icon: "BookIcon",
  //   route: "schoolinfo",
  //   visible: true,
  // },
  // {
  //   title: "Togaraklarda_qatnashish",
  //   icon: "CheckSquareIcon",
  //   route: "schoolinfo",
  //   visible: true,
  // },
  // {
  //   title: "Ovqatlanish_puli",
  //   icon: "ShoppingCartIcon",
  //   route: "schoolinfo",
  //   visible: true,
  // },
  // {
  //   title: "Qishgi_kiyim-bosh",
  //   icon: "ShoppingBagIcon",
  //   route: "schoolinfo",
  //   visible: true,
  // },
  // {
  //   title: "Qishgi_kiyim_bosh_narxlari",
  //   icon: "DollarSignIcon",
  //   route: "schoolinfo",
  //   visible: true,
  // },
  // {
  //   title: "Darsliklar_to`plamlari",
  //   icon: "DollarSignIcon",
  //   route: "schoolinfo",
  //   visible: true,
  // },
  // {
  //   title: "IDUMIlar_uchun",
  //   icon: "DollarSignIcon",
  //   route: "schoolinfo",
  //   visible: true,
  // },
  // {
  //   title: "BAMlar_uchun",
  //   icon: "DollarSignIcon",
  //   route: "schoolinfo",
  //   visible: true,
  // },
];
