<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("shortname")
            }}</label>
            <div class="col-sm-7">
              <b-input-group>
                <b-form-input
                  :placeholder="$t('shortname')"
                  v-model="Organization.ShortName"
                />
                <b-input-group-append>
                  <b-button
                    variant="primary"
                    @click="OpenTranslateModal('shortname')"
                  >
                    <feather-icon icon="GlobeIcon"></feather-icon>
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("fullname")
            }}</label>
            <div class="col-sm-7">
              <b-input-group>
                <b-form-input
                  :placeholder="$t('fullname')"
                  v-model="Organization.FullName"
                />
                <b-input-group-append>
                  <b-button
                    variant="primary"
                    @click="OpenTranslateModal('fullname')"
                  >
                    <feather-icon icon="GlobeIcon"></feather-icon>
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("inn") }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('inn')"
                v-model="Organization.INN"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("OblastID")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="OblastList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                @input="ChangeRegion"
                v-model="Organization.OblastID"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("RegionID")
            }}</label>
            <div class="col-sm-7">
              <v-select
                @input="ChangeMfy"
                :options="RegionList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Organization.RegionID"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("ZipCode")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('ZipCode')"
                v-model="Organization.ZipCode"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("address")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('address')"
                v-model="Organization.Adress"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("ContactInfo")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                v-mask="'+998-##-###-##-##'"
                :placeholder="$t('ContactInfo')"
                v-model="Organization.ContactInfo"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("Director")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('Director')"
                v-model="Organization.Director"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("Accounter")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('Accounter')"
                v-model="Organization.Accounter"
              />
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("Cashier")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('Cashier')"
                v-model="Organization.Cashier"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("website")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('website')"
                v-model="Organization.website"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("SchoolGroupContingent")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="SchoolGroupContingentList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Organization.schoolgroupcontingentid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("OrganizationType")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="OrganizationTypeList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Organization.organizationtypeid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("SchoolType")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="SchoolTypeList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Organization.schooltypeid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("SchoolLegalForm")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="SchoolLegalFormList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Organization.schoollegalformid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("Oked") }}</label>
            <div class="col-sm-7">
              <v-select
                :options="OkedList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="fullname"
                v-model="Organization.okedid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("mfy") }}</label>
            <div class="col-sm-7">
              <v-select
                :options="MfyList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Organization.mfyid"
              ></v-select>
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("foundationdate")
            }}</label>
            <div class="col-sm-7">
              <date-picker
                style="width: 100%"
                v-model="Organization.foundationdate"
                value-type="format"
                v-mask="'##.##.####'"
                format="DD.MM.YYYY"
                :placeholder="$t('foundationdate')"
              ></date-picker>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("foundationdocument")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('foundationdocument')"
                v-model="Organization.foundationdocument"
              />
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <!-- <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("parentorganizationname")
                }}</label>
                <div class="col-sm-7">
                  <b-form-input
                    :placeholder="$t('parentorganizationname')"
                    v-model="Organization.parentorganizationname"
                  />
                </div>
              </div>
            </b-col> -->
             <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("parentorganizationname")
                }}</label>
                <div class="col-sm-7">
                  <v-select
                    :options="OrganizationList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="Organization.parentid"
                  ></v-select>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("state")
                }}</label>
                <div class="col-sm-7">
                  <v-select
                    :options="StateList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="Organization.StateID"
                  ></v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("isreconstructed")
                }}</label>
                <div class="col-sm-7">
                  <b-form-checkbox
                    v-model="Organization.isreconstructed"
                    class="mr-0 mt-50"
                    name="is-rtl"
                    switch
                    inline
                  />
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("isfamilyorphanage")
                }}</label>
                <div class="col-sm-7">
                  <b-form-checkbox
                    v-model="Organization.isfamilyorphanage"
                    class="mr-0 mt-50"
                    name="is-rtl"
                    switch
                    inline
                  />
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("bedcount")
                }}</label>
                <div class="col-sm-7">
                  <b-form-input
                    :placeholder="$t('bedcount')"
                    v-model="Organization.bedcount"
                  />
                </div>
              </div>
            </b-col>
            <b-col></b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col sm="12" md="6" lg="6" class="text-left"> </b-col>
            <b-col sm="12" md="6" lg="6" class="text-right">
              <b-button @click="SaveData" size="sm" variant="outline-success">
                <feather-icon icon="CheckIcon"></feather-icon> {{ $t("Save") }}
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      size="lg"
      :title="$t('Translates')"
      v-model="TranslateModal"
      hide-footer
      no-close-on-backdrop
    >
      <b-table
        :fields="TranslateFields"
        :items="TranslateItems"
        responsive="sm"
        striped
        bordered
        small
      >
        <template v-slot:thead-top>
          <b-tr>
            <b-td>
              <v-select
                :options="LanguageList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="fullname"
                v-model="TranslateItem.languageid"
                @input="ChangeTranslate"
              ></v-select>
            </b-td>
            <b-td>
              <b-form-input
                :placeholder="$t('fullname')"
                v-model="TranslateItem.translatetext"
              />
            </b-td>
            <b-td class="text-center">
              <b-button variant="primary" @click="AddTranslate">
                <feather-icon icon="PlusIcon"></feather-icon>
              </b-button>
            </b-td>
          </b-tr>
        </template>
        <template #cell(translatetext)="{ item }">
          <b-form-input
            :placeholder="$t('fullname')"
            v-model="item.translatetext"
          />
        </template>
      </b-table>
      <b-row>
        <b-col class="text-right">
          <b-button @click="TranslateModal = false" variant="success">
            {{ $t("Save") }}
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
  BInputGroupAppend,
  BInputGroup,
  BTr,
  BTd,
} from "bootstrap-vue";

import OrganizationService from "@/services/managment/organization.service";
import OblastService from "@/services/info/oblast.service";
import MfyServicce from "@/services/info/mfy.service";
import SchoolSubjectService from "@/services/info/schoolsubject.service";
import SchoolGroupContingentService from "@/services/info/schoolgroupcontingent.service";
import RegionService from "@/services/info/region.service";
import SchoolLegalFormService from "@/services/info/schoollegalform.service";
import OrganizationTypeListService from "@/services/managment/organizationtype.service";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import HelperService from "@/services/others/helper.service";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import SchoolTypeService from "@/services/info/schooltype.service";
import OkedService from "@/services/info/oked.service";
import { t } from "@/@core/libs/i18n/utils";
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
    BInputGroupAppend,
    BInputGroup,
    BTr,
    BTd,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      Organization: {},
      OblastList: [],
      RegionList: [],
      OrganizationTypeList: [],
      SchoolTypeList: [],
      SchoolLegalFormList: [],
      SchoolGroupContingentList: [],
      MfyList: [],
      SchoolSubjectList: [],
      OkedList: [],
      StateList: [],
      OrganizationList: [],
      TranslateFields: [
        {
          key: "languagename",
          label: this.$t("languagename"),
          class: "text-center",
        },
        {
          key: "translatetext",
          label: this.$t("translatetext"),
          class: "text-center",
        },
        { key: "actions", label: this.$t("actions"), thClass: "text-center" },
      ],
      TranslateItem: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: "",
      },
      TranslateItems: [],
      LanguageList: [],
      TranslateModal: false,
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    OrganizationService.Get(this.$route.params.id, "")
      .then((res) => {
        this.show = false;
        this.Organization = res.data;
        RegionService.GetAll(this.lang, this.Organization.OblastID).then(
          (res) => {
            this.RegionList = res.data;
          }
        );
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
    });
    OrganizationTypeListService.GetAll(this.lang).then((res) => {
      this.OrganizationTypeList = res.data;
    });
    SchoolTypeService.GetAll(this.lang).then((res) => {
      this.SchoolTypeList = res.data;
    });
    OkedService.GetAll(this.lang).then((res) => {
      this.OkedList = res.data;
    });
    SchoolLegalFormService.GetAll(this.lang).then((res) => {
      this.SchoolLegalFormList = res.data;
    });
    SchoolGroupContingentService.GetAll(this.lang).then((res) => {
      this.SchoolGroupContingentList = res.data;
    });
    SchoolSubjectService.GetAll(
      this.lang,
      this.Organization.schoolsubjectgroupid
    ).then((res) => {
      this.SchoolSubjectList = res.data;
    });
    HelperService.GetStateList(this.lang, this.Organization.RegionId).then(
      (res) => {
        this.StateList = res.data;
      }
    );
    HelperService.GetAllLanguage().then((res) => {
      this.LanguageList = res.data;
    });
    OrganizationService.GetAll(this.oblastid , this.regionid , this.isfarmfy).then((res)=>{
      this.OrganizationList = res.data;
    });
  },

  directives: {
    Ripple,
  },
  methods: {
    ChangeTranslate() {
      this.TranslateItem.languagename = !!this.TranslateItem.languageid
        ? this.LanguageList.filter(
            (item) => item.id == this.TranslateItem.languageid
          )[0].fullname
        : "";
    },
    clearLangTable(columnname) {
      this.TranslateItem = {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: columnname,
        translatetext: "",
      };
    },
    AddTranslate() {
      if (
        this.TranslateItem.languageid === null ||
        this.TranslateItem.languageid === undefined ||
        this.TranslateItem.languageid === 0 ||
        this.TranslateItem.languageid === ""
      ) {
        this.$makeToast(this.$t("notSelectLang"), "danger");
        return false;
      }
      if (
        this.Organization.Translates.filter(
          (item) =>
            item.languageid === this.TranslateItem.languageid &&
            item.columnname == this.TranslateItem.columnname
        ).length > 0
      ) {
        this.$makeToast(this.$t("AlreadySelectLang"), "danger");
        return false;
      }
      this.Organization.Translates.push(this.TranslateItem);
      this.GetTranslateItems(this.TranslateItem.columnname);
      this.clearLangTable(this.TranslateItem.columnname);
    },
    OpenTranslateModal(columnname) {
      this.TranslateModal = true;
      this.GetTranslateItems(columnname);
      this.clearLangTable(columnname);
    },
    GetTranslateItems(columnname) {
      this.TranslateItems = this.Organization.Translates.filter(
        (item) => item.columnname == columnname
      );
    },
    ChangeMfy() {
      MfyServicce.GetAll(this.lang, this.Organization.regionid).then((res) => {
        this.MfyList = res.data;
      });
    },
    ChangeRegion() {
      this.Organization.RegionID = 0;
      RegionService.GetAll(this.lang, this.Organization.OblastID).then(
        (res) => {
          this.RegionList = res.data;
        }
      );
    },
    ChangeRegionTable() {
      RegionService.GetAll(this.lang, this.tabrow3.oblastid).then((res) => {
        this.RegionList = res.data;
      });
    },
    ChangeMfyTable() {
      MfyServicce.GetAll(this.lang, this.tabrow3.regionid).then((res) => {
        this.MfyList = res.data;
      });
    },
    makeToast(message, variant) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: message,
          icon: variant == "success" ? "CheckSquareIcon" : "AlertTriangleIcon",
          variant: variant,
        },
      });
    },
    // check() {
    //   if (
    //     this.SchoolAdmissionQuota.ondate === 0 ||
    //     this.SchoolAdmissionQuota.ondate === null ||
    //     this.SchoolAdmissionQuota.ondate === undefined ||
    //     this.SchoolAdmissionQuota.ondate === ""
    //   ) {
    //     this.$makeToast(this.$t("ondateNotSelected"), "danger");
    //     return false;
    //   }
    //   if (
    //     this.SchoolAdmissionQuota.schoolyearid === 0 ||
    //     this.SchoolAdmissionQuota.schoolyearid === null ||
    //     this.SchoolAdmissionQuota.schoolyearid === undefined ||
    //     this.SchoolAdmissionQuota.schoolyearid === ""
    //   ) {
    //     this.$makeToast(this.$t("schoolyearNotSelected"), "danger");
    //     return false;
    //   }
    //   if (
    //     this.SchoolAdmissionQuota.oblastid === 0 ||
    //     this.SchoolAdmissionQuota.oblastid === null ||
    //     this.SchoolAdmissionQuota.oblastid === undefined ||
    //     this.SchoolAdmissionQuota.oblastid === ""
    //   ) {
    //     this.$makeToast(this.$t("oblastNotSelected"), "danger");
    //     return false;
    //   }
    //   if (
    //     this.SchoolAdmissionQuota.regionid === 0 ||
    //     this.SchoolAdmissionQuota.regionid === null ||
    //     this.SchoolAdmissionQuota.regionid === undefined ||
    //     this.SchoolAdmissionQuota.regionid === ""
    //   ) {
    //     this.$makeToast(this.$t("regionNotSelected"), "danger");
    //     return false;
    //   }
    //   if (
    //     this.SchoolAdmissionQuota.organizationid === 0 ||
    //     this.SchoolAdmissionQuota.organizationid === null ||
    //     this.SchoolAdmissionQuota.organizationid === undefined ||
    //     this.SchoolAdmissionQuota.organizationid === ""
    //   ) {
    //     this.$makeToast(this.$t("organizationNotSelected"), "danger");
    //     return false;
    //   }
    //   return true;
    // },
    SaveData() {
      // if (!this.check()) {
      //     return false;
      // }
      OrganizationService.Update(this.Organization)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: "organization" });
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
