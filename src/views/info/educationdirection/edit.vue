<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("code") }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('code')"
                v-model="EducationDirection.code"
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
                v-model="EducationDirection.shortname"
              />
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("fullname")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('fullname')"
                v-model="EducationDirection.fullname"
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
                v-model="EducationDirection.stateid"
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
            <b-col sm="12" md="12" class="text-right" lg="12">
              <b-button
                @click="OpenModal"
                size="sm"
                class="mb-2"
                variant="outline-primary"
              >
                <feather-icon icon="PlusIcon"></feather-icon> {{ $t("Add") }}
              </b-button>
            </b-col>
            <b-modal
              size="lg"
              v-model="DirectionSubjectTables"
              no-close-on-backdrop
              hide-footer
              :title="$t('schoolsubject')"
            >
              <b-row>
                <b-col cols="12">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("schoolsubject")
                    }}</label>
                    <div class="col-sm-7">
                      <v-select
                        :options="SchoolSubjectList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="tabrow.schoolsubjectid"
                      ></v-select>
                    </div>
                  </div>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("state")
                    }}</label>
                    <div class="col-sm-7">
                      <v-select
                        :options="StateList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="tabrow.stateid"
                      ></v-select>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="text-center">
                  <b-button
                    class="mr-2"
                    @click="DirectionSubjectTables = false"
                    size="sm"
                    variant="outline-danger"
                  >
                    <feather-icon icon="ArrowLeftIcon"></feather-icon>
                    {{ $t("back") }}
                  </b-button>
                  <b-button @click="AddRow" size="sm" variant="outline-success">
                    <feather-icon icon="CheckIcon"></feather-icon>
                    {{ $t("Save") }}
                  </b-button>
                </b-col>
              </b-row>
            </b-modal>
          </b-row>
          <b-row>
            <b-col sm="12" md="12" lg="12">
              <b-table
                :fields="fields"
                :items="EducationDirection.DirectionSubjectTables"
                small
                class="text-center"
                :tbody-tr-class="rowClass"
              >
                <template #cell(status)="{ item }">
                  <b-badge
                    :variant="
                      item.status == 'Пассив' ? 'light-danger' : 'light-success'
                    "
                  >
                    {{ item.status }}
                  </b-badge>
                </template>

                <template v-slot:cell(actions)="{ item }">
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
                        @click="DeleteRow(item)"
                        icon="Trash2Icon"
                      ></feather-icon>
                    </b-link>
                  </div>
                </template>
              </b-table>
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

import EducationDirectionService from "@/services/info/educationdirection.service";
import SchoolSubjectService from "@/services/info/schoolsubject.service";
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
      EducationDirection: {},
      filter: {
        isfarmfy: "",
      },
      StateList: [],
      lang: "ru",
      fields: [
        {
          key: "schoolsubjectname",
          label: this.$t("schoolsubject"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "statename",
          label: this.$t("state"),
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
      ModalShow: false,

      editedIndex1: -1,
      config: {
        dateFormat: "d.m.Y",
      },
      DirectionSubjectTables: false,
      tabrow: {
        id: 0,
        ownerid: 0,
        schoolsubjectid: 0,
        schoolsubjectname: "",
        stateid: 0,
        status: 1,
      },
      SchoolSubjectList: [],
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    EducationDirectionService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.EducationDirection = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    SchoolSubjectService.GetAll(this.lang, 0).then((res) => {
      this.SchoolSubjectList = res.data;
    });
    HelperService.GetStateList().then((res) => {
      this.StateList = res.data;
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
    OpenModal() {
      this.DirectionSubjectTables = true;
      (this.tabrow = {
        id: 0,
        ownerid: 0,
        schoolsubjectid: 0,
        schoolsubjectname: "",
        stateid: 0,
        status: 1,
      }),
        (this.editedIndex1 = -1);
    },
    EditTable(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex1 =
        this.EducationDirection.DirectionSubjectTables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.DirectionSubjectTables = true;
    },
    DeleteRow(item) {
      item.Status = 3;
    },
    check() {
      if (
        this.SchoolAdmissionQuota.ondate === 0 ||
        this.SchoolAdmissionQuota.ondate === null ||
        this.SchoolAdmissionQuota.ondate === undefined ||
        this.SchoolAdmissionQuota.ondate === ""
      ) {
        this.$makeToast(this.$t("ondateNotSelected"), "danger");
        return false;
      }
      if (
        this.SchoolAdmissionQuota.schoolyearid === 0 ||
        this.SchoolAdmissionQuota.schoolyearid === null ||
        this.SchoolAdmissionQuota.schoolyearid === undefined ||
        this.SchoolAdmissionQuota.schoolyearid === ""
      ) {
        this.$makeToast(this.$t("schoolyearNotSelected"), "danger");
        return false;
      }
      if (
        this.SchoolAdmissionQuota.oblastid === 0 ||
        this.SchoolAdmissionQuota.oblastid === null ||
        this.SchoolAdmissionQuota.oblastid === undefined ||
        this.SchoolAdmissionQuota.oblastid === ""
      ) {
        this.$makeToast(this.$t("oblastNotSelected"), "danger");
        return false;
      }
      if (
        this.SchoolAdmissionQuota.regionid === 0 ||
        this.SchoolAdmissionQuota.regionid === null ||
        this.SchoolAdmissionQuota.regionid === undefined ||
        this.SchoolAdmissionQuota.regionid === ""
      ) {
        this.$makeToast(this.$t("regionNotSelected"), "danger");
        return false;
      }
      if (
        this.SchoolAdmissionQuota.organizationid === 0 ||
        this.SchoolAdmissionQuota.organizationid === null ||
        this.SchoolAdmissionQuota.organizationid === undefined ||
        this.SchoolAdmissionQuota.organizationid === ""
      ) {
        this.$makeToast(this.$t("organizationNotSelected"), "danger");
        return false;
      }
      return true;
    },
    AddRow() {
      if (
        this.tabrow.schoolsubjectid === 0 ||
        this.tabrow.schoolsubjectid === null ||
        this.tabrow.schoolsubjectid === undefined ||
        this.tabrow.schoolsubjectid === ""
      ) {
        this.$makeToast(this.$t("schoolsubjectNotSelected"), "danger");
        return false;
      }
      if (
        this.tabrow.stateid === 0 ||
        this.tabrow.stateid === null ||
        this.tabrow.stateid === undefined ||
        this.tabrow.stateid === ""
      ) {
        this.$makeToast(this.$t("stateNotSelected"), "danger");
        return false;
      }
      this.tabrow.statename = this.StateList.filter(
        (item) => this.tabrow.stateid === item.id
      )[0].name;
      this.tabrow.schoolsubjectname = this.SchoolSubjectList.filter(
        (item) => this.tabrow.schoolsubjectid === item.id
      )[0].name;
      if (this.editedIndex1 > -1) {
        Object.assign(
          this.EducationDirection.DirectionSubjectTables[this.editedIndex1],
          this.tabrow
        );
      } else {
        this.EducationDirection.DirectionSubjectTables.push(this.tabrow);
      }
      this.DirectionSubjectTables = false;
    },
    SaveData() {
      // if (!this.check()) {
      //     return false;
      // }
      EducationDirectionService.Update(this.EducationDirection)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: "educationdirection" });
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