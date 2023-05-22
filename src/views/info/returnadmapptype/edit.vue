<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <b-card>
          <b-row>
            <b-col sm="12" md="6" lg="6">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("code") }}</label>
                <div>
                  <b-form-input
                    :placeholder="$t('code')"
                    v-model="Returnadmapptype.code"
                  />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6" lg="6">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("shortname") }}</label>
                <div>
                  <b-form-input
                    :placeholder="$t('shortname')"
                    v-model="Returnadmapptype.shortname"
                  />
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="6" lg="6">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("fullname") }}</label>
                <div>
                  <b-form-input
                    :placeholder="$t('fullname')"
                    v-model="Returnadmapptype.fullname"
                  />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6" lg="6">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("state") }}</label>
                <div>
                  <v-select
                    :options="StateList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="Returnadmapptype.stateid"
                  ></v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
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
} from "bootstrap-vue";
import ReturnadmapptypeService from "@/services/info/returnadmapptype.service";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
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
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      Returnadmapptype: {},
      filter: {
        isfarmfy: "",
      },
      lang: "ru",
      StateList: [],
      ModalShow: false,
      editedIndex1: -1,
      config: {
        dateFormat: "d.m.Y",
      },
    };
  },
  props: {},
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    ReturnadmapptypeService.Get(this.$route.params.id).then((res) => {
      this.show = false;
      this.Returnadmapptype = res.data.result;
    });
    HelperService.GetStateList()
      .then((res) => {
        this.StateList = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
  },
  directives: {
    Ripple,
  },
  methods: {
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
    rowClass(item, type) {
      if (item.Status === 3) return "d-none";
    },
    SaveData() {
      ReturnadmapptypeService.Update(this.Returnadmapptype)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: "returnadmapptype" });
        })
        .catch((err) => {
          this.$makeToast(this.$t(err), "danger");
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>