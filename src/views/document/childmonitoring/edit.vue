<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col class="text-center">
          <h2>{{ $t("GuardianInformation") }}</h2>
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-row>
        <b-col sm="12" md="6" lg="3">
          <label for=""> {{ $t("childguardianshipmonitoring") }} </label>
          <b-input-group>
            <b-form-input
              v-model="ChildMonitoring.personname"
              disabled
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="OpenChildGuardianshipModal">
                <feather-icon icon="MoreHorizontalIcon"></feather-icon>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label for=""> {{ $t("decisionsdate") }} </label>
          <custom-date-picker
            v-model="ChildMonitoring.decisionsdate"
            @keyup="DecisionsdateDate"
            format="DD.MM.YYYY"
            type="date"
            :clearable="false"
            :placeholder="$t('decisionsdate')"
            disabled
          >
          </custom-date-picker>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label> {{ $t("decisionsnumber") }} </label>
          <b-form-input
            v-model="ChildMonitoring.decisionsnumber"
            disabled
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label> {{ $t("guardianshiptypename") }} </label>
          <b-form-input
            v-model="ChildMonitoring.guardianshiptypename"
            disabled
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="12" md="6" lg="3">
          <label> {{ $t("guardianname") }} </label>
          <b-form-input
            v-model="ChildMonitoring.guardianname"
            disabled
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label> {{ $t("oblastname") }} </label>
          <b-form-input
            disabled
            v-model="ChildMonitoring.oblastname"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label> {{ $t("regionname") }} </label>
          <b-form-input
            disabled
            v-model="ChildMonitoring.regionname"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label> {{ $t("guardianaddress") }} </label>
          <b-form-input
            v-model="ChildMonitoring.guardianaddress"
            disabled
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-2 mb-2">
        <b-col sm="12" md="6" lg="3">
          <label> {{ $t("contactinfo") }} </label>
          <b-form-input
            :placeholder="$t('contactinfo')"
            v-model="ChildMonitoring.phonenumber"
            v-mask="'+998-##-###-##-##'"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label> {{ $t("pensionamount") }} </label>
          <b-form-input v-model="ChildMonitoring.pensionamount"></b-form-input>
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-row>
        <b-col class="text-center">
          <h2>{{ $t("InformationAbouttheChild") }}</h2>
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-row>
        <b-col sm="12" md="6" lg="3">
          <label for=""> {{ $t("MonitoringDate") }} </label>
          <custom-date-picker
            v-model="ChildMonitoring.docdate"
            @keyup="BindDocDate"
            format="DD.MM.YYYY"
            type="date"
            :clearable="false"
            :placeholder="$t('MonitoringDate')"
          >
          </custom-date-picker>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label for=""> {{ $t("livingcondition") }} </label>
          <v-select
            :options="LivingconditionList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="shortname"
            v-model="ChildMonitoring.livingconditionid"
          ></v-select>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label> {{ $t("livingconditiontext") }} </label>
          <b-form-input
            v-model="ChildMonitoring.livingconditiontext"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label> {{ $t("Health") }} </label>
          <b-form-input v-model="ChildMonitoring.healthtypename"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col sm="12" md="6" lg="3">
          <label for=""> {{ $t("childstudytype") }} </label>
          <v-select
            :options="ChildstudytypeList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="shortname"
            v-model="ChildMonitoring.childstudytypeid"
          ></v-select>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label> {{ $t("istrainingmember") }} </label>
          <b-form-checkbox switch v-model="ChildMonitoring.istrainingmember" />
        </b-col>
        <b-col
          v-if="ChildMonitoring.istrainingmember == true"
          sm="12"
          md="6"
          lg="3"
        >
          <label> {{ $t("trainingname") }} </label>
          <b-form-input v-model="ChildMonitoring.trainingname"></b-form-input>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label for=""> {{ $t("upcomingmonitoringdate") }} </label>
          <custom-date-picker
            v-model="ChildMonitoring.upcomingmonitoringdate"
            @keyup="UpcomingmonitoringDate"
            format="DD.MM.YYYY"
            type="date"
            :clearable="false"
            :placeholder="$t('upcomingmonitoringdate')"
            disabled
          >
          </custom-date-picker>
        </b-col>
      </b-row>

      <b-row class="mt-2 mb-2">
        <b-col sm="12" md="6" lg="3">
          <label> {{ $t("monitoringpersonname") }} </label>
          <b-form-input
            v-model="ChildMonitoring.monitoringpersonname"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label> {{ $t("AdditionalInformationn") }} </label>
          <b-form-input v-model="ChildMonitoring.docnumber"></b-form-input>
        </b-col>
      </b-row>
    </b-card>
    <b-row class="mt-1">
      <b-col>
        <b-card class="w-100">
          <b-row>
            <b-col sm="12" md="12" lg="12" class="text-right">
              <b-button @click="SaveData" size="sm" variant="outline-success">
                <feather-icon icon="CheckIcon"></feather-icon> {{ $t("Save") }}
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      v-model="ChildGuardianshipModal"
      size="xl"
      hide-footer
      no-close-on-backdrop
    >
      <child-under-guardianship-component
        @row-selected="SelectedItemGuardian"
        @row-dblclick="AddDataGuardian"
      ></child-under-guardianship-component>
      <b-row>
        <b-col class="text-center">
          <b-button
            variant="danger"
            @click="ChildGuardianshipModal = false"
            class="mr-1"
          >
            {{ $t("close") }}
          </b-button>
          <b-button
            variant="success"
            @click="AddDataGuardian(childguardianshipvalue)"
          >
            {{ $t("Add") }}
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
  </b-overlay>
</template>

<script>
import {
  BOverlay,
  BCard,
  BRow,
  BCol,
  BFormInput,
  BTabs,
  BTab,
  BButton,
  BTable,
  BLink,
  BFormGroup,
  VBTooltip,
  BModal,
  VBModal,
  BCardText,
  BFormCheckbox,
  BAlert,
  BInputGroupAppend,
  BInputGroup,
  BTr,
  BTd,
  BSpinner,
  BPagination,
  BFormTextarea,
} from "bootstrap-vue";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import ChildMonitoringService from "@/services/document/childmonitoring.service";
import HelperService from "@/services/others/helper.service";
import ChildUnderGuardianshipComponent from "@/views/components/ChildUnderGuardianshipComponent.vue";
export default {
  components: {
    BOverlay,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTabs,
    BTab,
    BButton,
    BTable,
    BLink,
    BFormGroup,
    BModal,
    BCardText,
    BFormCheckbox,
    BAlert,
    BInputGroupAppend,
    BInputGroup,
    BTr,
    BTd,
    CustomDatePicker,
    BSpinner,
    BPagination,
    BFormTextarea,
    ChildUnderGuardianshipComponent,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      items: [],
      ChildMonitoring: {},
      StateList: [],
      ChildstudytypeList: [],
      ChildGuardianshipModal: false,
      ChildunderguardianshipList: [],
      LivingconditionList: [],
      SearchLoading: false,
      fields: [
        {
          key: "childregistrationactdocdate",
          label: this.$t("childregistrationactdocdate"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "personname",
          label: this.$t("personname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "gendername",
          label: this.$t("gender"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "nationalityname",
          label: this.$t("nationality"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "citizenship",
          label: this.$t("citizenship"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "identitydocumentname",
          label: this.$t("identitydocument"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
      ],
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
      childguardianshipvalue: {},
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    ChildMonitoringService.Get(this.$route.params.id,this.$route.query.childUnderGuardianshipId)
      .then((res) => {
        this.show = false;
        this.ChildMonitoring = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    HelperService.GetChildStudyTypeList().then((res) => {
      this.ChildstudytypeList = res.data;
    });
    HelperService.GetLivingConditionList().then((res) => {
      this.LivingconditionList = res.data;
    });
  },
  methods: {
    BindDocDate(value) {
      this.ChildMonitoring.docdate = value;
    },
    AddDataGuardian(data) {
      this.ChildMonitoring.personid = data.personid;
      this.ChildMonitoring.personname = data.personname;
      this.ChildMonitoring.childunderguardianshipid =
        data.childunderguardianshipid;
      this.ChildMonitoring.guardianaddress = data.guardianaddress;
      this.ChildMonitoring.guardianname = data.guardianname;
      this.ChildMonitoring.guardianshiptypename = data.guardianshiptypename;
      this.ChildMonitoring.healthtypename = data.healthtypename;
      this.ChildMonitoring.oblastname = data.oblastname;
      this.ChildMonitoring.regionname = data.regionname;
      this.ChildMonitoring.decisionsdate = data.decisionsdate;
      this.ChildMonitoring.decisionsnumber = data.decisionsnumber;
      this.ChildGuardianshipModal = false;
    },
    UpcomingmonitoringDate(value) {
      this.ChildMonitoring.upcomingmonitoringdate = value;
    },
    SelectedItemGuardian(data) {
      this.childguardianshipvalue = data;
    },
    OpenChildGuardianshipModal() {
      this.ChildGuardianshipModal = true;
    },
    DecisionsdateDate(value) {
      this.ChildMonitoring.decisionsdate = value;
    },
    SaveData() {
      ChildMonitoringService.Update(this.ChildMonitoring)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `childmonitoring` });
        })
        .catch((err) => {
          this.$makeToast(this.$t(err.response.data.error), "danger");
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
