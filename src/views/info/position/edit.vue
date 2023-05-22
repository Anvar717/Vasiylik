<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col sm="12" md="6" lg="6">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("code") }}</label>
            <div class="col-sm-7">
              <b-form-input :placeholder="$t('code')" v-model="Position.code" />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("shortname")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('shortname')"
                v-model="Position.shortname"
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
                v-model="Position.fullname"
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
            <label class="col-form-label col-sm-5" for>{{
              $t("positionclassification")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="PositionclassificationList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Position.positionclassificationid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("tariffscaletype")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="TariffscaletypeList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Position.tariffscaletypeid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("stafftypebasictariff")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="StafftypebasictariffList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Position.stafftypebasictariffid"
              ></v-select>
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
                v-model="Position.stateid"
              ></v-select>
            </div>
          </div>
        </b-col>
      </b-row>
      <!-- <b-row class="mb-2">
        <b-col sm="12" lg="6" md="6">
          <span
            ><b>{{ $t("Tables") }}</b></span
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
            :items="Position.Tables"
            small
            class="text-center"
            :tbody-tr-class="rowClass"
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
                $t("organizationtypeid")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="OrganizationtypeList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.organizationtypeid"
                ></v-select>
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
import PositionService from "@/services/info/position.service";
import PositionClassificationService from "@/services/info/positionclassification.service";
import OrganizationTypeService from "@/services/managment/organizationtype.service";
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
      Position: {},
      Modalshow: false,
      editedIndex: -1,
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
          key: "organizationtypename",
          label: this.$t("organizationtypename"),
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
      filter: {
        id: 0,
        ownerid: 0,
        organizationtypeid: 0,
        organizationtypename: "",
        Status: 1,
      },
      OrganizationtypeList: [],
      TranslateItems: [],
      LanguageList: [],
      StateList: [],
      PositionclassificationList: [],
      TariffscaletypeList: [],
      StafftypebasictariffList: [],
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
    PositionService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.Position = res.data;
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
    PositionClassificationService.GetAll(this.lang).then((res) => {
      this.PositionclassificationList = res.data;
    });
    HelperService.GetTariffScaleTypeList(this.lang).then((res) => {
      this.TariffscaletypeList = res.data;
    });
    StaffTypeBasicTariffService.GetAll(this.lang).then((res) => {
      this.StafftypebasictariffList = res.data;
    });
    OrganizationTypeService.GetAll(this.lang).then((res) => {
      this.OrganizationtypeList = res.data;
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
        this.Position.Translates.filter(
          (item) =>
            item.languageid === this.TranslateItem.languageid &&
            item.columnname == this.TranslateItem.columnname
        ).length > 0
      ) {
        this.$makeToast(this.$t("AlreadySelectLang"), "danger");
        return false;
      }
      this.Position.Translates.push(this.TranslateItem);
      this.GetTranslateItems(this.TranslateItem.columnname);
      this.clearLangTable(this.TranslateItem.columnname);
    },
    OpenTranslateModal(columnname) {
      this.TranslateModal = true;
      this.GetTranslateItems(columnname);
      this.clearLangTable(columnname);
    },
    GetTranslateItems(columnname) {
      this.TranslateItems = this.Position.Translates.filter(
        (item) => item.columnname == columnname
      );
    },
    OpenModalTables() {
      this.Modalshow = true;
      this.filter = {
        id: 0,
        ownerid: 0,
        organizationtypeid: 0,
        organizationtypename: "",
        Status: 1,
      };
      this.editedIndex = -1;
    },
    AddData() {
    //   this.Position.Tables.push(this.filter);
      this.filter.organizationtypename = !!this.filter.organizationtypeid
        ? this.OrganizationtypeList.filter(
            (item) => this.filter.organizationtypeid === item.id
          )[0].name
        : "";
        if (this.editedIndex > -1) {
        Object.assign(
          this.Position.Tables[this.editedIndex],
          this.filter
        );
      } else {
        this.Position.Tables.push(this.filter);
      }
      this.Modalshow = false;
    },
    EditTable(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex = this.Position.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.Modalshow = true;
    },
    Delete(item) {
      item.Status = 3;
    },
    rowClass(item) {
      if (item.Status === 3) return "d-none";
    },
    SaveData() {
      PositionService.Update(this.Position)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `position` });
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
