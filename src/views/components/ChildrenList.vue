<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <b-card>
          <b-row>
            <b-col sm="12" md="2" lg="3">
              <label>{{ $t("identitydocument") }}</label>
              <div>
                <v-select
                  :options="identityDocumentList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.identityDocumentId"
                ></v-select>
              </div>
            </b-col>
            <b-col sm="12" md="1" lg="2">
              <label>{{ $t("documentseries") }}</label>
              <div>
                <v-select
                  v-if="filter.identityDocumentId == 1"
                  :options="DocumentSeriesList"
                  :reduce="(item) => item.name"
                  label="name"
                  :placeholder="$t('documentseries')"
                  v-model="filter.documentSeries"
                >
                </v-select>
                <b-form-input
                  class="text-upper"
                  v-if="filter.identityDocumentId != 1"
                  :placeholder="$t('AA')"
                  v-model="filter.documentSeries"
                  v-mask="'AA'"
                />
              </div>
            </b-col>
            <b-col sm="12" md="2" lg="2">
              <label>{{ $t("documentnumber") }}</label>
              <div>
                <b-form-input
                  :placeholder="$t('documentnumber')"
                  v-model="filter.documentNumber"
                  v-mask="'#######'"
                />
              </div>
            </b-col>

            <b-col sm="12" md="2" lg="2">
              <label>{{ $t("dateofbirth") }}</label>
              <div>
                <custom-date-picker
                  v-model="filter.dateOfBirth"
                  @keyup="BindValue"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('dateofbirth')"
                >
                </custom-date-picker>
              </div>
            </b-col>
            <b-col sm="12" md="2" lg="2">
              <label for=""></label>
              <div style="margin-top: 2px">
                <b-button @click="getpersondata" variant="primary">
                  <feather-icon v-if="!SearchLoading" icon="SearchIcon" />
                  <b-spinner v-if="SearchLoading" small></b-spinner>
                  {{ $t("search") }}
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("familyname") }} <span style="color: red">*</span></label
            >
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('familyname')"
                v-model="Person.familyname"
                disabled
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("firstname") }} <span style="color: red">*</span></label
            >
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('firstname')"
                v-model="Person.firstname"
                disabled
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("lastname")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('lastname')"
                v-model="Person.lastname"
                disabled
              />
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("dateofbirth") }} <span style="color: red">*</span></label
            >
            <div class="col-sm-7">
              <date-picker
                style="width: 100%"
                v-model="Person.dateofbirth"
                value-type="format"
                format="DD.MM.YYYY"
                :placeholder="$t('dateofbirth')"
                disabled
              ></date-picker>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("Country")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="CountryList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Person.birthcountryid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("oblast")
            }}</label>
            <div class="col-sm-7">
              <v-select
                @input="ChangeOblast"
                :options="birthoblastlist"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Person.birthoblastid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("region")
            }}</label>
            <div class="col-sm-7">
              <v-select
                @input="ChangeRegion"
                :options="birthregionlist"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Person.birthregionid"
              ></v-select>
            </div>
          </div>
        </b-card>
      </b-col>

      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("gender") }} <span style="color: red">*</span></label
            >
            <div class="col-sm-7">
              <v-select
                :options="GenderList"
                :reduce="(item) => item.id"
                disabled
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Person.genderid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("nationality") }} <span style="color: red">*</span></label
            >
            <div class="col-sm-7">
              <v-select
                :options="nationalitylist"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Person.nationalityid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("citizenship") }} <span style="color: red">*</span></label
            >
            <div class="col-sm-7">
              <v-select
                :options="CountryList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Person.citizenshipid"
                disabled
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("inn") }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('inn')"
                v-model="Person.inn"
                v-mask="'#########'"
                disabled
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("pinfl") }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('pinfl')"
                v-model="Person.pinfl"
                v-mask="'############## '"
                disabled
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("contactinfo")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                v-mask="'+998-9#-###-##-##'"
                :placeholder="$t('contactinfo')"
                v-model="Person.contactinfo"
              />
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col>
        <b-tabs content-class="mt-3">
          <b-tab :title="$t('DocumentTables')" active
            ><b-table :fields="fields" :items="Person.DocumentTables"> </b-table
          ></b-tab>
          <b-tab :title="$t('LivePlaceTables')">
            <b-table
              :fields="fieldsPlace"
              :items="Person.LivePlaceTables"
              small
              class="text-center"
              :tbody-tr-class="rowClass"
            >
            </b-table>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
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
  BFormCheckbox,
  VBTooltip,
  BModal,
  VBModal,
  BCardText,
  BSpinner,
} from "bootstrap-vue";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import PersonService from "@/services/info/person.service";
import HelperService from "@/services/others/helper.service";
import CountryService from "@/services/info/country.service";
import IdentityDocumentService from "@/services/info/identitydocument.service";
import OblastService from "@/services/info/oblast.service";
import RegionService from "@/services/info/region.service";
import MfyService from "@/services/info/mfy.service";
import NationalityService from "@/services/info/nationality.service";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
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
    BFormCheckbox,
    BModal,
    BCardText,
    BSpinner,
    CustomDatePicker,
  },
  props: {
    PersonData: {
      familyname: "",
      firstname: "",
      lastname: "",
      dateofbirth: "",
      genderid: "",
      nationalityid: "",
      citizenshipid: "",
      inn: "",
      pinfl: "",
      contactinfo: "",
      birthcountryid: "",
      birthoblastid: "",
      birthregionid: "",
      birthmfyid: "",
      birthaddress: "",
      isstudent: true,
      PersonRelativeTables: [],
      LivePlaceTables: [],
      DocumentTables: [],
    },
    iscomponent: {
      type: Boolean,
      default: false,
    },
    isStudent: {
      type: Boolean,
      default: true,
    },
    model: {
      prop: "PersonData",
      event: "persondatachange",
    },
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      DocumentSeriesList: [],
      nationalitylist: [],
      CountryList: [],
      filter: {
        documentSeries: "",
        documentNumber: "",
        pinfl: "",
        dateOfBirth: "",
        isStudent: true,
        INN: "",
        identityDocumentId: 0,
      },
      birthoblastlist: [],
      birthregionlist: [],
      birthmfylist: [],
      DocumentTables: [],
      LivePlaceTables: [],
      GenderList: [],
      lang: localStorage.getItem("locale") || "ru",
      config: {
        dateFormat: "d.m.Y",
      },
      identityDocumentList: [],
      SearchLoading: false,
      fieldsPlace: [
        {
          key: "ondate",
          label: this.$t("ondate"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "countryname",
          label: this.$t("countryname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "mfyname",
          label: this.$t("mfyname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "address",
          label: this.$t("address"),
          thClass: "text-center",
          sortable: true,
        },
        // {
        //   key: "statename",
        //   label: this.$t("statename"),
        //   thClass: "text-center",
        //   sortable: true,
        // },
        // {
        //   key: "actions",
        //   label: this.$t("actions"),
        //   thClass: "text-center",
        //   sortable: true,
        // },
      ],
      fields: [
        {
          key: "ondate",
          label: this.$t("ondate"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "identitydocumentname",
          label: this.$t("identitydocument"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "dateofissue",
          label: this.$t("dateofissue"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "dateofexpire",
          label: this.$t("dateofexpire"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "issueorganization",
          label: this.$t("issueorganization"),
          thClass: "text-center",
          sortable: true,
        },
        // {
        //   key: "statename",
        //   label: this.$t("state"),
        //   thClass: "text-center",
        //   sortable: true,
        // },
      ],
      personcopy: {},
    };
  },

  computed: {
    Person: {
      get: function () {
        return this.personcopy.familyname ? this.personcopy : this.PersonData;
      },
      set: function (value) {
        this.personlocal = value;
        this.$emit("persondatachange", value);
        //this.person.countryid = 211;
      },
    },
  },
  created() {
    this.filter.isStudent = this.isStudent;
    this.lang = localStorage.getItem("locale") || "ru";
    IdentityDocumentService.GetAll(this.lang, true).then((res) => {
      this.identityDocumentList = res.data.result;
    });
    HelperService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocumentSeriesList = res.data;
    });
    OblastService.GetAll(this.lang).then((res) => {
      this.birthoblastlist = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.GenderList = res.data;
    });
    CountryService.GetAll(this.lang).then((res) => {
      this.CountryList = res.data;
    });
    NationalityService.GetAll(this.lang).then((res) => {
      this.nationalitylist = res.data;
    });
    console.log("component" + this.PersonData);
  },
  directives: {
    Ripple,
  },
  methods: {
    getpersondata() {
      this.SearchLoading = true;
      if (this.filter.identityDocumentId != 1) {
        this.filter.documentSeries = this.filter.documentSeries.toUpperCase();
      }
      PersonService.GetFromGovData(
        this.filter.documentSeries,
        this.filter.documentNumber,
        this.filter.pinfl,
        this.filter.dateOfBirth,
        this.filter.isStudent,
        this.filter.INN,
        this.filter.identityDocumentId
      )
        .then((res) => {
          this.SearchLoading = false;
          this.personcopy = res.data;
          console.log(res.data);
          this.DocumentTables = res.data.DocumentTables;
          this.LivePlaceTables = res.data.LivePlaceTables;
          this.getRegionList();
          this.$emit("persondatachange", res.data);
        })
        .catch((error) => {
          this.SearchLoading = false;
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    BindValue(value) {
      this.filter.dateOfBirth = value;
    },
    rowClass(item, type) {
      if (item.Status === 3) return "d-none";
    },
    ChangeOblast() {
      this.Person.birthregionid = 0;
      this.getRegionList();
    },
    getRegionList() {
      if (!!this.Person.birthoblastid) {
        RegionService.GetAll(this.lang, this.Person.birthoblastid).then(
          (res) => {
            this.birthregionlist = res.data;
          }
        );
      }
    },
    ChangeRegion() {
      if (!!this.Person.birthregionid) {
        MfyService.GetAll(this.lang, this.Person.birthregionid).then((res) => {
          this.birthmfylist = res.data;
        });
      }
    },
    ChangeOblastTable() {
      RegionService.GetAll(this.lang, this.tabrow2.oblastid).then((res) => {
        this.birthregionlist = res.data;
      });
    },
    ChangeOblastListTable() {
      RegionService.GetAll(this.lang, this.tabrow3.oblastid).then((res) => {
        this.RegionList = res.data;
      });
    },
    ChangeRegionTable() {
      MfyService.GetAll(this.lang, this.tabrow2.regionid).then((res) => {
        this.birthmfylist = res.data;
      });
    },
    ChangeRegionListTable() {
      MfyService.GetAll(this.lang, this.tabrow3.regionid).then((res) => {
        this.MfyList = res.data;
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
.text-upper {
  text-transform: uppercase;
}
</style>
