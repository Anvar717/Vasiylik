<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col sm="12" md="6" lg="6">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("code") }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('code')"
                v-model="StaffTypeBasicTariff.code"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("shortname")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('shortname')"
                v-model="StaffTypeBasicTariff.shortname"
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
                v-model="StaffTypeBasicTariff.fullname"
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
                v-model="StaffTypeBasicTariff.normativedoc"
              />
            </div>
          </div>
          <!-- <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("shortname")
            }}</label>
            <div class="col-sm-7">
              <b-input-group>
                <b-form-input
                  :placeholder="$t('shortname')"
                  v-model="Color.shortname"
                />
                <b-input-group-append>
                  <b-button variant="primary" @click="OpenTranslateModal('shortname')"> <feather-icon icon="GlobeIcon"></feather-icon> </b-button>
                </b-input-group-append>
              </b-input-group>
          </div>
        </div> -->
          <!-- <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("fullname")
            }}</label>
            <div class="col-sm-7">
               <b-input-group>
                <b-form-input
                  :placeholder="$t('fullname')"
                  v-model="Color.fullname"
                />
                <b-input-group-append>
                  <b-button variant="primary" @click="OpenTranslateModal('fullname')"> <feather-icon icon="GlobeIcon"></feather-icon> </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div> -->
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
                v-model="StaffTypeBasicTariff.stateid"
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
  BAlert,
  BInputGroupAppend,
  BInputGroup,
  BTr,
  BTd,
} from "bootstrap-vue";
import StaffTypeBasicTariffService from "@/services/info/stafftypebasictariff.service";
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
      isChange: false,
      StaffTypeBasicTariff: {},
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
      StateList: [],
      lang: "ru",
      TranslateModal: false,
      config: {
        dateFormat: "d.m.Y",
      },
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    StaffTypeBasicTariffService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.StaffTypeBasicTariff = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    HelperService.GetStateList().then((res1) => {
      this.StateList = res1.data;
    });
    HelperService.GetAllLanguage().then((res) => {
      this.LanguageList = res.data;
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
    // AddTranslate() {
    //   if (
    //     this.TranslateItem.languageid === null ||
    //     this.TranslateItem.languageid === undefined ||
    //     this.TranslateItem.languageid === 0 ||
    //     this.TranslateItem.languageid === ""
    //   ) {
    //     this.$makeToast(this.$t("notSelectLang"), "danger");
    //     return false;
    //   }
    //   if (
    //     this.StaffTypeBasicTariff.Translates.filter(
    //       (item) =>
    //         item.languageid === this.TranslateItem.languageid &&
    //         item.columnname == this.TranslateItem.columnname
    //     ).length > 0
    //   ) {
    //     this.$makeToast(this.$t("AlreadySelectLang"), "danger");
    //     return false;
    //   }
    //   this.StaffTypeBasicTariff.Translates.push(this.TranslateItem);
    //   this.GetTranslateItems(this.TranslateItem.columnname);
    //   this.clearLangTable(this.TranslateItem.columnname);
    // },
    // OpenTranslateModal(columnname) {
    //   this.TranslateModal = true;
    //   this.GetTranslateItems(columnname);
    //   this.clearLangTable(columnname);
    // },
    // GetTranslateItems(columnname) {
    //   this.TranslateItems = this.StaffTypeBasicTariff.Translates.filter(
    //     (item) => item.columnname == columnname
    //   );
    // },
    SaveData() {
      StaffTypeBasicTariffService.Update(this.StaffTypeBasicTariff)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `stafftypebasictariff` });
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
