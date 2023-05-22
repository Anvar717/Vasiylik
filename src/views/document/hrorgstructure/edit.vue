<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col sm="12" md="4" lg="4">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("docnumber")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('docnumber')"
                v-model="HROrgStructure.docnumber"
              />
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="4" lg="4">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("docdate")
            }}</label>
            <div class="col-sm-7">
              <custom-date-picker
                v-model="HROrgStructure.docdate"
                @keyup="DocdateValue"
                format="DD.MM.YYYY"
                type="date"
                :clearable="false"
                :placeholder="$t('docdate')"
              >
              </custom-date-picker>
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="4" lg="4">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("detailinfo")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('detailinfo')"
                v-model="HROrgStructure.detailinfo"
              />
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col class="mt-1" sm="12" lg="6" md="6">
          <!-- <span
            ><b>{{ $t("Tables") }}</b></span
          > -->
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
      </b-row>
      <b-row>
        <b-col sm="12" md="12" lg="12">
          <b-table
            :fields="fields"
            :items="HROrgStructure.Tables"
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
      </b-row>
      <b-modal
        size="lg"
        v-model="Modalshow"
        no-close-on-backdrop
        hide-footer
        :title="$t('HROrgStructure')"
      >
        <b-row>
          <b-col sm="12" md="8" lg="8">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("ordernumber")
              }}</label>
              <span class="col-sm-7 pt-2">{{ tabrow.ordernumber }}</span>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("department")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="DepartmentList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.departmentid"
                ></v-select>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("position")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="PositionList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.positionid"
                ></v-select>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("isfixedratecountname")
              }}</label>
              <b-form-checkbox
                @input="isfixedratecountchange"
                v-model="tabrow.isfixedratecount"
                switch
                class="col-sm-7 mt-1"
              ></b-form-checkbox>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("ratecount")
              }}</label>
              <custom-number-input
                class="col-sm-7"
                v-if="tabrow.isfixedratecount"
                v-model="tabrow.ratecount"
              ></custom-number-input>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("isselfacceptanceworkname")
              }}</label>
              <b-form-checkbox
                @input="isselfacceptanceworkchange"
                v-model="tabrow.isselfacceptancework"
                switch
                class="mt-1"
              ></b-form-checkbox>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("acceptanceorgname")
              }}</label>
              <v-select
                v-if="!tabrow.isselfacceptancework"
                :options="AcceptanceorgList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="tabrow.acceptanceorgid"
                class="col-sm-7"
              ></v-select>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("detailinfo")
              }}</label>
              <div class="col-sm-7">
                <b-form-input
                  :placeholder="$t('detailinfo')"
                  v-model="tabrow.detailinfo"
                />
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
      </b-modal>
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
  BInputGroupAppend,
  BInputGroup,
  BTr,
  BTd,
  BPagination,
} from "bootstrap-vue";
import HROrgStructureService from "@/services/document/hrorgstructure.service";
import HelperService from "@/services/others/helper.service";
import PositionService from "@/services/info/position.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import CustomNumberInput from "@/views/components/CustomNumberInput.vue";
import DepartmentService from "@/services/info/department.service";
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
    BPagination,
    CustomNumberInput,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      isChange: false,
      HROrgStructure: {
        canSave: true,
      },
      StateList: [],
      DepartmentList: [],
      items: [],
      Modalshow: false,
      tabrow: {
        id: 0,
        ownerid: 0,
        ordernumber: 0,
        departmentid: 0,
        departmentname: "",
        positionid: 0,
        positionidname: "",
        isfixedratecount: true,
        isfixedratecountname: "",
        ratecount: 0,
        isselfacceptancework: true,
        isselfacceptanceworkname: "",
        acceptanceorgid: 0,
        acceptanceorgname: "",
        detailinfo: "",
        Status: 1,
      },
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
      fields: [
        {
          key: "ordernumber",
          label: this.$t("ordernumber"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "departmentname",
          label: this.$t("departmentname"),
          thClass: "text-center",
          sortable: true,
        },

        {
          key: "positionidname",
          label: this.$t("positionidname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "isfixedratecountname",
          label: this.$t("isfixedratecountname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "ratecount",
          label: this.$t("ratecount"),
          thClass: "text-center",
          sortable: true,
        },
          {
          key: "isselfacceptanceworkname",
          label: this.$t("isselfacceptanceworkname"),
          thClass: "text-center",
          sortable: true,
        },
          {
          key: "acceptanceorgname",
          label: this.$t("acceptanceorgname"),
          thClass: "text-center",
          sortable: true,
        },
          {
          key: "detailinfo",
          label: this.$t("detailinfo"),
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
      SearchLoading: false,
      selected: [],
      isBusy: false,
      editedIndex: -1,
      PositionList: [],
      AcceptanceorgList: [],
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    HROrgStructureService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.HROrgStructure = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    DepartmentService.GetAll(this.lang).then((res) => {
      this.DepartmentList = res.data;
    });
    HelperService.GetAll(0, 0, 0).then((res) => {
      this.AcceptanceorgList = res.data;
    });
    PositionService.GetAll(0, 0, 0, 0).then((res) => {
      this.PositionList = res.data;
    });
  },
  computed: {
    firstNumber() {
      return (this.filter.PageNumber - 1) * this.filter.PageLimit + 1;
    },
    lastNumber() {
      if (this.filter.totalRows < this.filter.PageLimit) {
        return this.filter.totalRows;
      } else {
        if (
          this.filter.PageNumber * this.filter.PageLimit >
          this.filter.totalRows
        ) {
          return this.filter.totalRows;
        } else {
          return this.filter.PageNumber * this.filter.PageLimit;
        }
      }
    },
  },
  directives: {
    Ripple,
  },
  methods: {
    AddData() {
      this.tabrow.departmentname =
        this.DepartmentList.length > 0
          ? this.DepartmentList.filter(
              (item) => this.tabrow.departmentid === item.id
            )[0].name
          : "";
      this.tabrow.positionidname =
        this.PositionList.length > 0
          ? this.PositionList.filter(
              (item) => this.tabrow.positionid === item.id
            )[0].name
          : "";
      if ((this.tabrow.isselfacceptanceworkname = false)) {
        this.tabrow.acceptanceorgname =
          this.AcceptanceorgList.length > 0
            ? this.AcceptanceorgList.filter(
                (item) => this.tabrow.acceptanceorgid === item.id
              )[0].name
            : "";
      }
      if (this.editedIndex > -1) {
        Object.assign(
          this.HROrgStructure.Tables[this.editedIndex],
          this.tabrow
        );
      } else {
        this.HROrgStructure.Tables.push(this.tabrow);
      }
      this.Modalshow = false;
      console.log(this.tabrow)
    },
    EditTable(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.HROrgStructure.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.Modalshow = true;
       console.log(this.tabrow)
    },
    rowClass(item) {
      if (item.Status === 3) return "d-none";
    },
    Delete(item) {
      item.Status = 3;
    },
    OpenModalTables() {
      this.Modalshow = true;
      this.tabrow = {
        id: 0,
        ownerid: 0,
        ordernumber: 0,
        departmentid: 0,
        departmentname: "",
        positionid: 0,
        positionidname: "",
        isfixedratecount: true,
        isfixedratecountname: "",
        ratecount: 0,
        isselfacceptancework: true,
        isselfacceptanceworkname: "",
        acceptanceorgid: 0,
        acceptanceorgname: "",
        detailinfo: "",
        Status: 1,
      };
      this.editedIndex = -1;
    },
    isfixedratecountchange() {
      var self = this;
      self.tabrow.isfixedratecount;
      if (!self.tabrow.isfixedratecount) self.tabrow.ratecount = 0;
    },
    isselfacceptanceworkchange() {
      var self = this;

      if (self.tabrow.isselfacceptancework) {
        self.tabrow.acceptanceorgid = 0;
        self.tabrow.acceptanceorgname = "";
      }
    },
    DocdateValue(value) {
      this.HROrgStructure.docdate = value;
    },
    IswithoutpayValue(value) {
      this.tabrow.forperiodstart = value;
    },
    ForperiodendValue(value) {
      this.tabrow.forperiodend = value;
    },
    Openperson() {
      this.PersonModal = true;
      this.selected = [];
      this.Refresh();
    },
    SortChange(data) {
      this.filter.SortColumn = data.sortBy;
      this.filter.OrderType = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    SaveData() {
      HROrgStructureService.Update(this.HROrgStructure)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `hrorgstructure` });
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
