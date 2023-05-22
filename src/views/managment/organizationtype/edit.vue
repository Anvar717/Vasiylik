<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="2" lg="2"></b-col>
      <b-col sm="12" md="8" lg="8">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("code") }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('code')"
                v-model="OrganizationType.Code"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("shortname")
            }}</label>
            <div class="col-sm-7">
             <b-input-group>
                <b-form-input
                  :placeholder="$t('shortname')"
                  v-model="OrganizationType.Shortname"
                />
                <b-input-group-append>
                  <b-button variant="primary" @click="OpenTranslateModal('shortname')"> <feather-icon icon="GlobeIcon"></feather-icon> </b-button>
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
                  :placeholder="$t('shortname')"
                  v-model="OrganizationType.Fullname"
                />
                <b-input-group-append>
                  <b-button variant="primary" @click="OpenTranslateModal('shortname')"> <feather-icon icon="GlobeIcon"></feather-icon> </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("state") }}</label>
            <div class="col-sm-7">
              <v-select
                :options="StateList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="OrganizationType.Stateid"
              ></v-select>
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col sm="12" md="2" lg="2"></b-col>
    </b-row>
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
     <b-modal size="lg" :title="$t('Translates')" v-model="TranslateModal" hide-footer no-close-on-backdrop>
      <b-table :fields="TranslateFields" :items="TranslateItems" responsive="sm" striped bordered small >
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
              <b-button variant="primary" @click="AddTranslate"> <feather-icon icon="PlusIcon"></feather-icon> </b-button>
            </b-td>
          </b-tr>
        </template>
        <template #cell(translatetext)="{item}">
          <b-form-input
              :placeholder="$t('fullname')"
              v-model="item.translatetext"
            />
        </template>
      </b-table>
      <b-row>
        <b-col class="text-right">
          <b-button @click="TranslateModal = false" variant="success"> {{ $t('Save') }} </b-button>
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
  BTd
} from "bootstrap-vue";
import OrganizationTypeService from "@/services/managment/organizationtype.service";
import Ripple from "vue-ripple-directive";
import HelperService from "@/services/others/helper.service";
import flatPickr from "vue-flatpickr-component";
import FeatherIcon from "@/@core/components/feather-icon/FeatherIcon.vue";
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
    FeatherIcon,
    BInputGroupAppend,
    BInputGroup,
    BTr,
    BTd
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      isChange: false,
      OrganizationType: {},
      StateList: [],
       TranslateFields : [
        { key : 'languagename', label : this.$t('languagename'),class : 'text-center' },
        { key : 'translatetext', label : this.$t('translatetext'),class : 'text-center' },
        { key : 'actions', label : this.$t('actions'),thClass : 'text-center' }
      ],
        TranslateItem : {
        tableid : 0,
        tablerowid : 0,
        languageid : 0,
        languagename : "",
        columnname : "",
        translatetext : ""
      },
       TranslateItems : [],
       LanguageList: [],
      TranslateModal : false,
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    OrganizationTypeService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.OrganizationType = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    HelperService.GetStateList().then((res) => {
      this.StateList = res.data;
    });
     HelperService.GetAllLanguage().then(res => {
        this.LanguageList = res.data
      })
  },
  directives: {
    Ripple,
  },
  methods: {
     ChangeTranslate(){
      this.TranslateItem.languagename = !!this.TranslateItem.languageid ? this.LanguageList.filter(item => item.id == this.TranslateItem.languageid)[0].fullname : ""
    },
    clearLangTable(columnname){
      this.TranslateItem = {
        tableid : 0,
        tablerowid : 0,
        languageid : 0,
        languagename : "",
        columnname : columnname,
        translatetext : ""
      }
    },
     AddTranslate(){
      if(
        this.TranslateItem.languageid === null || 
        this.TranslateItem.languageid === undefined || 
        this.TranslateItem.languageid === 0 || 
        this.TranslateItem.languageid === "" 
      )
      {
        this.$makeToast(this.$t('notSelectLang'),'danger')
        return false
      }
      if(this.OrganizationType.Translates.filter(item => item.languageid === this.TranslateItem.languageid && item.columnname == this.TranslateItem.columnname).length > 0){
        this.$makeToast(this.$t('AlreadySelectLang'),'danger')
        return false
      }
      this.OrganizationType.Translates.push(this.TranslateItem)
      this.GetTranslateItems(this.TranslateItem.columnname)
      this.clearLangTable(this.TranslateItem.columnname)
    },
   OpenTranslateModal(columnname){
      this.TranslateModal = true
      this.GetTranslateItems(columnname)
      this.clearLangTable(columnname)
    },
     GetTranslateItems(columnname){
      this.TranslateItems = this.OrganizationType.Translates.filter(item => item.columnname == columnname)
    },
    check() {
      if (
        this.OrganizationType.Code === 0 ||
        this.OrganizationType.Code === null ||
        this.OrganizationType.Code === undefined ||
        this.OrganizationType.Code === ""
      ) {
        this.$makeToast(this.$t("codeNotSelected"), "danger");
        return false;
      }
      if (
        this.OrganizationType.Shortname === 0 ||
        this.OrganizationType.Shortname === null ||
        this.OrganizationType.Shortname === undefined ||
        this.OrganizationType.Shortname === ""
      ) {
        this.$makeToast(this.$t("shortnameNotSelected"), "danger");
        return false;
      }
      if (
        this.OrganizationType.Fullname === 0 ||
        this.OrganizationType.Fullname === null ||
        this.OrganizationType.Fullname === undefined ||
        this.OrganizationType.Fullname === ""
      ) {
        this.$makeToast(this.$t("fullnameNotSelected"), "danger");
        return false;
      }
      if (
        this.OrganizationType.Stateid === 0 ||
        this.OrganizationType.Stateid === null ||
        this.OrganizationType.Stateid === undefined ||
        this.OrganizationType.Stateid === ""
      ) {
        this.$makeToast(this.$t("stateNotSelected"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      OrganizationTypeService.Update(this.OrganizationType)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `organizationtype` });
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
