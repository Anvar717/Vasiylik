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
                v-model="University.code"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("allowanceperc")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('allowanceperc')"
                v-model="University.allowanceperc"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("allowancenormdoc")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('allowancenormdoc')"
                v-model="University.allowancenormdoc"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("adoptnormdoc")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('adoptnormdoc')"
                v-model="University.adoptnormdoc"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("dateofadopted")
            }}</label>
            <div class="col-sm-7">
              <custom-date-picker
                v-model="University.dateofadopted"
                @keyup="DateofadoptedValue"
                format="DD.MM.YYYY"
                type="date"
                :clearable="false"
                :placeholder="$t('dateofadopted')"
              >
              </custom-date-picker>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("shortname") }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('shortname')"
                v-model="University.shortname"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("fullname") }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('fullname')"
                v-model="University.fullname"
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
                  v-model="University.shortname"
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
          </div> -->
          <!-- <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("fullname")
            }}</label>
            <div class="col-sm-7">
              <b-input-group>
                <b-form-input
                  :placeholder="$t('fullname')"
                  v-model="University.fullname"
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
                v-model="University.stateid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("country")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="CountryList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="University.countryid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("oblast")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="OblastList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="University.oblastid"
              ></v-select>
            </div>
          </div>
        </b-col>
      </b-row>
      <!-- <b-row class="mb-2">
        <b-col sm="12" lg="6" md="6">
          <span
            ><b>{{ $t("tables") }}</b></span
          >
        </b-col>
        <b-col class="text-right">
          <b-button
            @click="OpenModalTables"
            size="sm"
            variant="outline-primary"
          >
            <feather-icon icon="PlusIcon"></feather-icon>
            {{ $t("Add") }}
          </b-button>
        </b-col>
      </b-row> -->
      <!-- <b-row>
        <b-col sm="12" md="12" lg="12">
          <b-table
            :fields="fields"
            :items="University.Tables"
            small
            class="text-center"
          >
            <template #cell(actions)="{ item }">
              <div class="text-center">
                <b-link>
                  <feather-icon
                    style="margin-right: 5px"
                    @click="EditTable(item)"
                    icon="EditIcon"
                  ></feather-icon>
                </b-link>
                <b-link>
                  <feather-icon
                    @click="Delete(item)"
                    icon="Trash2Icon"
                  ></feather-icon>
                </b-link>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row> -->
      <!-- <b-modal
        size="xl"
        v-model="Modalshow"
        no-close-on-backdrop
        hide-footer
        :title="$t('tables')"
      >
        <b-row>
          <b-col sm="12" md="12" lg="12">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("shortname")
              }}</label>
              <div class="col-sm-7">
                <b-form-input
                  :placeholder="$t('shortname')"
                  v-model="filter.shortname"
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
                  v-model="filter.fullname"
                />
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("adoptnormdoc")
              }}</label>
              <div class="col-sm-7">
                <b-form-input
                  :placeholder="$t('adoptnormdoc')"
                  v-model="filter.adoptnormdoc"
                />
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("ondate")
              }}</label>
              <div class="col-sm-7">
                <custom-date-picker
                  v-model="filter.ondate"
                  @keyup="OndateValue"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('ondate')"
                >
                </custom-date-picker>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col class="text-center">
            <b-button variant="danger" @click="Modalshow = false" class="mr-1">
              {{ $t("back") }}
            </b-button>
            <b-button variant="success" @click="AddData">
              {{ $t("Save") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal> -->
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
import UniversityService from "@/services/info/university.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import CountryService from "@/services/info/country.service";
import HelperService from "@/services/others/helper.service";
import OblastService from "@/services/info/oblast.service";
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
    CustomDatePicker,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      isChange: false,
      University: {},
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
      fields: [
        {
          key: "ondate",
          label: this.$t("ondate"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "shortname",
          label: this.$t("shortname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "fullname",
          label: this.$t("fullname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "adoptnormdoc",
          label: this.$t("adoptnormdoc"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          sortable: true,
        },
      ],
      filter: {
        id: 0,
        ownerid: 0,
        ondate: "",
        shortname: "",
        fullname: "",
        adoptnormdoc: "",
        Status: 1,
      },
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
      CountryList: [],
      OblastList: [],
      Modalshow: false,
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
    UniversityService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.University = res.data;
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
    CountryService.GetAll(this.lang).then((res) => {
      this.CountryList = res.data;
    });
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
    });
  },
  directives: {
    Ripple,
  },
  methods: {
    AddData() {
      this.University.Tables.push(this.filter);
      this.Modalshow = false;
    },
    EditTable(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex1 = this.University.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.Modalshow = true;
    },
    Delete(item) {
      item.Status = 3;
    },
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
    DateofadoptedValue(value) {
      this.University.dateofadopted = value;
    },
    OndateValue(value) {
      this.filter.ondate = value;
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
        this.University.Translates.filter(
          (item) =>
            item.languageid === this.TranslateItem.languageid &&
            item.columnname == this.TranslateItem.columnname
        ).length > 0
      ) {
        this.$makeToast(this.$t("AlreadySelectLang"), "danger");
        return false;
      }
      this.University.Translates.push(this.TranslateItem);
      this.GetTranslateItems(this.TranslateItem.columnname);
      this.clearLangTable(this.TranslateItem.columnname);
    },
    OpenModalTables() {
      this.Modalshow = true;
    },
    OpenTranslateModal(columnname) {
      this.TranslateModal = true;
      this.GetTranslateItems(columnname);
      this.clearLangTable(columnname);
    },
    GetTranslateItems(columnname) {
      this.TranslateItems = this.University.Translates.filter(
        (item) => item.columnname == columnname
      );
    },
    SaveData() {
      UniversityService.Update(this.University)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `university` });
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
