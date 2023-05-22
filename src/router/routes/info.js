export default [
  // Info Area Settings
  {
    path: "/infoAreaSetting/country",
    name: "country",
    component: () => import("@/views/info/country/index.vue"),
    meta: {
      pageTitle: "Country",
      breadcrumb: [
        {
          text: "InfoAreaSetting",
        },
        {
          text: "Country",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/country/view/id=:id",
    name: "Editcountry",
    component: () => import("@/views/info/country/edit.vue"),
    meta: {
      pageTitle: "Country",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "Country",
          active: true,
        },
      ],
    },
  },
  {
    path: "/infoAreaSetting/oblast",
    name: "oblast",
    component: () => import("@/views/info/oblast/index.vue"),
    meta: {
      pageTitle: "Oblast",
      breadcrumb: [
        {
          text: "InfoAreaSetting",
        },
        {
          text: "Oblast",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/oblast/view/id=:id",
    name: "Editoblast",
    component: () => import("@/views/info/oblast/edit.vue"),
    meta: {
      pageTitle: "Oblast",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "Oblast",
          active: true,
        },
      ],
    },
  },
  {
    path: "/infoAreaSetting/region",
    name: "region",
    component: () => import("@/views/info/region/index.vue"),
    meta: {
      pageTitle: "Region",
      breadcrumb: [
        {
          text: "InfoAreaSetting",
        },
        {
          text: "Region",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/region/view/id=:id",
    name: "Editregion",
    component: () => import("@/views/info/region/edit.vue"),
    meta: {
      pageTitle: "Region",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "Region",
          active: true,
        },
      ],
    },
  },
  {
    path: "/infoAreaSetting/regiongroup",
    name: "regiongroup",
    component: () => import("@/views/info/regiongroup/index.vue"),
    meta: {
      pageTitle: "RegionGroup",
      breadcrumb: [
        {
          text: "InfoAreaSetting",
        },
        {
          text: "RegionGroup",
          active: true,
        },
      ],
    },
  },
  {
    path: "/infoAreaSetting/mfy",
    name: "mfy",
    component: () => import("@/views/info/mfy/index.vue"),
    meta: {
      pageTitle: "Mfy",
      breadcrumb: [
        {
          text: "InfoAreaSetting",
        },
        {
          text: "Mfy",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/mfy/view/id=:id",
    name: "EditMfy",
    component: () => import("@/views/info/mfy/edit.vue"),
    meta: {
      pageTitle: "Mfy",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "Mfy",
          active: true,
        },
      ],
    },
  },
  {
    path: "/infoAreaSetting/person",
    name: "person",
    component: () => import("@/views/info/person/index.vue"),
    meta: {
      pageTitle: "Person",
      breadcrumb: [
        {
          text: "InfoAreaSetting",
        },
        {
          text: "Person",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/person/view/id=:id",
    name: "EditPerson",
    component: () => import("@/views/info/person/edit.vue"),
    meta: {
      pageTitle: "Person",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "Person",
          active: true,
        },
      ],
    },
  },
  {
    path: "/infoAreaSetting/guardianship",
    name: "guardianship",
    component: () => import("@/views/info/guardianship/index.vue"),
    meta: {
      pageTitle: "Guardianship",
      breadcrumb: [
        {
          text: "InfoAreaSetting",
        },
        {
          text: "Guardianship",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/guardianship/view/id=:id",
    name: "EditGuardianship",
    component: () => import("@/views/info/guardianship/edit.vue"),
    meta: {
      pageTitle: "Guardianship",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "Guardianship",
          active: true,
        },
      ],
    },
  },
  {
    path: "/infoAreaSetting/color",
    name: "color",
    component: () => import("@/views/info/color/index.vue"),
    meta: {
      pageTitle: "Color",
      breadcrumb: [
        {
          text: "InfoAreaSetting",
        },
        {
          text: "Color",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/color/view/id=:id",
    name: "EditColor",
    component: () => import("@/views/info/color/edit.vue"),
    meta: {
      pageTitle: "Color",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "Color",
          active: true,
        },
      ],
    },
  },
  {
    path: "/infoAreaSetting/childcharacter",
    name: "childcharacter",
    component: () => import("@/views/info/childcharacter/index.vue"),
    meta: {
      pageTitle: "ChildCharacter",
      breadcrumb: [
        {
          text: "InfoAreaSetting",
        },
        {
          text: "ChildCharacter",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/childcharacter/view/id=:id",
    name: "EditChildCharacter",
    component: () => import("@/views/info/childcharacter/edit.vue"),
    meta: {
      pageTitle: "ChildCharacter",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "ChildCharacter",
          active: true,
        },
      ],
    },
  },
  {
    path: "/infoAreaSetting/childmeasurestakenforadoption",
    name: "childmeasurestakenforadoption",
    component: () => import("@/views/info/childmeasurestakenforadoption/index.vue"),
    meta: {
      pageTitle: "ChildMeasuresTakenForAdoption",
      breadcrumb: [
        {
          text: "InfoAreaSetting",
        },
        {
          text: "ChildMeasuresTakenForAdoption",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/childmeasurestakenforadoption/view/id=:id",
    name: "EditChildMeasuresTakenForAdoption",
    component: () => import("@/views/info/childmeasurestakenforadoption/edit.vue"),
    meta: {
      pageTitle: "ChildMeasuresTakenForAdoption",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "ChildMeasuresTakenForAdoption",
          active: true,
        },
      ],
    },
  },
  {
    path: "/infoAreaSetting/decisiontext",
    name: "decisiontext",
    component: () => import("@/views/info/decisiontext/index.vue"),
    meta: {
      pageTitle: "DecisionText",
      breadcrumb: [
        {
          text: "InfoAreaSetting",
        },
        {
          text: "DecisionText",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/decisiontext/view/id=:id",
    name: "EditDecisionText",
    component: () => import("@/views/info/decisiontext/edit.vue"),
    meta: {
      pageTitle: "DecisionText",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "DecisionText",
          active: true,
        },
      ],
    },
  },
  // {
  //   path: "/infoAreaSetting/mfystate",
  //   name: "mfystate",
  //   component: () => import("@/views/info/mfystate/index.vue"),
  //   meta: {
  //     pageTitle: "MfyState",
  //     breadcrumb: [
  //       {
  //         text: "InfoAreaSetting",
  //       },
  //       {
  //         text: "MfyState",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: "/info/mfystate/view/id=:id",
  //   name: "EditMfyState",
  //   component: () => import("@/views/info/mfystate/edit.vue"),
  //   meta: {
  //     pageTitle: "MfyState",
  //     breadcrumb: [
  //       {
  //         text: "Info",
  //       },
  //       {
  //         text: "MfyState",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: "/infoCurriculaSetting/educationlanguage",
  //   name: "educationlanguage",
  //   component: () => import("@/views/info/educationlanguage/index.vue"),
  //   meta: {
  //     pageTitle: "EducationLanguage",
  //     breadcrumb: [
  //       {
  //         text: "Info",
  //       },
  //       {
  //         text: "EducationLanguage",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  {
    path: "/infoCurriculaSetting/schoolyear",
    name: "schoolyear",
    component: () => import("@/views/info/schoolyear/index.vue"),
    meta: {
      pageTitle: "SchoolYear",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "SchoolYear",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/schoolyear/edit/id=:id",
    name: "EditSchoolYear",
    component: () => import("@/views/info/schoolyear/edit.vue"),
    meta: {
      pageTitle: "SchoolYear",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "SchoolYear",
          active: true,
        },
      ],
    },
  },
  {
    path: "/infoCurriculaSetting/identitydocument",
    name: "identitydocument",
    component: () => import("@/views/info/identitydocument/index.vue"),
    meta: {
      pageTitle: "IdentityDocument",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "IdentityDocument",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/identitydocument/edit/id=:id",
    name: "EditIdentityDocument",
    component: () => import("@/views/info/identitydocument/edit.vue"),
    meta: {
      pageTitle: "IdentityDocument",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "IdentityDocument",
          active: true,
        },
      ],
    },
  },
  {
    path: "/infoCurriculaSetting/kinshipdegree",
    name: "kinshipdegree",
    component: () => import("@/views/info/kinshipdegree/index.vue"),
    meta: {
      pageTitle: "KinshipDegree",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "KinshipDegree",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/kinshipdegree/edit/id=:id",
    name: "EditKinshipDegree",
    component: () => import("@/views/info/kinshipdegree/edit.vue"),
    meta: {
      pageTitle: "KinshipDegree",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "KinshipDegree",
          active: true,
        },
      ],
    },
  },
  // {
  //   path: "/infoCurriculaSetting/schoolsubject",
  //   name: "schoolsubject",
  //   component: () => import("@/views/info/schoolsubject/index.vue"),
  //   meta: {
  //     pageTitle: "SchoolSubject",
  //     breadcrumb: [
  //       {
  //         text: "Info",
  //       },
  //       {
  //         text: "SchoolSubject",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: "/info/schoolsubject/edit/id=:id",
  //   name: "EditSchoolSubject",
  //   component: () => import("@/views/info/schoolsubject/edit.vue"),
  //   meta: {
  //     pageTitle: "SchoolSubject",
  //     breadcrumb: [
  //       {
  //         text: "Info",
  //       },
  //       {
  //         text: "SchoolSubject",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: "/infoCurriculaSetting/schoolsubjectgroup",
  //   name: "schoolsubjectgroup",
  //   component: () => import("@/views/info/schoolsubjectgroup/index.vue"),
  //   meta: {
  //     pageTitle: "SchoolSubjectGroup",
  //     breadcrumb: [
  //       {
  //         text: "Info",
  //       },
  //       {
  //         text: "SchoolSubjectGroup",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: "/info/schoolsubjectgroup/edit/id=:id",
  //   name: "EditSchoolSubjectGroup",
  //   component: () => import("@/views/info/schoolsubjectgroup/edit.vue"),
  //   meta: {
  //     pageTitle: "SchoolSubjectGroup",
  //     breadcrumb: [
  //       {
  //         text: "Info",
  //       },
  //       {
  //         text: "SchoolSubjectGroup",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  {
    path: "/infoCurriculaSetting/subjectolympiad",
    name: "subjectolympiad",
    component: () => import("@/views/info/subjectolympiad/index.vue"),
    meta: {
      pageTitle: "SubjectOlympiad",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "SubjectOlympiad",
          active: true,
        },
      ],
    },
  },
  {
    path: "/infoCurriculaSetting/olympiadwinnertype",
    name: "olympiadwinnertype",
    component: () => import("@/views/info/olympiadwinnertype/index.vue"),
    meta: {
      pageTitle: "OlympiadWinnerType",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "OlympiadWinnerType",
          active: true,
        },
      ],
    },
  },

  // {
  //   path: "/info/oked",
  //   name: "oked",
  //   component: () => import("@/views/info/oked/index.vue"),
  //   meta: {
  //     pageTitle: "Oked",
  //     breadcrumb: [
  //       {
  //         text: "Info",
  //       },
  //       {
  //         text: "Oked",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: "/info/organizationtype",
  //   name: "organizationtype",
  //   component: () => import("@/views/info/organizationtype/index.vue"),
  //   meta: {
  //     pageTitle: "OrganizationType",
  //     breadcrumb: [
  //       {
  //         text: "Info",
  //       },
  //       {
  //         text: "OrganizationType",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  {
    path: "/info/personinfo",
    name: "personinfo",
    component: () => import("@/views/info/personinfo/index.vue"),
    meta: {
      pageTitle: "PersonInfo",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "PersonInfo",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/schoollegalform",
    name: "schoollegalform",
    component: () => import("@/views/info/schoollegalform/index.vue"),
    meta: {
      pageTitle: "SchoolLegalForm",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "SchoolLegalForm",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/schoollegalform/edit/id=:id",
    name: "EditSchoolLegalForm",
    component: () => import("@/views/info/schoollegalform/edit.vue"),
    meta: {
      pageTitle: "SchoolLegalForm",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "SchoolLegalForm",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/returnadmapptype",
    name: "returnadmapptype",
    component: () => import("@/views/info/returnadmapptype/index.vue"),
    meta: {
      pageTitle: "Returnadmapptype",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "Returnadmapptype",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/returnadmapptype/edit/id=:id",
    name: "EditReturnadmapptype",
    component: () => import("@/views/info/returnadmapptype/edit.vue"),
    meta: {
      pageTitle: "EditReturnadmapptype",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditReturnadmapptype",
          active: true,
        },
      ],
    },
  },
  // {
  //   path: "/info/nationality",
  //   name: "nationality",
  //   component: () => import("@/views/info/nationality/index.vue"),
  //   meta: {
  //     pageTitle: "Nationality",
  //     breadcrumb: [
  //       {
  //         text: "Info",
  //       },
  //       {
  //         text: "nationality",
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  {
    path: "/info/street",
    name: "street",
    component: () => import("@/views/info/street/index.vue"),
    meta: {
      pageTitle: "Street",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "Street",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/street/edit/id=:id",
    name: "EditStreet",
    component: () => import("@/views/info/street/edit.vue"),
    meta: {
      pageTitle: "Street",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "Street",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/schooltype",
    name: "schooltype",
    component: () => import("@/views/info/schooltype/index.vue"),
    meta: {
      pageTitle: "SchoolType",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "SchoolType",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/schoolgroupcontingent",
    name: "schoolgroupcontingent",
    component: () => import("@/views/info/schoolgroupcontingent/index.vue"),
    meta: {
      pageTitle: "SchoolGroupContingent",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "SchoolGroupContingent",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/schoolgroupcontingent/edit/id=:id",
    name: "EditSchoolGroupContingent",
    component: () => import("@/views/info/schoolgroupcontingent/edit.vue"),
    meta: {
      pageTitle: "SchoolGroupContingent",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "SchoolGroupContingent",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/schooluniformdesigntype",
    name: "schooluniformdesigntype",
    component: () => import("@/views/info/schooluniformdesigntype/index.vue"),
    meta: {
      pageTitle: "SchoolUniformDesignType",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "SchoolUniformDesignType",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/streethouse",
    name: "streethouse",
    component: () => import("@/views/info/streethouse/index.vue"),
    meta: {
      pageTitle: "StreetHouse",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "StreetHouse",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/streethouse/edit/id=:id",
    name: "EditStreetHouse",
    component: () => import("@/views/info/streethouse/edit.vue"),
    meta: {
      pageTitle: "StreetHouse",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "StreetHouse",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/propertyright",
    name: "propertyright",
    component: () => import("@/views/info/propertyright/index.vue"),
    meta: {
      pageTitle: "PropertyRight",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "PropertyRight",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/propertyright/edit/id=:id",
    name: "EditPropertyRight",
    component: () => import("@/views/info/propertyright/edit.vue"),
    meta: {
      pageTitle: "PropertyRight",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "PropertyRight",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/propertytype",
    name: "propertytype",
    component: () => import("@/views/info/propertytype/index.vue"),
    meta: {
      pageTitle: "PropertyType",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "PropertyType",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/propertytype/edit/id=:id",
    name: "EditPropertyType",
    component: () => import("@/views/info/propertytype/edit.vue"),
    meta: {
      pageTitle: "PropertyType",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "PropertyType",
          active: true,
        },
      ],
    },
  },

  {
    path: "/info/streethousestate",
    name: "streethousestate",
    component: () => import("@/views/info/streethousestate/index.vue"),
    meta: {
      pageTitle: "StreetHouseState",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "StreetHouseState",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/streethousestate/edit/id=:id",
    name: "EditStreetHouseState",
    component: () => import("@/views/info/streethousestate/edit.vue"),
    meta: {
      pageTitle: "StreetHouseState",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "StreetHouseState",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/streetstate",
    name: "streetstate",
    component: () => import("@/views/info/streetstate/index.vue"),
    meta: {
      pageTitle: "StreetState",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "StreetState",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/streetstate/edit/id=:id",
    name: "EditStreetState",
    component: () => import("@/views/info/streetstate/edit.vue"),
    meta: {
      pageTitle: "StreetState",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "StreetState",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/guardianshiplessreason",
    name: "guardianshiplessreason",
    component: () => import("@/views/info/guardianshiplessreason/index.vue"),
    meta: {
      pageTitle: "GuardianshiplessReason",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "GuardianshiplessReason",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/guardianshiplessreason/edit/id=:id",
    name: "EditGuardianshiplessReason",
    component: () => import("@/views/info/guardianshiplessreason/edit.vue"),
    meta: {
      pageTitle: "GuardianshiplessReason",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "GuardianshiplessReason",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/decisionsorg",
    name: "decisionsorg",
    component: () => import("@/views/info/decisionsorg/index.vue"),
    meta: {
      pageTitle: "DecisionsOrg",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "DecisionsOrg",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/decisionsorg/edit/id=:id",
    name: "EditDecisionsOrg",
    component: () => import("@/views/info/decisionsorg/edit.vue"),
    meta: {
      pageTitle: "DecisionsOrg",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "DecisionsOrg",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/schooluniformrequest",
    name: "schooluniformrequest",
    component: () => import("@/views/info/schooluniformrequest/index.vue"),
    meta: {
      pageTitle: "SchoolUniformRequest",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "SchoolUniformRequest",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/orginfo",
    name: "orginfo",
    component: () => import("@/views/info/orginfo/index.vue"),
    meta: {
      pageTitle: "OrgInfo",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "OrgInfo",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/orginfo/view/id=:id",
    name: "Editorginfo",
    component: () => import("@/views/info/orginfo/edit.vue"),
    meta: {
      pageTitle: "EditOrgInfo",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditOrgInfo",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/educationdirection",
    name: "educationdirection",
    component: () => import("@/views/info/educationdirection/index.vue"),
    meta: {
      pageTitle: "EducationDirection",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EducationDirection",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/educationdirection/edit/id=:id",
    name: "Editeducationdirection",
    component: () => import("@/views/info/educationdirection/edit.vue"),
    meta: {
      pageTitle: "EditEducationDirection",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditEducationDirection",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/moderatoradmapprejectreason",
    name: "moderatoradmapprejectreason",
    component: () => import("@/views/info/moderatoradmapprejectreason/index.vue"),
    meta: {
      pageTitle: "ModeratorAdmAppRejectReason",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "ModeratorAdmAppRejectReason",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/moderatoradmapprejectreason/edit/id=:id",
    name: "EditModeratorAdmAppRejectReason",
    component: () => import("@/views/info/moderatoradmapprejectreason/edit.vue"),
    meta: {
      pageTitle: "EditModeratorAdmAppRejectReason",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditModeratorAdmAppRejectReason",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/usermessagetemplate",
    name: "usermessagetemplate",
    component: () => import("@/views/info/usermessagetemplate/index.vue"),
    meta: {
      pageTitle: "UserMessageTemplate",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "UserMessageTemplate",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/usermessagetemplate/edit/id=:id",
    name: "EditUserMessageTemplate",
    component: () => import("@/views/info/usermessagetemplate/edit.vue"),
    meta: {
      pageTitle: "EditUserMessageTemplate",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditUserMessageTemplate",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/childexpulsiontype",
    name: "childexpulsiontype",
    component: () => import("@/views/info/childexpulsiontype/index.vue"),
    meta: {
      pageTitle: "ChildExpulsionType",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "ChildExpulsionType",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/childexpulsiontype/edit/id=:id",
    name: "EditChildExpulsionType",
    component: () => import("@/views/info/childexpulsiontype/edit.vue"),
    meta: {
      pageTitle: "EditChildExpulsionType",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditChildExpulsionType",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/department",
    name: "department",
    component: () => import("@/views/info/department/index.vue"),
    meta: {
      pageTitle: "Department",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "Department",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/department/edit/id=:id",
    name: "EditDepartment",
    component: () => import("@/views/info/department/edit.vue"),
    meta: {
      pageTitle: "EditDepartment",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditDepartment",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/educationtype",
    name: "educationtype",
    component: () => import("@/views/info/educationtype/index.vue"),
    meta: {
      pageTitle: "EducationType",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EducationType",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/educationtype/edit/id=:id",
    name: "EditEducationType",
    component: () => import("@/views/info/educationtype/edit.vue"),
    meta: {
      pageTitle: "EditEducationType",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditEducationType",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/highereduclassifier",
    name: "highereduclassifier",
    component: () => import("@/views/info/highereduclassifier/index.vue"),
    meta: {
      pageTitle: "HigherEduClassifier",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "HigherEduClassifier",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/highereduclassifier/edit/id=:id",
    name: "EditHigherEduClassifier",
    component: () => import("@/views/info/highereduclassifier/edit.vue"),
    meta: {
      pageTitle: "EditHigherEduClassifier",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditHigherEduClassifier",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/qualificationcategory",
    name: "qualificationcategory",
    component: () => import("@/views/info/qualificationcategory/index.vue"),
    meta: {
      pageTitle: "QualificationCategory",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "QualificationCategory",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/qualificationcategory/edit/id=:id",
    name: "EditQualificationCategory",
    component: () => import("@/views/info/qualificationcategory/edit.vue"),
    meta: {
      pageTitle: "EditQualificationCategory",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditQualificationCategory",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/staffcategory",
    name: "staffcategory",
    component: () => import("@/views/info/staffcategory/index.vue"),
    meta: {
      pageTitle: "StaffCategory",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "StaffCategory",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/staffcategory/edit/id=:id",
    name: "EditStaffCategory",
    component: () => import("@/views/info/staffcategory/edit.vue"),
    meta: {
      pageTitle: "EditStaffCategory",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditStaffCategory",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/university",
    name: "university",
    component: () => import("@/views/info/university/index.vue"),
    meta: {
      pageTitle: "University",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "University",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/university/edit/id=:id",
    name: "EditUniversity",
    component: () => import("@/views/info/university/edit.vue"),
    meta: {
      pageTitle: "EditUniversity",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditUniversity",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/stafftypebasictariff",
    name: "stafftypebasictariff",
    component: () => import("@/views/info/stafftypebasictariff/index.vue"),
    meta: {
      pageTitle: "StaffTypeBasicTariff",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "StaffTypeBasicTariff",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/stafftypebasictariff/edit/id=:id",
    name: "EditStaffTypeBasicTariff",
    component: () => import("@/views/info/stafftypebasictariff/edit.vue"),
    meta: {
      pageTitle: "EditStaffTypeBasicTariff",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditStaffTypeBasicTariff",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/positionclassification",
    name: "positionclassification",
    component: () => import("@/views/info/positionclassification/index.vue"),
    meta: {
      pageTitle: "PositionClassification",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "PositionClassification",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/positionclassification/edit/id=:id",
    name: "EditPositionClassification",
    component: () => import("@/views/info/positionclassification/edit.vue"),
    meta: {
      pageTitle: "EditPositionClassification",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditPositionClassification",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/workschedule",
    name: "workschedule",
    component: () => import("@/views/info/workschedule/index.vue"),
    meta: {
      pageTitle: "WorkSchedule",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "WorkSchedule",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/workschedule/edit/id=:id",
    name: "EditWorkSchedule",
    component: () => import("@/views/info/workschedule/edit.vue"),
    meta: {
      pageTitle: "EditWorkSchedule",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditWorkSchedule",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/position",
    name: "position",
    component: () => import("@/views/info/position/index.vue"),
    meta: {
      pageTitle: "Position",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "Position",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/position/edit/id=:id",
    name: "EditPosition",
    component: () => import("@/views/info/position/edit.vue"),
    meta: {
      pageTitle: "EditPosition",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditPosition",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/employee",
    name: "employee",
    component: () => import("@/views/info/employee/index.vue"),
    meta: {
      pageTitle: "Employee",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "Employee",
          active: true,
        },
      ],
    },
  },
  {
    path: "/info/employee/edit/id=:id",
    name: "EditEmployee",
    component: () => import("@/views/info/employee/edit.vue"),
    meta: {
      pageTitle: "EditEmployee",
      breadcrumb: [
        {
          text: "Info",
        },
        {
          text: "EditEmployee",
          active: true,
        },
      ],
    },
  },
];

