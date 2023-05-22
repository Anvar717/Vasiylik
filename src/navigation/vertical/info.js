export default [
  {
    header: "Info",
  },
  {
    title: "InfoAreaSetting",
    icon: "LayersIcon",
    visible: ['CountryView', 'OblastView', 'RegionView', 'MfyView', 'StreetView', 'StreetHouseView', 'StreetHouseStateView', 'StreetStateView' , 'DepartmentView' , 'EducationTypeView' , 'HigherEduClassifierView' , 'QualificationCategoryView' , 'StaffCategoryView' , 'UniversityView' , 'StaffTypeBasicTariffView' , 'PositionClassificationView' , 'WorkScheduleView' , 'PositionView'],
    children: [
      {
        title: "Country",
        route: "country",
        visible: "CountryView",
      },
      {
        title: "Oblast",
        route: "oblast",
        visible: "OblastView",
      },
      {
        title: "Region",
        route: "region",
        visible: "RegionView",
      },
      {
        title: "Mfy",
        route: "mfy",
        visible: "MfyView",
      },
      {
        title: "Department",
        route: "department",
        visible: "DepartmentView",
      },
      {
        title: "EducationType",
        route: "educationtype",
        visible: "EducationTypeView",
      },
      {
        title: "HigherEduClassifier",
        route: "highereduclassifier",
        visible: "HigherEduClassifierView",
      },
      {
        title: "QualificationCategory",
        route: "qualificationcategory",
        visible: "QualificationCategoryView",
      },
      {
        title: "StaffCategory",
        route: "staffcategory",
        visible: "StaffCategoryView",
      },
      {
        title: "University",
        route: "university",
        visible: "UniversityView",
      },
      {
        title: "StaffTypeBasicTariff",
        route: "stafftypebasictariff",
        visible: "StaffTypeBasicTariffView",
      },
      {
        title: "PositionClassification",
        route: "positionclassification",
        visible: "PositionClassificationView",
      },
      {
        title: "WorkSchedule",
        route: "workschedule",
        visible: "WorkScheduleView",
      },
      {
        title: "Position",
        route: "position",
        visible: "PositionView",
      },
    ],
  },
  {
    title: "InfoPupilSetting",
    icon: "LayersIcon",
    visible: ['SchoolYearView', 'SchoolGroupContingentView', 'SchoolLegalFormView', ],
    children: [
      {
        title: "SchoolYear",
        route: "schoolyear",
        visible: "SchoolYearView",
      },
      {
        title: "SchoolGroupContingent",
        route: "schoolgroupcontingent",
        visible: "SchoolGroupContingentView",
      },
      {
        title: "SchoolLegalForm",
        route: "schoollegalform",
        visible: "SchoolLegalFormView",
      },
    ],
  },
  {
    title: "InfoPersonSettings",
    icon: "LayersIcon",
    visible: ['ChildrenView', 'GuardianshipView' , 'ChildCharacterView', 'ColorView' , 'KinshipDegreeView' , 'EmployeeView'],
    children: [
      {
        title: "Person",
        route: "person",
        visible: "ChildrenView",
      },
      {
        title: "Guardianship",
        route: "guardianship",
        visible: "GuardianshipView",
      },
      {
        title: "Employee",
        route: "employee",
        visible: "EmployeeView",
      },
      {
        title: "Color",
        route: "color",
        visible: "ColorView",
      },
      {
        title: "ChildCharacter",
        route: "childcharacter",
        visible: "ChildCharacterView",
      },
      {
        title: "KinshipDegree",
        route: "kinshipdegree",
        visible: "KinshipDegreeView",
      },
    ],
  },
  {
    title: "PersonSettings",
    icon: "LayersIcon",
    visible : ['GuardianshiplessReasonView', 'DecisionsOrgView', 'IdentityDocumentView', 'PropertyRightView', 'PropertyTypeView' , 'ChildMeasuresTakenForAdoptionView' , 'DecisionTextView' ],
    children: [
      {
        title: "GuardianshiplessReason",
        route: "guardianshiplessreason",
        visible: "GuardianshiplessReasonView",
      },
      {
        title: "DecisionsOrg",
        route: "decisionsorg",
        visible: "DecisionsOrgView",
      },
      {
        title: "IdentityDocument",
        route: "identitydocument",
        visible: "IdentityDocumentView",
      },
      {
        title: "PropertyRight",
        route: "propertyright",
        visible: "PropertyRightView",
      },
      {
        title: "ChildMeasuresTakenForAdoption",
        route: "childmeasurestakenforadoption",
        visible: "ChildMeasuresTakenForAdoptionView",
      },
      {
        title: "DecisionText",
        route: "decisiontext",
        visible: "DecisionTextView",
      },
      {
        title: "PropertyType",
        route: "propertytype",
        visible: "PropertyTypeView",
      },
      {
        title: "UserMessageTemplate",
        route: "usermessagetemplate",
        visible: true,
      },
      {
        title: "ChildExpulsionType",
        route: "childexpulsiontype",
        visible: true,
      },
    ],
  },
];
