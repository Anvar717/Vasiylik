<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col sm="2">
          <label for>{{ $t("docnumber") }}</label>
          <div class="mt-1">
            <b-form-input
              :placeholder="$t('docnumber')"
              v-model="HRTimeSheet.docnumber"
            />
          </div>
        </b-col>
        <b-col sm="4">
          <label for>{{ $t("docdate") }}</label>
          <div class="mt-1">
            <custom-date-picker
              v-model="HRTimeSheet.docdate"
              @keyup="DocdateValue"
              format="DD.MM.YYYY"
              type="date"
              :clearable="false"
              :placeholder="$t('docdate')"
              :disabled="DisabledItem()"
            >
            </custom-date-picker>
          </div>
        </b-col>
        <b-col>
          <label for>{{ $t("Month") }}</label>
          <div class="mt-1">
            <v-select
              :options="MonthsList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="label"
              v-model="HRTimeSheet.Month"
              @input="FillDetailInfo"
              :disabled="DisabledItem()"
            ></v-select>
          </div>
        </b-col>
        <b-col>
          <label for>{{ $t("Year") }}</label>
          <div class="mt-1">
            <v-select
              :options="YearsList"
              :reduce="(item) => item.name"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="HRTimeSheet.Year"
              @input="FillDetailInfo"
              :disabled="DisabledItem()"
            ></v-select>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <label for>{{ $t("OrganizationAccount") }}</label>
          <div class="mt-1">
            <v-select
              :options="OrganizationAccountList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="code"
              v-model="HRTimeSheet.organizationaccountid"
              :disabled="DisabledItem()"
            ></v-select>
          </div>
        </b-col>
        <b-col>
          <label for>{{ $t("department") }}</label>
          <div class="mt-1">
            <v-select
              :options="DepartmentList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="HRTimeSheet.departmentid"
              :disabled="DisabledItem()"
            ></v-select>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <label for>{{ $t("detailinfo") }}</label>
          <div class="mt-1">
            <b-form-input
              :placeholder="$t('detailinfo')"
              v-model="HRTimeSheet.detailinfo"
            />
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-2 mb-1">
        <b-col>
          <div class="d-flex justify-content-center">
            <div>
              <b-button @click="FillTable" size="sm" variant="outline-primary">
                <b-icon icon="list-ul" v-if="!FillLoading"></b-icon>
                <b-spinner small v-if="FillLoading"></b-spinner>
                {{ $t("Fill") }}
              </b-button>
            </div>
            <div class="ml-1">
              <b-button
                size="sm"
                @click="$refs['clearModal'].show()"
                variant="outline-danger"
              >
                <b-icon icon="exclamation-octagon"></b-icon>
                {{ $t("Clear") }}
              </b-button>
            </div>
          </div>
          <b-modal
            :ref="'clearModal'"
            :title="$t('Clear')"
            :cancel-title="$t('no')"
            :ok-title="$t('yes')"
            cancel-variant="danger"
            ok-variant="success"
            @ok="Clear"
          >
            <b-card-text> </b-card-text>
          </b-modal>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="12" lg="12">
          <b-table
            :fields="fields"
            :items="HRTimeSheetTables"
            small
            class="text-center"
            :tbody-tr-class="rowClass"
          >
            <template #cell(actions)="{ item }">
              <div class="text-center">
                <b-link>
                  <feather-icon
                    style="margin-right: 5px"
                    @click="EditItem(item)"
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
        :title="$t('tables')"
      >
        
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
  BIcon,
  BSpinner,
} from "bootstrap-vue";
import HRTimeSheetService from "@/services/document/hrtimesheet.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import CustomNumberInput from "@/views/components/CustomNumberInput.vue";
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
    BInputGroupAppend,
    BInputGroup,
    BTr,
    BTd,
    CustomDatePicker,
    BPagination,
    CustomNumberInput,
    BIcon,
    BSpinner,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      isChange: false,
      HRTimeSheet: {
        canSave: true,
      },
      StateList: [],
      DepartmentList: [],
      items: [],
      Modalshow: false,
      HRTimeSheetTables: [],
      tabrow: {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        givendate: "",
        documentseries: "",
        documentnumber: "",
        diagnosis: "",
        givenorganization: "",
        startdate: "",
        enddate: "",
        yearworkexp: 0,
        calcperc: 0,
        detailinfo: "",
        ismaternityleave: false,
        Status: 1,
      },
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
      fields: [
        {
          key: "personname",
          label: this.$t("personname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "positionname",
          label: this.$t("positionname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "documentid",
          label: this.$t("documentid"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "employmentrate",
          label: this.$t("employmentrate"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "employmenttypename",
          label: this.$t("employmenttypename"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "dayoffhours",
          label: this.$t("dayoffhours"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "nighthours",
          label: this.$t("nighthours"),
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
      PersonModal: false,
      filter: {
        inn: "",
        pinfl: "",
        Search: "",
        SortColumn: "",
        OrderType: "",
        PageNumber: 1,
        PageLimit: 20,
        IsAllEmployee: false,
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
      },
      SearchLoading: false,
      selected: [],
      isBusy: false,
      editedIndex: -1,
      MonthsList: [
        { id: 1, label: this.$t("January") },
        { id: 2, label: this.$t("February") },
        { id: 3, label: this.$t("March") },
        { id: 4, label: this.$t("April") },
        { id: 5, label: this.$t("May") },
        { id: 6, label: this.$t("June") },
        { id: 7, label: this.$t("July") },
        { id: 8, label: this.$t("August") },
        { id: 9, label: this.$t("September") },
        { id: 10, label: this.$t("October") },
        { id: 11, label: this.$t("November") },
        { id: 12, label: this.$t("December") },
      ],
      YearsList: [],
      OrganizationAccountList: [],
      FillLoading: false,
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        filterLoading: false,
      },
      newdocid : 0
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    this.loaddata(this.$route.params.id);
    HRTimeSheetService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.HRTimeSheet = res.data.HRTimeSheet;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    DepartmentService.GetAll(this.lang).then((res) => {
      this.DepartmentList = res.data;
    });
    var d = new Date();
    this.YearsList = [
      { id: 1, name: d.getFullYear() - 1 },
      { id: 2, name: d.getFullYear() },
      { id: 3, name: d.getFullYear() + 1 },
    ];
    HelperService.GetOrganizationAccountList().then((res) => {
      this.OrganizationAccountList = res.data;
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
    GetHRTimeSheetTables(ownerid) {
      const { Search, SortColumn, OrderType, PageNumber, PageLimit } =
        this.filter;
      this.isBusy = true;
      HRTimeSheetService.GetHRTimeSheetTables(
        ownerid,
        Search,
        SortColumn,
        OrderType,
        PageNumber,
        PageLimit
      )
        .then((res) => {
          this.HRTimeSheetTables = res.data.rows;
          this.isBusy = false;
          this.totalRows = res.data.total;
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error || error,
            this.$t("message"),
            "danger"
          );
        });
    },
    DisabledItem() {
      if (this.totalRows) {
        return true;
      } else {
        return false;
      }
    },
    // calculate() {
    //   var self = this;
    //   self.tabrow.facthours = 0;
    //   self.tabrow.dayoffhours = 0;
    //   self.tabrow.nighthours = 0;
    //   self.tabrow.factdays = 0;
    //   self.tabrow.DaysTable.forEach(function (item) {
    //     if (item.Status !== 3) {
    //       self.tabrow.facthours =
    //         self.tabrow.facthours * 1 + item.facthours * 1;
    //       self.tabrow.dayoffhours =
    //         self.tabrow.dayoffhours * 1 + item.dayoffhours * 1;
    //       self.tabrow.nighthours =
    //         self.tabrow.nighthours * 1 + item.nighthours * 1;
    //       if (item.facthours != 0) {
    //         self.tabrow.factdays = self.tabrow.factdays * 1 + 1;
    //       }
    //     }
    //   });
    // },
    FillTable() {
      var self = this;
      if (this.filter.totalRows > 0) {
        this.$makeToast(this.$t("ClearTable"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.HRTimeSheet.docdate === null ||
        self.HRTimeSheet.docdate === undefined ||
        self.HRTimeSheet.docdate === 0 ||
        self.HRTimeSheet.docdate === ""
      ) {
        self.$makeToast(self.$t("DateNotCorrect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.HRTimeSheet.Month === null ||
        self.HRTimeSheet.Month === undefined ||
        self.HRTimeSheet.Month === 0 ||
        self.HRTimeSheet.Month === ""
      ) {
        self.$makeToast(
          self.$t("onmonthNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HRTimeSheet.departmentid === null ||
        self.HRTimeSheet.departmentid === undefined ||
        self.HRTimeSheet.departmentid === 0 ||
        self.HRTimeSheet.departmentid === ""
      ) {
        self.$makeToast(
          self.$t("departmentNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HRTimeSheet.organizationaccountid === null ||
        self.HRTimeSheet.organizationaccountid === undefined ||
        self.HRTimeSheet.organizationaccountid === 0 ||
        self.HRTimeSheet.organizationaccountid === ""
      ) {
        self.$makeToast(
          self.$t("organizationaccountNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      /* var date = '01' + '.' + self.HRTimeSheet.Month + '.' + self.HRTimeSheet.Year; */
      self.FillLoading = true;
      HRTimeSheetService.HrTimeSheetFill(self.HRTimeSheet)
        .then((res) => {
          /*   this.HRTimeSheet.Tables = res.data */
          self.FillLoading = false;
          self.HRTimeSheet.formonth = res.data.formonth;
          self.HRTimeSheet = res.data;
          self.newdocid = res.data.id;
          self.loaddata(self.HRTimeSheet.id);
        })
        .catch((error) => {
          this.FillLoading = false;
          this.$makeToast(
            error.response.data.error || error,
            this.$t("error"),
            "danger"
          );
        });
      // this.calculate();
    },
    Clear() {
      var self = this;
      HRTimeSheetService.ClearHrTimeSheet(self.HRTimeSheet)
        .then((res) => {
          self.HRTimeSheet.formonth = res.data.formonth;
          self.HRTimeSheet = res.data;
          self.loaddata(self.HRTimeSheet.id);
        })
        .catch((error) => {
          this.FillLoading = false;
          this.makeToast(
            error.response.data.error || error,
            this.$t("error"),
            "danger"
          );
        });
    },
    FillDetailInfo() {
      if (this.HRTimeSheet.Year === null) return (this.HRTimeSheet.Year = "");
      if (this.HRTimeSheet.Month === null) return (this.HRTimeSheet.Month = "");
      var monthname = this.MonthsList.filter(
        (item) => item.id === this.HRTimeSheet.Month
      )[0].label;
      this.HRTimeSheet.detailinfo = `Табель за ${monthname} месяц ${this.HRTimeSheet.Year} года`;
    },
    loaddata(id) {
      var self = this;
      HRTimeSheetService.Get(id).then((res) => {
        self.HRTimeSheet = res.data.HRTimeSheet;
        self.history = res.data.history;
        this.FillDetailInfo();
        this.GetHRTimeSheetTables(id);
      });
    },
    AddData() {
      this.tabrow.departmentname =
        this.DepartmentList.length > 0
          ? this.DepartmentList.filter(
              (item) => this.tabrow.departmentid === item.id
            )[0].name
          : "";
      if (this.editedIndex > -1) {
        Object.assign(this.HRTimeSheet.Tables[this.editedIndex], this.tabrow);
      } else {
        this.HRTimeSheet.Tables.push(this.tabrow);
      }
      this.Modalshow = false;
    },
    // EditTable(item) {
    //   if (item.Status == 0) {
    //     item.Status = 2;
    //   }
    //   this.editedIndex = this.HRTimeSheet.Tables.indexOf(item);
    //   this.tabrow = Object.assign({}, item);
    //   this.Modalshow = true;
    // },
    EditItem(item){
      this.$router.push({
        name : 'EditTabRowHRTimeSheet',
        params : {
          id : item.id,
        },
        query : {
          newdocid : this.newdocid
        }
      })
      
    },
    OpenAddModal(){
      // this.$bvModal.show('AddModal')
      var self = this
      self.$router.push({
        name : 'EditTabRowHRTimeSheet',
        params : {
          id : 0,
          data : self.HRTimeSheet
        },
      })
      /* var date = '01' + '.' + this.HRTimeSheet.Month + '.' + this.HRTimeSheet.Year; */
      // HRTimeSheetService.HrTimeSheetFill(this.HRTimeSheet).then(res => {
      //   this.tabrow.DaysTable = res.data[0].DaysTable
      //   this.calculate()
      // })
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
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        givendate: "",
        documentseries: "",
        documentnumber: "",
        diagnosis: "",
        givenorganization: "",
        startdate: "",
        enddate: "",
        yearworkexp: 0,
        calcperc: 0,
        detailinfo: "",
        ismaternityleave: false,
        Status: 1,
      };
      this.editedIndex = -1;
    },
    DocdateValue(value) {
      this.HRTimeSheet.docdate = value;
    },
    SortChange(data) {
      this.filter.SortColumn = data.sortBy;
      this.filter.OrderType = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    SaveData() {
      HRTimeSheetService.Update(this.HRTimeSheet)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `hrtimesheet` });
        })
        .catch((err) => {
          this.$makeToast(this.$t(err.response.data.error), "danger");
        });
    },
    watch: {
      "filter.PageNumber": {
        handler(newValue, oldValue) {
          if (newValue) {
            this.GetHRTimeSheetTables(this.HRTimeSheet.id);
          }
        },
      },
      "filter.PageLimit": {
        handler(newValue, oldValue) {
          if (newValue) {
            this.GetHRTimeSheetTables(this.HRTimeSheet.id);
          }
        },
      },
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
