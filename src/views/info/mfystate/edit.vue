<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("ondate")
            }}</label>
            <div class="col-sm-7">
              <date-picker
                style="width: 100%"
                v-model="MfyState.ondate"
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
            <label class="col-form-label col-sm-5" for>{{
              $t("region")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="RegionList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="MfyState.regionId"
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
                v-model="MfyState.mfyId"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("normativedoc")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('normativedoc')"
                v-model="MfyState.normativedoc"
              />
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("iscenterregion")
            }}</label>
            <div class="col-sm-7">
              <b-form-checkbox
                v-model="MfyState.iscenterregion"
                name="check-button1"
                switch
              >
              </b-form-checkbox>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("iscentervillage")
            }}</label>
            <div class="col-sm-7">
              <b-form-checkbox
                v-model="MfyState.iscentervillage"
                name="check-button1"
                switch
              >
              </b-form-checkbox>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("isfarmfy")
            }}</label>
            <div class="col-sm-7">
              <b-form-checkbox
                v-model="MfyState.isfarmfy"
                name="check-button1"
                switch
              >
              </b-form-checkbox>
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
                v-model="MfyState.stateid"
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
import MfyStateService from "@/services/info/mfystate.service";
import RegionService from "@/services/info/region.service";
import MfyService from "@/services/info/mfy.service";
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
      MfyState: {},
      OblastList: [],
      RegionList: [],
      MfyList: [],
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
    MfyStateService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.MfyState = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    RegionService.GetAll().then((res) => {
      this.RegionList = res.data;
    });
    MfyService.GetAll().then((res) => {
      this.MfyList = res.data;
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
      MfyStateService.Update(this.MfyState)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `mfystate` });
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
