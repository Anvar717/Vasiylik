export default [
  {
    header: "Management",
  },
  {
    title: "Management",
    icon: "SettingsIcon",
    visible : ['OrganizationView', 'OrganizationTypeView', 'UserView', 'RoleView'],
    children: [
      {
        title: "Organization",
        route: "organization",
        visible: "OrganizationView",
      },
      {
        title: "OrganizationType",
        route: "organizationtype",
        visible: "OrganizationTypeView",
      },
      {
        title: "User",
        route: "user",
        visible: "UserView",
      },
      {
        title: "Role",
        route: "role",
        visible: "RoleView",
      },
    ],
  },
];
