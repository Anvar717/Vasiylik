<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col sm="12" md="6" lg="3">
          <label for=""> {{ $t("docnumber") }} </label>
          <b-form-input
            v-model="ChildOrphanageMovement.docnumber"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label for=""> {{ $t("docdate") }} </label>
          <custom-date-picker
            v-model="ChildOrphanageMovement.docdate"
            @keyup="Binddocdate"
            format="DD.MM.YYYY"
            type="date"
            :clearable="false"
            :placeholder="$t('docdate')"
          >
          </custom-date-picker>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label for=""> {{ $t("childexpulsiontype") }} </label>
          <v-select
            :options="ChildExplusionTypeList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            v-model="ChildOrphanageMovement.childexpulsiontypeid"
          ></v-select>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label for=""> {{ $t("detailinfo") }} </label>
          <b-form-textarea
            v-model="ChildOrphanageMovement.detailinfo"
          ></b-form-textarea>
        </b-col>
      </b-row>
    </b-card>
    <!-- <b-card>
      <b-row>
        <b-col>
          <h4>{{ $t("fromorganization") }}</h4>
          <hr />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="6" lg="3">
          <label for=""> {{ $t("Oblast") }} </label>
          <v-select
            :options="FromOblastList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            v-model="ChildOrphanageMovement.fromoblastid"
            @input="ChangeFromOblast"
          ></v-select>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label for=""> {{ $t("Region") }} </label>
          <v-select
            :options="FromRegionList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            v-model="ChildOrphanageMovement.fromregionid"
            @input="ChangeFromRegion"
          ></v-select>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label for=""> {{ $t("Organization") }} </label>
          <v-select
            :options="FromOrganizationList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            v-model="ChildOrphanageMovement.fromorganizationid"
            @input="ChangeFromRegion"
          ></v-select>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <label for=""> {{ $t("fromchildregistrationact") }} </label>
          <b-input-group>
            <b-form-input
              v-model="ChildOrphanageMovement.personname"
              disabled
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="OpenChildRegActModal">
                <feather-icon icon="MoreHorizontalIcon"></feather-icon>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </b-card> -->
    <b-card>
      <b-row>
        <b-col sm="12" md="6" lg="3" class="mt-1">
          <label for=""> {{ $t('person') }} </label>
          <b-input-group>
            <b-form-input v-model="ChildOrphanageMovement.personname" disabled></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="OpenChildRegActModal"> <feather-icon icon="MoreHorizontalIcon"></feather-icon> </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-row>
        <b-col>
          <h4>{{ $t("toorganization") }}</h4>
          <hr />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="6" lg="3" class="mt-1">
          <label for=""> {{ $t("Oblast") }} </label>
          <v-select
            :options="ToOblastList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            v-model="ChildOrphanageMovement.tooblastid"
            @input="ChangeToOblast"
          ></v-select>
        </b-col>
        <b-col sm="12" md="6" lg="3" class="mt-1">
          <label for=""> {{ $t('Region') }} </label>
          <v-select
            :options="ToRegionList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            v-model="ChildOrphanageMovement.toregionid"
            @input="ChangeToRegion"
          ></v-select>
        </b-col>
        <b-col sm="12" md="6" lg="3" class="mt-1">
          <label for=""> {{ $t('Organization') }} </label>
          <v-select
            :options="ToOrganizationList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            v-model="ChildOrphanageMovement.toorganizationid"
          ></v-select>
        </b-col>
        
      </b-row>
    </b-card>

    <b-row class="mt-1" v-if="ChildOrphanageMovement.CanSave">
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
  BSpinner,
  BPagination,
  BFormTextarea
} from "bootstrap-vue";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import ChildOrphanageMovementService from "@/services/document/childorphanagemovement.service";
import OblastService from "@/services/info/oblast.service";
import RegionService from "@/services/info/region.service";
import OrganizationService from "@/services/managment/organization.service";
import ChildExpulsionTypeService from "@/services/info/childexpulsiontype.service";
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
    BPagination,ChildRegistrationActComponent,BFormTextarea
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      ChildRegActModal: false,
      show: false,
      items: [],
      ChildOrphanageMovement: {},
      FromOblastList: [],
      FromRegionList: [],
      FromOrganizationList: [],
      ToOblastList: [],
      ToRegionList: [],
      ToOrganizationList: [],
      ChildexpulsiontypeList: [],
      FromChildRegistrationactList: [],
      ToChildRegistrationactList: [],
      SearchFamilyLoading: false,
      ChildOrphanageMovementModal: false,
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
      childregactvalue : {},
      ChildExplusionTypeList : []
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    ChildOrphanageMovementService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.ChildOrphanageMovement = res.data;
        this.ChangeToOblast()
        this.ChangeToRegion()
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    OblastService.GetAll(this.lang).then((res) => {
      this.FromOblastList = res.data;
      this.ToOblastList = res.data;
    });
    ChildExpulsionTypeService.GetAll(this.lang,true).then((res) => {
      this.ChildExplusionTypeList = res.data;
    });
  },
  methods: {
    AddData(data){
      this.ChildOrphanageMovement.personid = data.personid
      this.ChildOrphanageMovement.personname = data.personname
      this.ChildOrphanageMovement.fromchildregistrationactid = data.childregistrationactid
      this.ChildRegActModal = false
    },
    Bindexpulsiondate(data){
      this.ChildOrphanageMovement.expulsiondate = data
    },
    OpenChildRegActModal(){
      this.ChildRegActModal = true
    },
    SelectedItem(data) {
      this.childregactvalue = data;
    },
    ChangeFromOblast() {
      if (!!this.ChildOrphanageMovement.fromoblastid) {
        RegionService.GetAll(
          this.lang,
          this.ChildOrphanageMovement.fromoblastid
        ).then((res) => {
          this.FromRegionList = res.data;
        });
      }
    },
    ChangeFromRegion() {
      if (!!this.ChildOrphanageMovement.fromregionid) {
        OrganizationService.GetAll(
          this.ChildOrphanageMovement.fromoblastid,
          this.ChildOrphanageMovement.fromregionid
        ).then((res) => {
          this.FromOrganizationList = res.data;
        });
      }
    },
    ChangeToOblast() {
      if (!!this.ChildOrphanageMovement.tooblastid) {
        RegionService.GetAll(
          this.lang,
          this.ChildOrphanageMovement.tooblastid
        ).then((res) => {
          this.ToRegionList = res.data;
        });
      }
    },
    ChangeToRegion() {
      if (!!this.ChildOrphanageMovement.toregionid) {
        OrganizationService.GetAll(
          this.ChildOrphanageMovement.tooblastid,
          this.ChildOrphanageMovement.toregionid
        ).then((res) => {
          this.ToOrganizationList = res.data;
        });
      }
    },
    Binddocdate(data) {
      this.ChildOrphanageMovement.docdate = data;
    },
    OpenChildOrphanageMovement() {
      this.ChildOrphanageMovementModal = true;
      this.Refresh();
    },
    SaveData() {
      if(
        this.ChildOrphanageMovement.docnumber == 0 ||
        this.ChildOrphanageMovement.docnumber === "" ||
        this.ChildOrphanageMovement.docnumber === undefined ||
        this.ChildOrphanageMovement.docnumber === null
      ){
        this.$makeToast(this.$t('docnumberNotSelected'),'danger')
        return false
      }
      if(
        this.ChildOrphanageMovement.docdate == 0 ||
        this.ChildOrphanageMovement.docdate === "" ||
        this.ChildOrphanageMovement.docdate === undefined ||
        this.ChildOrphanageMovement.docdate === null
      ){
        this.$makeToast(this.$t('docdateNotSelected'),'danger')
        return false
      }
      if(
        this.ChildOrphanageMovement.childexpulsiontypeid == 0 ||
        this.ChildOrphanageMovement.childexpulsiontypeid === "" ||
        this.ChildOrphanageMovement.childexpulsiontypeid === undefined ||
        this.ChildOrphanageMovement.childexpulsiontypeid === null
      ){
        this.$makeToast(this.$t('childexpulsiontypeNotSelected'),'danger')
        return false
      }
      if(
        this.ChildOrphanageMovement.tooblastid == 0 ||
        this.ChildOrphanageMovement.tooblastid === "" ||
        this.ChildOrphanageMovement.tooblastid === undefined ||
        this.ChildOrphanageMovement.tooblastid === null
      ){
        this.$makeToast(this.$t('tooblastNotSelected'),'danger')
        return false
      }
      if(
        this.ChildOrphanageMovement.toregionid == 0 ||
        this.ChildOrphanageMovement.toregionid === "" ||
        this.ChildOrphanageMovement.toregionid === undefined ||
        this.ChildOrphanageMovement.toregionid === null
      ){
        this.$makeToast(this.$t('toregionNotSelected'),'danger')
        return false
      }
      if(
        this.ChildOrphanageMovement.toorganizationid == 0 ||
        this.ChildOrphanageMovement.toorganizationid === "" ||
        this.ChildOrphanageMovement.toorganizationid === undefined ||
        this.ChildOrphanageMovement.toorganizationid === null
      ){
        this.$makeToast(this.$t('toorganizationNotSelected'),'danger')
        return false
      }
      if(
        this.ChildOrphanageMovement.personid == 0 ||
        this.ChildOrphanageMovement.personid === "" ||
        this.ChildOrphanageMovement.personid === undefined ||
        this.ChildOrphanageMovement.personid === null
      ){
        this.$makeToast(this.$t('personNotSelected'),'danger')
        return false
      }
      // if(
      //   this.ChildOrphanageMovement.expulsiondate == 0 ||
      //   this.ChildOrphanageMovement.expulsiondate === "" ||
      //   this.ChildOrphanageMovement.expulsiondate === undefined ||
      //   this.ChildOrphanageMovement.expulsiondate === null
      // ){
      //   this.$makeToast(this.$t('expulsiondateNotSelected'),'danger')
      //   return false
      // }
      ChildOrphanageMovementService.Update(this.ChildOrphanageMovement)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `childorphanagemovement` });
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
