<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col sm="12" md="4" lg="4">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("username")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('username')"
                v-model="Account.Username"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("Password")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                type="password"
                :placeholder="$t('Password')"
                v-model="Account.Password"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("Roles") }}</label>
            <div class="col-sm-7">
              <v-select
                :options="RoleList"
                :reduce="(item) => item.shortname"
                :placeholder="$t('ChooseBelow')"
                label="shortname"
                v-model="Account.Roles"
                multiple
              ></v-select>
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("enableTwoFactor")
            }}</label>
            <div class="col-sm-7">
              <b-form-checkbox switch v-model="Account.EnableTwoFactor">
              </b-form-checkbox>
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="4" lg="4">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("displayName")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('displayName')"
                v-model="Account.DisplayName"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("PasswordConfirm")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                type="password"
                :placeholder="$t('PasswordConfirm')"
                v-model="Account.PasswordConfirm"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("mobileNumber")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('mobileNumber')"
                v-model="Account.MobileNumber"
                v-mask="'9#-###-##-##'"
              />
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="4" lg="4">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("organization")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="OrganizationList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Account.OrganizationID"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("email") }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('email')"
                v-model="Account.Email"
              />
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
                v-model="Account.StateID"
              ></v-select>
            </div>
          </div>
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
import OrganizationService from "@/services/managment/organization.service";
import AccountService from "@/services/others/account.service";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import HelperService from "@/services/others/helper.service";
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
      Account: {},
      StateList: [],
      filter: {
        oblastid: 0,
        regionid: 0,
        isfarmfy: false,
      },
      OrganizationList: [],
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
      RoleList: [],
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    OrganizationService.GetAll(
      this.filter.oblastid,
      this.filter.regionid,
      this.filter.isfarmfy
    ).then((res) => {
      this.OrganizationList = res.data;
    });
    AccountService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.Account = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    HelperService.GetRoleList().then((res) => {
      this.RoleList = res.data;
    });
    HelperService.GetStateList().then((res) => {
      this.StateList = res.data;
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
      console.log(this.Account);
      AccountService.Update(this.Account)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `user` });
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
