<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col sm="12" md="6" lg="6">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("code") }}</label>
            <div class="col-sm-7">
              <b-form-input :placeholder="$t('code')" v-model="Department.code" />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("shortname")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('shortname')"
                v-model="Department.shortname"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("fullname")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('fullname')"
                v-model="Department.fullname"
              />
            </div>
          </div>
           <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("parent") }}</label>
            <div class="col-sm-7">
              <v-select
                :options="ParentList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Department.parentid"
              ></v-select>
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="6" lg="6">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("state") }}</label>
            <div class="col-sm-7">
              <v-select
                :options="StateList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Department.stateid"
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
import DepartmentService from "@/services/info/department.service";
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
      Department: {},
      StateList: [],
      ParentList: [],
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    DepartmentService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.Department = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    HelperService.GetStateList().then((res) => {
      this.StateList = res.data;
    });
    DepartmentService.GetAll(this.lang).then((res) => {
      this.ParentList = res.data;
    });
  },
  directives: {
    Ripple,
  },
  methods: {
    SaveData() {
      DepartmentService.Update(this.Department)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `department` });
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
