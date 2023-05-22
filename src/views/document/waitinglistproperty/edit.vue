<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col sm="12" md="6" lg="6">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("docnumber")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('numbercode')"
                v-model="WaitingListProperty.docnumber"
                disabled
              />
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="6" lg="6">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("docdate")
            }}</label>
            <div class="col-sm-7">
              <custom-date-picker
                v-model="WaitingListProperty.docdate"
                @keyup="BindValue"
                format="DD.MM.YYYY"
                type="date"
                :clearable="false"
                :placeholder="$t('docdate')"
              >
              </custom-date-picker>
            </div>
          </div>
        </b-col>
        <!-- <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("state") }}</label>
            <div class="col-sm-7">
              <v-select
                :options="StateList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Country.Stateid"
              ></v-select>
            </div>
          </div>
        </b-card>
      </b-col> -->
      </b-row>
    </b-card>
    <b-row>
      <b-col>
        <b-card>
          <b-row class="mb-2">
            <b-col sm="12" md="3" lg="3">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("startDate")
                }}</label>
                <div class="col-sm-7">
                  <custom-date-picker
                    v-model="WaitingListProperty.fillParametrs.StartDate"
                    @keyup="BindValue"
                    format="DD.MM.YYYY"
                    type="date"
                    :clearable="false"
                    :placeholder="$t('startDate')"
                  >
                  </custom-date-picker>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="3" lg="3">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("endDate")
                }}</label>
                <div class="col-sm-7">
                  <custom-date-picker
                    v-model="WaitingListProperty.fillParametrs.EndDate"
                    @keyup="BinddValue"
                    format="DD.MM.YYYY"
                    type="date"
                    :clearable="false"
                    :placeholder="$t('endDate')"
                  >
                  </custom-date-picker>
                </div>
              </div>
            </b-col>
            <b-col class="text-right">
              <b-button @click="Fill" size="sm" variant="outline-primary">
                <feather-icon icon="ArrowDownCircleIcon"></feather-icon>
                {{ $t("Fill") }}
              </b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="12" lg="12">
              <b-table
                :fields="fieldsTable"
                :items="WaitingListProperty.Table"
                small
                class="text-center"
                :tbody-tr-class="rowClass"
              >
              </b-table>
            </b-col>
          </b-row>
          <!-- <b-row>
                  <b-col sm="12" md="4" lg="4">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("liveoblast") }}
                      </label>
                      <div class="col-sm-7">
                        <v-select
                          @input="ChangeliveRegion"
                          :options="liveoblastList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow.liveoblastid"
                        ></v-select>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("liveregion") }}
                      </label>
                      <div class="col-sm-7">
                        <v-select
                          :options="liveregionList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow.liveregionid"
                        ></v-select>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("liveaddress")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('liveaddress')"
                          v-model="tabrow.liveaddress"
                        />
                      </div>
                    </div>
                  </b-col>
                </b-row> -->
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
import WaitingListPropertyService from "@/services/document/waitinglistproperty.service";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import OblastService from "@/services/info/oblast.service";
import RegionService from "@/services/info/region.service";
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
      WaitingListProperty: {},
      organizationList: [],
      personList: [],
      liveoblastList: [],
      liveregionList: [],
      tabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        liveoblastid: 0,
        liveoblastname: "",
        liveregionid: 0,
        liveregionname: "",
        liveaddress: "",
        Status: 1,
      },
      fieldsTable: [
        {
          key: "sequencenumber",
          label: this.$t("sequencenumber"),
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "personname",
          label: this.$t("person"),
          tdClass: "text-left",
          sortable: true,
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "gendername",
          label: this.$t("gendername"),
          tdClass: "text-left",
          sortable: true,
        },
        {
          key: "liveoblastname",
          label: this.$t("liveoblast"),
          tdClass: "text-left",
          sortable: true,
        },
        {
          key: "liveregionname",
          label: this.$t("liveregion"),
          tdClass: "text-left",
          sortable: true,
        },
        {
          key: "liveaddress",
          label: this.$t("liveaddress"),
          tdClass: "text-left",
          sortable: true,
        },
      ],
      editedIndex: -1,
      lang: "ru",
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    WaitingListPropertyService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.WaitingListProperty = res.data;
        this.WaitingListProperty.fillParametrs.StartDate = "";
        this.WaitingListProperty.fillParametrs.EndDate = "";
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    OblastService.GetAll(this.lang).then((res) => {
      this.liveoblastList = res.data;
    });
    // HelperService.GetStateList().then((res1) => {
    //   this.StateList = res1.data;
    // });
  },
  directives: {
    Ripple,
  },
  methods: {
    Fill() {
      if (
        this.WaitingListProperty.fillParametrs.StartDate === 0 ||
        this.WaitingListProperty.fillParametrs.StartDate === undefined ||
        this.WaitingListProperty.fillParametrs.StartDate === null ||
        this.WaitingListProperty.fillParametrs.StartDate === ""
      ) {
        this.$makeToast(this.$t("StartDateNotSelected"), "danger");
        return false;
      }
      if (
        this.WaitingListProperty.fillParametrs.EndDate === 0 ||
        this.WaitingListProperty.fillParametrs.EndDate === undefined ||
        this.WaitingListProperty.fillParametrs.EndDate === null ||
        this.WaitingListProperty.fillParametrs.EndDate === ""
      ) {
        this.$makeToast(this.$t("EndDateNotSelected"), "danger");
        return false;
      }
      WaitingListPropertyService.Fill(this.WaitingListProperty)
        .then((res) => {
          this.WaitingListProperty = res.data.result;
        })
        .catch((err) => {
          this.$makeToast(err.response.data.error, "danger");
        });
    },
    BindValue(value) {
      this.WaitingListProperty.fillParametrs.StartDate = value;
    },
    BinddValue(value) {
      this.WaitingListProperty.fillParametrs.EndDate = value;
    },
    
    rowClass(item, type) {
      if (item.Status === 3) return "d-none";
    },
    ChangeliveRegion() {
      RegionService.GetAll(this.lang, this.tabrow.liveoblastid).then((res) => {
        this.liveregionList = res.data;
      });
    },
    
    SaveData() {
      if (this.WaitingListProperty.Table.length == 0) {
        this.$makeToast(this.$t("iiiiii"), "danger");
        return false;
      }
      WaitingListPropertyService.Update(this.WaitingListProperty)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `waitinglistproperty` });
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