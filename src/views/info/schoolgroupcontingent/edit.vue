<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("code") }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('code')"
                v-model="SchoolGroupContingent.code"
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
                  v-model="SchoolGroupContingent.shortname"
                />
                <b-input-group-append>
                  <b-button variant="primary" @click="OpenTranslateModal('shortname')"> <feather-icon icon="GlobeIcon"></feather-icon> </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("fullname")
            }}</label>
            <div class="col-sm-7">
               <b-input-group>
                <b-form-input
                  :placeholder="$t('fullname')"
                  v-model="SchoolGroupContingent.fullname"
                />
                <b-input-group-append>
                  <b-button variant="primary" @click="OpenTranslateModal('fullname')"> <feather-icon icon="GlobeIcon"></feather-icon> </b-button>
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
                v-model="SchoolGroupContingent.stateid"
              ></v-select>
            </div>
          </div>
          <!-- <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                        $t("educationlevel")
                    }}</label>
                    <div class="col-sm-7">
                        <b-form-input
                            :placeholder="$t('educationlevel')"
                            v-model="SchoolUniformDesignType.educationlevel"
                        />
                    </div>
                </div> -->
        </b-card>
      </b-col>
    </b-row>
    <!-- <b-row>
      <b-col>
        <b-card>
            <div class="d-flex justify-content-between">
              <h4 class="text-center m-0">
                <feather-icon size="15" icon="MapIcon"></feather-icon>
                {{ $t("map") }}
              </h4>
              <a class="text-primary" @click="OpenMapModal">
                <feather-icon icon="plus-circle"></feather-icon>
                {{ $t("MapPinIcon") }}
              </a>
            </div>
            
        </b-card>
      </b-col>
    </b-row> -->
    <!-- <div>
        <b-modal
                size="xl"
                v-model="MapModal"
                no-close-on-backdrop
                hide-footer
                :title="$t('map')"
              >
                <div style="width : 100%;height : 80vh">
                  <gmap-map
                    :center="center"
                    :zoom="8"
                    style="width:100%;height : 100%"
                    @click="myFunc"
                    map-type-id="hybrid"
                  >
                    <GmapMarker
                      :key="'three'"
                      :position="position"
                      :clickable="true"
                    >
                      <gmap-info-window
                        @closeclick="window_open1 = false"
                        :opened="window_open1"
                        :position="position"
                        :options="{
                          pixelOffset: {
                            width: 0,
                            height: 0,
                          },
                        }"
                      >
                        {{ StreetHouse.organizationname }}
                      </gmap-info-window>
                    </GmapMarker>
                  </gmap-map>
                </div>
                <b-row class="mt-1">
                  <b-col class="text-center">
                    <b-button
                      variant="outline-danger"
                      :ripple="false"
                      
                      @click="MapModal = false"
                      class="mr-1"
                      size="sm"
                    >
                      {{ $t("back") }}
                    </b-button>
                    <b-button
                      :variant="isChange ? 'primary' : 'outline-primary'"
                      
                      :ripple="false"
                      @click="isChange = !isChange"
                      class="mr-1"
                      size="sm"
                    >
                      {{ $t("Edit") }}
                    </b-button>
                    <b-button
                      variant="outline-success"
                      @click="AddMarker"
                      size="sm"
                    >
                      {{ $t("Save") }}
                    </b-button>
                  </b-col>
                </b-row>
              </b-modal>
      </div> -->
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
import SchoolGroupContingentService from "@/services/info/schoolgroupcontingent.service";
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
      // center: { lat: "", lng: "" },
      // window_open1: false,
      // MapModal: false,
      // position: {
      //   lat: "",
      //   lng: "",
      // },
      show: false,
      isChange: false,
      SchoolGroupContingent: {},
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
    SchoolGroupContingentService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.SchoolGroupContingent = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    HelperService.GetStateList().then((res1) => {
      this.StateList = res1.data;
    });
     HelperService.GetAllLanguage().then(res => {
        this.LanguageList = res.data
      })
    // StreetHouseService.Get(self.selectedrowid, (self.externalid = null)).then(
    //   (res) => {
    //     this.show = false;
    //     self.StreetHouse = res.data;
    //     if (res.data.latitude === 0) {
    //       (this.center.lat = 41), (this.center.lng = 69);
    //     } else {
    //       (this.center.lat = res.data.latitude),
    //         (this.center.lng = res.data.longitude);
    //     }
    //     (this.position.lat = res.data.latitude),
    //       (this.position.lng = res.data.longitude);
    //   }
    // );
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
      if(this.SchoolGroupContingent.Translates.filter(item => item.languageid === this.TranslateItem.languageid && item.columnname == this.TranslateItem.columnname).length > 0){
        this.$makeToast(this.$t('AlreadySelectLang'),'danger')
        return false
      }
      this.SchoolGroupContingent.Translates.push(this.TranslateItem)
      this.GetTranslateItems(this.TranslateItem.columnname)
      this.clearLangTable(this.TranslateItem.columnname)
    },
   OpenTranslateModal(columnname){
      this.TranslateModal = true
      this.GetTranslateItems(columnname)
      this.clearLangTable(columnname)
    },
     GetTranslateItems(columnname){
      this.TranslateItems = this.SchoolGroupContingent.Translates.filter(item => item.columnname == columnname)
    },
    // myFunc(el) {
    //   if (this.isChange) {
    //     (this.position.lat = el.latLng.lat()),
    //       (this.position.lng = el.latLng.lng());
    //   }
    // },
    // AddMarker() {
    //   this.StreetHouse.latitude = this.position.lat;
    //   this.StreetHouse.longitude = this.position.lng;
    //   this.MapModal = false;
    // },
    // OpenMapModal() {
    //   this.MapModal = true;
    // },
    // check(){
    //     if (
    //         this.SchoolAdmissionQuota.ondate === 0 ||
    //         this.SchoolAdmissionQuota.ondate === null ||
    //         this.SchoolAdmissionQuota.ondate === undefined ||
    //         this.SchoolAdmissionQuota.ondate === ""
    //     ) {
    //         this.$makeToast(
    //             this.$t("ondateNotSelected"),
    //             "danger"
    //         );
    //         return false;
    //     }
    //     if (
    //         this.SchoolAdmissionQuota.schoolyearid === 0 ||
    //         this.SchoolAdmissionQuota.schoolyearid === null ||
    //         this.SchoolAdmissionQuota.schoolyearid === undefined ||
    //         this.SchoolAdmissionQuota.schoolyearid === ""
    //     ) {
    //         this.$makeToast(
    //             this.$t("schoolyearNotSelected"),
    //             "danger"
    //         );
    //         return false;
    //     }
    //     if (
    //         this.SchoolAdmissionQuota.oblastid === 0 ||
    //         this.SchoolAdmissionQuota.oblastid === null ||
    //         this.SchoolAdmissionQuota.oblastid === undefined ||
    //         this.SchoolAdmissionQuota.oblastid === ""
    //     ) {
    //         this.$makeToast(
    //             this.$t("oblastNotSelected"),
    //             "danger"
    //         );
    //         return false;
    //     }
    //     if (
    //         this.SchoolAdmissionQuota.regionid === 0 ||
    //         this.SchoolAdmissionQuota.regionid === null ||
    //         this.SchoolAdmissionQuota.regionid === undefined ||
    //         this.SchoolAdmissionQuota.regionid === ""
    //     ) {
    //         this.$makeToast(
    //             this.$t("regionNotSelected"),
    //             "danger"
    //         );
    //         return false;
    //     }
    //     if (
    //         this.SchoolAdmissionQuota.organizationid === 0 ||
    //         this.SchoolAdmissionQuota.organizationid === null ||
    //         this.SchoolAdmissionQuota.organizationid === undefined ||
    //         this.SchoolAdmissionQuota.organizationid === ""
    //     ) {
    //         this.$makeToast(
    //             this.$t("organizationNotSelected"),
    //             "danger"
    //         );
    //         return false;
    //     }
    //     return true
    // },
    SaveData() {
      SchoolGroupContingentService.Update(this.SchoolGroupContingent)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `schoolgroupcontingent` });
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
