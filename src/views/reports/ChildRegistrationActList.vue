<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <!-- <b-col sm="12" md="4">
            <a href="javascript:void(0)" @click="topCountryChange"> {{ $t('uzb') }} </a> <span v-if="data.oblastname !== ''" class="text-primary">/</span><a href="javascript:void(0)" @click="topOblastChange"> {{ data.oblastname }} </a><span v-if="data.regionname !== ''" class="text-primary">/</span><a href="javascript:void(0)"> {{ data.regionname }} </a>
        </b-col> -->
        <b-col cols="12" md="6"></b-col>
        <b-col
          sm="12"
          md="6"
          class="mb-1 text-right d-flex justify-content-end align-items-center"
        >
          <div style="margin-right: 30px">{{ $t("birthPeriod") }}</div>
          <div style="margin-right: -4px">
            <b-form-checkbox
              @input="ChangeBirthPeriod"
              switch
              v-model="data.checkBirthPeriod"
            />
          </div>
          <div
            style="margin-left: 15px"
            v-if="data.checkBirthPeriod == true"
            class="mr-2 ml-2"
          >
            <custom-date-picker
              v-model="data.child.birthPeriod.startDate"
              @keyup="startDateValue"
              format="DD.MM.YYYY"
              type="date"
              clearable
              :placeholder="$t('startDate')"
            >
            </custom-date-picker>
          </div>
          <div
            style="margin-right: -24px"
            v-if="data.checkBirthPeriod == true"
            class="mr-2"
          >
            <custom-date-picker
              v-model="data.child.birthPeriod.endDate"
              @keyup="endDateValue"
              format="DD.MM.YYYY"
              type="date"
              :clearable="false"
              :placeholder="$t('endDate')"
            >
            </custom-date-picker>
          </div>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col>
          <v-select
            :options="OblastList"
            :reduce="(item) => item.id"
            :placeholder="$t('Oblast')"
            label="name"
            v-model="data.oblastId"
            @input="ChangeOblastForRegion"
          ></v-select>
        </b-col>
        <b-col>
          <v-select
            :options="RegionList"
            :reduce="(item) => item.id"
            :placeholder="$t('Region')"
            label="name"
            v-model="data.regionId"
            @input="ChangeRegionForOrganization"
          ></v-select>
        </b-col>
        <b-col>
          <v-select
            :options="OrganizationList"
            :reduce="(item) => item.id"
            :placeholder="$t('Organization')"
            label="name"
            v-model="data.organizationId"
          ></v-select>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col sm="2">
          <custom-date-picker
            v-model="data.onDate"
            @keyup="BindValue"
            format="DD.MM.YYYY"
            type="date"
            :clearable="false"
            :placeholder="$t('ondate')"
          >
          </custom-date-picker>
        </b-col>
        <b-col sm="12" md="2">
          <b-form-input
            :placeholder="$t('documentseries')"
            v-model="data.child.documentSeries"
            style="text-transform: uppercase"
          />
        </b-col>
        <b-col sm="12" md="2">
          <b-form-input
            :placeholder="$t('documentnumber')"
            v-model="data.child.documentNumber"
            v-mask="'#######'"
          />
        </b-col>
        <b-col cols="12" md="3">
          <b-input-group class="text-right">
            <b-form-input
              v-model="data.child.pinfl"
              v-mask="'##############'"
              :placeholder="$t('pinfl')"
            />
            <b-input-group-append>
              <b-button @click="Refresh" variant="primary">
                <feather-icon icon="SearchIcon" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col class="text-right">
          <b-button class="mr-1" @click="Refresh" variant="outline-primary">
            <feather-icon icon="RefreshCcwIcon"> </feather-icon>
            {{ $t("Refresh") }}
          </b-button>
          <b-button @click="Printer" variant="outline-primary">
            <b-spinner v-if="PrintLoading" small></b-spinner>
            <feather-icon v-if="!PrintLoading" icon="PrinterIcon">
            </feather-icon>
            {{ $t("Print") }}
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="6">
          <div>
            <b-button-group size="sm" @click="Refresh">
              <b-button
                @click="data.statusId = 0"
                :variant="data.statusId == 0 ? 'primary' : 'outline-primary'"
                >{{ $t("All") }}</b-button
              >
              <b-button
                @click="data.statusId = 2"
                :variant="data.statusId == 2 ? 'primary' : 'outline-primary'"
                >{{ $t("Утвержден") }}</b-button
              >
              <b-button
                @click="data.statusId = 3"
                :variant="data.statusId == 3 ? 'primary' : 'outline-primary'"
                >{{ $t("Отменено") }}</b-button
              >
            </b-button-group>
          </div>
        </b-col>
        <b-col
          sm="12"
          md="6"
          class="mb-1 text-right d-flex justify-content-end align-items-center"
        >
          <div style="margin-right: 30px">{{ $t("showOnlyActive") }}</div>
          <div style="margin-right: -4px">
            <b-form-checkbox switch v-model="data.showOnlyActive" />
          </div>
        </b-col>
      </b-row>
    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="items"
      responsive
      :fields="fieldsShowAllTrue"
      primary-key="id"
      sticky-header="65vh"
      no-border-collapse
      :busy="isBusy"
      show-empty
      :foot-clone="false"
      no-footer-sorting
      :empty-text="$t('NotFound')"
      class="position-relative"
    >
      <template #cell(oblastname)="{ item }">
        <a href="javascript:void(0)" @click="ChangeOblast(item)">
          {{ item.oblastname }}
        </a>
      </template>
      <template #cell(regionname)="{ item }">
        <a href="javascript:void(0)" @click="ChangeRegion(item)">
          {{ item.regionname }}
        </a>
      </template>
      <template #cell(organizationinn)="{ item }">
        <span> {{ item.organizationinn }}</span>
      </template>
      <template #cell(docdate)="{ item }">
        <span > {{ item.docdate }}</span>
      </template>
      <template #cell(identitydocumentname)="{ item }">
        <span> {{ item.identitydocumentname }}</span>
      </template>
      <template #cell(documentseries)="{ item }">
        <span> {{ item.documentseries }}</span>
      </template>
      <template #cell(documentnumber)="{ item }">
        <span> {{ item.documentnumber }}</span>
      </template>
      <template #cell(personname)="{ item }">
        <span> {{ item.personname }}</span>
      </template>
      <template #cell(gendername)="{ item }">
        <span> {{ item.gendername }}</span>
      </template>
      <template #cell(pinfl)="{ item }">
        <span> {{ item.pinfl }}</span>
      </template>
      <template #cell(guardianshiplessreasonname)="{ item }">
        <span> {{ item.guardianshiplessreasonname }}</span>
      </template>
      <template #cell(needproperty)="{ item }">
        <span
          :class="item.needproperty == true ? 'text-danger' : 'text-success'"
        >
          {{
            item.needproperty == false
              ? "Уй жойга мухтож эмас"
              : "Уй жойга мухтож"
          }}</span
        >
      </template>
      <template #cell(actions)="{ item }">
        <b-link>
          <feather-icon @click="MoveChild(item)" icon="EyeIcon"></feather-icon>
        </b-link>
      </template>
      <template v-slot:table-busy>
        <div
          class="text-center text-primary my-2"
          style="vertical-align: middle"
        >
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>{{ $t("Loading") }}</strong>
        </div>
      </template>
    </b-table>

    <div class="mx-2 mb-2">
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
            {{ lastNumber }} {{ $t("of") }} {{ data.totalRows }}
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
            v-model="data.currentPage"
            :total-rows="data.totalRows"
            :per-page="data.perPage"
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
    <!-- <b-row class="mb-1">
       <b-col md="11"></b-col>
        <b-col md="1">
           <b-button v-if="data.oblastid != 0 && data.regionid === 0" variant="outline-danger" size="sm"  @click="topCountryChange">
        <feather-icon icon="ArrowLeftIcon">  </feather-icon> {{ $t('back') }}
      </b-button>
      <b-button v-if="data.oblastid != 0 && data.regionid != 0" variant="outline-danger" size="sm" @click="topOblastChange">
        <feather-icon icon="ArrowLeftIcon">  </feather-icon> {{ $t('back') }}
      </b-button>  
        </b-col>
      </b-row> -->
  </b-card>
</template>

<script>
import {
  BButton,
  BTable,
  BCol,
  BRow,
  BSpinner,
  BCard,
  BTr,
  BTh,
  BFormCheckbox,
  BPagination,
  BFormInput,
  BLink,
  BTabs,
  BButtonGroup,
  BInputGroup,
  BTab,
  BInputGroupAppend,
} from "bootstrap-vue";
import ReportService from "@/services/report";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import OblastService from "@/services/info/oblast.service";
import RegionService from "@/services/info/region.service";
import OrganizationService from "@/services/managment/organization.service";
import HelperService from "@/services/others/helper.service";
export default {
  components: {
    BButton,
    BTable,
    BCol,
    BRow,
    BSpinner,
    BFormInput,
    BInputGroup,
    BCard,
    BTr,
    BTh,
    BFormCheckbox,
    CustomDatePicker,
    BPagination,
    BButtonGroup,
    BLink,
    BTabs,
    BTab,
    BInputGroupAppend,
  },
  data() {
    return {
      items: [],
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      DocumentSeriesList: [],
      tabIndex: 0,
      data: {
        search: "",
        lang: "",
        sortColumn: "",
        regionname: "",
        orderType: "",
        pageNumber: 1,
        pageLimit: 20,
        isStartPageFromZero: true,
        oblastId: 0,
        regionId: 0,
        statusId: 0,
        onDate: "",
        showAllInRegion: true,
        birthPeriod: null,
        checkBirthPeriod: false,
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
        perPage: 20,
        currentPage: 1,
        organizationId: 0,
        guardianshiplessReasonId: 0,
        showOnlyActive: true,
        child: {
          pinfl: "",
          documentSeries: "",
          documentNumber: "",
          birthPeriod: {
            startDate: "",
            endDate: "",
          },
        },
      },
      fieldsShowAllTrue: [
        {
          key: "oblastname",
          label: this.$t("Oblast"),
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          sortable: true,
        },
        {
          key: "regionname",
          label: this.$t("Region"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "organizationname",
          label: this.$t("Organization"),
          thClass: "text-center my-border-right",
          tdClass: "text-center my-border-right",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "dateofexpulsion",
          label: this.$t("dateofexpulsion"),
          thClass: "text-center my-border-right",
          tdClass: "text-center my-border-right",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "organizationinn",
          label: this.$t("organizationinn"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "personname",
          label: this.$t("personname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },

        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        // {
        //   key: "guardianshiplessreasonname",
        //   label: this.$t("guardianshiplessreasonname"),
        //   thClass: "text-center",
        //   tdClass: "text-center",
        //   sortable: true,
        //   thStyle: { backgroundColor: "#A0E7E5 !important" },
        // },
        {
          key: "needproperty",
          label: this.$t("needproperty"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
      ],
      isBusy: false,
      PrintLoading: false,
    };
  },
  computed: {
    firstNumber() {
      return (this.data.currentPage - 1) * this.data.perPage + 1;
    },
    lastNumber() {
      if (this.data.totalRows < this.data.perPage) {
        return this.data.totalRows;
      } else {
        if (this.data.currentPage * this.data.perPage > this.data.totalRows) {
          return this.data.totalRows;
        } else {
          return this.data.currentPage * this.data.perPage;
        }
      }
    },
  },
  created() {
    if (!!this.$route.query.orgid) {
      this.data.organizationId = this.$route.query.orgid;
      this.tabIndex = this.$route.query.orgid || 0;
    }
    OblastService.GetAll("").then((res) => {
      this.OblastList = res.data;
    });
    HelperService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocumentSeriesList = res.data;
    });
    this.getTodayDate();
    this.Refresh();
  },
  methods: {
    // rowClass(item, type) {
    //   if (!item || type !== "row") return;
    //   if (item.statusid === 2 && item.dateofexpulsion == null)
    //     return "table-success";
    //   if (item.statusid === 2 && item.dateofexpulsion != null)
    //     return "table-danger";
    //   if (item.statusid === 3 && item.dateofexpulsion == null)
    //     return "table-danger";
    // },
    // ChangeIdentityDoc() {
    //   this.data.child.documentSeries = "";z
    //   this.data.child.documentNumber = "";
    //   this.data.child.pinfl = "";
    //   this.data.child.birthPeriod.startDate = "";
    //   this.data.child.birthPeriod.endDate = "";
    // },
    ChangeOblastForRegion() {
      this.data.regionId = 0;
      this.data.organizationId = 0;
      if (!!this.data.oblastId) {
        RegionService.GetAll("", this.data.oblastId).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeRegionForOrganization() {
      this.data.organizationId = 0;
      if (!!this.data.regionId) {
        OrganizationService.GetAll(
          this.data.oblastId,
          this.data.regionId,
          false
        ).then((res) => {
          this.OrganizationList = res.data;
        });
      }
    },
    MoveChild(item) {
      this.$router.push({
        name: "ChildRegistrationActView",
        params: {
          id: item.childregistrationactid,
        },
      });
    },
    ChangeBirthPeriod() {
      if (this.data.checkBirthPeriod) {
        this.data.child.birthPeriod = {
          startDate: "",
          endDate: "",
        };
      } else {
        this.data.child.birthPeriod = null;
      }
    },
    Refresh() {
      if (!this.Check()) {
        return false;
      }
      this.isBusy = true;
      ReportService.ChildRegistrationActList(this.data).then((res) => {
        this.items = res.data.data;
        this.isBusy = false;
        // this.calculate();
      });
    },
    Printer() {
      this.PrintLoading = true;
      ReportService.ChildRegistrationActListPrint(this.data).then((res) => {
        this.downloadFile(res, "download.xlsx");
        this.PrintLoading = false;
        // this.calculate();
      });
    },
    downloadFile(response, item) {
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", item); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    BindValue(value) {
      this.data.onDate = value;
    },
    startDateValue(value) {
      this.data.child.birthPeriod.startDate = value;
    },
    endDateValue(value) {
      this.data.child.birthPeriod.endDate = value;
    },
    getTodayDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mn = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.data.onDate = dd + "." + mn + "." + yyyy;
    },
    Check() {
      if (
        this.data.child.birthPeriod == true &&
        (this.data.child.birthPeriod.startDate === 0 ||
          this.data.child.birthPeriod.startDate === null ||
          this.data.child.birthPeriod.startDate === "" ||
          this.data.child.birthPeriod.startDate === undefined)
      ) {
        this.$makeToast(this.$t("startDateNotSelected"), "danger");
        return false;
      }
      if (
        this.data.child.birthPeriod == true &&
        (this.data.child.birthPeriod.endDate === 0 ||
          this.data.child.birthPeriod.endDate === null ||
          this.data.child.birthPeriod.endDate === "" ||
          this.data.child.birthPeriod.endDate === undefined)
      ) {
        this.$makeToast(this.$t("endDateNotSelected"), "danger");
        return false;
      }
      return true;
    },
    ChangeOblast(item) {
      if (!this.data.showAllInRegion) {
        this.data.oblastid = item.oblastid;
        this.fields[0].key = "regionname";
        this.data.oblastname = item.oblastname;
        this.fields[0].label = this.$t("Region");
        this.Refresh();
      }
    },
    ChangeRegion(item) {
      if (!this.data.showAllInRegion) {
        this.data.regionid = item.regionid;
        this.fields[0].key = "organizationname";
        this.data.regionname = item.regionname;
        this.fields[0].label = this.$t("organization");
        this.Refresh();
      }
    },
    topCountryChange() {
      this.data.showAllInRegion = false;
      this.data.oblastname = "";
      this.data.oblastid = 0;
      this.fields[0].key = "oblastname";
      this.fields[0].label = this.$t("Oblast");
      this.Refresh();
    },
    topOblastChange() {
      this.data.showAllInRegion = false;
      this.data.regionname = "";
      this.data.regionid = 0;
      this.fields[0].key = "regionname";
      this.fields[0].label = this.$t("Region");
      this.Refresh();
    },
  },
};
</script>

<style lang="scss" scoped>
.my-border-left {
  border-left: 2px solid #e0dee7 !important;
}
.my-border-right {
  border-right: 2px solid #e0dee7 !important;
}
</style>
