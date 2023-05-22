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
                v-model="HREmpLeaveOrder.docnumber"
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
                v-model="HREmpLeaveOrder.docdate"
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
                v-model="HREmpLeaveOrder.detailinfo"
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
            :items="HREmpLeaveOrder.Tables"
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
        :title="$t('HREmpLeaveOrder')"
      >
        <b-row>
          <b-col sm="12" md="8" lg="8">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("Employee")
              }}</label>
              <div class="col-sm-7">
                <b-form-input
                  :placeholder="$t('Employee')"
                  v-model="tabrow.personname"
                  disabled
                />
              </div>
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
              <label class="col-form-label col-sm-5">{{
                $t("employeeenrolment")
              }}</label>
              <div class="col-sm-7">
                {{ tabrow.employeeenrolmentid }}
              </div>
            </div>
            <div div class="form-group form-row mb-0">
              <label
                class="col-form-label col-sm-5 d-flex align-items-center"
                for
                >{{ $t("iswithoutpay") }}</label
              >
              <div class="col-sm-7">
                <b-form-checkbox
                  v-model="tabrow.iswithoutpay"
                  name="check-button1"
                  @input="iswithoutpayChange"
                  switch
                >
                </b-form-checkbox>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("startdate")
              }}</label>
              <div class="col-sm-7">
                <custom-date-picker
                  v-model="tabrow.startdate"
                  @keyup="StartdateValue"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('startdate')"
                  @input="datechange"
                >
                </custom-date-picker>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("enddate")
              }}</label>
              <div class="col-sm-7">
                <custom-date-picker
                  v-model="tabrow.enddate"
                  @keyup="EnddateValue"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('enddate')"
                  @input="datechange"
                >
                </custom-date-picker>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("workschedule")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="WorkscheduleList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.workscheduleid"
                ></v-select>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5">{{ $t("days") }}</label>
              <div class="col-sm-7">
                <custom-number-input
                  class="mb-0"
                  disabled
                  size="lg"
                  v-model="tabrow.days"
                ></custom-number-input>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5">{{
                $t("addpaydays")
              }}</label>
              <div class="col-sm-7">
                <b-form-input
                  class="mb-0 CurrenyInput"
                  :disabled="tabrow.iswithoutpay"
                  @keyup="ClickAddPay"
                  v-model="tabrow.addpaydays"
                />
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("forperiodstart")
              }}</label>
              <div class="col-sm-7">
                <custom-date-picker
                  v-model="tabrow.forperiodstart"
                  @keyup="IswithoutpayValue"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('forperiodstart')"
                  :disabled="tabrow.iswithoutpay"
                >
                </custom-date-picker>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("forperiodend")
              }}</label>
              <div class="col-sm-7">
                <custom-date-picker
                  v-model="tabrow.forperiodend"
                  @keyup="ForperiodendValue"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('forperiodend')"
                  :disabled="tabrow.iswithoutpay"
                >
                </custom-date-picker>
              </div>
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
          <b-col sm="12" md="4" lg="4">
            <div>
              <b-button @click="Openperson" variant="primary">
                <feather-icon v-if="!SearchLoading" icon="SearchIcon" />
                <b-spinner v-if="SearchLoading" small></b-spinner>
                {{ $t("selection") }}
              </b-button>
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
    <b-modal
      no-close-on-backdrop
      hide-footer
      size="xl"
      v-model="PersonModal"
      :title="$t('Employee')"
    >
      <b-row>
        <!-- <b-col
          v-if="tabrow.hrempappointordertypeid !== 2"
          sm="12"
          md="2"
          lg="2"
        >
          <div>
            <b-form-input :placeholder="$t('inn')" v-model="filter.inn" />
          </div>
        </b-col> -->
        <!-- <b-col
          v-if="tabrow.hrempappointordertypeid !== 2"
          sm="12"
          md="2"
          lg="2"
        >
          <div>
            <b-form-input :placeholder="$t('pinfl')" v-model="filter.pinfl" />
          </div>
        </b-col> -->
        <b-col cols="12" md="4">
          <b-input-group class="text-right">
            <b-form-input v-model="filter.Search" :placeholder="$t('search')" />
            <b-input-group-append>
              <b-button @click="GetpersonPersondata" variant="primary">
                <feather-icon v-if="!SearchPersonLoading" icon="SearchIcon" />
                <b-spinner v-if="SearchPersonLoading" small></b-spinner>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="12">
          <b-table
            ref="refInvoiceListTable"
            :items="items"
            responsive
            :fields="fieldsPerson"
            primary-key="id"
            sticky-header="65vh"
            no-border-collapse
            :busy="isBusy"
            show-empty
            :empty-text="$t('NotFound')"
            class="position-relative mt-1"
            @sort-changed="SortChange"
            @row-dblclicked="PersonChange"
            @row-selected="onRowSelected"
            select-mode="single"
            selectable
          >
            <template v-slot:head(selected)>
              <div style="cursor: pointer"></div>
            </template>
            <template #cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <!-- <feather-icon icon="CheckIcon"> </feather-icon> -->
                <span aria-hidden="true">&check;</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template>
          </b-table>
        </b-col>
        <div class="mx-2 mb-2 w-100">
          <b-row>
            <b-col
              cols="12"
              sm="6"
              class="
                d-flex
                align-items-center
                justify-content-center justify-content-sm-start
              "
            >
              <span class="text-muted"
                >{{ $t("Showing") }} {{ firstNumber }} {{ $t("to") }}
                {{ lastNumber }} {{ $t("of") }} {{ filter.totalRows }}
                {{ $t("entries") }}</span
              >
            </b-col>
            <!-- Pagination -->
            <b-col
              cols="12"
              sm="6"
              class="
                d-flex
                align-items-center
                justify-content-center justify-content-sm-end
              "
            >
              <b-pagination
                v-model="filter.PageNumber"
                :total-rows="filter.totalRows"
                :per-page="filter.PageLimit"
                first-number
                last-number
                @input="Refresh"
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
              >
                <template #prev-text>
                  <feather-icon icon="ChevronLeftIcon" size="18" />
                </template>
                <template #next-text>
                  <feather-icon icon="ChevronRightIcon" size="18" />
                </template>
              </b-pagination>
            </b-col>
          </b-row>
        </div>
      </b-row>
      <b-row>
        <b-col class="text-center">
          <b-button variant="danger" @click="PersonModal = false" class="mr-1">
            {{ $t("back") }}
          </b-button>
          <b-button variant="success" @click="AddPersonData()">
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
  BPagination,
} from "bootstrap-vue";
import HREmpLeaveOrderService from "@/services/document/hrempleaveorder.service";
import WorkScheduleService from "@/services/info/workschedule.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import CustomNumberInput from "@/views/components/CustomNumberInput.vue";
import DepartmentService from "@/services/info/department.service";
import EmployeeManageService from "@/services/others/employeemanage.service";
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
      HREmpLeaveOrder: {
        canSave: true,
      },
      StateList: [],
      DepartmentList: [],
      items: [],
      WorkscheduleList: [],
      Modalshow: false,
      tabrow: {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        iswithoutpay: false,
        startdate: "",
        enddate: "",
        workscheduleid: 0,
        days: 0,
        addpaydays: 0,
        forperiodstart: "",
        forperiodend: "",
        detailinfo: "",
        Status: 1,
      },
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
      fields: [
        {
          key: "departmentname",
          label: this.$t("departmentname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "personname",
          label: this.$t("personname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "employeeenrolmentid",
          label: this.$t("employeeenrolmentid"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "iswithoutpay",
          label: this.$t("iswithoutpay"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "days",
          label: this.$t("days"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "addpaydays",
          label: this.$t("addpaydays"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "forperiodstart",
          label: this.$t("forperiodstart"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "forperiodend",
          label: this.$t("forperiodend"),
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
      fieldsPerson: [
        {
          key: "selected",
        },
        {
          key: "personname",
          label: this.$t("personname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "nationality",
          label: this.$t("nationality"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "gender",
          label: this.$t("gender"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "department",
          label: this.$t("department"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "hrempappointordertype",
          label: this.$t("hrempappointordertype"),
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
          key: "workschedule",
          label: this.$t("workschedule"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          thClass: "text-center",
          sortable: true,
        },
      ],
      PersonModal: false,
      filter: {
        OnDate: "",
        DepartmentID: 0,
        HREmpAppointOrderTypeID: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        organizationid: 0,
        isTeacher: false,
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
      },
      SearchPersonLoading: false,
      SearchLoading: false,
      selected: [],
      isBusy: false,
      editedIndex: -1,
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    HREmpLeaveOrderService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.HREmpLeaveOrder = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    DepartmentService.GetAll(this.lang).then((res) => {
      this.DepartmentList = res.data;
    });
    WorkScheduleService.GetAll(this.lang).then((res) => {
      this.WorkscheduleList = res.data;
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
    GetpersonPersondata() {
      this.SearchPersonLoading = true;
      EmployeeManageService.GetEmployeeListForComponent(
        (this.filter.OnDate = this.HREmpLeaveOrder.docdate),
        this.filter.DepartmentID,
        this.filter.HREmpAppointOrderTypeID,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.organizationid,
        this.filter.isTeacher
      ).then((res) => {
        this.SearchPersonLoading = false;
        this.items = res.data.rows;
      });
    },
    Refresh() {
      this.isBusy = true;
      EmployeeManageService.GetEmployeeListForComponent(
        (this.filter.OnDate = this.HREmpLeaveOrder.docdate),
        this.filter.DepartmentID,
        this.filter.HREmpAppointOrderTypeID,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.organizationid,
        this.filter.isTeacher
      ).then((res) => {
        this.SearchFamilyLoading = false;
        this.isBusy = false;
        this.items = res.data.rows;
        this.filter.totalRows = res.data.total;
      });
    },
    onRowSelected(item) {
      this.selected = item;
      console.log(this.selected);
    },
    AddPersonData() {
      this.tabrow.personid = this.selected[0].personid;
      this.tabrow.personname = this.selected[0].personname;
      this.PersonModal = false;
    },
    PersonChange(item) {
      this.tabrow.personid = item.personid;
      this.tabrow.personname = item.personname;
      this.PersonModal = false;
      console.log(item)
    },
    iswithoutpayChange() {
      if (this.tabrow.iswithoutpay) {
        this.tabrow.addpaydays = 0;
        this.tabrow.forperiodstart = "";
        this.tabrow.forperiodend = "";
      }
    },
    datechange() {
      var self = this;
      if (
        self.tabrow.startdate !== null &&
        self.tabrow.startdate !== "" &&
        self.tabrow.startdate !== undefined &&
        self.tabrow.enddate !== null &&
        self.tabrow.enddate !== "" &&
        self.tabrow.enddate !== undefined
      ) {
        HREmpLeaveOrderService.GetCountWorkDays(
          self.tabrow.startdate,
          self.tabrow.enddate
        ).then((res) => {
          self.tabrow.days = res.data;
        });
      } else {
        self.tabrow.days = 0;
      }
    },
    ClickAddPay() {
      if (
        this.tabrow.addpaydays == 1 ||
        this.tabrow.addpaydays == 2 ||
        this.tabrow.addpaydays == 3
      ) {
        this.tabrow.addpaydays = this.tabrow.addpaydays;
      } else {
        this.tabrow.addpaydays = "";
      }
    },
    AddData() {
      this.tabrow.departmentname =
        this.DepartmentList.length > 0
          ? this.DepartmentList.filter(
              (item) => this.tabrow.departmentid === item.id
            )[0].name
          : "";
      this.tabrow.workschedulename =
        this.WorkscheduleList.length > 0
          ? this.WorkscheduleList.filter(
              (item) => this.tabrow.workscheduleid === item.id
            )[0].name
          : "";
      if (this.editedIndex > -1) {
        Object.assign(
          this.HREmpLeaveOrder.Tables[this.editedIndex],
          this.tabrow
        );
      } else {
        this.HREmpLeaveOrder.Tables.push(this.tabrow);
      }
      this.Modalshow = false;
    },
    EditTable(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex = this.HREmpLeaveOrder.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.Modalshow = true;
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
        iswithoutpay: false,
        startdate: "",
        enddate: "",
        workscheduleid: 0,
        days: 0,
        addpaydays: 0,
        forperiodstart: "",
        forperiodend: "",
        detailinfo: "",
        Status: 1,
      };
      this.editedIndex = -1;
    },
    StartdateValue(value) {
      this.tabrow.startdate = value;
    },
    DocdateValue(value) {
      this.HREmpLeaveOrder.docdate = value;
    },
    EnddateValue(value) {
      this.tabrow.enddate = value;
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
      HREmpLeaveOrderService.Update(this.HREmpLeaveOrder)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `hrempleaveorder` });
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
