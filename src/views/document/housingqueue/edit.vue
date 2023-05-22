<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col sm="12" md="12" lg="3">
          <label for>{{ $t("docnumber") }}</label>
          <b-form-input
            :placeholder="$t('docnumber')"
            v-model="HousingQueue.docnumber"
            disabled
          />
         <!-- <div class="mt-1">
            {{HousingQueue.docnumber}}
         </div> -->
        </b-col>
        <b-col sm="12" md="12" lg="3">
          <label for>{{ $t("docdate") }}</label>
          <b-form-input
            :placeholder="$t('docdate')"
            v-model="HousingQueue.docdate"
          />
        </b-col>
           <b-col v-if="HousingQueue.isorphan == true" sm="12" md="12" lg="3">
          <label for=""> {{ $t("childregistrationact") }} </label>
          <b-input-group>
            <b-form-input
              v-model="HousingQueue.personname"
              disabled
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="OpenChildRegActModal">
                <feather-icon icon="MoreHorizontalIcon"></feather-icon>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
          <b-col v-if="HousingQueue.isorphan == false" sm="12" md="12" lg="3">
          <label for=""> {{ $t("childguardianship") }} </label>
          <b-input-group>
            <b-form-input
              v-model="HousingQueue.personname"
              disabled
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="OpenChildGuardianshipModal">
                <feather-icon icon="MoreHorizontalIcon"></feather-icon>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </b-card>
    <!-- <b-card>
      <b-row>

      </b-row>
    </b-card> -->
    <b-card>
      <b-row>
          <b-col  sm="12" md="12" lg="3">
          <label for>{{ $t("housingoblast") }} </label>
          <v-select
            :options="HousingoblastList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            v-model="HousingQueue.housingoblastid"
            @input="ChangeHouseOblast"
          ></v-select>
        </b-col>
          <b-col  sm="12" md="12" lg="3">
          <label for>{{ $t("housingregion") }} </label>
          <v-select
            :options="HousingregionList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            v-model="HousingQueue.housingregionid"
            @input="ChangeHousingRegion"
          ></v-select>
        </b-col>
        <b-col sm="12" md="12" lg="3">
          <label for>{{ $t("DecisionMakingOrganization") }} </label>
          <v-select
            :options="OrganizationList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            v-model="HousingQueue.organizationid"
          ></v-select>
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
          <b-button variant="success" @click="AddDataGuardian(childguardianshipvalue)">
            {{ $t("Add") }}
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      v-model="ChildRegActModal"
      size="xl"
      hide-footer
      no-close-on-backdrop
    >
      <child-registration-act-component
        @row-selected="SelectedItem"
        @row-dblclick="AddData"
      ></child-registration-act-component>
      <b-row>
        <b-col class="text-center">
          <b-button
            variant="danger"
            @click="ChildRegActModal = false"
            class="mr-1"
          >
            {{ $t("close") }}
          </b-button>
          <b-button variant="success" @click="AddData(childregactvalue)">
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
  BPagination,
  BSpinner,
  BFormTextarea,
} from "bootstrap-vue";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import HousingQueueService  from "@/services/document/housingqueue.service";
import HelperService from "@/services/others/helper.service";
import IdentityDocumentService from "@/services/info/identitydocument.service";
import OrganizationService from "@/services/managment/organization.service";
import OblastService from "@/services/info/oblast.service";
import RegionService from "@/services/info/region.service";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import ChildUnderGuardianshipComponent from "@/views/components/ChildUnderGuardianshipComponent.vue";
import ChildRegistrationActComponent from "@/views/components/ChildRegistrationActComponent.vue";
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
    flatPickr,
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
    BPagination,
    BSpinner,
    BFormTextarea,
    ChildUnderGuardianshipComponent,
    ChildRegistrationActComponent
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      ChildRegActModal: false,
      ChildGuardianshipModal: false,
      show: false,
      isChange: false,
      items: [],
      HousingQueue: {},
      HousingoblastList: [],
      HousingregionList: [],
      OrganizationList: [],
      ChildorphanagemovementList: [],
      hasdecision: false,
      isBusy: false,
      SearchFamilyLoading: false,
      IdentityDocumentList: [],
      DocumentSeriesList: [],
      StateList: [],
      SearchLoading: false,
      fields: [
        {
          key: "selected",
        },
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
      childregactvalue: {},
      childguardianshipvalue: {},
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    HousingQueueService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.HousingQueue = res.data;
        this.ChangeHouseOblast();
        this.ChangeHousingRegion();
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    IdentityDocumentService.GetAll(this.lang, true).then((res) => {
      this.IdentityDocumentList = res.data.result;
    });
    HelperService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocumentSeriesList = res.data;
    });
     OblastService.GetAll(this.lang).then((res) => {
      this.HousingoblastList = res.data;
    });
    OrganizationService.GetAll(
      this.oblastid,
      this.regionid,
      this.isfarmfy
    ).then((res) => {
      this.OrganizationList = res.data;
    });
  },
  directives: {
    Ripple,
  },
  methods: {
    AddData(data) {
      this.HousingQueue.personid = data.personid;
      this.HousingQueue.personname = data.personname;
      this.HousingQueue.childregistrationactid =
        data.childregistrationactid;
      this.ChildRegActModal = false;
    },
    AddDataGuardian(data){
      this.HousingQueue.personid = data.personid;
      this.HousingQueue.personname = data.personname;
      this.HousingQueue.childunderguardianshipid =
        data.childunderguardianshipid;
      this.ChildGuardianshipModal = false;
    },
    ChangeHouseOblast(){
      if(!!this.HousingQueue.housingoblastid){
          RegionService.GetAll(this.lang,this.HousingQueue.housingoblastid).then((res)=>{
              this.HousingregionList = res.data;
          })
      }
    },
    ChangeHousingRegion(){
      if (!!this.HousingQueue.housingregionid) {
        OrganizationService.GetAll(
          this.HousingQueue.housingoblastid,
          this.HousingQueue.housingregionid
        ).then((res) => {
          this.OrganizationList = res.data;
        });
      }
    },
    SelectedItem(data) {
      this.childregactvalue = data;
    },
    SelectedItemGuardian(data) {
      this.childguardianshipvalue = data;
    },
    OpenChildRegActModal() {
      this.ChildRegActModal = true;
    },
    OpenChildGuardianshipModal(){
       this.ChildGuardianshipModal = true;
    },
    DateofBirthValue(value) {
      this.HousingQueue.dateofbirth = value;
    },
    SaveData() {
      HousingQueueService.Update(this.HousingQueue)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `housingqueue` });
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