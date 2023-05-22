export default [
  {
    path: "/managment/organization",
    name: "organization",
    component: () => import("@/views/managment/organization/index.vue"),
    meta: {
      pageTitle: "Organization",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "Organization",
          active: true,
        },
      ],
    },
  },
  {
    path: "/managment/organization/view/id=:id",
    name: "EditOrganization",
    component: () => import("@/views/managment/organization/edit.vue"),
    meta: {
      pageTitle: "Organization",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "Organization",
          active: true,
        },
      ],
    },
  },
  {
    path: "/managment/organization/view/id=:id",
    name: "ViewOrganization",
    component: () => import("@/views/managment/organization/view.vue"),
    meta: {
      pageTitle: "ViewOrganization",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "Organization",
          active: true,
        },
        {
          text: "ViewOrganization",
        },
      ],
    },
  },
  {
    path: "/managment/organizationtype",
    name: "organizationtype",
    component: () => import("@/views/managment/organizationtype/index.vue"),
    meta: {
      pageTitle: "OrganizationType",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "OrganizationType",
          active: true,
        },
      ],
    },
  },
  {
    path: "/managment/organizationtype/view/id=:id",
    name: "editorganizationtype",
    component: () => import("@/views/managment/organizationtype/edit.vue"),
    meta: {
      pageTitle: "OrganizationType",
      breadcrumb: [
        {
          text: "OrganizationType",
        },
        {
          text: "OrganizationType",
          active: true,
        },
      ],
    },
  },
  {
    path: "/managment/user/view/id=:id",
    name: "edituser",
    component: () => import("@/views/managment/user/edit.vue"),
    meta: {
      pageTitle: "User",
      breadcrumb: [
        {
          text: "User",
        },
        {
          text: "User",
          active: true,
        },
      ],
    },
  },
  {
    path: "/managment/user",
    name: "user",
    component: () => import("@/views/managment/user/index.vue"),
    meta: {
      pageTitle: "User",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "User",
          active: true,
        },
      ],
    },
  },
  {
    path: "/managment/role",
    name: "role",
    component: () => import("@/views/managment/role/index.vue"),
    meta: {
      pageTitle: "Role",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "Role",
          active: true,
        },
      ],
    },
  },
  {
    path: "/managment/role/edit/id=:id",
    name: "EditRole",
    component: () => import("@/views/managment/role/edit.vue"),
    meta: {
      pageTitle: "EditRole",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "Role",
          active: true,
        },
        {
          text: "EditRole",
          active: true,
        },
      ],
    },
  },
];
