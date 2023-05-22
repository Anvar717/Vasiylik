<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <!-- <b-col sm="12" md="4">
            <a href="javascript:void(0)" @click="topCountryChange"> {{ $t('uzb') }} </a> <span v-if="data.oblastname !== ''" class="text-primary">/</span><a href="javascript:void(0)" @click="topOblastChange"> {{ data.oblastname }} </a><span v-if="data.regionname !== ''" class="text-primary">/</span><a href="javascript:void(0)"> {{ data.regionname }} </a>
        </b-col> -->
        <!-- <b-col
          cols="12"
          md="7"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <b-tabs pills v-model="tabIndex" @input="Refresh">
            <b-tab
              :title="
                $t('Mehribonlik uylarida uy-joyga muxtoj bolalar hisoboti')
              "
            >
            </b-tab>
            <b-tab :title="$t('Vasiylikdagi uy-joyga muxtoj bolalar hisoboti')">
            </b-tab>
          </b-tabs>
        </b-col> -->
        <!-- <b-col cols="12" md="6"></b-col>
        <b-col
          sm="12"
          md="6"
          class="mb-1 text-right d-flex justify-content-end align-items-center"
        >
          <div style="margin-right:30px">{{ $t("birthPeriod") }}</div>
          <div style="margin-right:-4px">
            <b-form-checkbox
              @input="ChangeBirthPeriod"
              switch
              v-model="data.checkBirthPeriod"
            />
          </div>
          <div
            style="margin-left:15px"
            v-if="data.checkBirthPeriod == true"
            class="mr-2 ml-2"
          >
            <custom-date-picker
              v-model="data.guardian.birthPeriod.startDate"
              @keyup="startDateValue"
              format="DD.MM.YYYY"
              type="date"
              clearable
              :placeholder="$t('startDate')"
            >
            </custom-date-picker>
          </div>
          <div
            style="margin-right:-24px"
            v-if="data.checkBirthPeriod == true"
            class="mr-2"
          >
            <custom-date-picker
              v-model="data.guardian.birthPeriod.endDate"
              @keyup="endDateValue"
              format="DD.MM.YYYY"
              type="date"
              :clearable="false"
              :placeholder="$t('endDate')"
            >
            </custom-date-picker>
          </div>
        </b-col> -->
      </b-row>
      <b-row class="mt-2 mb-1">
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
        <b-col cols="12" md="4">
          <b-button-group>
            <b-button
              @click="searchtype = false"
              :variant="searchtype == false ? 'primary' : 'outline-primary'"
              >{{ $t("SearchGuardian") }}</b-button
            >
            <b-button
              @click="searchtype = true"
              :variant="searchtype == true ? 'primary' : 'outline-primary'"
              >{{ $t("SearchChild") }}</b-button
            >
          </b-button-group>
        </b-col>
      </b-row>

      <b-row class="mb-1" v-if="searchtype == false">
        <b-col sm="12" md="2" v-if="searchtype == false">
          <b-form-input
            :placeholder="$t('AA')"
            v-model="data.guardian.documentSeries"
            style="text-transform: uppercase"
            v-mask="'AA'"
          />
        </b-col>
        <b-col sm="12" md="2" v-if="searchtype == false">
          <b-form-input
            :placeholder="$t('documentnumber')"
            v-model="data.guardian.documentNumber"
            v-mask="'#######'"
          />
        </b-col>
        <b-col cols="12" md="3" v-if="searchtype == false">
          <b-input-group class="text-right">
            <b-form-input
              v-model="data.guardian.pinfl"
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
      </b-row>

      <b-row class="mb-1" v-if="searchtype == true">
        <b-col md="2" v-if="searchtype == true">
          <custom-date-picker
            v-model="data.guardian.birthPeriod.startDate"
            @keyup="startDateValue"
            format="DD.MM.YYYY"
            type="date"
            clearable
            :placeholder="$t('startDate')"
          >
          </custom-date-picker>
        </b-col>
        <b-col md="2" v-if="searchtype == true">
          <custom-date-picker
            v-model="data.guardian.birthPeriod.endDate"
            @keyup="startDateValue"
            format="DD.MM.YYYY"
            type="date"
            clearable
            :placeholder="$t('startDate')"
          >
          </custom-date-picker>
        </b-col>
        <b-col sm="12" md="2">
          <b-form-input
            :placeholder="$t('I-TV')"
            v-model="data.child.documentSeries"
            style="text-transform: uppercase"
            v-mask="'A-AA'"
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
      </b-row>

      <b-row>
        <b-col cols="12" md="7">
          <div>
            <b-button-group size="sm" @click="Refresh">
              <b-button
                size="sm"
                @click="data.statusId = 0"
                :variant="data.statusId == 0 ? 'primary' : 'outline-primary'"
                >{{ $t("All") }}</b-button
              >
              <b-button
                size="sm"
                @click="data.statusId = 2"
                :variant="data.statusId == 2 ? 'primary' : 'outline-primary'"
                >{{ $t("Утвержден") }}</b-button
              >
              <b-button
                size="sm"
                @click="data.statusId = 4"
                :variant="data.statusId == 4 ? 'primary' : 'outline-primary'"
                >{{ $t("Изменен") }}
              </b-button>
              <b-button
                size="sm"
                @click="data.statusId = 3"
                :variant="data.statusId == 3 ? 'primary' : 'outline-primary'"
                >{{ $t("Отменено") }}</b-button
              >
            </b-button-group>
          </div>
        </b-col>
        <b-col class=" text-right">
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
    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="items"
      responsive
      :fields="fieldsShowAll"
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
        <span> {{ item.docdate }}</span>
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
            v-model="data.PageNumber"
            :total-rows="data.totalRows"
            :per-page="data.PageLimit"
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
  BTab,
  BButtonGroup,
  BInputGroup,
  BInputGroupAppend,
  BCollapse,
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
    BCard,
    BTr,
    BTh,
    BFormCheckbox,
    CustomDatePicker,
    BPagination,
    BLink,
    BTabs,
    BTab,
    BButtonGroup,
    BInputGroup,
    BInputGroupAppend,
    BCollapse,
  },
  data() {
    return {
      collapse: false,
      collapseparent: false,
      searchtype: false,
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
        isStartPageFromZero: false,
        oblastId: 0,
        regionId: 0,
        onDate: "",
        showAllInRegion: true,
        birthPeriod: null,
        checkBirthPeriod: false,
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
        PageLimit: 20,
        PageNumber: 1,
        statusId: 0,
        organizationId: 0,
        guardianshiplessReasonId: 0,
        child: {
          pinfl: "",
          documentSeries: "",
          documentNumber: "",
          birthPeriod: {
            startDate: "",
            endDate: "",
          },
        },
        guardian: {
          pinfl: "",
          documentSeries: "",
          documentNumber: "",
          birthPeriod: {
            startDate: "",
            endDate: "",
          },
        },
      },
      fieldsShowAll: [
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
          thClass: "text-center ",
          tdClass: "text-center ",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "organizationinn",
          label: this.$t("organizationinn"),
          thClass: "text-center my-border-right",
          tdClass: "text-center my-border-right",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "guardianname",
          label: this.$t("guardianname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "guardiandocumentseries",
          label: this.$t("documentseries"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "guardiandocumentnumber",
          label: this.$t("documentnumber"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "guardiandateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "guardianpinfl",
          label: this.$t("pinfl"),
          thClass: "text-center my-border-right",
          tdClass: "text-center my-border-right",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "childrenname",
          label: this.$t("childrenname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "childdocumentseries",
          label: this.$t("documentseries"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "childdocumentnumber",
          label: this.$t("documentnumber"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
        {
          key: "childdateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
          thStyle: { backgroundColor: "#A0E7E5 !important" },
        },
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
      return (this.data.PageNumber - 1) * this.data.PageLimit + 1;
    },
    lastNumber() {
      if (this.data.totalRows < this.data.PageLimit) {
        return this.data.totalRows;
      } else {
        if (this.data.PageNumber * this.data.PageLimit > this.data.totalRows) {
          return this.data.totalRows;
        } else {
          return this.data.PageNumber * this.data.PageLimit;
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
    //   if (item.statusid === 2) return "table-success";
    //   if (item.statusid === 3) return "table-danger";
    // },
    // ChangeIdentityDoc() {
    //   this.data.guardian.documentSeries = "";
    //   this.data.guardian.documentNumber = "";
    //   this.data.guardian.pinfl = "";
    //   this.data.guardian.birthPeriod.startDate = "";
    //   this.data.guardian.birthPeriod.endDate = "";
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
        name: "ChildUnderGuardianshipView",
        params: {
          id: item.childunderguardianshipid,
        },
      });
    },
    // ChangeBirthPeriod() {
    //   if (this.data.checkBirthPeriod) {
    //     this.data.guardian.birthPeriod = {
    //       startDate: "",
    //       endDate: "",
    //     };
    //   } else {
    //     this.data.guardian.birthPeriod = null;
    //   }
    // },
    Refresh() {
      //   if (!this.Check()) {
      //     return false;
      //   }
      this.isBusy = true;
      ReportService.ChildUnderGuardianshipList(this.data).then((res) => {
        this.items = res.data.data.rows;
        this.data.totalRows = res.data.data.total;
        this.isBusy = false;
        // this.calculate();
      });
    },
    Printer() {
      ReportService.ChildUnderGuardianshipListPrint(this.data).then((res) => {
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
    // BindValue1(value) {
    //   data.child.birthPeriod.startDate = value;
    // },
    // BindValue2(value) {
    //   data.child.birthPeriod.endDate = value;
    // },
    startDateValue(value) {
      this.data.guardian.birthPeriod.startDate = value;
    },
    endDateValue(value) {
      this.data.guardian.birthPeriod.endDate = value;
    },
    getTodayDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mn = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.data.onDate = dd + "." + mn + "." + yyyy;
    },
    // Check() {
    //   if (
    //     this.data.checkBirthPeriod == true &&
    //     (this.data.guardian.birthPeriod.startDate === 0 ||
    //       this.data.guardian.birthPeriod.startDate === null ||
    //       this.data.guardian.birthPeriod.startDate === "" ||
    //       this.data.guardian.birthPeriod.startDate === undefined)
    //   ) {
    //     this.$makeToast(this.$t("startDateNotSelected"), "danger");
    //     return false;
    //   }
    //   if (
    //     this.data.checkBirthPeriod == true &&
    //     (this.data.guardian.birthPeriod.endDate === 0 ||
    //       this.data.guardian.birthPeriod.endDate === null ||
    //       this.data.guardian.birthPeriod.endDate === "" ||
    //       this.data.guardian.birthPeriod.endDate === undefined)
    //   ) {
    //     this.$makeToast(this.$t("endDateNotSelected"), "danger");
    //     return false;
    //   }
    //   return true;
    // },
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
