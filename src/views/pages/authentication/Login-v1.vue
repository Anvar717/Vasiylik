<template>
  <div class="auth-wrapper auth-v1 px-2" style="position: relative">
    <!-- <div style="position:absolute;top : 50px" class="d-flex align-items-center">
      <h1  style="text-transform:uppercase;font-size:48px;max-width:100%;color:#5169A1">O'zbekiston Respublikasi Xalq ta'limi vazirligi</h1>
    </div> -->
    <div
      style="position: absolute; top: 50px; left: 0"
      class="d-flex align-items-center"
    >
      <img src="@/assets/images/logo.png" alt="" width="220px" />
      <h1
        style="
          text-transform: uppercase;
          font-size: 48px;
          max-width: 350px;
          color: #5169a1;
          font-weight: bold;
        "
      >
        Vasiylik va homiylik
      </h1>
    </div>

    <div class="auth-inner py-2">
      <!-- Login v1 -->
      <b-card class="mb-0" style="background-color: rgba(255, 255, 255, 0.8)">
        <b-link class="brand-logo">
          <!-- <vuexy-logo /> -->

          <h2 class="brand-text text-primary ml-1">Vasiylik</h2>
        </b-link>

        <b-card-title class="mb-1">
          {{ $t("auth") }}
        </b-card-title>
        <b-card-text class="mb-2">
          {{ $t("Sign In to your account") }}
        </b-card-text>

        <!-- form -->
        <validation-observer ref="loginForm" #default="{ invalid }">
          <b-form class="auth-login-form mt-2" @submit.prevent>
            <!-- email -->
            <b-form-group label-for="email" :label="$t('username')">
              <validation-provider
                #default="{ errors }"
                name="Username"
                rules="required"
              >
                <b-form-input
                  id="email"
                  v-model="login.username"
                  name="login-email"
                  :state="errors.length > 0 ? false : null"
                  :placeholder="$t('username')"
                  autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="password">{{ $t("Password") }}</label>
                <b-link @click="OpenModal">
                  <small> {{ $t("ForgotPassword") }} </small>
                </b-link>
              </div>
              <validation-provider
                #default="{ errors }"
                name="Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="password"
                    v-model="login.password"
                    :type="passwordFieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false : null"
                    name="login-password"
                    :placeholder="$t('Password')"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- checkbox -->
            <!-- <b-form-group>
              <b-form-checkbox
                id="remember-me"
                v-model="status"
                name="checkbox-1"
              >
                Remember Me
              </b-form-checkbox>
            </b-form-group> -->

            <!-- submit button -->
            <b-button
              variant="primary"
              type="submit"
              block
              :disabled="invalid"
              class="mb-2"
              @click="validationForm"
              v-if="isLocal"
            >
              <b-spinner v-if="Loading" small></b-spinner>
              {{ $t("SignIn") }}
            </b-button>
            <b-button
              variant="primary"
              type="submit"
              block
              :disabled="invalid"
              v-if="!isLocal"
              class="mb-2"
              @click="SignIn"
            >
              <b-spinner v-if="Loading" small></b-spinner>
              {{ $t("SignIn") }}
            </b-button>
          </b-form>
        </validation-observer>
        <b-modal
          v-model="sms.trusteddevice"
          hide-footer
          no-close-on-backdrop
          :title="$t('SmsCode')"
        >
          <b-alert show variant="success">
            <p class="p-1">
              {{ $t("SendSmmYourPhone", { phonenumber: sms.phoneNumber }) }}
            </p>
          </b-alert>
          <b-row>
            <b-col>
              <label for=""> {{ $t("SmsCode") }} </label>
              <b-form-input maxlength="4" v-model="sms.smscode"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col class="text-center">
              <b-button
                variant="danger"
                @click="sms.trusteddevice = false"
                class="mr-2"
              >
                <feather-icon icon="XIcon"> </feather-icon> {{ $t("Cancel") }}
              </b-button>
              <b-button variant="success" @click="SignTwoFactor">
                <b-spinner small v-if="SignTwoFactorLoading"></b-spinner>
                <feather-icon
                  v-if="!SignTwoFactorLoading"
                  icon="CheckSquareIcon"
                ></feather-icon>
                {{ $t("SignIn") }}
              </b-button>
            </b-col>
          </b-row>
        </b-modal>
        <!-- <b-card-text class="text-center mt-2">
          <span>New on our platform? </span>
          <b-link :to="{name:'auth-register-v1'}">
            <span>Create an account</span>
          </b-link>
        </b-card-text>

        <div class="divider my-2">
          <div class="divider-text">
            or
          </div>
        </div> -->

        <!-- social button -->
        <!-- <div class="auth-footer-btn d-flex justify-content-center">
          <b-button
            href="javascript:void(0)"
            variant="facebook"
          >
            <feather-icon icon="FacebookIcon" />
          </b-button>
          <b-button
            href="javascript:void(0)"
            variant="twitter"
          >
            <feather-icon icon="TwitterIcon" />
          </b-button>
          <b-button
            href="javascript:void(0)"
            variant="google"
          >
            <feather-icon icon="MailIcon" />
          </b-button>
          <b-button
            href="javascript:void(0)"
            variant="github"
          >
            <feather-icon icon="GithubIcon" />
          </b-button>
        </div> -->
      </b-card>
      <!-- /Login v1 -->
    </div>
    <div>
      <b-modal
        v-model="OpenModalPassword"
        size="sm"
        :title="$t('ChangePassword')"
        hide-footer
        no-close-on-backdrop
      >
        <b-form-group :label="$t('username')">
          <b-form-input
            id="email"
            v-model="Reset.username"
            :placeholder="$t('username')"
            autofocus
          />
        </b-form-group>
        <b-row class="mb-4">
          <b-col v-if="!OpenRestorePassword">
            <b-button @click="RestorePassword" variant="success" size="sm">
              <b-spinner v-if="RestorePasswordLoading" small></b-spinner>
              {{ $t("Reset") }}
            </b-button>
          </b-col>
        </b-row>
        <b-collapse v-model="OpenRestorePassword" id="collapse-1" class="mt-2">
          <b-row>
            <b-col>
              <p>{{ $t("SendSmmYourPhone", { phonenumber: phonenumber }) }}</p>
            </b-col>
          </b-row>
          <b-form-group :label="$t('smscode')">
            <b-form-input
              id="email"
              v-model="Reset.smscode"
              :placeholder="$t('smscode')"
              autofocus
            />
          </b-form-group>
          <b-form-group :label="$t('newpassword')">
            <b-form-input
              id="email"
              v-model="Reset.newpassword"
              :placeholder="$t('newpassword')"
              autofocus
            />
          </b-form-group>
          <b-form-group :label="$t('confirmedpassword')">
            <b-form-input
              id="email"
              v-model="Reset.confirmedpassword"
              :placeholder="$t('confirmedpassword')"
              autofocus
            />
          </b-form-group>
          <b-row>
            <b-col>
              <b-button size="sm" @click="ChangePassword" variant="success">
                <b-spinner v-if="ChangePasswordLoading" small></b-spinner>
                {{ $t("ChangeReset") }}
              </b-button>
            </b-col>
          </b-row>
        </b-collapse>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  BButton,
  BForm,
  BFormInput,
  BFormGroup,
  BCard,
  BLink,
  BCardTitle,
  BCardText,
  BInputGroup,
  BInputGroupAppend,
  BFormCheckbox,
  BSpinner,
  BModal,
  BCollapse,
  BRow,
  BCol,
  BAlert,
} from "bootstrap-vue";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import AccountService from "@/services/others/account.service";
import ApiService from "@/services/api.service";

export default {
  components: {
    // BSV
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BCollapse,
    BRow,
    BCol,
    BCardTitle,
    BLink,
    VuexyLogo,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
    BSpinner,
    BModal,
    BAlert,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      userEmail: "",
      password: "",
      status: "",
      OpenModalPassword: false,
      OpenRestorePassword: false,
      RestorePasswordLoading: false,
      ChangePasswordLoading: false,
      // validation rules
      required,
      email,

      login: {
        username: "",
        password: "",
      },
      phonenumber: "",
      Reset: {
        username: "",
        smscode: "",
        newpassword: "",
        confirmedpassword: "",
      },
      Loading: false,
      sms: {
        trusteddevice: false,
        phoneNumber: "",
      },
      SignTwoFactorLoading: false,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    isLocal() {
      if (window.location.href.indexOf("http://localhost") > -1) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginForm.validate().then((success) => {
        if (success) {
          this.Loading = true;
          AccountService.GenerateToken(this.login)
            .then((res) => {
              localStorage.setItem("auth_token", res.data.token);
              localStorage.setItem(
                "user_info",
                JSON.stringify(res.data.userinfo)
              );
              this.$store.dispatch("auth/login", res.data);
              ApiService.setHeader();
              this.Loading = false;
              this.$router.push("/");
            })
            .catch((error) => {
              this.Loading = false;
              this.$makeToast(error.response.data.error, "danger");
            });
        }
      });
    },
    RestorePassword() {
      this.Reset.smscode = "";
      this.Reset.newpassword = "";
      this.Reset.confirmedpassword = "";
      this.RestorePasswordLoading = true;
      AccountService.RestorePassword({ username: this.Reset.username })
        .then((res) => {
          this.RestorePasswordLoading = false;
          this.phonenumber = res.data.phoneNumber;
          this.OpenRestorePassword = true;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
          this.RestorePasswordLoading = false;
        });
    },
    ChangePassword() {
      this.ChangePasswordLoading = true;
      AccountService.RestorePasswordConfirm(this.Reset)
        .then((res) => {
          this.ChangePasswordLoading = false;
          this.makeToast(
            this.$t("ChangePasswordSuccess"),
            this.$t("message"),
            "success"
          );
          this.$bvModal.hide("ForgotPasswordModal");
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
          this.ChangePasswordLoading = true;
        });
    },
    SignIn() {
      this.$refs.loginForm.validate().then((success) => {
        if (success) {
          this.Loading = true;
          AccountService.SignIn(this.login)
            .then((res) => {
              if (res.data.userinfo) {
                localStorage.setItem(
                  "user_info",
                  JSON.stringify(res.data.userinfo)
                );
                this.$store.dispatch("auth/login", res.data);
              }
              this.Loading = false;

              if (res.data.trusteddevice) {
                this.$router.push("/");
              }
              if (!res.data.trusteddevice) {
                this.sms.trusteddevice = true;
                this.sms.phoneNumber = res.data.phoneNumber;
                this.sms.smscode = "";
              }
            })
            .catch((error) => {
              this.makeToast(error.response.data.error, "danger");
              this.Loading = false;
            });
        }
      });
    },
    SignTwoFactor() {
      if (
        this.sms.smscode === undefined ||
        this.sms.smscode === null ||
        this.sms.smscode === ""
      ) {
        this.makeToast(this.$t("SmsCodeNotCorrect"), "danger");
        return false;
      }
      this.SignTwoFactorLoading = true;
      AccountService.SignInTwoFactor(this.sms)
        .then((res) => {
          this.SignTwoFactorLoading = false;
          if (res.data.userinfo) {
            localStorage.setItem(
              "user_info",
              JSON.stringify(res.data.userinfo)
            );
            this.$store.dispatch("auth/login", res.data);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, "danger");
          this.SignTwoFactorLoading = false;
        });
    },
    OpenModal() {
      this.Reset.username = "";
      this.Reset.smscode = "";
      this.Reset.newpassword = "";
      this.Reset.confirmedpassword = "";
      this.OpenRestorePassword = false;
      this.phonenumber = "";
      this.OpenModalPassword = true;
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
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
.auth-v1 {
  background-image: url("../../../assets/images/images1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
