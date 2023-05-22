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
                v-model="WorkSchedule.code"
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
                v-model="WorkSchedule.shortname"
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
                v-model="WorkSchedule.fullname"
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
                v-model="WorkSchedule.stateid"
              ></v-select>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-tabs>
            <b-tab :title="$t('TablesDayHour')">
              <b-row class="mb-2">
                <b-col class="text-right">
                  <b-button
                    @click="OpenModalTablesDayHour"
                    size="sm"
                    variant="outline-primary"
                  >
                    <feather-icon icon="PlusIcon"></feather-icon>
                    {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="12" lg="12">
                  <b-table
                    :fields="fields"
                    :items="WorkSchedule.TablesDayHour"
                    small
                    class="text-center"
                    :tbody-tr-class="rowClass"
                  >
                    <template #cell(actions)="{ item }">
                      <div class="text-center">
                        <b-link>
                          <feather-icon
                            style="margin-right: 5px"
                            @click="EditTableTablesDayHour(item)"
                            icon="EditIcon"
                          ></feather-icon>
                        </b-link>
                        <b-link>
                          <feather-icon
                            @click="DeleteTablesDayHour(item)"
                            icon="Trash2Icon"
                          ></feather-icon>
                        </b-link>
                      </div>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
              <b-modal
                size="xl"
                v-model="ModalshowTablesDayHour"
                no-close-on-backdrop
                hide-footer
                :title="$t('TablesDayHour')"
              >
                <b-row>
                  <b-col sm="12" md="6" lg="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("daynumber")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('daynumber')"
                          v-model="tabrow.daynumber"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("isdayoff")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-checkbox
                          v-model="tabrow.isdayoff"
                          switch
                        ></b-form-checkbox>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("begintime")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('begintime')"
                          v-model="tabrow.begintime"
                          type="time"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("endtime")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('endtime')"
                          v-model="tabrow.endtime"
                          type="time"
                        />
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col class="text-center">
                    <b-button
                      variant="danger"
                      @click="ModalshowTablesDayHour = false"
                      class="mr-1"
                    >
                      {{ $t("back") }}
                    </b-button>
                    <b-button variant="success" @click="AddDataTablesDayHour">
                      {{ $t("Save") }}
                    </b-button>
                  </b-col>
                </b-row>
              </b-modal>
            </b-tab>
            <b-tab :title="$t('tablesWorkHour')">
              <b-row class="mb-2">
                <b-col class="text-right">
                  <b-button
                    @click="OpenModalTablesWorkHour"
                    size="sm"
                    variant="outline-primary"
                  >
                    <feather-icon icon="PlusIcon"></feather-icon>
                    {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="12" lg="12">
                  <b-table
                    :fields="fields2"
                    :items="WorkSchedule.TablesWorkHour"
                    small
                    class="text-center"
                    :tbody-tr-class="rowClass"
                  >
                    <template #cell(actions)="{ item }">
                      <div class="text-center">
                        <b-link>
                          <feather-icon
                            style="margin-right: 5px"
                            @click="EditTableTablesWorkHour(item)"
                            icon="EditIcon"
                          ></feather-icon>
                        </b-link>
                        <b-link>
                          <feather-icon
                            @click="DeleteTablesWorkHour(item)"
                            icon="Trash2Icon"
                          ></feather-icon>
                        </b-link>
                      </div>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
              <b-modal
                size="xl"
                v-model="ModalshowTablesWorkHour"
                no-close-on-backdrop
                hide-footer
                :title="$t('TablesWorkHour')"
              >
                <b-row>
                  <b-col sm="12" md="6" lg="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("ondate")
                      }}</label>
                      <div class="col-sm-7">
                        <custom-date-picker
                          v-model="tabrow2.ondate"
                          @keyup="ondateValue"
                          format="DD.MM.YYYY"
                          type="date"
                          :clearable="false"
                          :placeholder="$t('ondate')"
                        >
                        </custom-date-picker>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("days")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('days')"
                          v-model="tabrow2.days"
                          type="number"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("hours")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('hours')"
                          v-model="tabrow2.hours"
                        />
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col class="text-center">
                    <b-button
                      variant="danger"
                      @click="ModalshowTablesWorkHour = false"
                      class="mr-1"
                    >
                      {{ $t("back") }}
                    </b-button>
                    <b-button variant="success" @click="AddDataTablesWorkHour">
                      {{ $t("Save") }}
                    </b-button>
                  </b-col>
                </b-row>
              </b-modal>
            </b-tab>
          </b-tabs>
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
    <!-- <b-modal
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
    </b-modal> -->
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
import WorkScheduleService from "@/services/info/workschedule.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
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
      ModalshowTablesDayHour: false,
      ModalshowTablesWorkHour: false,
      editedIndex1: -1,
      editedIndex2: -1,
      WorkSchedule: {},
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
          key: "daynumber",
          label: this.$t("daynumber"),
          class: "text-center",
        },
        {
          key: "isdayoff",
          label: this.$t("isdayoff"),
          class: "text-center",
        },
        { key: "actions", label: this.$t("actions"), thClass: "text-center" },
      ],
      fields2: [
        {
          key: "ondate",
          label: this.$t("ondate"),
          class: "text-center",
        },
        {
          key: "days",
          label: this.$t("days"),
          class: "text-center",
        },
        {
          key: "hours",
          label: this.$t("hours"),
          class: "text-center",
        },
        { key: "actions", label: this.$t("actions"), thClass: "text-center" },
      ],
      //   TranslateItem: {
      //     tableid: 0,
      //     tablerowid: 0,
      //     languageid: 0,
      //     languagename: "",
      //     columnname: "",
      //     translatetext: "",
      //   },
      tabrow: {
        id: 0,
        ownerid: 0,
        daynumber: 0,
        isdayoff: 0,
        begintime: 0,
        endtime: 0,
        Status: 1,
      },
      tabrow2: {
        id: 0,
        ownerid: 0,
        ondate: "",
        days: 0,
        hours: 0,
        Status: 1,
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
    WorkScheduleService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.WorkSchedule = res.data;
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
    OpenModalTablesDayHour() {
      this.ModalshowTablesDayHour = true;
      this.tabrow = {
        id: 0,
        ownerid: 0,
        daynumber: 0,
        isdayoff: 0,
        begintime: 0,
        endtime: 0,
        Status: 1,
      };
      this.editedIndex1 = -1;
    },
    OpenModalTablesWorkHour() {
      this.ModalshowTablesWorkHour = true;
      this.tabrow2 = {
        id: 0,
        ownerid: 0,
        ondate: "",
        days: 0,
        hours: 0,
        Status: 1,
      };
      this.editedIndex2 = -1;
    },
    AddDataTablesDayHour() {
      this.WorkSchedule.TablesDayHour.push(this.tabrow);
      this.ModalshowTablesDayHour = false;
    },
    AddDataTablesWorkHour() {
      this.WorkSchedule.TablesWorkHour.push(this.tabrow2);
      this.ModalshowTablesWorkHour = false;
    },
    EditTableTablesDayHour(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex1 = this.WorkSchedule.TablesDayHour.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.ModalshowTablesDayHour = true;
    },
    EditTableTablesWorkHour(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex2 = this.WorkSchedule.TablesWorkHour.indexOf(item);
      this.tabrow2 = Object.assign({}, item);
      this.ModalshowTablesDayHour = true;
    },
    DeleteTablesDayHour(item) {
      item.Status = 3;
    },
    DeleteTablesWorkHour(item) {
      item.Status = 3;
    },
    rowClass(item) {
      if (item.Status === 3) return "d-none";
    },
    //   EditTable(item) {
    //   if (item.Status == 0) {
    //     item.Status = 2;
    //   }
    //   this.editedIndex1 = this.University.Tables.indexOf(item);
    //   this.tabrow = Object.assign({}, item);
    //   this.Modalshow = true;
    // },
    ChangeTranslate() {
      this.TranslateItem.languagename = !!this.TranslateItem.languageid
        ? this.LanguageList.filter(
            (item) => item.id == this.TranslateItem.languageid
          )[0].fullname
        : "";
    },
    // clearLangTable(columnname) {
    //   this.TranslateItem = {
    //     tableid: 0,
    //     tablerowid: 0,
    //     languageid: 0,
    //     languagename: "",
    //     columnname: columnname,
    //     translatetext: "",
    //   };
    // },
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
        this.WorkSchedule.Translates.filter(
          (item) =>
            item.languageid === this.TranslateItem.languageid &&
            item.columnname == this.TranslateItem.columnname
        ).length > 0
      ) {
        this.$makeToast(this.$t("AlreadySelectLang"), "danger");
        return false;
      }
      this.WorkSchedule.Translates.push(this.TranslateItem);
      this.GetTranslateItems(this.TranslateItem.columnname);
      this.clearLangTable(this.TranslateItem.columnname);
    },
    OpenTranslateModal(columnname) {
      this.TranslateModal = true;
      this.GetTranslateItems(columnname);
      this.clearLangTable(columnname);
    },
    GetTranslateItems(columnname) {
      this.TranslateItems = this.WorkSchedule.Translates.filter(
        (item) => item.columnname == columnname
      );
    },
    ondateValue(value) {
      this.tabrow2.ondate = value;
    },
    SaveData() {
      WorkScheduleService.Update(
        this.WorkSchedule,
        this.WorkSchedule.TablesDayHour,
        this.WorkSchedule.TablesWorkHour
      )
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `workschedule` });
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
