<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("region")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="RegionList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="StreetState.regionid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("regionname")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('shortname')"
                v-model="StreetState.regionname"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("street")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="StreetList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="StreetState.streetid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("regionname")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('shortname')"
                v-model="StreetState.street"
              />
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("normativedoc")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('normativedoc')"
                v-model="StreetState.normativedoc"
              />
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("ondate")
            }}</label>
            <div class="col-sm-7">
              <date-picker
                style="width: 100%"
                v-model="StreetState.ondate"
                value-type="format"
                v-mask="'##.##.####'"
                format="DD.MM.YYYY"
                :placeholder="$t('ondate')"
              ></date-picker>
              <!-- <flat-pickr
                          v-model="tabrow2.dateofexpire"
                          class="form-control"
                          :placeholder="$t('dateofexpire')"
                          :config="config"
                        /> -->
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
                v-model="StreetState.stateid"
              ></v-select>
            </div>
          </div>
        </b-card>
      </b-col>
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
} from "bootstrap-vue";
import RegionService from "@/services/info/region.service";
import StreetService from "@/services/info/street.service";
import StreetStateService from "@/services/info/streetstate.service";
import HelperService from "@/services/others/helper.service";
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
    BModal,
    BCardText,
    BFormCheckbox,
    BAlert,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      isChange: false,
      StreetState: {},
      StreetList: [],
      RegionList: [],
      StateList: [],
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    StreetStateService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.StreetState = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    StreetService.GetAll().then((res) => {
      this.StreetList = res.data;
    });
    RegionService.GetAll().then((res) => {
      this.RegionList = res.data;
    });
    HelperService.GetStateList().then((res1) => {
      this.StateList = res1.data;
    });
  },
  directives: {
    Ripple,
  },
  methods: {
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
      StreetStateService.Update(this.StreetState)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `streetstate` });
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
